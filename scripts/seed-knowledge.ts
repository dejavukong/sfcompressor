import 'dotenv/config';
import pg from 'pg';
import pgvector from 'pgvector/pg';
import OpenAI from 'openai';

import { products } from '../data/products.js';
import { projects } from '../data/projects.js';
import {
  classifications,
  qualitySystems,
  patents,
  honors,
} from '../data/certifications.js';
import { zh } from '../locales/zh.js';
import { en } from '../locales/en.js';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface KnowledgeRecord {
  source: string;
  source_id: string;
  page_route: string;
  title_zh: string;
  title_en: string;
  content_zh: string;
  content_en: string;
  metadata: Record<string, unknown>;
}

interface KnowledgeRecordWithEmbeddings extends KnowledgeRecord {
  embedding_zh: number[];
  embedding_en: number[];
}

// ---------------------------------------------------------------------------
// OpenAI client
// ---------------------------------------------------------------------------

const openai = new OpenAI(); // uses OPENAI_API_KEY env var

async function generateEmbedding(text: string): Promise<number[]> {
  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: text,
  });
  return response.data[0].embedding;
}

// ---------------------------------------------------------------------------
// Helpers for building content strings
// ---------------------------------------------------------------------------

function buildProductContentZh(p: (typeof products)[number]): string {
  const parts: string[] = [p.title.zh, p.description.zh];

  if (p.features?.zh?.length) {
    parts.push(p.features.zh.join('\n'));
  }
  if (p.detailedFeatures?.zh?.length) {
    parts.push(p.detailedFeatures.zh.join('\n'));
  }
  if (p.specs?.zh) {
    const specLines = Object.entries(p.specs.zh).map(
      ([k, v]) => `${k}: ${v}`,
    );
    parts.push(specLines.join('\n'));
  }

  return parts.join('\n');
}

function buildProductContentEn(p: (typeof products)[number]): string {
  const parts: string[] = [p.title.en, p.description.en];

  if (p.features?.en?.length) {
    parts.push(p.features.en.join('\n'));
  }
  if (p.detailedFeatures?.en?.length) {
    parts.push(p.detailedFeatures.en.join('\n'));
  }
  if (p.specs?.en) {
    const specLines = Object.entries(p.specs.en).map(
      ([k, v]) => `${k}: ${v}`,
    );
    parts.push(specLines.join('\n'));
  }

  return parts.join('\n');
}

// ---------------------------------------------------------------------------
// Locale key extraction
// ---------------------------------------------------------------------------

type LocaleDict = Record<string, string>;

function extractLocaleContent(
  locale: LocaleDict,
  prefix: string,
): string {
  return Object.entries(locale)
    .filter(([key]) => key.startsWith(`${prefix}.`))
    .map(([, value]) => value)
    .join('\n');
}

// ---------------------------------------------------------------------------
// Category labels
// ---------------------------------------------------------------------------

const CATEGORY_LABELS: Record<string, { zh: string; en: string }> = {
  marine: { zh: '船用压缩机', en: 'Marine Compressors' },
  industrial: { zh: '工艺压缩机', en: 'Industrial / Process Compressors' },
  parts: { zh: '压力容器及配件', en: 'Pressure Vessels & Accessories' },
};

// ---------------------------------------------------------------------------
// Record builders
// ---------------------------------------------------------------------------

function buildProductRecords(): KnowledgeRecord[] {
  const itemRecords = products.map((p) => ({
    source: 'products',
    source_id: p.id,
    page_route: `/products/${p.category}/${p.id}`,
    title_zh: p.title.zh,
    title_en: p.title.en,
    content_zh: buildProductContentZh(p),
    content_en: buildProductContentEn(p),
    metadata: { category: p.category },
  }));

  // --- Category overview segments ---
  const grouped = new Map<string, (typeof products)[number][]>();
  for (const p of products) {
    const list = grouped.get(p.category) ?? [];
    list.push(p);
    grouped.set(p.category, list);
  }

  const categoryRecords: KnowledgeRecord[] = [];

  for (const [cat, items] of grouped) {
    const label = CATEGORY_LABELS[cat] ?? { zh: cat, en: cat };
    const listZh = items.map((p) => `- ${p.title.zh}`).join('\n');
    const listEn = items.map((p) => `- ${p.title.en}`).join('\n');

    categoryRecords.push({
      source: 'products',
      source_id: `category-${cat}`,
      page_route: `/products/${cat}`,
      title_zh: label.zh,
      title_en: label.en,
      content_zh: `产品分类：${label.zh}\n本分类共有${items.length}款产品：\n${listZh}`,
      content_en: `Product Category: ${label.en}\nThis category includes ${items.length} products:\n${listEn}`,
      metadata: { type: 'category-overview', category: cat },
    });
  }

  // --- Products master overview ---
  const totalProducts = products.length;
  const marineCount = products.filter((p) => p.category === 'marine').length;
  const industrialCount = products.filter((p) => p.category === 'industrial').length;
  const partsCount = products.filter((p) => p.category === 'parts').length;

  categoryRecords.push({
    source: 'products',
    source_id: 'overview',
    page_route: '/products',
    title_zh: '产品总览',
    title_en: 'Products Overview',
    content_zh: [
      `顺风压缩机产品总览`,
      `公司共有${totalProducts}款产品，分为三大类：`,
      `1. 船用压缩机（${marineCount}款）：风冷型、水冷型、高压型、螺杆型、应急型等船用空气压缩机`,
      `2. 工艺压缩机（${industrialCount}款）：D型、M型、Z型、L型等工艺气体压缩机，广泛应用于石油化工、天然气、制冷剂等领域`,
      `3. 压力容器及配件（${partsCount}款）：储气罐、蓄能器、干燥器、过滤器、控制面板等配套设备`,
      `所有产品通过CCS、DNV、ABS等多个国际船级社认证`,
    ].join('\n'),
    content_en: [
      `Shunfeng Compressor Products Overview`,
      `The company offers ${totalProducts} products in three categories:`,
      `1. Marine Compressors (${marineCount}): Air-cooled, water-cooled, high-pressure, screw, and emergency marine air compressors`,
      `2. Industrial/Process Compressors (${industrialCount}): D-type, M-type, Z-type, L-type process gas compressors for petrochemical, natural gas, and refrigerant applications`,
      `3. Pressure Vessels & Accessories (${partsCount}): Air receivers, accumulators, dryers, filters, and control panels`,
      `All products certified by CCS, DNV, ABS, and other international classification societies`,
    ].join('\n'),
    metadata: { type: 'master-overview' },
  });

  return [...categoryRecords, ...itemRecords];
}

function buildProjectRecords(): KnowledgeRecord[] {
  const itemRecords = projects.map((p) => ({
    source: 'projects',
    source_id: p.id,
    page_route: '/projects',
    title_zh: p.title.zh,
    title_en: p.title.en,
    content_zh: `工程案例：${p.title.zh}\n${p.description.zh}`,
    content_en: `Engineering Case: ${p.title.en}\n${p.description.en}`,
    metadata: { type: 'case' },
  }));

  // --- Projects overview segment ---
  const caseListZh = projects.map((p) => `- ${p.title.zh}`).join('\n');
  const caseListEn = projects.map((p) => `- ${p.title.en}`).join('\n');

  const overviewRecord: KnowledgeRecord = {
    source: 'projects',
    source_id: 'overview',
    page_route: '/projects',
    title_zh: '工程案例总览',
    title_en: 'Engineering Cases Overview',
    content_zh: [
      `工程案例总览`,
      `公司工程案例、成功案例、项目案例、应用案例共${projects.length}个：`,
      caseListZh,
      `涵盖船用压缩机、工艺压缩机、海洋平台等多个应用领域。`,
    ].join('\n'),
    content_en: [
      `Engineering Cases Overview`,
      `The company has ${projects.length} documented engineering cases:`,
      caseListEn,
      `Covering marine compressors, process compressors, offshore platforms, and other application areas.`,
    ].join('\n'),
    metadata: { type: 'category-overview' },
  };

  return [overviewRecord, ...itemRecords];
}

function buildCertificationRecords(): KnowledgeRecord[] {
  const records: KnowledgeRecord[] = [];

  // One segment per classification
  for (const c of classifications) {
    records.push({
      source: 'certifications',
      source_id: `cls-${c.code}`,
      page_route: '/certifications',
      title_zh: c.name.zh,
      title_en: c.name.en,
      content_zh: `${c.name.zh} (${c.code}): ${c.scope.zh}`,
      content_en: `${c.name.en} (${c.code}): ${c.scope.en}`,
      metadata: { type: 'classification', code: c.code },
    });
  }

  // One segment for all quality systems combined
  const qsContentZh = qualitySystems
    .map((qs) => `${qs.standard} ${qs.name.zh}: ${qs.description.zh}`)
    .join('\n');
  const qsContentEn = qualitySystems
    .map((qs) => `${qs.standard} ${qs.name.en}: ${qs.description.en}`)
    .join('\n');

  records.push({
    source: 'certifications',
    source_id: 'quality-systems',
    page_route: '/certifications',
    title_zh: '质量管理体系',
    title_en: 'Quality Management Systems',
    content_zh: `质量管理体系认证\n${qsContentZh}`,
    content_en: `Quality Management System Certifications\n${qsContentEn}`,
    metadata: { type: 'quality-systems' },
  });

  // One segment for all patents combined
  const inventionCount = patents.filter(
    (p) => p.type.zh === '发明专利',
  ).length;
  const utilityCount = patents.filter(
    (p) => p.type.zh === '实用新型',
  ).length;
  const totalCount = patents.length;

  const patentListZh = patents
    .map((p) => `${p.type.zh} - ${p.name.zh} (${p.number})`)
    .join('\n');
  const patentListEn = patents
    .map((p) => `${p.type.en} - ${p.name.en} (${p.number})`)
    .join('\n');

  records.push({
    source: 'certifications',
    source_id: 'patents',
    page_route: '/certifications',
    title_zh: '专利技术',
    title_en: 'Patent Technology',
    content_zh: `公司拥有${totalCount}项专利，其中发明专利${inventionCount}项，实用新型${utilityCount}项\n${patentListZh}`,
    content_en: `The company holds ${totalCount} patents, including ${inventionCount} invention patents and ${utilityCount} utility model patents\n${patentListEn}`,
    metadata: {
      type: 'patents',
      total: totalCount,
      invention: inventionCount,
      utility: utilityCount,
    },
  });

  // One segment for honors
  const honorsContentZh = honors.map((h) => h.name.zh).join('\n');
  const honorsContentEn = honors.map((h) => h.name.en).join('\n');

  records.push({
    source: 'certifications',
    source_id: 'honors',
    page_route: '/certifications',
    title_zh: '荣誉资质',
    title_en: 'Honors & Awards',
    content_zh: `企业荣誉与行业认可\n${honorsContentZh}`,
    content_en: `Corporate Honors and Industry Recognition\n${honorsContentEn}`,
    metadata: { type: 'honors' },
  });

  // --- Certifications master overview ---
  const clsList = classifications.map((c) => c.code).join('、');
  const qsList = qualitySystems.map((qs) => qs.standard).join('、');

  records.push({
    source: 'certifications',
    source_id: 'overview',
    page_route: '/certifications',
    title_zh: '资质认证总览',
    title_en: 'Certifications Overview',
    content_zh: [
      `资质认证总览`,
      `公司资质认证、资格认证、质量认证情况概览：`,
      `1. 船级社认证（${classifications.length}个）：${clsList}`,
      `2. 质量管理体系（${qualitySystems.length}项）：${qsList}`,
      `3. 专利技术（${totalCount}项）：发明专利${inventionCount}项、实用新型${utilityCount}项`,
      `4. 荣誉资质（${honors.length}项）`,
    ].join('\n'),
    content_en: [
      `Certifications Overview`,
      `Overview of company qualifications and certifications:`,
      `1. Classification Societies (${classifications.length}): ${clsList}`,
      `2. Quality Management Systems (${qualitySystems.length}): ${qsList}`,
      `3. Patents (${totalCount}): ${inventionCount} invention patents, ${utilityCount} utility model patents`,
      `4. Honors & Awards (${honors.length})`,
    ].join('\n'),
    metadata: { type: 'category-overview' },
  });

  return records;
}

function buildSitemapRecord(): KnowledgeRecord {
  return {
    source: 'sitemap',
    source_id: 'sitemap',
    page_route: '/',
    title_zh: '网站导航',
    title_en: 'Website Navigation',
    content_zh: [
      '顺风压缩机官网导航：',
      '- 首页 (/) - 公司概览、产品展示、视频介绍',
      '- 产品 (/products) - 船用压缩机、工艺压缩机、压力容器及配件',
      '- 工程案例 (/projects) - 公司成功案例、工程案例、项目案例',
      '- 资质认证 (/certifications) - 船级社认证、质量管理体系、专利技术、荣誉资质',
      '- 关于我们 (/about) - 公司简介、发展历程、企业文化',
      '- 服务与支持 (/service) - 售后服务、技术支持',
      '- 联系我们 (/contact) - 联系方式、地址、在线留言',
    ].join('\n'),
    content_en: [
      'Shunfeng Compressor Website Navigation:',
      '- Home (/) - Company overview, product showcase, video introduction',
      '- Products (/products) - Marine compressors, process compressors, pressure vessels & accessories',
      '- Engineering Cases (/projects) - Successful engineering project cases',
      '- Certifications (/certifications) - Classification societies, quality systems, patents, honors',
      '- About Us (/about) - Company profile, history, culture',
      '- Service & Support (/service) - After-sales service, technical support',
      '- Contact Us (/contact) - Contact info, address, online inquiry',
    ].join('\n'),
    metadata: { type: 'sitemap' },
  };
}

function buildLocaleRecords(): KnowledgeRecord[] {
  const pages = [
    { prefix: 'about', route: '/about', titleZh: '关于我们', titleEn: 'About Us' },
    { prefix: 'service', route: '/service', titleZh: '服务与支持', titleEn: 'Service & Support' },
    { prefix: 'contact', route: '/contact', titleZh: '联系我们', titleEn: 'Contact Us' },
  ];

  return pages.map((page) => ({
    source: 'locale',
    source_id: page.prefix,
    page_route: page.route,
    title_zh: page.titleZh,
    title_en: page.titleEn,
    content_zh: extractLocaleContent(zh, page.prefix),
    content_en: extractLocaleContent(en, page.prefix),
    metadata: { type: 'page-content' },
  }));
}

// ---------------------------------------------------------------------------
// Delay helper for rate limiting
// ---------------------------------------------------------------------------

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main(): Promise<void> {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL environment variable is not set');
  }

  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY environment variable is not set');
  }

  // Build all records
  const records: KnowledgeRecord[] = [
    buildSitemapRecord(),
    ...buildProductRecords(),
    ...buildProjectRecords(),
    ...buildCertificationRecords(),
    ...buildLocaleRecords(),
  ];

  console.log(`Seeding ${records.length} records...`);

  // Generate embeddings for each record sequentially with rate limiting
  const recordsWithEmbeddings: KnowledgeRecordWithEmbeddings[] = [];

  for (let i = 0; i < records.length; i++) {
    const record = records[i];
    console.log(
      `Generating embeddings for record ${i + 1}/${records.length} [${record.source}] ${record.source_id}...`,
    );

    const [embeddingZh, embeddingEn] = await Promise.all([
      generateEmbedding(record.content_zh),
      generateEmbedding(record.content_en),
    ]);

    recordsWithEmbeddings.push({
      ...record,
      embedding_zh: embeddingZh,
      embedding_en: embeddingEn,
    });

    // Small delay between records to avoid rate limits
    if (i < records.length - 1) {
      await delay(200);
    }
  }

  // Connect to PostgreSQL and insert
  const pool = new pg.Pool({ connectionString });

  try {
    const client = await pool.connect();

    // Register pgvector types on the client
    await pgvector.registerTypes(client);

    try {
      await client.query('BEGIN');

      // Truncate existing data
      console.log('Truncating knowledge_segments table...');
      await client.query('TRUNCATE TABLE knowledge_segments RESTART IDENTITY');

      // Batch insert all records
      console.log('Inserting records...');

      for (const record of recordsWithEmbeddings) {
        await client.query(
          `INSERT INTO knowledge_segments
            (source, source_id, page_route, title_zh, title_en,
             content_zh, content_en, embedding_zh, embedding_en, metadata)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
          [
            record.source,
            record.source_id,
            record.page_route,
            record.title_zh,
            record.title_en,
            record.content_zh,
            record.content_en,
            pgvector.toSql(record.embedding_zh),
            pgvector.toSql(record.embedding_en),
            JSON.stringify(record.metadata),
          ],
        );
      }

      await client.query('COMMIT');

      // Reindex
      console.log('Reindexing...');
      await client.query('REINDEX TABLE knowledge_segments');

      console.log(
        `Done! Inserted ${recordsWithEmbeddings.length} records.`,
      );
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  } finally {
    await pool.end();
  }
}

main().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
