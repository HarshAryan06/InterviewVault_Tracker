'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { StatsSection } from '@/components/features/stats-section';
import { StatusBadge } from '@/components/features/status-badge';
import { ProgressRing } from '@/components/features/progress-ring';
import { useApplications } from '@/hooks';
import { calculateStats, calculateProgressPercentage } from '@/lib/stats';
import { 
  Briefcase, 
  FileText, 
  ChevronRight, 
  Plus, 
  ArrowRight, 
  Sparkles,
  TrendingUp,
  Target,
  Calendar,
  Zap
} from 'lucide-react';

export default function DashboardPage() {
  const { applications, isLoaded } = useApplications();
  
  const stats = useMemo(() => calculateStats(applications), [applications]);
  const progressPercentage = useMemo(() => calculateProgressPercentage(stats), [stats]);
  const uniqueResumes = useMemo(
    () => Array.from(new Set(applications.map(a => a.resumeName))).slice(0, 3),
    [applications]
  );

  const thisWeekApps = useMemo(() => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return applications.filter(app => new Date(app.dateApplied) >= oneWeekAgo).length;
  }, [applications]);

  const responseRate = useMemo(() => {
    if (applications.length === 0) return 0;
    const responded = applications.filter(app => 
      app.status !== 'Applied' && app.status !== 'Pending'
    ).length;
    return Math.round((responded / applications.length) * 100);
  }, [applications]);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-3 border-primary/20 border-t-primary animate-spin" />
          <p className="text-muted-foreground font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="space-y-5">
          <div className="animate-fade-in">
            <Badge variant="secondary" className="gradient-bg-subtle border-0 text-xs font-semibold px-3 py-1.5">
              <Sparkles className="h-3 w-3 mr-1.5" />
              Track Your Career
            </Badge>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.1] animate-fade-in-up stagger-1">
            <span className="gradient-text-primary">Track Every</span>
            <br />
            <span className="text-foreground">Application.</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-md font-medium leading-relaxed animate-fade-in-up stagger-2">
            Keep track of all the companies you've applied to. Never lose track of your job search progress.
          </p>
          <div className="flex flex-wrap gap-4 pt-2 animate-fade-in-up stagger-3">
            <Link href="/add">
              <Button variant="gradient" size="lg" className="gap-2 group">
                <Plus className="h-5 w-5 transition-transform duration-300 group-hover:rotate-90" />
                Add Application
              </Button>
            </Link>
            <Link href="/applications">
              <Button variant="outline" size="lg" className="gap-2 group">
                View All
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="md:w-72 animate-scale-in stagger-2">
          <ProgressRing percentage={progressPercentage} />
        </div>
      </div>

      {/* Quick Stats Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: Zap, value: thisWeekApps, label: 'This Week', color: 'from-orange-500 to-amber-500', textColor: 'stats-number' },
          { icon: TrendingUp, value: `${responseRate}%`, label: 'Response Rate', color: 'from-emerald-500 to-green-500', textColor: 'text-emerald-500' },
          { icon: Target, value: stats.interviews, label: 'Interviews', color: 'from-blue-500 to-cyan-500', textColor: 'text-blue-500' },
          { icon: Calendar, value: applications.length, label: 'Total Apps', color: 'from-purple-500 to-pink-500', textColor: 'text-purple-500' },
        ].map((stat, index) => (
          <Card 
            key={stat.label} 
            className="card-hover overflow-hidden group animate-fade-in-up"
            style={{ animationDelay: `${0.3 + index * 0.1}s` }}
          >
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg transition-transform duration-500 ease-out group-hover:scale-110`}>
                <stat.icon className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className={`text-2xl font-bold ${stat.textColor}`}>{stat.value}</p>
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Stats Section */}
      <div className="animate-fade-in-up stagger-4">
        <StatsSection stats={stats} />
      </div>

      <Separator className="my-8 opacity-50" />

      {/* Recent Applications & Resumes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="overflow-hidden animate-fade-in-left stagger-5 card-hover">
          <CardHeader className="flex flex-row items-center justify-between p-5 pb-4 gradient-bg-subtle border-b border-border/50">
            <CardTitle className="text-[13px] font-bold uppercase tracking-wider flex items-center gap-2 m-0 leading-none">
              <Briefcase className="h-4 w-4 text-primary" />
              Recent Applications
            </CardTitle>
            <Link href="/applications">
              <Button variant="link" size="sm" className="h-auto p-0 text-xs font-bold group">
                View All 
                <ArrowRight className="h-3 w-3 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="p-5 space-y-3">
            {applications.slice(0, 3).map((app, index) => (
              <Link key={app.id} href={`/applications/${app.id}`}>
                <div 
                  className="flex items-center justify-between p-3 rounded-xl border border-border hover:border-primary/30 hover:gradient-bg-subtle cursor-pointer transition-all duration-300 ease-out group"
                  style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 gradient-bg-subtle rounded-lg flex items-center justify-center transition-all duration-500 ease-out group-hover:bg-gradient-to-br group-hover:from-orange-500 group-hover:to-amber-500 group-hover:scale-105">
                      <Briefcase className="h-4 w-4 text-primary transition-colors duration-300 group-hover:text-white" />
                    </div>
                    <div className="max-w-[140px]">
                      <p className="text-sm font-semibold truncate transition-colors duration-300 group-hover:text-primary">{app.companyName}</p>
                      <p className="text-xs text-muted-foreground font-medium truncate">
                        {app.role}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={app.status} size="sm" />
                    <ChevronRight className="h-4 w-4 text-muted-foreground transition-all duration-300 group-hover:text-primary group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
            {applications.length === 0 && (
              <div className="text-center py-10 gradient-bg-subtle rounded-xl border border-dashed border-border/50">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl gradient-bg-subtle flex items-center justify-center">
                  <Briefcase className="h-8 w-8 text-muted-foreground/50" />
                </div>
                <p className="text-sm text-muted-foreground font-medium">
                  No Applications Yet
                </p>
                <Link href="/add">
                  <Button variant="link" size="sm" className="mt-2 group">
                    Add your first application 
                    <ArrowRight className="h-3 w-3 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="overflow-hidden animate-fade-in-right stagger-5 card-hover">
          <CardHeader className="p-5 pb-4 gradient-bg-subtle border-b border-border/50">
            <CardTitle className="text-[13px] font-bold uppercase tracking-wider flex items-center gap-2 m-0 leading-none">
              <FileText className="h-4 w-4 text-rose-500" />
              Active Resumes
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5 space-y-3">
            {uniqueResumes.map((name, index) => (
              <div 
                key={name} 
                className="flex items-center justify-between p-3 rounded-xl border border-border hover:gradient-bg-subtle hover:border-rose-500/30 transition-all duration-300 ease-out group"
                style={{ animationDelay: `${0.6 + index * 0.1}s` }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-rose-500/10 rounded-lg flex items-center justify-center transition-all duration-500 ease-out group-hover:bg-rose-500 group-hover:scale-105">
                    <FileText className="h-4 w-4 text-rose-500 transition-colors duration-300 group-hover:text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-tight transition-colors duration-300 group-hover:text-rose-500">{name}</p>
                    <p className="text-xs text-muted-foreground font-medium">
                      Used in {applications.filter(a => a.resumeName === name).length} apps
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground transition-all duration-300 group-hover:text-rose-500 group-hover:translate-x-1" />
              </div>
            ))}
            {applications.length === 0 && (
              <div className="text-center py-10 gradient-bg-subtle rounded-xl border border-dashed border-border/50">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-rose-500/10 flex items-center justify-center">
                  <FileText className="h-8 w-8 text-muted-foreground/50" />
                </div>
                <p className="text-sm text-muted-foreground font-medium">
                  No Resumes Logged
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
