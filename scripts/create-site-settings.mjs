import pg from 'pg';
const { Client } = pg;

async function runMigration() {
  if (!process.env.DATABASE_URL) {
    console.warn('DATABASE_URL is not set. Skipping migration.');
    process.exit(0);
  }

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();
    console.log('Connected to database. Running migration...');
    await client.query('BEGIN');
    
    await client.query(`
      CREATE TABLE IF NOT EXISTS public.site_settings (
        id SERIAL PRIMARY KEY,
        key text NOT NULL UNIQUE,
        value jsonb,
        created_at timestamp DEFAULT now()
      );
    `);

    await client.query('COMMIT');
    console.log('Migration completed successfully.');
  } catch (error) {
    console.error('Migration failed:', error.message);
    try {
      await client.query('ROLLBACK');
    } catch (e) {
      console.error('Could not rollback:', e.message);
    }
    process.exit(0);
  } finally {
    try {
      await client.end();
    } catch (e) {
      // ignore
    }
  }
}

runMigration();
