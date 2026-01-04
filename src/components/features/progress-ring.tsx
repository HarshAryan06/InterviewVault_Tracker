'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

interface ProgressRingProps {
  percentage: number;
}

export function ProgressRing({ percentage }: ProgressRingProps) {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  
  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - animatedPercentage / 100);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    
    if (percentage === 0) {
      setAnimatedPercentage(0);
      return;
    }

    const duration = 1500;
    const startTime = performance.now();
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Smooth easeOutExpo curve
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.round(eased * percentage);
      
      setAnimatedPercentage(current);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [percentage, isVisible]);

  return (
    <Card className="overflow-hidden card-hover group">
      <CardContent className="p-6 md:p-8 flex flex-col items-center justify-center gradient-bg-subtle relative">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-gradient-to-br from-orange-500/20 to-amber-500/20 blur-2xl" />
          <div className="absolute bottom-4 left-4 w-16 h-16 rounded-full bg-gradient-to-br from-amber-500/20 to-yellow-500/20 blur-2xl" />
        </div>
        
        <div className="relative w-40 h-40 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" style={{ transform: 'rotate(-90deg)' }}>
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f97316" />
                <stop offset="50%" stopColor="#fb923c" />
                <stop offset="100%" stopColor="#fbbf24" />
              </linearGradient>
            </defs>
            
            {/* Background circle */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-muted/20"
            />
            
            {/* Animated progress circle */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke="url(#progressGradient)"
              strokeWidth="10"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              style={{
                transition: 'stroke-dashoffset 0.1s ease-out',
                filter: 'drop-shadow(0 0 6px rgba(249, 115, 22, 0.4))',
              }}
            />
          </svg>
          
          {/* Center content */}
          <div className="absolute flex flex-col items-center">
            <div className="flex items-center gap-1 mb-1">
              <TrendingUp className="h-4 w-4 text-primary" />
            </div>
            <span className="text-4xl font-extrabold tracking-tighter stats-number">
              {animatedPercentage}%
            </span>
            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mt-1">
              Interview Rate
            </span>
          </div>
        </div>
        
        {/* Bottom label */}
        <div className="mt-4 text-center">
          <p className="text-xs text-muted-foreground font-medium">
            {percentage > 0 
              ? `You're doing great! Keep applying.`
              : `Start applying to see your progress`
            }
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
