const fs = require('fs');
let content = fs.readFileSync('drizzle.config.ts', 'utf8');

content = content.replace('export default defineConfig(databaseUrl ? {', "export default defineConfig(databaseUrl && databaseUrl.startsWith('postgres') ? {");

fs.writeFileSync('drizzle.config.ts', content);
