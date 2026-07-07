const fs = require('fs');
let content = fs.readFileSync('src/db/index.ts', 'utf8');

const oldLogic = `export const createPool = () => {
  if (process.env.DATABASE_URL) {
    return new Pool({
      connectionString: process.env.DATABASE_URL,
      connectionTimeoutMillis: 15000,
    });
  }`;

const newLogic = `export const createPool = () => {
  if (process.env.DATABASE_URL && process.env.DATABASE_URL.startsWith('postgres')) {
    return new Pool({
      connectionString: process.env.DATABASE_URL,
      connectionTimeoutMillis: 15000,
    });
  }`;

content = content.replace(oldLogic, newLogic);
fs.writeFileSync('src/db/index.ts', content);
