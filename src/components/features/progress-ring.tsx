'use client';

import { Card, CardContent } from '@/components/ui/card';

interface ProgressRingProps {
  percentage: number;
}

export function ProgressRing({ percentage }: ProgressRingProps) {
  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - percentage / 100);

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
      <CardContent className="p-6 md:p-8 flex flex-col items-center justify-center gradient-bg-subtle">
        <div className="relative w-36 h-36 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="oklch(0.6 0.25 270)" />
                <stop offset="100%" stopColor="oklch(0.55 0.22 320)" />
              </linearGradient>
            </defs>
            <circle
              cx="72"
              cy="72"
              r={radius}
              stroke="currentColor"
              strokeWidth="10"
              fill="transparent"
              className="text-muted/30"
            />
            <circle
              cx="72"
              cy="72"
              r={radius}
              stroke="url(#progressGradient)"
              strokeWidth="10"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000 ease-out drop-shadow-lg"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-3xl font-extrabold tracking-tighter gradient-text-primary">
              {percentage}%
            </span>
            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mt-1">
              Interview Rate
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
