const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  host: process.env.SQL_HOST,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DB_NAME,
  connectionTimeoutMillis: 5000,
});
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Connection failed:', err.message);
  } else {
    console.log('Connection successful:', res.rows);
  }
  pool.end();
});
