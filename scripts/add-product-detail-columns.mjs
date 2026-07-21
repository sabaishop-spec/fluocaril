import pg from 'pg';

const { Client } = pg;

async function runMigration() {
  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL is not set.');
    process.exit(1);
  }

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();
    console.log('Connected to database. Running migration...');

    await client.query('BEGIN');

    await client.query(`
      ALTER TABLE public.products
        ADD COLUMN IF NOT EXISTS ingredients text,
        ADD COLUMN IF NOT EXISTS product_specifications text,
        ADD COLUMN IF NOT EXISTS usage_instructions text;
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
    process.exit(1);
  } finally {
    try {
      await client.end();
    } catch (e) {
      // ignore
    }
  }
}

runMigration();
