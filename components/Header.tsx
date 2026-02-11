'use client';

import { Button } from '@/components/ui/button';
import { Menu, Ship, Factory, Wrench } from 'lucide-react';
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

  const productSubItems = [
    {
      href: '/products/marine',
      label: language === 'zh' ? '船用压缩机' : 'Marine Compressor',
      icon: Ship,
    },
    {
      href: '/products/industrial',
      label: language === 'zh' ? '工艺压缩机' : 'Process Compressor',
      icon: Factory,
    },
    {
      href: '/products/parts',
      label: language === 'zh' ? '压力容器及配件' : 'Vessels & Parts',
      icon: Wrench,
    },
  ];

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      {navItems.map((item) => {
        const isProducts = item.href === '/products';
        const isActive = item.match(routePath);

        if (isProducts && !mobile) {
          return (
            <div key={item.href} className="relative group">
              <Link
                href={`/${language}${item.href}`}
                className={`text-sm font-medium uppercase tracking-wide transition-colors ${isActive ? 'text-primary' : 'text-foreground/80 hover:text-primary'}`}
              >
                {item.label}
              </Link>
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-border/50 p-3 min-w-[220px]">
                  {productSubItems.map((sub) => {
                    const Icon = sub.icon;
                    return (
                      <Link
                        key={sub.href}
                        href={`/${language}${sub.href}`}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary/5 transition-colors"
                      >
                        <Icon className="w-4 h-4" />
                        {sub.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        }

        if (isProducts && mobile) {
          return (
            <div key={item.href}>
              <Link
                href={`/${language}${item.href}`}
                onClick={() => setIsOpen(false)}
                className={`text-2xl py-2 text-sm font-medium uppercase tracking-wide transition-colors ${isActive ? 'text-primary' : 'text-foreground/80 hover:text-primary'}`}
              >
                {item.label}
              </Link>
              <div className="pl-4 mt-2 space-y-2">
                {productSubItems.map((sub) => {
                  const Icon = sub.icon;
                  return (
                    <Link
                      key={sub.href}
                      href={`/${language}${sub.href}`}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 py-1.5 text-lg text-foreground/60 hover:text-primary transition-colors"
                    >
                      <Icon className="w-4 h-4" />
                      {sub.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        }

        return (
          <Link
            key={item.href}
            href={`/${language}${item.href}`}
            onClick={() => mobile && setIsOpen(false)}
            className={`text-sm font-medium uppercase tracking-wide transition-colors ${isActive ? 'text-primary' : 'text-foreground/80 hover:text-primary'} ${mobile ? 'text-2xl py-2' : ''}`}
          >
            {item.label}
          </Link>
        );
      })}
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
          <div className="flex items-center gap-1 text-sm font-medium">
            <button
              onClick={() => setLanguage('zh')}
              className={`px-2 py-1 rounded-full transition-colors ${language === 'zh' ? 'text-primary font-semibold' : 'text-foreground/50 hover:text-foreground/80'}`}
            >
              中文
            </button>
            <span className="text-foreground/30">|</span>
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-1 rounded-full transition-colors ${language === 'en' ? 'text-primary font-semibold' : 'text-foreground/50 hover:text-foreground/80'}`}
            >
              EN
            </button>
          </div>
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
