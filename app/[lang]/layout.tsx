import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getDictionary,
  isValidLang,
  SUPPORTED_LANGS,
  type Lang,
} from '../../lib/i18n';
import { Providers } from './providers';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ChatFAB } from '@/components/FloatingChat';

export async function generateStaticParams() {
  return SUPPORTED_LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;

  const isZh = lang === 'zh';
  const title = isZh
    ? '顺风压缩机 - 专业船用压缩机制造商 | 60+年行业经验'
    : 'Shunfeng Compressor - Marine Compressor Manufacturer | 60+ Years';
  const description = isZh
    ? '南京顺风压缩机，60+年船用压缩机研发制造经验，服务1000+船舶，覆盖100+国家。'
    : 'Nanjing Shunfeng Compressor, 60+ years of marine compressor R&D and manufacturing, serving 1000+ vessels across 100+ countries.';

  return {
    title,
    description,
    alternates: {
      languages: {
        zh: '/zh',
        en: '/en',
      },
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!isValidLang(lang)) {
    notFound();
  }

  return (
    <html lang={lang === 'zh' ? 'zh-CN' : 'en'} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers lang={lang as Lang}>
          <div className="min-h-screen bg-background font-sans text-foreground selection:bg-primary/10 selection:text-primary flex flex-col">
            <Header />
            <main className="flex-grow pt-20">{children}</main>
            <Footer />
            <ChatFAB />
          </div>
        </Providers>
      </body>
    </html>
  );
}
