import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ArrowLeft, Mail } from 'lucide-react';
import { getDictionary, SUPPORTED_LANGS, type Lang } from '@/lib/i18n';
import { products } from '@/data/products';
import { ProductSpecsTable } from '@/components/ProductSpecsTable';

export async function generateStaticParams() {
  const params: { lang: string; category: string; id: string }[] = [];
  for (const lang of SUPPORTED_LANGS) {
    for (const product of products) {
      params.push({ lang, category: product.category, id: product.id });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; category: string; id: string }>;
}): Promise<Metadata> {
  const { lang, id } = await params;
  const product = products.find((p) => p.id === id);
  if (!product) return {};
  const isZh = lang === 'zh';
  return {
    title: `${product.title[isZh ? 'zh' : 'en']} - ${isZh ? '顺风压缩机' : 'Shunfeng Compressor'}`,
    description: product.description[isZh ? 'zh' : 'en'].slice(0, 160),
  };
}

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ lang: string; category: string; id: string }>;
}) {
  const { lang, category, id } = await params;
  const dict = getDictionary(lang as Lang);

  const product = products.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb / Back Navigation */}
      <div className="container py-8">
        <Link href={`/${lang}/products/${category}`}>
          <Button
            variant="ghost"
            className="pl-0 hover:pl-2 transition-all text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {dict['product.back_to_list']}
          </Button>
        </Link>
      </div>

      <main className="container pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
          {/* Product Visual */}
          <div className="relative aspect-[4/3] rounded-xl bg-white border border-border/20 flex items-center justify-center overflow-hidden p-8">
            <img
              src={product.image}
              alt={product.title[lang as Lang]}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Product Info */}
          <div className="space-y-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wider uppercase">
                  {product.category.toUpperCase()}
                </span>
                <span className="h-px w-12 bg-border" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground tracking-tight leading-tight">
                {product.title[lang as Lang]}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed font-light">
                {product.description[lang as Lang]}
              </p>
            </div>

            {/* Specs Grid */}
            {product.specs && !product.models && (
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(product.specs[lang as Lang]).map(
                  ([key, value], idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-muted/30 border border-border/50 backdrop-blur-sm hover:bg-muted/50 transition-colors"
                    >
                      <div className="text-xs text-muted-foreground mb-1.5 font-medium uppercase tracking-wider opacity-70">
                        {key}
                      </div>
                      <div className="text-lg font-semibold text-foreground tracking-tight">
                        {value}
                      </div>
                    </div>
                  )
                )}
              </div>
            )}

            {/* Features List */}
            <div className="space-y-8 pt-6 border-t border-border/50">
              <div className="space-y-4">
                <h3 className="text-xl font-bold tracking-tight">
                  {dict['product.core_advantages']}
                </h3>
                <ul className="space-y-3">
                  {product.features[lang as Lang].map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 group">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-0.5 group-hover:bg-primary group-hover:text-white transition-colors">
                        <CheckCircle2 className="w-3 h-3" />
                      </div>
                      <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Detailed Technical Features */}
              {product.detailedFeatures && (
                <div className="space-y-4 pt-4 border-t border-border/30">
                  <h3 className="text-xl font-bold tracking-tight">
                    {dict['product.technical_features']}
                  </h3>
                  <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-3">
                    {product.detailedFeatures[lang as Lang].map(
                      (feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-sm"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-2 shrink-0" />
                          <span className="text-muted-foreground">
                            {feature}
                          </span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-8">
              <Button
                size="lg"
                className="flex-1 h-14 text-base rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all"
                asChild
              >
                <Link
                  href={`/${lang}/contact?product=${encodeURIComponent(product.title[lang as Lang])}&category=${product.category}`}
                >
                  <Mail className="w-5 h-5 mr-2" />
                  {dict['product.request_quote']}
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Full Technical Specs Table */}
        {product.models && product.models.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                {dict['product.technical_specs']}
              </h2>
              <span className="h-px flex-1 bg-border/50" />
            </div>

            <div className="space-y-12">
              {product.models.map((model, idx) => (
                <div key={idx} className="space-y-4">
                  {model.title && (
                    <h3 className="text-lg font-semibold text-muted-foreground pl-1 border-l-4 border-primary/50">
                      {model.title[lang as Lang]}
                    </h3>
                  )}
                  <ProductSpecsTable
                    headers={model.headers}
                    rows={model.rows}
                    lang={lang as Lang}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
