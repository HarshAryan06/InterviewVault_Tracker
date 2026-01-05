'use client';

import { useParams, useRouter } from 'next/navigation';
import { useMemo } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StatusBadge } from '@/components/features/status-badge';
import { useApplications } from '@/hooks';
import { ApplicationStatus } from '@/types';
import { applicationSelectors } from '@/selectors';
import { ChevronLeft, Trash2, Download, MapPin, Calendar, FileText, Briefcase, Info, History, FileCheck } from 'lucide-react';
import { toast } from 'sonner';

export default function ApplicationDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { applications, updateApplicationStatus, deleteApplication, isLoaded } = useApplications();
  
  // Safely extract id from params to avoid enumeration issues
  const appId = useMemo(() => {
    if (!params || !('id' in params)) return null;
    const id = params.id;
    return typeof id === 'string' ? id : Array.isArray(id) ? id[0] : null;
  }, [params]);
  
  const app = useMemo(
    () => appId ? applicationSelectors.byId(applications, appId) : undefined,
    [applications, appId]
  );

  const handleStatusUpdate = (newStatus: ApplicationStatus) => {
    if (app) {
      updateApplicationStatus(app.id, newStatus);
      toast.success(`Status updated to ${newStatus}`);
    }
  };

  const handleDelete = () => {
    if (app && window.confirm('Delete this application?')) {
      deleteApplication(app.id);
      toast.success('Application deleted');
      router.push('/applications');
    }
  };

  const handleDownload = () => {
    if (app?.resumeFile) {
      const link = document.createElement('a');
      link.href = app.resumeFile.data;
      link.download = app.resumeFile.name;
      link.click();
      toast.success('Resume downloaded');
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!app) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-muted-foreground font-medium">Application not found</p>
        <Link href="/applications">
          <Button variant="outline">Back to Applications</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500 space-y-8 max-w-4xl mx-auto">
      <header className="flex items-center justify-between">
        <Link href="/applications">
          <Button variant="outline" size="sm" className="gap-2">
            <ChevronLeft className="h-4 w-4" />
            Back to Applications
          </Button>
        </Link>
        <Button
          variant="outline"
          size="icon"
          className="text-destructive hover:bg-destructive/10 hover:border-destructive/30"
          onClick={handleDelete}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Main Info Card */}
          <Card className="overflow-hidden">
            <CardHeader className="gradient-bg-subtle border-b border-border/50 p-6 pb-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-12 gradient-bg rounded-xl flex items-center justify-center shadow-lg">
                    <Briefcase className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-extrabold tracking-tight leading-tight">{app.companyName}</h2>
                    <p className="text-sm font-semibold text-muted-foreground">{app.role}</p>
                  </div>
                </div>
                <StatusBadge status={app.status} size="lg" />
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="gradient-bg-subtle p-4 rounded-xl border border-border/50">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Applied On</span>
                  </div>
                  <p className="text-sm font-bold">{app.dateApplied}</p>
                </div>
                <div className="gradient-bg-subtle p-4 rounded-xl border border-border/50">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1.5">
                    <MapPin className="h-3.5 w-3.5" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Location</span>
                  </div>
                  <p className="text-sm font-bold">{app.location}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-primary">
                  <FileText className="h-4 w-4" />
                  <h4 className="text-[13px] font-bold uppercase tracking-wider">
                    Notes & Details
                  </h4>
                </div>
                <div className="gradient-bg-subtle p-5 rounded-2xl text-sm leading-relaxed border border-border/50 whitespace-pre-wrap min-h-[150px] text-foreground/90">
                  {app.jobDescription || "No notes or job description added."}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Status Update Card */}
          <Card className="overflow-hidden">
            <CardHeader className="p-5 pb-0">
              <CardTitle className="text-[13px] font-bold uppercase tracking-wider flex items-center gap-2 text-muted-foreground">
                <History className="h-4 w-4" />
                Update Status
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-4">
              <div className="flex flex-wrap gap-2">
                {Object.values(ApplicationStatus).map(status => (
                  <Button
                    key={status}
                    variant={app.status === status ? 'gradient' : 'outline'}
                    size="sm"
                    className="text-[11px]"
                    onClick={() => handleStatusUpdate(status)}
                  >
                    {status}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Resume Card */}
          <Card className="overflow-hidden">
            <CardHeader className="gradient-bg text-white p-5 pb-4 border-0">
              <CardTitle className="text-[13px] font-bold uppercase tracking-wider flex items-center gap-2">
                <FileCheck className="h-4 w-4" />
                Resume Version
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5">
              <div className="gradient-bg-subtle p-4 rounded-xl mb-4 border border-border/50">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">Version Name</p>
                <p className="text-sm font-bold text-foreground">{app.resumeName}</p>
              </div>
              {app.resumeFile ? (
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 h-auto py-3.5 px-4"
                  onClick={handleDownload}
                >
                  <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Download className="h-4.5 w-4.5 text-primary" />
                  </div>
                  <div className="text-left overflow-hidden">
                    <p className="text-xs font-bold leading-tight">Download PDF</p>
                    <p className="text-[10px] text-muted-foreground truncate mt-0.5">{app.resumeFile.name}</p>
                  </div>
                </Button>
              ) : (
                <div className="p-6 border-2 border-dashed border-border/50 rounded-2xl text-center bg-muted/30">
                  <FileText className="h-6 w-6 text-muted-foreground/30 mx-auto mb-2" />
                  <p className="text-xs font-semibold text-muted-foreground/60">No PDF attached</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Info Card */}
          <Card>
            <CardHeader className="p-5 pb-0">
              <CardTitle className="text-[13px] font-bold uppercase tracking-wider flex items-center gap-2 text-muted-foreground">
                <Info className="h-4 w-4" />
                Quick Info
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-4 space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-border/50">
                <span className="text-xs font-semibold text-muted-foreground">Status</span>
                <Badge variant="secondary" className="gradient-bg-subtle text-[10px] font-bold py-0.5">
                  {app.status}
                </Badge>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border/50">
                <span className="text-xs font-semibold text-muted-foreground">Location</span>
                <span className="text-xs font-bold">{app.location}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-xs font-semibold text-muted-foreground">Resume</span>
                <span className="text-xs font-bold max-w-[120px] truncate text-right">{app.resumeName}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
