import sys

content = open('app/layout.tsx').read()
content = content.replace("import { Header, Footer } from \"@/components/layout\";", "import { Header, Footer } from \"@/components/layout\";\nimport { db } from '@/src/db';\nimport { categories } from '@/src/db/schema';\nimport { desc } from 'drizzle-orm';")
content = content.replace("export default function RootLayout({ children }: { children: React.ReactNode }) {", "export default async function RootLayout({ children }: { children: React.ReactNode }) {\n  let categoriesList: any[] = [];\n  try {\n    categoriesList = await db.select().from(categories).orderBy(desc(categories.createdAt));\n  } catch(e) {}\n")
content = content.replace("<Header />", "<Header categories={categoriesList} />")

open('app/layout.tsx', 'w').write(content)
