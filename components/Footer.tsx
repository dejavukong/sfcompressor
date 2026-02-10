'use client';

import { MapPin, Phone, Mail } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export function Footer() {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-muted/50 border-t border-border pt-16 pb-8">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <img src="/images/logo-transparent.png" alt="Shunfeng Logo" className="h-14 w-auto object-contain" />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t('footer.desc')}
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-4 text-foreground">{t('footer.quick_links')}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href={`/${language}/products`} className="hover:text-primary transition-colors">{t('nav.products')}</Link></li>
              <li><Link href={`/${language}/projects`} className="hover:text-primary transition-colors">{t('nav.cases')}</Link></li>
              <li><Link href={`/${language}/service`} className="hover:text-primary transition-colors">{t('nav.service')}</Link></li>
              <li><Link href={`/${language}/about`} className="hover:text-primary transition-colors">{t('nav.about')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4 text-foreground">{t('footer.contact_info')}</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                {t('footer.address')}
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                +86 025-52415588
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                nyxs@njysj.com
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
}
