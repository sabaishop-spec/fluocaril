import { defineConfig } from "drizzle-kit";

const databaseUrl = process.env.DATABASE_URL;

const sqlHost = process.env.SQL_HOST;
const sqlDbName = process.env.SQL_DB_NAME;
const user = process.env.SQL_ADMIN_USER;
const password = process.env.SQL_ADMIN_PASSWORD;

export default defineConfig(databaseUrl && databaseUrl.startsWith('postgres') ? {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  schemaFilter: ["public"],
  dbCredentials: {
    url: databaseUrl,
  },
  verbose: true,
} : {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  schemaFilter: ["public"],
  dbCredentials: {
    host: sqlHost as string,
    user: user as string,
    password: password as string,
    database: sqlDbName as string,
    ssl: false,
  },
  verbose: true,
});
