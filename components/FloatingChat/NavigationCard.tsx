import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { NavigationItem } from './useChat';

interface NavigationCardProps {
  items: NavigationItem[];
  language: 'zh' | 'en';
  onNavigate?: () => void;
}

export function NavigationCard({ items, language, onNavigate }: NavigationCardProps) {
  const router = useRouter();

  if (items.length === 0) return null;

  const handleClick = (route: string) => {
    // Routes from chat service may not have language prefix — ensure it's present
    const prefixedRoute = route.startsWith(`/${language}`) ? route : `/${language}${route}`;
    router.push(prefixedRoute);
    onNavigate?.();
  };

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {items.map((item, index) => (
        <button
          key={`${item.route}-${index}`}
          onClick={() => handleClick(item.route)}
          className="inline-flex items-center gap-1.5 rounded-lg border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/10 hover:border-primary/30"
        >
          {language === 'zh' ? item.label_zh : item.label_en}
          <ArrowRight className="size-3" />
        </button>
      ))}
    </div>
  );
}
