import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
      ? '产品中心 - 顺风压缩机'
      : 'Products - Shunfeng Compressor',
    description: isZh
      ? '顺风压缩机产品中心，船用压缩机、工艺压缩机、压力容器及配件。'
      : 'Shunfeng Compressor products: marine compressors, process compressors, pressure vessels and parts.',
  };
}

const productCategories = [
  {
    id: 'marine',
    title: { zh: '船用压缩机', en: 'Marine Compressor' },
    description: {
      zh: '专为船舶与海工应用设计的高可靠性压缩机产品。我们的船用压缩机系列经过严格的船级社认证，采用耐腐蚀设计，能够在恶劣的海洋环境中保持稳定运行。产品涵盖起动空气系统、控制空气系统及应急系统，压力范围从7bar到30bar，满足各类船舶的不同需求。所有产品均符合SOLAS国际海上人命安全公约要求，支持24/7连续运行，为您的船舶提供可靠的动力保障。',
      en: 'High-reliability compressors for marine and offshore applications. Certified by classification societies with corrosion-resistant design for harsh environments. Covers starting air, control air, and emergency systems (7-30bar). SOLAS-compliant with 24/7 operation capability.',
    },
    image: '/images/marine-compressor.png',
    link: '/products/marine',
  },
  {
    id: 'industrial',
    title: { zh: '工艺压缩机', en: 'Process Compressor' },
    description: {
      zh: '化工、能源工业的专用压缩机解决方案。我们的工艺用压缩机专为特殊气体和苛刻工况设计，包括化工工艺压缩机、天然气压缩机、氢气压缩机等。产品采用特殊材质和密封技术，符合API 618等国际标准，具备防爆认证。我们提供从方案设计、设备制造到安装调试的全流程服务，根据客户的具体工艺参数进行定制化设计，确保设备在复杂工况下的安全稳定运行。',
      en: 'Process compressors for chemical and energy industries. Designed for special gases and harsh conditions (chemical, natural gas, hydrogen). API 618 compliant with explosion-proof certification. Full-service from design to commissioning with customized solutions.',
    },
    image: '/images/process-compressor.png',
    link: '/products/industrial',
  },
  {
    id: 'parts',
    title: { zh: '压力容器及压缩机配件', en: 'Pressure Vessels & Compressor Parts' },
    description: {
      zh: '提供高品质的压力容器及各类压缩机配件。我们的压力容器产品包括储气罐、分离器、冷却器等，采用优质材料制造，符合国际压力容器设计标准。配件系列涵盖活塞环、气阀、轴承、密封件等核心部件，适配多种品牌和型号的压缩机。所有产品均经过严格的质量检测，确保与原厂配件同等的性能和可靠性，帮助您降低维护成本，延长设备使用寿命。',
      en: 'High-quality pressure vessels and compressor parts meeting international standards. Includes air receivers, separators, coolers, and core components (piston rings, valves, bearings, seals). Compatible with multiple brands. Equivalent to OEM parts with reduced maintenance costs.',
    },
    image: '/images/product_pressure_vessel.png',
    link: '/products/parts',
  },
];

export default async function Products({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = getDictionary(lang as Lang);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-background">
        <div className="container relative z-10 text-center max-w-4xl mx-auto px-4">
          <Badge
            variant="outline"
            className="mb-6 border-primary/20 text-primary bg-primary/5 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-medium tracking-wide"
          >
            PRODUCTS CENTER
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-foreground leading-[1.1]">
            {dict['products.center']}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light">
            {dict['products.center_desc']}
          </p>
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10 opacity-50" />
      </section>

      {/* Products List */}
      <section className="pb-32 container max-w-6xl mx-auto px-4">
        <div className="space-y-24">
          {productCategories.map((product, index) => (
            <div
              key={product.id}
              className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center`}
            >
              <div className="w-full lg:w-1/2">
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-muted/50 to-muted/10 border border-white/10 shadow-2xl group">
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <img
                    src={product.image}
                    alt={product.title[lang as Lang]}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>

              <div className="w-full lg:w-1/2 space-y-6">
                <div className="space-y-2">
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                    {product.title[lang as Lang]}
                  </h2>
                </div>

                <p className="text-lg text-muted-foreground leading-relaxed tracking-tight">
                  {product.description[lang as Lang]}
                </p>

                <div className="pt-4">
                  <Link href={`/${lang}${product.link}`}>
                    <Button
                      size="lg"
                      className="rounded-full px-8 text-base font-medium group"
                    >
                      {dict['products.view_details']}
                      <svg
                        className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
