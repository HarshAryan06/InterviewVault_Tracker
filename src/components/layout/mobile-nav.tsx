'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Briefcase, Plus, Sun, Moon } from 'lucide-react';
import { cn } from '@/utils';
import HomeIcon from '@/components/ui/home-icon';
import MagnifierIcon from '@/components/ui/magnifier-icon';
import { AnimatedIconHandle } from '@/components/ui/types';

type NavItem = {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  isMain?: boolean;
};

type NavItemWithAnimationProps = {
  href: string;
  isActive: boolean;
  Icon: React.ComponentType<{ className?: string; ref?: React.Ref<AnimatedIconHandle> }>;
  label: string;
  isAnimated: boolean;
};

function NavItemWithAnimation({ href, isActive, Icon, label, isAnimated }: NavItemWithAnimationProps) {
  const iconRef = useRef<AnimatedIconHandle>(null);

  const handleMouseEnter = () => {
    if (isAnimated && iconRef.current) {
      iconRef.current.startAnimation();
    }
  };

  const handleMouseLeave = () => {
    if (isAnimated && iconRef.current) {
      iconRef.current.stopAnimation();
    }
  };

  return (
    <Link
      href={href}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'flex flex-col items-center justify-center gap-0.5 h-full rounded-xl pointer-events-auto group transition-all duration-300 ease-out',
        isActive 
          ? 'text-primary bg-primary/10 scale-105 shadow-sm' 
          : 'text-muted-foreground hover:text-foreground hover:bg-accent/60 active:scale-95 active:bg-accent/70'
      )}
    >
      {isAnimated ? (
        <Icon 
          ref={iconRef}
          className="h-4 w-4" 
        />
      ) : (
        <Icon className={cn(
          'h-4 w-4 transition-all duration-300',
          isActive 
            ? 'scale-110' 
            : 'group-hover:scale-110 group-hover:rotate-6'
        )} />
      )}
      <span className={cn(
        'text-[8px] font-semibold uppercase tracking-tight transition-all duration-300',
        isActive && 'scale-105'
      )}>
        {label}
      </span>
    </Link>
  );
}

const navItems: NavItem[] = [
  { href: '/', icon: HomeIcon, label: 'Home' },
  { href: '/applications', icon: Briefcase, label: 'Jobs' },
  { href: '/add', icon: Plus, label: 'Add', isMain: true },
  { href: '/search', icon: MagnifierIcon, label: 'Search' },
];

export function MobileNav() {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // SSR mounting pattern - use setTimeout to avoid synchronous setState
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 px-3 pb-3 pt-1.5 bg-gradient-to-t from-background via-background/95 to-transparent pointer-events-none">
      <div className="relative bg-white dark:bg-card/95 backdrop-blur-xl h-14 shadow-lg dark:shadow-2xl border border-border/60 dark:border-border overflow-visible pointer-events-auto rounded-3xl">
        {/* Curved cut-out overlay - light mode */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-5 pointer-events-none z-1 dark:hidden"
          style={{
            background: 'radial-gradient(ellipse 28px 10px at 50% 0%, transparent 70%, #ffffff 70%)',
          }}
        />
        {/* Curved cut-out overlay - dark mode */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-5 pointer-events-none z-1 hidden dark:block"
          style={{
            background: 'radial-gradient(ellipse 28px 10px at 50% 0%, transparent 70%, hsl(var(--card)) 70%)',
          }}
        />
        
        {/* Navigation items container */}
        <div className="relative grid grid-cols-5 items-stretch h-full px-2.5 py-2" style={{ zIndex: 10 }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const href = item.href;
          
          // Handle main button
          if (item.isMain) {
            return (
              <Link
                key={href}
                href={href}
                className="flex flex-col items-center justify-center relative h-full z-10 group"
              >
                <div className="relative w-10 h-10 gradient-bg rounded-full flex items-center justify-center shadow-lg glow-primary border-[3px] border-background -mt-7 mb-0.5 pointer-events-auto transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-115 hover:shadow-2xl hover:shadow-primary/60 active:scale-105 active:transition-all active:duration-200 group-hover:-rotate-12">
                  {/* Subtle pulsing glow effect on hover */}
                  <div className="absolute inset-0 rounded-full bg-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
                  
                  <Icon className="relative z-10 h-4 w-4 text-white transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-110 group-hover:rotate-90 group-active:scale-100 group-active:rotate-0" />
                </div>
                <span className="text-[8px] font-semibold text-muted-foreground uppercase tracking-tight transition-all duration-300 group-hover:text-primary group-hover:scale-105">
                  {item.label}
                </span>
              </Link>
            );
          }
          
          // Handle regular nav items
          const itemPath = href.split('?')[0];
          const isActive = pathname === itemPath || pathname === href;
          
          // Check if icon is animated (has startAnimation method)
          const isAnimatedIcon = Icon === HomeIcon || Icon === MagnifierIcon;
          
          return (
            <NavItemWithAnimation
              key={href}
              href={href}
              isActive={isActive}
              Icon={Icon}
              label={item.label}
              isAnimated={isAnimatedIcon}
            />
          );
        })}
        
        <Button
          variant="ghost"
          size="sm"
          className="flex flex-col items-center justify-center gap-0.5 h-full text-muted-foreground hover:bg-accent/60 rounded-xl pointer-events-auto group transition-all duration-300 ease-out hover:text-foreground active:scale-95 active:bg-accent/70"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {mounted ? (
            <>
              {theme === 'dark' ? (
                <Sun className="h-4 w-4 text-amber-400 transition-all duration-500 group-hover:scale-110 group-hover:rotate-180 group-active:scale-95" />
              ) : (
                <Moon className="h-4 w-4 text-primary transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 group-active:scale-95" />
              )}
              <span className="text-[8px] font-semibold uppercase tracking-tight transition-all duration-300 group-hover:scale-105">
                {theme === 'dark' ? 'Light' : 'Dark'}
              </span>
            </>
          ) : (
            <>
              <Sun className="h-4 w-4 transition-all duration-300 group-hover:scale-110" />
              <span className="text-[8px] font-semibold uppercase tracking-tight transition-all duration-300 group-hover:scale-105">
                Theme
              </span>
            </>
          )}
        </Button>
        </div>
      </div>
    </nav>
  );
}
