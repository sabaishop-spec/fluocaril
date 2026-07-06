import type { Metadata } from 'next';
import { Inter, Lora } from 'next/font/google';
import './globals.css';
import { Header, Footer } from "@/components/layout";
import { BackToTop } from "@/components/BackToTop";
import { db } from '@/src/db';
import { categories } from '@/src/db/schema';
import { desc } from 'drizzle-orm';

const inter = Inter({ subsets: ['latin', 'vietnamese'], weight: ['400', '500', '600'], variable: '--font-inter' });
const lora = Lora({ weight: ['500', '600', '700'], subsets: ['latin', 'vietnamese'], variable: '--font-lora' });

export const metadata: Metadata = {
  title: 'Chăm Sóc Răng Niềng Chuyên Biệt | Fluocaril',
  description: 'Khám phá sản phẩm và kiến thức chăm sóc răng miệng dành cho người niềng, người dùng khay trong suốt và hàm duy trì.',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  let categoriesList: any[] = [];
  try {
    categoriesList = await db.select().from(categories).orderBy(desc(categories.createdAt));
  } catch(e) {}

  return (
    <html lang="vi" className={`${inter.variable} ${lora.variable}`}>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      </head>
      <body suppressHydrationWarning className="font-sans antialiased bg-white flex min-h-screen flex-col">
        <Header categories={categoriesList} />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
