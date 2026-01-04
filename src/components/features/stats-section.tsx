import { Card, CardContent } from '@/components/ui/card';
import { DashboardStats } from '@/types';
import { FileText, Clock, Users, Trophy } from 'lucide-react';

interface StatsSectionProps {
  stats: DashboardStats;
}

const statConfig = [
  { key: 'total', label: 'Total Apps', icon: FileText, gradient: 'from-violet-500 to-purple-600' },
  { key: 'pending', label: 'Pending', icon: Clock, gradient: 'from-amber-500 to-orange-600' },
  { key: 'interviews', label: 'Interviews', icon: Users, gradient: 'from-blue-500 to-cyan-600' },
  { key: 'offers', label: 'Offers', icon: Trophy, gradient: 'from-emerald-500 to-green-600' },
] as const;

export function StatsSection({ stats }: StatsSectionProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {statConfig.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card 
            key={stat.key} 
            className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden border-border/50"
          >
            <CardContent className="p-0 relative">
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity`} />
              <div className="flex items-start justify-between p-5">
                <div className="flex flex-col gap-1">
                  <span className="text-muted-foreground text-[10px] font-bold uppercase tracking-wider">
                    {stat.label}
                  </span>
                  <span className="text-3xl font-extrabold tracking-tight leading-none mt-1">
                    {stats[stat.key]}
                  </span>
                </div>
                <div className={`p-2.5 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg shadow-indigo-500/20`}>
                  <Icon className="h-4 w-4 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
