import pg from 'pg';
import pgvector from 'pgvector/pg';

let pool: pg.Pool | null = null;

export async function getPool(): Promise<pg.Pool> {
  if (!pool) {
    pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
    // registerTypes needs a client, not a pool
    const client = await pool.connect();
    try {
      await pgvector.registerTypes(client);
    } finally {
      client.release();
    }
  }
  return pool;
}
