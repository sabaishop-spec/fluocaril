import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

export const createPool = () => {
  if (process.env.npm_lifecycle_event === 'build' || process.env.NEXT_PHASE === 'phase-production-build') {
    // Return dummy pool for build time to prevent connection hangs
    const dummyPool: any = {
      on: () => {},
      connect: async () => ({
        query: async () => ({ rows: [] }),
        release: () => {},
      }),
      query: async () => ({ rows: [] }),
      end: async () => {},
    };
    return dummyPool;
  }

  if (process.env.DATABASE_URL && process.env.DATABASE_URL.startsWith('postgres')) {
    return new Pool({
      connectionString: process.env.DATABASE_URL,
      connectionTimeoutMillis: 15000,
    });
  }
  
  return new Pool({
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DB_NAME,
    connectionTimeoutMillis: 15000,
  });
};

const pool = createPool();
if (pool instanceof Pool) {
  pool.on('error', (err) => {
    console.error('Unexpected error on idle SQL pool client:', err);
  });
}

export const db = drizzle(pool, { schema });
