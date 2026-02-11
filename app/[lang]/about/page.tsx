import type { Metadata } from 'next';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { getDictionary, type Lang } from '@/lib/i18n';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isZh = lang === 'zh';
  return {
    title: isZh
      ? '关于我们 - 顺风压缩机'
      : 'About Us - Shunfeng Compressor',
    description: isZh
      ? '南京顺风压缩机，70+年压缩机研发制造经验，服务超过10000+客户，覆盖30+国家。'
      : 'Nanjing Shunfeng Compressor, 70+ years of compressor R&D and manufacturing, serving 10,000+ customers across 30+ countries.',
  };
}

export default async function About({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = getDictionary(lang as Lang);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-primary/5">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/factory-interior-new.jpg"
            alt="Factory"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/50 to-background" />
        </div>

        <div className="container relative z-10 text-center max-w-4xl mx-auto px-4">
          <Badge
            variant="outline"
            className="mb-4 border-primary/20 text-primary bg-primary/5 backdrop-blur-sm"
          >
            ABOUT US
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-foreground">
            {dict['about.title']}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {dict['about.subtitle']}
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">
              {dict['about.manufacturer_title']}
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>{dict['about.history_p1']}</p>
              <p>{dict['about.history_p2']}</p>
              <p>{dict['about.history_p3']}</p>
            </div>
          </div>
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-2xl">
            <img
              src="/images/compressor_factory_engineers.png"
              alt="Engineers at work"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-5xl font-bold mb-2">70+</div>
            <div className="text-sm opacity-80">{dict['about.stats.years']}</div>
          </div>
          <div>
            <div className="text-5xl font-bold mb-2">2500+</div>
            <div className="text-sm opacity-80">
              {dict['about.stats.applications']}
            </div>
          </div>
          <div>
            <div className="text-5xl font-bold mb-2">30+</div>
            <div className="text-sm opacity-80">
              {dict['about.stats.countries']}
            </div>
          </div>
          <div>
            <div className="text-5xl font-bold mb-2">200+</div>
            <div className="text-sm opacity-80">{dict['about.stats.team']}</div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 container">
        <h2 className="text-3xl font-bold mb-12 text-center">
          {dict['about.values.title']}
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="text-center p-6 bg-muted/30 border-none">
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-4 text-primary">
                {dict['about.values.professional']}
              </h3>
              <p className="text-sm text-muted-foreground">
                {dict['about.values.professional_desc']}
              </p>
            </CardContent>
          </Card>
          <Card className="text-center p-6 bg-muted/30 border-none">
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-4 text-primary">
                {dict['about.values.quality']}
              </h3>
              <p className="text-sm text-muted-foreground">
                {dict['about.values.quality_desc']}
              </p>
            </CardContent>
          </Card>
          <Card className="text-center p-6 bg-muted/30 border-none">
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-4 text-primary">
                {dict['about.values.customer']}
              </h3>
              <p className="text-sm text-muted-foreground">
                {dict['about.values.customer_desc']}
              </p>
            </CardContent>
          </Card>
          <Card className="text-center p-6 bg-muted/30 border-none">
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-4 text-primary">
                {dict['about.values.innovation']}
              </h3>
              <p className="text-sm text-muted-foreground">
                {dict['about.values.innovation_desc']}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
