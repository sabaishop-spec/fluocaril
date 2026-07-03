import type { Metadata } from 'next';
import { Inter, Be_Vietnam_Pro } from 'next/font/google';
import './globals.css';
import { Header, Footer } from "@/components/layout";

const inter = Inter({ subsets: ['vietnamese'], variable: '--font-inter' });
const beVietnam = Be_Vietnam_Pro({ weight: ['400', '500', '600', '700'], subsets: ['vietnamese'], variable: '--font-display' });

export const metadata: Metadata = {
  title: 'Chăm Sóc Răng Niềng Chuyên Biệt | Fluocaril',
  description: 'Khám phá sản phẩm và kiến thức chăm sóc răng miệng dành cho người niềng, người dùng khay trong suốt và hàm duy trì.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${inter.variable} ${beVietnam.variable}`}>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      </head>
      <body suppressHydrationWarning className="font-sans antialiased bg-white flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
