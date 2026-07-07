const { Pool } = require('pg');
const pool = new Pool({
  host: process.env.SQL_HOST,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DB_NAME,
  connectionTimeoutMillis: 5000,
});
pool.query('SELECT * FROM site_settings LIMIT 1', (err, res) => {
  if (err) {
    console.error('Query failed:', err.message);
  } else {
    console.log('Query successful:', res.rows);
  }
  pool.end();
});
