import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});
const db = drizzle(pool);

async function main() {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS public.login_attempts (
      id SERIAL PRIMARY KEY,
      ip_hash text NOT NULL UNIQUE,
      attempts integer DEFAULT 1,
      last_attempt timestamp DEFAULT now(),
      lock_until timestamp
    );
  `);
  console.log('Created login_attempts table');
  pool.end();
}

main().catch(console.error);
