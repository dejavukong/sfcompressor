import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '顺风压缩机 - 专业船用压缩机制造商 | Shunfeng Compressor',
  description:
    '南京顺风压缩机，60+年船用压缩机研发制造经验，服务1000+船舶，覆盖100+国家。',
  keywords:
    '船用压缩机,海洋压缩机,风冷压缩机,水冷压缩机,工业压缩机,顺风压缩机,marine compressor',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
