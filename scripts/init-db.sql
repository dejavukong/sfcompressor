CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE IF NOT EXISTS knowledge_segments (
  id SERIAL PRIMARY KEY,
  source VARCHAR(50) NOT NULL,
  source_id VARCHAR(100),
  page_route VARCHAR(100),
  title_zh TEXT,
  title_en TEXT,
  content_zh TEXT NOT NULL,
  content_en TEXT NOT NULL,
  embedding_zh vector(1536),
  embedding_en vector(1536),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_embedding_zh
  ON knowledge_segments
  USING hnsw (embedding_zh vector_cosine_ops) WITH (m = 16, ef_construction = 64);

CREATE INDEX IF NOT EXISTS idx_embedding_en
  ON knowledge_segments
  USING hnsw (embedding_en vector_cosine_ops) WITH (m = 16, ef_construction = 64);

CREATE INDEX IF NOT EXISTS idx_segments_source ON knowledge_segments(source);
CREATE INDEX IF NOT EXISTS idx_segments_route ON knowledge_segments(page_route);
