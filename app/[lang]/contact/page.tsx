'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail } from 'lucide-react';
import { useState, useEffect, useTransition, Suspense } from 'react';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSearchParams } from 'next/navigation';
import { sendInquiry } from '@/lib/actions';

export default function ContactPage() {
  return (
    <Suspense>
      <Contact />
    </Suspense>
  );
}

function Contact() {
  const { t, language } = useLanguage();
  const [inquiryType, setInquiryType] = useState('');
  const searchParams = useSearchParams();
  const productInterest = searchParams.get('product');
  const categoryParam = searchParams.get('category');

  const [requirements, setRequirements] = useState('');
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (productInterest) {
      setRequirements(`我对 ${productInterest} 很感兴趣！\n\n`);
    }

    if (categoryParam) {
      if (categoryParam === 'marine') {
        setInquiryType('marine');
      } else if (categoryParam === 'industrial') {
        setInquiryType('process');
      } else if (categoryParam === 'parts') {
        setInquiryType('parts');
      }
    }
  }, [productInterest, categoryParam]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = {
      company: (formData.get('company') as string) || undefined,
      name: (formData.get('name') as string) || undefined,
      email: formData.get('email') as string,
      phone: (formData.get('phone') as string) || undefined,
      type: inquiryType || undefined,
      requirements: requirements,
      productInterest: productInterest || undefined,
    };

    const form = e.currentTarget;

    startTransition(async () => {
      const result = await sendInquiry(data);
      if (result.success) {
        toast.success(t('contact.form.success'), {
          description: t('contact.form.success_desc'),
        });
        form.reset();
        setInquiryType('');
        setRequirements('');
      } else {
        toast.error('Failed to send inquiry', {
          description: result.error,
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-primary/5">
        <div className="container relative z-10 text-center max-w-4xl mx-auto px-4">
          <Badge
            variant="outline"
            className="mb-4 border-primary/20 text-primary bg-primary/5 backdrop-blur-sm"
          >
            CONTACT US
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-foreground">
            {t('contact.title')}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>
      </section>

      <section className="py-20 container">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold mb-6">{t('contact.info_title')}</h2>

            <Card className="bg-muted/30 border-none">
              <CardContent className="flex gap-4 p-6">
                <MapPin className="w-6 h-6 text-primary shrink-0" />
                <div>
                  <h3 className="font-bold mb-2">{t('contact.address_title')}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t('contact.address_detail')}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-muted/30 border-none">
              <CardContent className="flex gap-4 p-6">
                <Phone className="w-6 h-6 text-primary shrink-0" />
                <div>
                  <h3 className="font-bold mb-2">{t('contact.phone_title')}</h3>
                  <p className="text-sm text-muted-foreground">
                    +86 025-52415588
                    <br />
                    <span className="text-xs opacity-70">
                      {t('contact.phone_service')}
                    </span>
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-muted/30 border-none">
              <CardContent className="flex gap-4 p-6">
                <Mail className="w-6 h-6 text-primary shrink-0" />
                <div>
                  <h3 className="font-bold mb-2">{t('contact.email_title')}</h3>
                  <p className="text-sm text-muted-foreground">nyxs@njysj.com</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-2">
                  {t('contact.form_title')}
                </h2>
                <p className="text-muted-foreground mb-8">
                  {t('contact.form_desc')}
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="company">
                        {t('contact.form.company')}
                      </Label>
                      <Input
                        name="company"
                        id="company"
                        placeholder={t('contact.form.company_placeholder')}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="name">{t('contact.form.name')}</Label>
                      <Input
                        name="name"
                        id="name"
                        placeholder={t('contact.form.name_placeholder')}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">
                        {t('contact.form.email')} *
                      </Label>
                      <Input
                        name="email"
                        id="email"
                        type="email"
                        placeholder="example@company.com"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">{t('contact.form.phone')}</Label>
                      <Input
                        name="phone"
                        id="phone"
                        type="tel"
                        placeholder="+86 XXX XXXX XXXX"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="type">{t('contact.form.type')}</Label>
                    <Select value={inquiryType} onValueChange={setInquiryType}>
                      <SelectTrigger className="bg-background border-input text-foreground">
                        <SelectValue
                          placeholder={t('contact.form.type_placeholder')}
                        />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border-border text-popover-foreground shadow-md">
                        <SelectItem
                          value="marine"
                          className="focus:bg-accent focus:text-accent-foreground cursor-pointer"
                        >
                          {t('contact.form.type.marine')}
                        </SelectItem>
                        <SelectItem
                          value="parts"
                          className="focus:bg-accent focus:text-accent-foreground cursor-pointer"
                        >
                          {t('contact.form.type.parts')}
                        </SelectItem>
                        <SelectItem
                          value="process"
                          className="focus:bg-accent focus:text-accent-foreground cursor-pointer"
                        >
                          {t('contact.form.type.process')}
                        </SelectItem>
                        <SelectItem
                          value="service"
                          className="focus:bg-accent focus:text-accent-foreground cursor-pointer"
                        >
                          {t('contact.form.type.service')}
                        </SelectItem>
                        <SelectItem
                          value="other"
                          className="focus:bg-accent focus:text-accent-foreground cursor-pointer"
                        >
                          {t('contact.form.type.other')}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="requirements">
                      {t('contact.form.requirements')} *
                    </Label>
                    <Textarea
                      id="requirements"
                      placeholder={t('contact.form.requirements_placeholder')}
                      className="min-h-[150px]"
                      value={requirements}
                      onChange={(e) => setRequirements(e.target.value)}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full md:w-auto"
                    disabled={isPending}
                  >
                    {isPending
                      ? t('contact.form.submitting')
                      : t('contact.form.submit')}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 container">
        <h2 className="text-4xl md:text-5xl font-light mb-8 text-center">
          {t('contact.map.title')}
        </h2>
        <div className="w-full max-w-3xl mx-auto aspect-[3/2] rounded-3xl overflow-hidden shadow-xl">
          {language === 'zh' ? (
            <iframe
              src="https://uri.amap.com/marker?position=118.862,31.743&name=江苏省南京市江宁区空港工业园博爱路12号&src=shunfeng&coordinate=gaode&callnative=1"
              width="100%"
              height="100%"
              frameBorder="0"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          ) : (
            <iframe
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=No.12+Boai+Road,+Airport+Industrial+Park,+Jiangning+District,+Nanjing,+Jiangsu,+China&center=31.743,118.862&zoom=15&language=en`}
              width="100%"
              height="100%"
              frameBorder="0"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          )}
        </div>
      </section>
    </div>
  );
}
