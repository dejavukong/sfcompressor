import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Download, Play } from 'lucide-react';
import { getDictionary, type Lang } from '@/lib/i18n';

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = getDictionary(lang as Lang);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-secondary selection:text-secondary-foreground overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[800px] w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero_bg.jpg"
            alt="Hero Background"
            className="w-full h-full object-cover scale-105 animate-slow-zoom"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
          <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-8 w-full text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-7xl md:text-8xl lg:text-[10rem] font-black tracking-tighter text-white leading-[1.0] mb-10 drop-shadow-2xl">
              {dict['hero.title.prefix']} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white/80">
                {dict['hero.title.highlight']}
              </span>
            </h1>

            <p className={`text-white/90 leading-relaxed mb-14 max-w-4xl mx-auto font-medium drop-shadow-lg whitespace-pre-line ${lang === 'zh' ? 'text-xl md:text-3xl tracking-wider' : 'text-base md:text-2xl tracking-wide'}`}>
              {dict['hero.subtitle']}
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button
                size="lg"
                className="rounded-full px-12 h-20 text-xl bg-primary hover:bg-primary/90 text-white font-medium shadow-[0_0_40px_-10px_rgba(1,56,255,0.5)] transition-all hover:scale-105 hover:-rotate-1 border-2 border-transparent"
                asChild
              >
                <Link href={`/${lang}/contact`}>
                  {dict['hero.cta']} <ArrowRight className="ml-3 w-6 h-6" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-12 h-20 text-xl bg-white/5 border-2 border-white/30 text-white hover:bg-white hover:text-primary font-medium backdrop-blur-sm transition-all hover:scale-105 hover:rotate-1"
                asChild
              >
                <Link href={`/${lang}/about`}>{dict['hero.cta.learn']}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <div className="bg-primary py-8 overflow-hidden whitespace-nowrap relative z-20 -mt-1 shadow-2xl">
        <div className="inline-block animate-marquee">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <span key={i} className="inline-flex items-center gap-16 mx-16">
              <span className="text-white/90 text-2xl font-black uppercase tracking-wider">
                70+{' '}
                <span className="text-lg font-medium ml-2">
                  {dict['marquee.years']}
                </span>
              </span>
              <span className="text-white/40 text-4xl">•</span>
              <span className="text-white/90 text-2xl font-black uppercase tracking-wider">
                2500+{' '}
                <span className="text-lg font-medium ml-2">
                  {dict['marquee.vessels']}
                </span>
              </span>
              <span className="text-white/40 text-4xl">•</span>
              <span className="text-white/90 text-2xl font-black uppercase tracking-wider">
                30+{' '}
                <span className="text-lg font-medium ml-2">
                  {dict['marquee.countries']}
                </span>
              </span>
            </span>
          ))}
        </div>
        <div className="absolute top-0 py-8 inline-block animate-marquee2 delay-1000">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <span key={i} className="inline-flex items-center gap-16 mx-16">
              <span className="text-white/90 text-2xl font-black uppercase tracking-wider">
                70+{' '}
                <span className="text-lg font-medium ml-2">
                  {dict['marquee.years']}
                </span>
              </span>
              <span className="text-white/40 text-4xl">•</span>
              <span className="text-white/90 text-2xl font-black uppercase tracking-wider">
                2500+{' '}
                <span className="text-lg font-medium ml-2">
                  {dict['marquee.vessels']}
                </span>
              </span>
              <span className="text-white/40 text-4xl">•</span>
              <span className="text-white/90 text-2xl font-black uppercase tracking-wider">
                30+{' '}
                <span className="text-lg font-medium ml-2">
                  {dict['marquee.countries']}
                </span>
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Video Section */}
      <section className="py-32 px-4 md:px-8 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-foreground max-w-3xl leading-[1.0]">
              {dict['video.title.prefix']} <br />
              <span className="text-primary">
                {dict['video.title.highlight']}
              </span>
            </h2>
            <p className="text-xl font-medium text-foreground/60 max-w-md text-right mt-8 md:mt-0 border-l-4 border-secondary pl-6">
              {dict['video.subtitle']}
            </p>
          </div>

          <div className="relative w-full aspect-video rounded-[3rem] overflow-hidden bg-black group cursor-pointer shadow-2xl">
            <iframe
              width="100%"
              height="100%"
              src={
                lang === 'zh'
                  ? 'https://www.youtube.com/embed/bdHtXJto_vM'
                  : 'https://www.youtube.com/embed/lwqcY_W7-lM'
              }
              title="Shunfeng Compressor Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 w-full h-full opacity-90 group-hover:opacity-100 transition-opacity duration-500"
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-28 h-28 bg-secondary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-[0_0_30px_rgba(230,252,182,0.6)]">
                <Play className="w-12 h-12 text-secondary-foreground fill-current ml-2" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section - Bento Grid */}
      <section className="py-32 px-4 md:px-8 bg-[#F5F7FA]">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-24 text-center">
            <h2 className="text-6xl md:text-9xl font-black tracking-tighter text-foreground/5 mb-[-4rem] select-none">
              {dict['products.series']}
            </h2>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground relative z-10">
              {dict['products.lineup']}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Product 1 */}
            <Link href={`/${lang}/products/marine`}>
              <div className="group relative h-[600px] bg-white rounded-[3rem] p-10 flex flex-col justify-between overflow-hidden transition-all hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] hover:-translate-y-2 border border-white">
                <div className="z-10">
                  <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center mb-8 text-primary font-black text-2xl rotate-3 group-hover:rotate-12 transition-transform">
                    01
                  </div>
                  <h3 className="text-4xl font-black text-foreground mb-3 tracking-tight">
                    {dict['products.marine.title']}
                  </h3>
                  <p className="text-foreground/60 font-medium text-lg">
                    {dict['products.marine.desc']}
                  </p>
                </div>
                <div className="absolute right-0 bottom-0 w-[90%] h-[70%] translate-x-12 translate-y-12 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform duration-700 ease-out">
                  <img
                    src="/images/marine-air-cooled.webp"
                    alt="Marine"
                    className="w-full h-full object-contain drop-shadow-2xl"
                  />
                </div>
                <div className="z-10 mt-auto">
                  <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-foreground text-white group-hover:bg-primary transition-colors shadow-lg">
                    <ArrowRight className="w-6 h-6 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                  </span>
                </div>
              </div>
            </Link>

            {/* Product 2 */}
            <Link href={`/${lang}/products/industrial`}>
              <div className="group relative h-[600px] bg-[#0A1E42] rounded-[3rem] p-10 flex flex-col justify-between overflow-hidden transition-all hover:shadow-[0_20px_50px_-12px_rgba(10,30,66,0.3)] hover:-translate-y-2">
                <div className="z-10">
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-8 text-white font-black text-2xl -rotate-3 group-hover:-rotate-12 transition-transform">
                    02
                  </div>
                  <h3 className="text-4xl font-black text-white mb-3 tracking-tight">
                    {dict['products.industrial.title']}
                  </h3>
                  <p className="text-white/60 font-medium text-lg">
                    {dict['products.industrial.desc']}
                  </p>
                </div>
                <div className="absolute right-0 bottom-0 w-[90%] h-[70%] translate-x-12 translate-y-12 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform duration-700 ease-out">
                  <img
                    src="/images/process-d-series.webp"
                    alt="Industrial"
                    className="w-full h-full object-contain drop-shadow-2xl brightness-110"
                  />
                </div>
                <div className="z-10 mt-auto">
                  <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary text-secondary-foreground group-hover:scale-110 transition-transform shadow-lg shadow-secondary/20">
                    <ArrowRight className="w-6 h-6 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                  </span>
                </div>
              </div>
            </Link>

            {/* Product 3 */}
            <Link href={`/${lang}/products/parts`}>
              <div className="group relative h-[600px] bg-secondary rounded-[3rem] p-10 flex flex-col justify-between overflow-hidden transition-all hover:shadow-[0_20px_50px_-12px_rgba(230,252,182,0.4)] hover:-translate-y-2">
                <div className="z-10">
                  <div className="w-16 h-16 bg-black/5 rounded-2xl flex items-center justify-center mb-8 text-secondary-foreground font-black text-2xl rotate-6 group-hover:rotate-0 transition-transform">
                    03
                  </div>
                  <h3 className="text-4xl font-black text-secondary-foreground mb-3 tracking-tight">
                    {dict['products.parts.title']}
                  </h3>
                  <p className="text-secondary-foreground/70 font-medium text-lg">
                    {dict['products.parts.desc']}
                  </p>
                </div>
                <div className="absolute right-0 bottom-0 w-[90%] h-[70%] translate-x-12 translate-y-12 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform duration-700 ease-out">
                  <img
                    src="/images/parts-air-receivers.webp"
                    alt="Parts"
                    className="w-full h-full object-contain drop-shadow-2xl"
                  />
                </div>
                <div className="z-10 mt-auto">
                  <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white text-foreground group-hover:bg-foreground group-hover:text-white transition-colors shadow-lg">
                    <ArrowRight className="w-6 h-6 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 md:px-8 bg-white relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto bg-primary rounded-[4rem] p-12 md:p-32 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-secondary/20 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-400/30 rounded-full blur-[100px]" />
          </div>

          <div className="relative z-10">
            <h2 className="text-5xl md:text-8xl font-black text-white mb-10 tracking-tighter leading-none whitespace-pre-line">
              {dict['cta.title']}
            </h2>
            <p className="text-2xl text-blue-100 mb-16 max-w-2xl mx-auto font-medium">
              {dict['cta.desc']}
            </p>
            <div className="flex flex-col sm:flex-row gap-8 justify-center">
              <a
                href="/downloads/product-manual.pdf"
                download
                className="inline-flex items-center justify-center h-20 px-14 rounded-full bg-secondary text-secondary-foreground text-xl font-bold hover:bg-white hover:text-primary transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
              >
                <Download className="w-6 h-6 mr-3" />
                {dict['cta.download']}
              </a>
              <Link href={`/${lang}/contact`}>
                <span className="inline-flex items-center justify-center h-20 px-14 rounded-full bg-transparent border-2 border-white text-white text-xl font-bold hover:bg-white hover:text-primary transition-all cursor-pointer hover:-translate-y-1">
                  {dict['cta.contact']}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
