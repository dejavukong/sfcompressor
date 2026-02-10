import type { Metadata } from 'next';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getDictionary, type Lang } from '@/lib/i18n';
import { projects } from '@/data/projects';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isZh = lang === 'zh';
  return {
    title: isZh
      ? '工程案例 - 顺风压缩机'
      : 'Engineering Cases - Shunfeng Compressor',
    description: isZh
      ? '顺风压缩机工程案例，覆盖船舶、海工、能源等领域。'
      : 'Shunfeng Compressor engineering cases across marine, offshore, and energy sectors.',
  };
}

export default async function Projects({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = getDictionary(lang as Lang);

  const sorted = [...projects].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-background">
        <div className="container relative z-10 text-center max-w-4xl mx-auto px-4">
          <Badge
            variant="outline"
            className="mb-6 border-primary/20 text-primary bg-primary/5 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-medium tracking-wide"
          >
            ENGINEERING EXCELLENCE
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-foreground leading-[1.1]">
            {dict['projects.title']}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light">
            {dict['projects.subtitle']}
          </p>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10 opacity-50" />
      </section>

      {/* Projects Grid */}
      <section className="py-20 container">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sorted.map((project) => (
            <Card
              key={project.id}
              className="group overflow-hidden border-2 border-border/50 hover:border-primary transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 bg-card flex flex-col h-full rounded-3xl"
            >
              <div className="aspect-[4/3] overflow-hidden bg-muted relative">
                <img
                  src={project.image}
                  alt={project.title[lang as Lang]}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              <CardHeader className="pb-4 pt-6">
                <CardTitle
                  className="text-2xl font-semibold group-hover:text-primary transition-colors line-clamp-2 leading-tight"
                  title={project.title[lang as Lang]}
                >
                  {project.title[lang as Lang]}
                </CardTitle>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col justify-between pt-0">
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">
                  {project.description[lang as Lang]}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
