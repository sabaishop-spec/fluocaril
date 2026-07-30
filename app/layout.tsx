export const dynamic = 'force-dynamic';
import type { Metadata } from 'next';
import { Inter, Lora } from 'next/font/google';
import './globals.css';
import { Header, Footer } from "@/components/layout";
import { BackToTop } from "@/components/BackToTop";
import { getSetting } from '@/src/db/settings';
import { getCategories } from '@/src/db/queries';

const inter = Inter({ subsets: ['latin', 'vietnamese'], weight: ['400', '500', '600'], variable: '--font-inter' });
const lora = Lora({ weight: ['500', '600', '700'], subsets: ['latin', 'vietnamese'], variable: '--font-lora' });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.fluocaril.vn'),
  title: {
    template: '%s | Fluocaril',
    default: 'Chăm Sóc Răng Niềng Chuyên Biệt | Fluocaril',
  },
  description: 'Khám phá sản phẩm và kiến thức chăm sóc răng miệng dành cho người niềng.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Chăm Sóc Răng Niềng Chuyên Biệt | Fluocaril',
    description: 'Khám phá sản phẩm và kiến thức chăm sóc răng miệng dành cho người niềng.',
    url: 'https://www.fluocaril.vn',
    siteName: 'Fluocaril',
    locale: 'vi_VN',
    type: 'website',
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [categoryData, footerData] = await Promise.all([
    getCategories(),
    getSetting('footer_settings'),
  ]);
  return (
    <html lang="vi" className={`${inter.variable} ${lora.variable}`} data-scroll-behavior="smooth">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      </head>
      <body className="font-sans antialiased bg-white flex min-h-screen flex-col">
        <Header categories={categoryData} />
        <main className="flex-1">
          {children}
        </main>
        <Footer categories={categoryData} footerData={footerData} />
        <BackToTop />
      </body>
    </html>
  );
}
