import pg from 'pg';
const { Client } = pg;

async function runMigration() {
  if (!process.env.DATABASE_URL) {
    console.warn('DATABASE_URL is not set. Skipping migration.');
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
        ADD COLUMN IF NOT EXISTS usage_instructions text,
        ADD COLUMN IF NOT EXISTS variant_label text DEFAULT 'Phân loại';

      CREATE TABLE IF NOT EXISTS public.product_variants (
        id SERIAL PRIMARY KEY,
        product_id INTEGER NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
        name TEXT NOT NULL,
        slug TEXT NOT NULL,
        swatch_color TEXT NOT NULL,
        image_url TEXT,
        shopee_url TEXT,
        is_default BOOLEAN DEFAULT false,
        sort_order INTEGER DEFAULT 0,
        status TEXT DEFAULT 'Active',
        created_at TIMESTAMP DEFAULT now(),
        updated_at TIMESTAMP DEFAULT now()
      );

      CREATE INDEX IF NOT EXISTS idx_product_variants_product_id ON public.product_variants(product_id);
      CREATE UNIQUE INDEX IF NOT EXISTS idx_product_variants_product_slug ON public.product_variants(product_id, slug);
      CREATE UNIQUE INDEX IF NOT EXISTS idx_product_variants_single_default ON public.product_variants(product_id) WHERE is_default = true;
      
      CREATE TABLE IF NOT EXISTS public.product_description_images (
        id SERIAL PRIMARY KEY,
        product_id INTEGER NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
        image_url TEXT NOT NULL,
        alt_text TEXT,
        sort_order INTEGER DEFAULT 0,
        status TEXT DEFAULT 'Active',
        created_at TIMESTAMP DEFAULT now(),
        updated_at TIMESTAMP DEFAULT now()
      );

      CREATE INDEX IF NOT EXISTS idx_product_description_images_product_id ON public.product_description_images(product_id);
      CREATE INDEX IF NOT EXISTS idx_product_description_images_sort ON public.product_description_images(product_id, sort_order);

      CREATE TABLE IF NOT EXISTS public.site_settings (
        id SERIAL PRIMARY KEY,
        key text NOT NULL UNIQUE,
        value jsonb,
        created_at timestamp DEFAULT now()
      );

      CREATE TABLE IF NOT EXISTS public.login_attempts (
        id SERIAL PRIMARY KEY,
        ip_hash TEXT NOT NULL UNIQUE,
        attempts INTEGER DEFAULT 1,
        last_attempt TIMESTAMP DEFAULT now(),
        lock_until TIMESTAMP
      );

      CREATE UNIQUE INDEX IF NOT EXISTS idx_login_attempts_ip_hash
      ON public.login_attempts(ip_hash);
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
