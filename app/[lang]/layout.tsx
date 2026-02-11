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
    ? '顺风压缩机 – 专业压缩机制造商｜70+年行业经验'
    : 'Shunfeng Compressor - Professional Compressor Manufacturer | 70+ Years';
  const description = isZh
    ? '南京顺风压缩机，70+年压缩机研发制造经验，服务超过10000+客户，覆盖30+国家。'
    : 'Nanjing Shunfeng Compressor, 70+ years of compressor R&D and manufacturing, serving 10,000+ customers across 30+ countries.';

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
