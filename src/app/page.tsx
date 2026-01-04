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
import { Briefcase, FileText, ChevronRight, Plus, ArrowRight, Sparkles } from 'lucide-react';

export default function DashboardPage() {
  const { applications, isLoaded } = useApplications();
  
  const stats = useMemo(() => calculateStats(applications), [applications]);
  const progressPercentage = useMemo(() => calculateProgressPercentage(stats), [stats]);
  const uniqueResumes = useMemo(
    () => Array.from(new Set(applications.map(a => a.resumeName))).slice(0, 3),
    [applications]
  );

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500 space-y-10">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="space-y-5">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="gradient-bg-subtle border-0 text-xs font-semibold px-3 py-1">
              <Sparkles className="h-3 w-3 mr-1.5" />
              Track Your Career
            </Badge>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.1]">
            <span className="gradient-text-primary">Track Every</span>
            <br />
            <span className="text-foreground">Application.</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-md font-medium leading-relaxed">
            Keep track of all the companies you've applied to. Never lose track of your job search progress.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link href="/add">
              <Button variant="gradient" size="lg" className="gap-2">
                <Plus className="h-5 w-5" />
                Add Application
              </Button>
            </Link>
            <Link href="/applications">
              <Button variant="outline" size="lg" className="gap-2">
                View All
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="md:w-72">
          <ProgressRing percentage={progressPercentage} />
        </div>
      </div>

      {/* Stats Section */}
      <StatsSection stats={stats} />

      <Separator className="my-8 opacity-50" />

      {/* Recent Applications & Resumes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between p-5 pb-4 gradient-bg-subtle border-b border-border/50">
            <CardTitle className="text-[13px] font-bold uppercase tracking-wider flex items-center gap-2 m-0 leading-none">
              <Briefcase className="h-4 w-4 text-primary" />
              Recent Applications
            </CardTitle>
            <Link href="/applications">
              <Button variant="link" size="sm" className="h-auto p-0 text-xs font-bold">
                View All →
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="p-5 space-y-3">
            {applications.slice(0, 3).map(app => (
              <Link key={app.id} href={`/applications/${app.id}`}>
                <div className="flex items-center justify-between p-3 rounded-xl border border-border hover:border-primary/30 hover:gradient-bg-subtle cursor-pointer transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 gradient-bg-subtle rounded-lg flex items-center justify-center group-hover:gradient-bg transition-all">
                      <Briefcase className="h-4 w-4 text-primary group-hover:text-white transition-colors" />
                    </div>
                    <div className="max-w-[140px]">
                      <p className="text-sm font-semibold truncate">{app.companyName}</p>
                      <p className="text-xs text-muted-foreground font-medium truncate">
                        {app.role}
                      </p>
                    </div>
                  </div>
                  <StatusBadge status={app.status} size="sm" />
                </div>
              </Link>
            ))}
            {applications.length === 0 && (
              <div className="text-center py-10 gradient-bg-subtle rounded-xl border border-dashed border-border/50">
                <Briefcase className="h-8 w-8 mx-auto text-muted-foreground/50 mb-3" />
                <p className="text-sm text-muted-foreground font-medium">
                  No Applications Yet
                </p>
                <Link href="/add">
                  <Button variant="link" size="sm" className="mt-2">
                    Add your first application →
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader className="p-5 pb-4 gradient-bg-subtle border-b border-border/50">
            <CardTitle className="text-[13px] font-bold uppercase tracking-wider flex items-center gap-2 m-0 leading-none">
              <FileText className="h-4 w-4 text-rose-500" />
              Active Resumes
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5 space-y-3">
            {uniqueResumes.map(name => (
              <div key={name} className="flex items-center justify-between p-3 rounded-xl border border-border hover:gradient-bg-subtle transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-rose-500/10 rounded-lg flex items-center justify-center">
                    <FileText className="h-4 w-4 text-rose-500" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-tight">{name}</p>
                    <p className="text-xs text-muted-foreground font-medium">
                      Used in {applications.filter(a => a.resumeName === name).length} apps
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            ))}
            {applications.length === 0 && (
              <div className="text-center py-10 gradient-bg-subtle rounded-xl border border-dashed border-border/50">
                <FileText className="h-8 w-8 mx-auto text-muted-foreground/50 mb-3" />
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
