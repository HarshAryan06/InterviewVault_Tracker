'use client';

import { useEffect, useState, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { DashboardStats } from '@/types';
import { FileText, Clock, Users, Trophy } from 'lucide-react';

interface StatsSectionProps {
  stats: DashboardStats;
}

const statConfig = [
  { key: 'total', label: 'Total Apps', icon: FileText, gradient: 'from-orange-500 to-amber-500', color: 'text-orange-500' },
  { key: 'pending', label: 'Pending', icon: Clock, gradient: 'from-amber-500 to-yellow-500', color: 'text-amber-500' },
  { key: 'interviews', label: 'Interviews', icon: Users, gradient: 'from-blue-500 to-cyan-500', color: 'text-blue-500' },
  { key: 'offers', label: 'Offers', icon: Trophy, gradient: 'from-emerald-500 to-green-500', color: 'text-emerald-500' },
] as const;

function AnimatedNumber({ value, delay = 0 }: { value: number; delay?: number }) {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (hasAnimated) return;
    
    const timer = setTimeout(() => {
      setHasAnimated(true);
      
      if (value === 0) {
        setDisplayValue(0);
        return;
      }

      const duration = 1200;
      const startTime = performance.now();
      
      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Smooth easeOutExpo curve
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const current = Math.round(eased * value);
        
        setDisplayValue(current);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay, hasAnimated]);

  return <span ref={ref}>{displayValue}</span>;
}

export function StatsSection({ stats }: StatsSectionProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {statConfig.map((stat, index) => {
        const Icon = stat.icon;
        const value = stats[stat.key];
        
        return (
          <Card 
            key={stat.key} 
            className="group overflow-hidden border-border/50 card-hover stats-card animate-fade-in-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardContent className="p-0 relative">
              {/* Background gradient on hover */}
              <div 
                className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-[0.08] transition-opacity duration-500`} 
              />
              
              <div className="flex items-start justify-between p-5 relative">
                <div className="flex flex-col gap-1">
                  <span className="text-muted-foreground text-[10px] font-bold uppercase tracking-wider">
                    {stat.label}
                  </span>
                  <span className={`text-4xl font-extrabold tracking-tight leading-none mt-2 ${stat.color}`}>
                    <AnimatedNumber value={value} delay={200 + index * 100} />
                  </span>
                </div>
                <div 
                  className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg transition-transform duration-500 ease-out group-hover:scale-110`}
                >
                  <Icon className="h-5 w-5 text-white" />
                </div>
              </div>
              
              {/* Bottom accent line */}
              <div 
                className={`h-1 bg-gradient-to-r ${stat.gradient} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out`} 
              />
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
