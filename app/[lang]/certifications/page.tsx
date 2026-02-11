import type { Metadata } from 'next';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ShieldCheck,
  Award,
  Lightbulb,
  Trophy,
  FileText,
  Wrench,
} from 'lucide-react';
import { getDictionary, type Lang } from '@/lib/i18n';
import {
  classifications,
  qualitySystems,
  patents,
  honors,
  getPatentCertificateImage,
} from '@/data/certifications';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isZh = lang === 'zh';
  return {
    title: isZh
      ? '资质认证 - 顺风压缩机'
      : 'Certifications - Shunfeng Compressor',
    description: isZh
      ? '顺风压缩机资质认证、专利技术与荣誉。'
      : 'Shunfeng Compressor certifications, patents and honors.',
  };
}

export default async function Certifications({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = getDictionary(lang as Lang);

  const sortedClassifications = [...classifications].sort(
    (a, b) => b.sortOrder - a.sortOrder
  );
  const sortedQuality = [...qualitySystems].sort(
    (a, b) => b.sortOrder - a.sortOrder
  );
  const sortedPatents = [...patents].sort(
    (a, b) => b.sortOrder - a.sortOrder
  );

  const inventionPatents = sortedPatents.filter(
    (p) => p.type.zh === '发明专利'
  );
  const utilityPatents = sortedPatents.filter(
    (p) => p.type.zh === '实用新型'
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-primary/5">
        <div className="container relative z-10 text-center max-w-4xl mx-auto px-4">
          <Badge
            variant="outline"
            className="mb-4 border-primary/20 text-primary bg-primary/5 backdrop-blur-sm"
          >
            CERTIFICATIONS & COMPLIANCE
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-foreground">
            {dict['cert.title']}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {dict['cert.subtitle']}
          </p>
        </div>
      </section>

      {/* Classification Societies */}
      <section className="py-20 container">
        <div className="flex items-center gap-4 mb-12">
          <ShieldCheck className="w-8 h-8 text-primary" />
          <div>
            <h2 className="text-3xl font-bold">
              {dict['cert.societies_title']}
            </h2>
            <p className="text-muted-foreground mt-2">
              {dict['cert.societies_desc']}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sortedClassifications.map((society) => (
            <Card
              key={society.id}
              className="bg-card/50 backdrop-blur-sm hover:shadow-md transition-all group"
            >
              <CardHeader>
                <div
                  className="w-16 h-16 text-white rounded-lg flex items-center justify-center font-bold text-2xl mb-4 shadow-lg group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: society.color }}
                >
                  {society.code}
                </div>
                <CardTitle>{society.name[lang as Lang]}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {society.scope[lang as Lang]}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Quality System */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="flex items-center gap-4 mb-12">
            <Award className="w-8 h-8 text-primary" />
            <div>
              <h2 className="text-3xl font-bold">
                {dict['cert.quality_title']}
              </h2>
              <p className="text-muted-foreground mt-2">
                {dict['cert.quality_desc']}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {sortedQuality.map((item) => (
              <div
                key={item.id}
                className="bg-background p-8 rounded-xl border border-border/50 hover:border-primary/50 transition-colors shadow-sm"
              >
                <h3 className="text-3xl font-bold text-primary mb-2">
                  {item.standard}
                </h3>
                <h4 className="text-lg font-semibold mb-4">
                  {item.name[lang as Lang]}
                </h4>
                <p className="text-muted-foreground">
                  {item.description[lang as Lang]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Patent Technology */}
      <section className="py-20 container">
        <div className="flex items-center gap-4 mb-12">
          <Lightbulb className="w-8 h-8 text-primary" />
          <div>
            <h2 className="text-3xl font-bold">
              {dict['cert.patent_title']}
            </h2>
            <p className="text-muted-foreground mt-2">
              {dict['cert.patent_desc']}
            </p>
          </div>
        </div>

        {/* Patent Stats */}
        <div className="grid grid-cols-3 gap-4 mb-12">
          <div className="bg-primary/5 border border-primary/10 rounded-xl p-6 text-center">
            <div className="text-4xl font-bold text-primary mb-1">
              {patents.length}
            </div>
            <div className="text-sm text-muted-foreground">
              {lang === 'zh' ? '专利总数' : 'Total Patents'}
            </div>
          </div>
          <div className="bg-amber-500/5 border border-amber-500/10 rounded-xl p-6 text-center">
            <div className="text-4xl font-bold text-amber-600 mb-1">
              {inventionPatents.length}
            </div>
            <div className="text-sm text-muted-foreground">
              {lang === 'zh' ? '发明专利' : 'Invention Patents'}
            </div>
          </div>
          <div className="bg-blue-500/5 border border-blue-500/10 rounded-xl p-6 text-center">
            <div className="text-4xl font-bold text-blue-600 mb-1">
              {utilityPatents.length}
            </div>
            <div className="text-sm text-muted-foreground">
              {lang === 'zh' ? '实用新型专利' : 'Utility Model Patents'}
            </div>
          </div>
        </div>

        {/* Invention Patents */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-6">
            <FileText className="w-5 h-5 text-amber-600" />
            <h3 className="text-xl font-semibold">
              {lang === 'zh' ? '发明专利' : 'Invention Patents'}
            </h3>
            <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-0">
              {inventionPatents.length}
            </Badge>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {inventionPatents.map((patent) => {
              const certImage = getPatentCertificateImage(patent.id);
              return (
                <div
                  key={patent.id}
                  className="group relative bg-background rounded-xl border border-border/50 hover:border-amber-500/50 hover:shadow-lg transition-all overflow-hidden"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500 rounded-l-xl" />
                  <div className="p-5 pl-6">
                    <h4 className="font-semibold text-base mb-2 group-hover:text-amber-700 transition-colors">
                      {patent.name[lang as Lang]}
                    </h4>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="font-mono text-xs bg-muted/50 px-2 py-0.5 rounded">
                        {patent.number}
                      </span>
                      <span>
                        {lang === 'zh' ? '授权' : 'Granted'}:{' '}
                        {patent.authorizationDate}
                      </span>
                    </div>
                  </div>
                  {certImage && (
                    <div className="absolute right-0 top-0 w-[280px] h-[400px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50 translate-x-[290px] -translate-y-4">
                      <div className="bg-white rounded-xl shadow-2xl border border-border/50 p-3">
                        <img
                          src={certImage}
                          alt={patent.name[lang as Lang]}
                          className="w-full h-auto rounded-lg"
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Utility Model Patents */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Wrench className="w-5 h-5 text-blue-600" />
            <h3 className="text-xl font-semibold">
              {lang === 'zh' ? '实用新型专利' : 'Utility Model Patents'}
            </h3>
            <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-0">
              {utilityPatents.length}
            </Badge>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {utilityPatents.map((patent) => {
              const certImage = getPatentCertificateImage(patent.id);
              return (
                <div
                  key={patent.id}
                  className="group relative bg-background rounded-lg border border-border/50 hover:border-blue-500/40 hover:shadow-md transition-all overflow-hidden"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-l-lg" />
                  <div className="p-4 pl-5">
                    <h4 className="font-medium text-sm leading-snug mb-2 group-hover:text-blue-700 transition-colors">
                      {patent.name[lang as Lang]}
                    </h4>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      <span className="font-mono bg-muted/50 px-1.5 py-0.5 rounded">
                        {patent.number}
                      </span>
                      <span>
                        {lang === 'zh' ? '授权' : 'Granted'}:{' '}
                        {patent.authorizationDate}
                      </span>
                    </div>
                  </div>
                  {certImage && (
                    <div className="absolute right-0 top-0 w-[240px] h-[340px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50 translate-x-[250px] -translate-y-4">
                      <div className="bg-white rounded-xl shadow-2xl border border-border/50 p-2">
                        <img
                          src={certImage}
                          alt={patent.name[lang as Lang]}
                          className="w-full h-auto rounded-lg"
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Honors */}
      {honors.length > 0 && (
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="flex items-center gap-4 mb-12">
              <Trophy className="w-8 h-8 text-primary" />
              <div>
                <h2 className="text-3xl font-bold">
                  {dict['cert.honor_title']}
                </h2>
                <p className="text-muted-foreground mt-2">
                  {dict['cert.honor_desc']}
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {honors.map((honor) => (
                <div
                  key={honor.id}
                  className="bg-background rounded-xl border border-border/50 hover:border-primary/50 transition-colors shadow-sm text-center overflow-hidden"
                >
                  {honor.image ? (
                    <div className="aspect-[4/3] overflow-hidden bg-muted/30">
                      <img
                        src={honor.image}
                        alt={honor.name[lang as Lang]}
                        className="w-full h-full object-contain p-4"
                      />
                    </div>
                  ) : (
                    <div className="pt-8">
                      <Trophy className="w-12 h-12 text-primary mx-auto" />
                    </div>
                  )}
                  <div className="p-6">
                    <h4 className="text-lg font-semibold">
                      {honor.name[lang as Lang]}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
