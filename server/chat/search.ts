import OpenAI from 'openai';
import { getPool } from './db';

let _openai: OpenAI | null = null;
function getOpenAI() {
  if (!_openai) _openai = new OpenAI();
  return _openai;
}

export interface SearchResult {
  id: number;
  source: string;
  source_id: string | null;
  page_route: string | null;
  title_zh: string | null;
  title_en: string | null;
  content_zh: string;
  content_en: string;
  score: number;
  metadata: Record<string, unknown>;
}

/**
 * Detect language based on CJK character presence.
 * Returns 'zh' if the text contains any CJK Unified Ideographs, 'en' otherwise.
 */
export function detectLanguage(text: string): 'zh' | 'en' {
  const cjkPattern = /[\u4e00-\u9fff]/;
  return cjkPattern.test(text) ? 'zh' : 'en';
}

/**
 * Generate an embedding vector for the given text using OpenAI text-embedding-3-small.
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  const response = await getOpenAI().embeddings.create({
    model: 'text-embedding-3-small',
    input: text,
  });
  return response.data[0].embedding;
}

/**
 * Extract meaningful keywords from a query.
 * For Chinese: extract consecutive CJK runs (which are already "words" without spaces)
 * and also generate 2-char grams from longer runs to catch sub-word matches.
 * For English: split on whitespace/punctuation.
 */
export function extractKeywords(query: string, language: 'zh' | 'en'): string[] {
  if (language === 'en') {
    return query
      .split(/[\s,;]+/)
      .map(k => k.trim())
      .filter(k => k.length > 1);
  }

  // Chinese: extract CJK character runs
  const cjkRuns = query.match(/[\u4e00-\u9fff]+/g) ?? [];
  const keywords = new Set<string>();

  for (const run of cjkRuns) {
    // Add the full run
    if (run.length >= 2) {
      keywords.add(run);
    }
    // Also generate 2-char grams for better partial matching
    for (let i = 0; i <= run.length - 2; i++) {
      keywords.add(run.slice(i, i + 2));
    }
  }

  // Also extract any English terms (e.g., "ISO 9001")
  const enTerms = query.match(/[a-zA-Z0-9]+/g) ?? [];
  for (const t of enTerms) {
    if (t.length > 1) keywords.add(t);
  }

  return Array.from(keywords);
}

// ---------------------------------------------------------------------------
// Domain keyword mapping — maps common query terms to expanded search terms
// ---------------------------------------------------------------------------

interface DomainRule {
  patterns: RegExp[];
  expandZh: string[];
  expandEn: string[];
}

const DOMAIN_RULES: DomainRule[] = [
  {
    patterns: [/案例|项目|工程|成功/],
    expandZh: ['工程案例', '案例', '项目'],
    expandEn: ['engineering case', 'project'],
  },
  {
    patterns: [/产品|型号|系列/],
    expandZh: ['产品', '压缩机', '型号'],
    expandEn: ['product', 'compressor', 'model'],
  },
  {
    patterns: [/船用|船舶|marine|ship/i],
    expandZh: ['船用压缩机', '船舶'],
    expandEn: ['marine compressor', 'ship'],
  },
  {
    patterns: [/工艺|工业|industrial|process/i],
    expandZh: ['工艺压缩机', '工业'],
    expandEn: ['process compressor', 'industrial'],
  },
  {
    patterns: [/资质|认证|证书|船级社|certif|classification/i],
    expandZh: ['资质认证', '船级社', '认证'],
    expandEn: ['certification', 'classification society'],
  },
  {
    patterns: [/专利|patent/i],
    expandZh: ['专利技术', '发明专利', '实用新型'],
    expandEn: ['patent', 'invention patent'],
  },
  {
    patterns: [/质量|ISO|管理体系/],
    expandZh: ['质量管理体系', 'ISO'],
    expandEn: ['quality management', 'ISO'],
  },
  {
    patterns: [/联系|电话|地址|邮箱|contact/i],
    expandZh: ['联系我们', '电话', '地址'],
    expandEn: ['contact', 'phone', 'address'],
  },
  {
    patterns: [/关于|公司|简介|历史|about/i],
    expandZh: ['关于我们', '公司简介'],
    expandEn: ['about us', 'company'],
  },
  {
    patterns: [/服务|售后|维修|保养|service|support/i],
    expandZh: ['服务与支持', '售后服务'],
    expandEn: ['service', 'support', 'maintenance'],
  },
  {
    patterns: [/配件|零件|容器|储气罐|parts|accessori/i],
    expandZh: ['配件', '压力容器', '储气罐'],
    expandEn: ['parts', 'accessories', 'pressure vessel'],
  },
];

/**
 * Expand a query by matching domain keyword rules.
 * Returns additional keywords that should be included in keyword search.
 */
export function expandQueryKeywords(
  query: string,
  language: 'zh' | 'en',
): string[] {
  const expanded = new Set<string>();
  for (const rule of DOMAIN_RULES) {
    if (rule.patterns.some((p) => p.test(query))) {
      const terms = language === 'zh' ? rule.expandZh : rule.expandEn;
      for (const t of terms) expanded.add(t);
    }
  }
  return Array.from(expanded);
}

/**
 * Hybrid search combining vector similarity and keyword matching.
 * Deduplicates and returns top results sorted by score.
 */
export async function hybridSearch(
  query: string,
  language: 'zh' | 'en',
  limit: number = 8
): Promise<SearchResult[]> {
  const pool = await getPool();
  const embedding = await generateEmbedding(query);

  const embeddingColumn = language === 'zh' ? 'embedding_zh' : 'embedding_en';
  const embeddingLiteral = `[${embedding.join(',')}]`;

  // Vector search: cosine similarity > 0.3, top 5
  const vectorQuery = `
    SELECT
      id, source, source_id, page_route,
      title_zh, title_en, content_zh, content_en,
      metadata,
      1 - (${embeddingColumn} <=> $1::vector) AS score
    FROM knowledge_segments
    WHERE ${embeddingColumn} IS NOT NULL
    ORDER BY ${embeddingColumn} <=> $1::vector ASC
    LIMIT 5
  `;
  const vectorResult = await pool.query(vectorQuery, [embeddingLiteral]);
  const vectorRows: SearchResult[] = vectorResult.rows.filter(
    (row: SearchResult) => row.score > 0.3
  );

  // Keyword search: extract keywords + expand with domain rules
  const contentColumn = language === 'zh' ? 'content_zh' : 'content_en';
  const baseKeywords = extractKeywords(query, language);
  const domainKeywords = expandQueryKeywords(query, language);
  const keywords = Array.from(new Set([...baseKeywords, ...domainKeywords]));

  const titleColumn = language === 'zh' ? 'title_zh' : 'title_en';

  let keywordRows: SearchResult[] = [];
  if (keywords.length > 0) {
    // Match keywords against both content and title columns
    const conditions = keywords.map(
      (_, i) => `(${contentColumn} ILIKE $${i + 1} OR ${titleColumn} ILIKE $${i + 1})`
    );
    const whereClause = conditions.join(' OR ');
    const params = keywords.map(k => `%${k}%`);

    const keywordQuery = `
      SELECT
        id, source, source_id, page_route,
        title_zh, title_en, content_zh, content_en,
        metadata,
        0.5 AS score
      FROM knowledge_segments
      WHERE ${whereClause}
      LIMIT 8
    `;
    const keywordResult = await pool.query(keywordQuery, params);
    keywordRows = keywordResult.rows;
  }

  // Merge, deduplicate by id (keep highest score), sort descending, take top N
  const resultMap = new Map<number, SearchResult>();

  for (const row of vectorRows) {
    resultMap.set(row.id, row);
  }

  for (const row of keywordRows) {
    const existing = resultMap.get(row.id);
    if (!existing || row.score > existing.score) {
      resultMap.set(row.id, row);
    }
  }

  const merged = Array.from(resultMap.values());
  merged.sort((a, b) => b.score - a.score);

  return merged.slice(0, limit);
}
