import 'dotenv/config';
import pg from 'pg';
import pgvector from 'pgvector/pg';
import OpenAI from 'openai';

const openai = new OpenAI();

async function main() {
  const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
  const client = await pool.connect();
  await pgvector.registerTypes(client);

  // 1. Check record count
  const countResult = await client.query('SELECT COUNT(*) FROM knowledge_segments');
  console.log('Total records:', countResult.rows[0].count);

  // 2. List all records
  const allRecords = await client.query(
    'SELECT id, source, source_id, title_zh FROM knowledge_segments ORDER BY id'
  );
  console.log('\nAll records:');
  console.table(allRecords.rows.map((r: any) => ({
    id: r.id,
    source: r.source,
    source_id: r.source_id,
    title: r.title_zh?.substring(0, 30),
  })));

  // 3. Test queries
  const queries = [
    '你有什么案例',
    '案例',
    '产品有哪些',
    '船用压缩机有哪些型号',
    '资质认证情况',
    '你们有什么专利',
    'marine compressor',
  ];

  for (const query of queries) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`Query: "${query}"`);

    const isChinese = /[\u4e00-\u9fff]/.test(query);
    const lang = isChinese ? 'zh' : 'en';

    const embResponse = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: query,
    });
    const embedding = embResponse.data[0].embedding;

    const embeddingColumn = lang === 'zh' ? 'embedding_zh' : 'embedding_en';
    const embeddingLiteral = `[${embedding.join(',')}]`;

    // Vector search
    const vectorResult = await client.query(
      `SELECT id, source, source_id, title_zh,
        1 - (${embeddingColumn} <=> $1::vector) AS score
       FROM knowledge_segments
       WHERE ${embeddingColumn} IS NOT NULL
       ORDER BY ${embeddingColumn} <=> $1::vector ASC
       LIMIT 5`,
      [embeddingLiteral]
    );

    console.log('\nVector search top 5:');
    console.table(vectorResult.rows.map((r: any) => ({
      id: r.id,
      source: r.source,
      source_id: r.source_id,
      title: r.title_zh?.substring(0, 25),
      score: Number(r.score).toFixed(4),
    })));

    // Keyword search with domain expansion
    const contentColumn = lang === 'zh' ? 'content_zh' : 'content_en';
    const titleColumn = lang === 'zh' ? 'title_zh' : 'title_en';

    // Simulate extractKeywords + expandQueryKeywords
    const cjkRuns = query.match(/[\u4e00-\u9fff]+/g) ?? [];
    const keywords = new Set<string>();
    for (const run of cjkRuns) {
      if (run.length >= 2) keywords.add(run);
      for (let i = 0; i <= run.length - 2; i++) {
        keywords.add(run.slice(i, i + 2));
      }
    }
    const enTerms = query.match(/[a-zA-Z0-9]+/g) ?? [];
    for (const t of enTerms) { if (t.length > 1) keywords.add(t); }

    // Domain expansion (simplified version of DOMAIN_RULES)
    if (/案例|项目|工程/.test(query)) { keywords.add('工程案例'); keywords.add('案例'); keywords.add('项目'); }
    if (/产品|型号|系列/.test(query)) { keywords.add('产品'); keywords.add('压缩机'); keywords.add('型号'); }
    if (/资质|认证|证书/.test(query)) { keywords.add('资质认证'); keywords.add('船级社'); }
    if (/专利/.test(query)) { keywords.add('专利技术'); keywords.add('发明专利'); }

    const kws = Array.from(keywords);
    console.log(`\nKeywords (with expansion): ${kws.join(', ')}`);

    if (kws.length > 0) {
      const conditions = kws.map((_: string, i: number) => `(${contentColumn} ILIKE $${i + 1} OR ${titleColumn} ILIKE $${i + 1})`);
      const whereClause = conditions.join(' OR ');
      const params = kws.map((k: string) => `%${k}%`);

      const keywordResult = await client.query(
        `SELECT id, source, source_id, title_zh FROM knowledge_segments WHERE ${whereClause} LIMIT 8`,
        params
      );
      console.log(`Keyword search results (${keywordResult.rows.length}):`);
      console.table(keywordResult.rows.map((r: any) => ({
        id: r.id,
        source: r.source,
        source_id: r.source_id,
        title: r.title_zh?.substring(0, 30),
      })));
    }
  }

  client.release();
  await pool.end();
}

main().catch(console.error);
