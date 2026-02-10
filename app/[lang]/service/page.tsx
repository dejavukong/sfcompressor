import type { Metadata } from 'next';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Phone,
  Wrench,
  Headphones,
  Package,
  MapPin,
  Globe,
  PenTool,
  Settings,
  Hammer,
  RefreshCw,
} from 'lucide-react';
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
      ? '服务支持 - 顺风压缩机'
      : 'Service & Support - Shunfeng Compressor',
    description: isZh
      ? '顺风压缩机全方位服务支持，工程设计、系统集成、安装调试、维修保养。'
      : 'Shunfeng Compressor full-service support: engineering design, system integration, installation, maintenance.',
  };
}

export default async function Service({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = getDictionary(lang as Lang);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-primary/5">
        <div className="container relative z-10 text-center max-w-4xl mx-auto px-4">
          <Badge
            variant="outline"
            className="mb-4 border-primary/20 text-primary bg-primary/5 backdrop-blur-sm"
          >
            SERVICE & SUPPORT
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-foreground">
            {dict['service.title']}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {dict['service.subtitle']}
          </p>
        </div>
      </section>

      {/* Service Tabs Section */}
      <section className="py-20 container">
        <Tabs defaultValue="engineering" className="w-full">
          <div className="flex justify-center mb-12">
            <TabsList className="grid w-full max-w-4xl grid-cols-2 md:grid-cols-4 h-auto p-1 bg-muted/50">
              <TabsTrigger
                value="engineering"
                className="py-3 data-[state=active]:bg-background data-[state=active]:shadow-sm"
              >
                {dict['service.tabs.engineering']}
              </TabsTrigger>
              <TabsTrigger
                value="integration"
                className="py-3 data-[state=active]:bg-background data-[state=active]:shadow-sm"
              >
                {dict['service.tabs.integration']}
              </TabsTrigger>
              <TabsTrigger
                value="installation"
                className="py-3 data-[state=active]:bg-background data-[state=active]:shadow-sm"
              >
                {dict['service.tabs.installation']}
              </TabsTrigger>
              <TabsTrigger
                value="maintenance"
                className="py-3 data-[state=active]:bg-background data-[state=active]:shadow-sm"
              >
                {dict['service.tabs.maintenance']}
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent
            value="engineering"
            className="mt-0 animate-in fade-in-50 slide-in-from-bottom-4 duration-500"
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mb-4">
                  <PenTool className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-bold">
                  {dict['service.engineering.title']}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {dict['service.engineering.desc']}
                </p>
                <ul className="space-y-4 mt-8">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5" />
                    <span className="text-foreground/80">
                      {dict['service.engineering.selection']}
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5" />
                    <span className="text-foreground/80">
                      {dict['service.engineering.pid']}
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5" />
                    <span className="text-foreground/80">
                      {dict['service.engineering.structure']}
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5" />
                    <span className="text-foreground/80">
                      {dict['service.engineering.approval']}
                    </span>
                  </li>
                </ul>
              </div>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/images/service_engineering_design.jpg"
                  alt="Engineering Design"
                  className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            </div>
          </TabsContent>

          <TabsContent
            value="integration"
            className="mt-0 animate-in fade-in-50 slide-in-from-bottom-4 duration-500"
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mb-4">
                  <Settings className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-bold">
                  {dict['service.integration.title']}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {dict['service.integration.desc']}
                </p>
                <ul className="space-y-4 mt-8">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5" />
                    <span className="text-foreground/80">
                      {dict['service.integration.equipment']}
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5" />
                    <span className="text-foreground/80">
                      {dict['service.integration.piping']}
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5" />
                    <span className="text-foreground/80">
                      {dict['service.integration.control']}
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5" />
                    <span className="text-foreground/80">
                      {dict['service.integration.sat']}
                    </span>
                  </li>
                </ul>
              </div>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/images/service_system_integration.jpg"
                  alt="System Integration"
                  className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            </div>
          </TabsContent>

          <TabsContent
            value="installation"
            className="mt-0 animate-in fade-in-50 slide-in-from-bottom-4 duration-500"
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mb-4">
                  <Hammer className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-bold">
                  {dict['service.installation.title']}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {dict['service.installation.desc']}
                </p>
                <ul className="space-y-4 mt-8">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5" />
                    <span className="text-foreground/80">
                      {dict['service.installation.supervision']}
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5" />
                    <span className="text-foreground/80">
                      {dict['service.installation.commissioning']}
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5" />
                    <span className="text-foreground/80">
                      {dict['service.installation.training']}
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5" />
                    <span className="text-foreground/80">
                      {dict['service.installation.sat']}
                    </span>
                  </li>
                </ul>
              </div>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/images/service_installation.jpg"
                  alt="Installation & Commissioning"
                  className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            </div>
          </TabsContent>

          <TabsContent
            value="maintenance"
            className="mt-0 animate-in fade-in-50 slide-in-from-bottom-4 duration-500"
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mb-4">
                  <RefreshCw className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-bold">
                  {dict['service.maintenance.title']}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {dict['service.maintenance.desc']}
                </p>
                <ul className="space-y-4 mt-8">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5" />
                    <span className="text-foreground/80">
                      {dict['service.maintenance.preventive']}
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5" />
                    <span className="text-foreground/80">
                      {dict['service.maintenance.overhaul']}
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5" />
                    <span className="text-foreground/80">
                      {dict['service.maintenance.retrofit']}
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5" />
                    <span className="text-foreground/80">
                      {dict['service.maintenance.training']}
                    </span>
                  </li>
                </ul>
              </div>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/images/service_maintenance.jpg"
                  alt="Maintenance Services"
                  className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Core Services */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <h2 className="text-3xl font-bold mb-12 text-center">
            {dict['service.core_title']}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all border-t-4 border-t-primary">
              <CardHeader>
                <Phone className="w-10 h-10 text-primary mb-4" />
                <CardTitle>{dict['service.consulting']}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {dict['service.consulting_desc']}
                </p>
                <ul className="space-y-2 text-sm">
                  <li>• {dict['service.consulting_list1']}</li>
                  <li>• {dict['service.consulting_list2']}</li>
                  <li>• {dict['service.consulting_list3']}</li>
                  <li>• {dict['service.consulting_list4']}</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all border-t-4 border-t-primary">
              <CardHeader>
                <Wrench className="w-10 h-10 text-primary mb-4" />
                <CardTitle>{dict['service.installation']}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {dict['service.installation_desc']}
                </p>
                <ul className="space-y-2 text-sm">
                  <li>• {dict['service.installation_list1']}</li>
                  <li>• {dict['service.installation_list2']}</li>
                  <li>• {dict['service.installation_list3']}</li>
                  <li>• {dict['service.installation_list4']}</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all border-t-4 border-t-primary">
              <CardHeader>
                <Headphones className="w-10 h-10 text-primary mb-4" />
                <CardTitle>{dict['service.support']}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {dict['service.support_desc']}
                </p>
                <ul className="space-y-2 text-sm">
                  <li>• {dict['service.support_list1']}</li>
                  <li>• {dict['service.support_list2']}</li>
                  <li>• {dict['service.support_list3']}</li>
                  <li>• {dict['service.support_list4']}</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all border-t-4 border-t-primary">
              <CardHeader>
                <Package className="w-10 h-10 text-primary mb-4" />
                <CardTitle>{dict['service.parts']}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {dict['service.parts_desc']}
                </p>
                <ul className="space-y-2 text-sm">
                  <li>• {dict['service.parts_list1']}</li>
                  <li>• {dict['service.parts_list2']}</li>
                  <li>• {dict['service.parts_list3']}</li>
                  <li>• {dict['service.parts_list4']}</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold mb-2">&lt; 2h</div>
            <div className="text-sm opacity-80">
              {dict['service.stats.response']}
            </div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">&lt; 24h</div>
            <div className="text-sm opacity-80">
              {dict['service.stats.port']}
            </div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">98%</div>
            <div className="text-sm opacity-80">
              {dict['service.stats.parts']}
            </div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">99.5%</div>
            <div className="text-sm opacity-80">
              {dict['service.stats.equipment']}
            </div>
          </div>
        </div>
      </section>

      {/* Global Network */}
      <section className="py-20 container">
        <div className="flex items-center gap-4 mb-12">
          <Globe className="w-8 h-8 text-primary" />
          <h2 className="text-3xl font-bold">
            {dict['service.network.title']}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex gap-4 p-6 bg-muted/30 rounded-lg">
              <MapPin className="w-6 h-6 text-primary shrink-0" />
              <div>
                <h3 className="font-bold text-lg mb-2">
                  {dict['service.network.china']}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {dict['service.network.china_desc']}
                </p>
                <Badge variant="secondary">
                  {dict['service.network.china_badge']}
                </Badge>
              </div>
            </div>
            <div className="flex gap-4 p-6 bg-muted/30 rounded-lg">
              <MapPin className="w-6 h-6 text-primary shrink-0" />
              <div>
                <h3 className="font-bold text-lg mb-2">
                  {dict['service.network.apac']}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {dict['service.network.apac_desc']}
                </p>
                <Badge variant="secondary">
                  {dict['service.network.apac_badge']}
                </Badge>
              </div>
            </div>
            <div className="flex gap-4 p-6 bg-muted/30 rounded-lg">
              <MapPin className="w-6 h-6 text-primary shrink-0" />
              <div>
                <h3 className="font-bold text-lg mb-2">
                  {dict['service.network.europe']}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {dict['service.network.europe_desc']}
                </p>
                <Badge variant="secondary">
                  {dict['service.network.europe_badge']}
                </Badge>
              </div>
            </div>
          </div>

          <div className="bg-muted rounded-xl min-h-[300px] flex items-center justify-center relative overflow-hidden">
            <div className="relative z-10 grid grid-cols-3 gap-8 w-full max-w-md">
              <div className="flex flex-col items-center animate-pulse">
                <MapPin className="w-8 h-8 text-primary mb-2" />
                <span className="text-xs font-bold">
                  {dict['service.network.china']}
                </span>
              </div>
              <div className="flex flex-col items-center animate-pulse">
                <MapPin className="w-8 h-8 text-primary mb-2" />
                <span className="text-xs font-bold">
                  {dict['service.network.singapore']}
                </span>
              </div>
              <div className="flex flex-col items-center animate-pulse">
                <MapPin className="w-8 h-8 text-primary mb-2" />
                <span className="text-xs font-bold">
                  {dict['service.network.rotterdam']}
                </span>
              </div>
              <div className="flex flex-col items-center animate-pulse">
                <MapPin className="w-8 h-8 text-primary mb-2" />
                <span className="text-xs font-bold">
                  {dict['service.network.houston']}
                </span>
              </div>
              <div className="flex flex-col items-center animate-pulse">
                <MapPin className="w-8 h-8 text-primary mb-2" />
                <span className="text-xs font-bold">
                  {dict['service.network.dubai']}
                </span>
              </div>
              <div className="flex flex-col items-center animate-pulse">
                <MapPin className="w-8 h-8 text-primary mb-2" />
                <span className="text-xs font-bold">
                  {dict['service.network.hamburg']}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <h2 className="text-3xl font-bold mb-12 text-center">
            {dict['service.process.title']}
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="relative text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="font-bold text-lg mb-2">
                {dict['service.process.step1']}
              </h3>
              <p className="text-sm text-muted-foreground">
                {dict['service.process.step1_desc']}
              </p>
            </div>
            <div className="relative text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="font-bold text-lg mb-2">
                {dict['service.process.step2']}
              </h3>
              <p className="text-sm text-muted-foreground">
                {dict['service.process.step2_desc']}
              </p>
            </div>
            <div className="relative text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="font-bold text-lg mb-2">
                {dict['service.process.step3']}
              </h3>
              <p className="text-sm text-muted-foreground">
                {dict['service.process.step3_desc']}
              </p>
            </div>
            <div className="relative text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                4
              </div>
              <h3 className="font-bold text-lg mb-2">
                {dict['service.process.step4']}
              </h3>
              <p className="text-sm text-muted-foreground">
                {dict['service.process.step4_desc']}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
