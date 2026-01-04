'use client';

import { useTheme } from 'next-themes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { PieChart, Briefcase, Plus, Search, Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', icon: PieChart, label: 'Home' },
  { href: '/applications', icon: Briefcase, label: 'Apps' },
  { href: '/add', icon: Plus, label: 'Add', isMain: true },
  { href: '/applications?focus=search', icon: Search, label: 'Search' },
];

export function MobileNav() {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 pt-2 bg-gradient-to-t from-background via-background/95 to-transparent pointer-events-none">
      <div className="bg-card/90 backdrop-blur-xl h-16 rounded-2xl grid grid-cols-5 items-stretch shadow-2xl border border-border overflow-visible px-2 pointer-events-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          if (item.isMain) {
            return (
              <div key={item.href} className="flex flex-col items-center justify-center relative h-full">
                <Link href={item.href} className="flex flex-col items-center justify-center relative z-10">
                  <div className="w-12 h-12 gradient-bg rounded-full flex items-center justify-center shadow-lg glow-primary active:scale-90 transition-all border-4 border-background -mt-8 mb-1">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wide">
                    {item.label}
                  </span>
                </Link>
              </div>
            );
          }
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center gap-1 transition-all h-full rounded-xl',
                isActive ? 'text-primary gradient-bg-subtle' : 'text-muted-foreground'
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-[9px] font-bold uppercase tracking-wide">
                {item.label}
              </span>
            </Link>
          );
        })}
        
        <Button
          variant="ghost"
          size="sm"
          className="flex flex-col items-center justify-center gap-1 h-full text-muted-foreground hover:bg-accent rounded-xl"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {mounted ? (
            <>
              {theme === 'dark' ? (
                <Sun className="h-5 w-5 text-yellow-400" />
              ) : (
                <Moon className="h-5 w-5 text-primary" />
              )}
              <span className="text-[9px] font-bold uppercase tracking-wide">
                {theme === 'dark' ? 'Light' : 'Dark'}
              </span>
            </>
          ) : (
            <>
              <Sun className="h-5 w-5" />
              <span className="text-[9px] font-bold uppercase tracking-wide">
                Theme
              </span>
            </>
          )}
        </Button>
      </div>
    </nav>
  );
}
