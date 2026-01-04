'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useApplications, useFileUpload } from '@/hooks';
import { Application, ApplicationStatus } from '@/types';
import { 
  ArrowLeft, 
  Upload, 
  CheckCircle, 
  Briefcase, 
  FilePlus, 
  Building2,
  MapPin,
  FileText,
  Sparkles,
  Send,
  X
} from 'lucide-react';
import { toast } from 'sonner';

export default function AddApplicationPage() {
  const router = useRouter();
  const { addApplication } = useApplications();
  const { fileData, handleFileChange, clearFile } = useFileUpload();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const app: Application = {
      id: crypto.randomUUID(),
      companyName: formData.get('companyName') as string,
      role: formData.get('role') as string,
      location: formData.get('location') as string || 'Remote',
      status: formData.get('status') as ApplicationStatus,
      resumeName: formData.get('resumeName') as string,
      resumeFile: fileData || undefined,
      notes: '',
      jobDescription: formData.get('jobDescription') as string,
      dateApplied: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    };
    
    addApplication(app);
    clearFile();
    toast.success('Application added successfully!', {
      description: `${app.companyName} - ${app.role}`,
    });
    router.push('/applications');
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <header className="mb-8 flex items-center gap-4 animate-fade-in">
        <Link href="/">
          <Button variant="outline" size="icon" className="h-11 w-11 rounded-xl transition-transform duration-300 hover:scale-105">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center shadow-lg glow-sm">
            <FilePlus className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              <span className="gradient-text-primary">Add</span> Application
            </h2>
            <p className="text-muted-foreground text-xs font-medium">
              Track a new company you applied to
            </p>
          </div>
        </div>
      </header>

      {/* Progress Indicator */}
      <div className="mb-6 animate-fade-in-up stagger-1">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="secondary" className="gradient-bg-subtle">
            <Sparkles className="h-3 w-3 mr-1" />
            New Application
          </Badge>
        </div>
        <div className="h-1 bg-muted rounded-full overflow-hidden">
          <div className="h-full w-1/2 gradient-bg transition-all duration-700 ease-out" />
        </div>
      </div>

      <Card className="overflow-hidden animate-fade-in-up stagger-2 card-hover">
        <CardHeader className="gradient-bg-subtle border-b border-border/50 p-5 px-6 pb-4">
          <CardTitle className="text-[13px] font-bold uppercase tracking-wider flex items-center gap-2 m-0 leading-none">
            <Briefcase className="h-4 w-4 text-primary" />
            Application Details
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 pt-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Company & Role Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                <Building2 className="h-4 w-4" />
                Company Information
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                <div className="space-y-2 group">
                  <Label htmlFor="companyName" className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground ml-1 transition-colors duration-200 group-focus-within:text-primary">
                    Company Name *
                  </Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    required
                    placeholder="e.g. Google, Microsoft"
                    className="h-12 rounded-xl border-2 input-animated input-focus-glow"
                  />
                </div>
                <div className="space-y-2 group">
                  <Label htmlFor="role" className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground ml-1 transition-colors duration-200 group-focus-within:text-primary">
                    Job Role *
                  </Label>
                  <Input
                    id="role"
                    name="role"
                    required
                    placeholder="e.g. Software Engineer"
                    className="h-12 rounded-xl border-2 input-animated input-focus-glow"
                  />
                </div>
                <div className="space-y-2 group">
                  <Label htmlFor="location" className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground ml-1 transition-colors duration-200 group-focus-within:text-primary flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    Location
                  </Label>
                  <Input
                    id="location"
                    name="location"
                    placeholder="e.g. San Francisco, Remote"
                    className="h-12 rounded-xl border-2 input-animated input-focus-glow"
                  />
                </div>
                <div className="space-y-2 group">
                  <Label htmlFor="status" className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground ml-1 transition-colors duration-200 group-focus-within:text-primary">
                    Status *
                  </Label>
                  <Select name="status" defaultValue={ApplicationStatus.APPLIED}>
                    <SelectTrigger className="h-12 rounded-xl border-2">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      {Object.values(ApplicationStatus).map(status => (
                        <SelectItem key={status} value={status} className="rounded-lg">{status}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator className="opacity-50" />

            {/* Resume Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                <FileText className="h-4 w-4" />
                Resume Information
              </div>
              
              <div className="space-y-2 group">
                <Label htmlFor="resumeName" className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground ml-1 transition-colors duration-200 group-focus-within:text-primary">
                  Resume Version Name *
                </Label>
                <Input
                  id="resumeName"
                  name="resumeName"
                  required
                  placeholder="e.g. SDE_Resume_v2"
                  className="h-12 rounded-xl border-2 input-animated input-focus-glow"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground ml-1">
                  Attach Resume (PDF)
                </Label>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  className="hidden"
                  id="resume-file"
                />
                <label
                  htmlFor="resume-file"
                  className={`
                    flex items-center justify-center gap-3 w-full px-4 py-8 rounded-2xl border-2 border-dashed 
                    cursor-pointer transition-all duration-300 ease-out
                    ${fileData 
                      ? 'border-emerald-500/50 bg-emerald-500/5' 
                      : 'border-border/60 hover:border-primary/40 hover:gradient-bg-subtle bg-muted/20'
                    }
                  `}
                >
                  {fileData ? (
                    <div className="flex items-center gap-4 animate-scale-in">
                      <div className="w-14 h-14 bg-emerald-500/10 rounded-xl flex items-center justify-center shadow-sm">
                        <CheckCircle className="h-7 w-7 text-emerald-500" />
                      </div>
                      <div className="text-left flex-1">
                        <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">File Ready!</p>
                        <p className="text-xs text-muted-foreground max-w-[200px] truncate">{fileData.name}</p>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        onClick={(e) => { e.preventDefault(); clearFile(); }}
                        className="text-muted-foreground hover:text-destructive transition-colors duration-200"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-4 group/upload">
                      <div className="w-14 h-14 gradient-bg-subtle rounded-xl flex items-center justify-center transition-all duration-500 ease-out group-hover/upload:bg-gradient-to-br group-hover/upload:from-orange-500 group-hover/upload:to-amber-500">
                        <Upload className="h-7 w-7 text-primary transition-colors duration-300 group-hover/upload:text-white" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-bold text-foreground">Upload Resume PDF</p>
                        <p className="text-xs text-muted-foreground">Click to select your document</p>
                      </div>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Notes Section */}
            <div className="space-y-2 group">
              <Label htmlFor="jobDescription" className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground ml-1 transition-colors duration-200 group-focus-within:text-primary">
                Notes / Job Description
              </Label>
              <Textarea
                id="jobDescription"
                name="jobDescription"
                rows={5}
                placeholder="Paste job requirements or add notes about the application..."
                className="rounded-2xl p-4 resize-none min-h-[140px] border-2 input-focus-glow transition-all duration-300"
              />
            </div>

            <Separator className="opacity-50" />

            {/* Submit Section */}
            <div className="flex gap-4 pt-2">
              <Button 
                type="submit" 
                variant="gradient"
                size="xl"
                className="flex-1 gap-2 group"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    Save Application
                  </>
                )}
              </Button>
              <Link href="/applications" className="flex-shrink-0">
                <Button 
                  type="button" 
                  variant="outline" 
                  size="xl" 
                  className="px-8 transition-colors duration-300 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30"
                >
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Tips Section */}
      <Card className="mt-6 overflow-hidden animate-fade-in-up stagger-3 border-dashed">
        <CardContent className="p-4 flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg gradient-bg-subtle flex items-center justify-center flex-shrink-0">
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-xs font-semibold text-foreground mb-1">Pro Tip</p>
            <p className="text-xs text-muted-foreground">
              Use descriptive resume names like "Frontend_React_2024" to easily identify which resume you used for each application.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
