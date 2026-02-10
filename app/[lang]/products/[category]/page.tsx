import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { getDictionary, SUPPORTED_LANGS, type Lang } from '@/lib/i18n';
import { products } from '@/data/products';

const VALID_CATEGORIES = ['marine', 'industrial', 'parts'] as const;
type Category = (typeof VALID_CATEGORIES)[number];

const categoryMeta: Record<Category, { title: { zh: string; en: string }; desc: { zh: string; en: string } }> = {
  marine: {
    title: { zh: '船用压缩机', en: 'Marine Compressors' },
    desc: { zh: '专业船用压缩机产品线', en: 'Professional marine compressor product line' },
  },
  industrial: {
    title: { zh: '工艺压缩机', en: 'Process Compressors' },
    desc: { zh: '化工、能源工业专用压缩机', en: 'Compressors for chemical and energy industries' },
  },
  parts: {
    title: { zh: '压力容器及配件', en: 'Pressure Vessels & Parts' },
    desc: { zh: '高品质压力容器及压缩机配件', en: 'High-quality pressure vessels and compressor parts' },
  },
};

export async function generateStaticParams() {
  const params: { lang: string; category: string }[] = [];
  for (const lang of SUPPORTED_LANGS) {
    for (const category of VALID_CATEGORIES) {
      params.push({ lang, category });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; category: string }>;
}): Promise<Metadata> {
  const { lang, category } = await params;
  const meta = categoryMeta[category as Category];
  if (!meta) return {};
  const isZh = lang === 'zh';
  return {
    title: `${meta.title[isZh ? 'zh' : 'en']} - ${isZh ? '顺风压缩机' : 'Shunfeng Compressor'}`,
    description: meta.desc[isZh ? 'zh' : 'en'],
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ lang: string; category: string }>;
}) {
  const { lang, category } = await params;
  const dict = getDictionary(lang as Lang);

  if (!VALID_CATEGORIES.includes(category as Category)) {
    notFound();
  }

  const meta = categoryMeta[category as Category];
  const categoryProducts = products.filter((p) => p.category === category);

  return (
    <div className="min-h-screen bg-background">
      {/* Back Navigation */}
      <div className="container py-8">
        <Link href={`/${lang}/products`}>
          <Button
            variant="ghost"
            className="pl-0 hover:pl-2 transition-all text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {dict['product.back_to_list']}
          </Button>
        </Link>
      </div>

      {/* Hero */}
      <section className="pb-12 container">
        <Badge
          variant="outline"
          className="mb-4 border-primary/20 text-primary bg-primary/5"
        >
          {category.toUpperCase()}
        </Badge>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
          {meta.title[lang as Lang]}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          {meta.desc[lang as Lang]}
        </p>
      </section>

      {/* Products Grid */}
      <section className="pb-20 container">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categoryProducts.map((product) => (
            <Link
              key={product.id}
              href={`/${lang}/products/${category}/${product.id}`}
            >
              <Card className="group overflow-hidden border-2 border-border/50 hover:border-primary transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 bg-card h-full rounded-3xl cursor-pointer">
                <div className="aspect-[4/3] overflow-hidden bg-white flex items-center justify-center p-4">
                  <img
                    src={product.image}
                    alt={product.title[lang as Lang]}
                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {product.title[lang as Lang]}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {product.description[lang as Lang]}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
