'use client';

import { Button } from '@/components/ui/button';
import { Globe, Menu } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export function Header() {
  const { t, language, setLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Strip the language prefix for route matching
  const routePath = pathname.replace(/^\/(zh|en)/, '') || '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerClass = `fixed top-4 left-4 right-4 z-50 transition-all duration-500 rounded-full ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-3 px-6 border border-white/20' : 'bg-transparent py-4 px-6'}`;

  const navItems = [
    { href: '/products', label: t('nav.products'), match: (p: string) => p.startsWith('/products') },
    { href: '/projects', label: t('nav.cases'), match: (p: string) => p === '/projects' },
    { href: '/certifications', label: t('nav.advantages'), match: (p: string) => p === '/certifications' },
    { href: '/service', label: t('nav.service'), match: (p: string) => p === '/service' },
    { href: '/about', label: t('nav.about'), match: (p: string) => p === '/about' },
    { href: '/contact', label: t('nav.contact'), match: (p: string) => p === '/contact' },
  ];

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={`/${language}${item.href}`}
          onClick={() => mobile && setIsOpen(false)}
          className={`text-sm font-medium uppercase tracking-wide transition-colors ${item.match(routePath) ? 'text-primary' : 'text-foreground/80 hover:text-primary'} ${mobile ? 'text-2xl py-2' : ''}`}
        >
          {item.label}
        </Link>
      ))}
    </>
  );

  return (
    <header className={headerClass}>
      <div className="flex items-center justify-between max-w-[1400px] mx-auto w-full">
        <Link href={`/${language}`}>
          <div className="flex items-center gap-2 cursor-pointer">
            <img
              src="/images/logo.svg"
              alt="Shunfeng Logo"
              className="h-16 w-auto object-contain"
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          <NavLinks />
        </nav>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
            className="text-foreground hover:bg-secondary hover:text-secondary-foreground font-medium rounded-full"
          >
            <Globe className="w-4 h-4 mr-2" />
            {language === 'zh' ? '中文' : 'EN'}
          </Button>
          <Button
            size="sm"
            className="hidden md:flex rounded-full px-6 bg-primary hover:bg-primary/90 text-white font-medium shadow-lg shadow-primary/20 transition-all hover:scale-105"
            asChild
          >
            <Link href={`/${language}/contact`}>{t('hero.cta')}</Link>
          </Button>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-foreground">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full sm:w-[400px] bg-background border-l border-border"
            >
              <nav className="flex flex-col gap-6 mt-12 px-4">
                <NavLinks mobile />
                <Button
                  className="mt-8 rounded-full w-full h-14 text-lg bg-primary text-white font-medium"
                  asChild
                  onClick={() => setIsOpen(false)}
                >
                  <Link href={`/${language}/contact`}>{t('hero.cta')}</Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
