import sys

with open('src/db/schema.ts', 'r') as f:
    content = f.read()

import_old = "import { pgTable, serial, text, timestamp, boolean, integer } from 'drizzle-orm/pg-core';"
import_new = "import { pgTable, serial, text, timestamp, boolean, integer, jsonb } from 'drizzle-orm/pg-core';"
content = content.replace(import_old, import_new)

settings_table = """
export const siteSettings = pgTable('site_settings', {
  id: serial('id').primaryKey(),
  key: text('key').notNull().unique(),
  value: jsonb('value'),
  createdAt: timestamp('created_at').defaultNow(),
});
"""
content += settings_table

with open('src/db/schema.ts', 'w') as f:
    f.write(content)
