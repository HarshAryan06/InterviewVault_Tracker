'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useApplications, useFileUpload } from '@/hooks';
import { Application, ApplicationStatus } from '@/types';
import { ArrowLeft, Upload, CheckCircle, Briefcase, FilePlus } from 'lucide-react';
import { toast } from 'sonner';

export default function AddApplicationPage() {
  const router = useRouter();
  const { addApplication } = useApplications();
  const { fileData, handleFileChange, clearFile } = useFileUpload();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
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
    toast.success('Application added successfully!');
    router.push('/applications');
  };

  return (
    <div className="max-w-2xl mx-auto animate-in fade-in duration-500">
      <header className="mb-8 flex items-center gap-4">
        <Link href="/">
          <Button variant="outline" size="icon" className="h-10 w-10">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 gradient-bg rounded-xl flex items-center justify-center shadow-lg">
            <FilePlus className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight">
              <span className="gradient-text-primary">Add</span> Application
            </h2>
            <p className="text-muted-foreground text-xs font-medium">
              Track a new company you applied to
            </p>
          </div>
        </div>
      </header>

      <Card className="overflow-hidden">
        <CardHeader className="gradient-bg-subtle border-b border-border/50 p-5 px-6 pb-4">
          <CardTitle className="text-[13px] font-bold uppercase tracking-wider flex items-center gap-2 m-0 leading-none">
            <Briefcase className="h-4 w-4 text-primary" />
            Application Details
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 pt-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
              <div className="space-y-2">
                <Label htmlFor="companyName" className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground ml-1">
                  Company Name
                </Label>
                <Input
                  id="companyName"
                  name="companyName"
                  required
                  placeholder="e.g. Google, Microsoft"
                  className="h-11 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role" className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground ml-1">
                  Job Role
                </Label>
                <Input
                  id="role"
                  name="role"
                  required
                  placeholder="e.g. Software Engineer"
                  className="h-11 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location" className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground ml-1">
                  Location
                </Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="e.g. San Francisco, Remote"
                  className="h-11 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status" className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground ml-1">
                  Status
                </Label>
                <Select name="status" defaultValue={ApplicationStatus.APPLIED}>
                  <SelectTrigger className="h-11 rounded-xl">
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

            <Separator className="opacity-50" />

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="resumeName" className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground ml-1">
                  Resume Version Name
                </Label>
                <Input
                  id="resumeName"
                  name="resumeName"
                  required
                  placeholder="e.g. SDE_Resume_v2"
                  className="h-11 rounded-xl"
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
                  className="flex items-center justify-center gap-3 w-full px-4 py-8 rounded-2xl border-2 border-dashed border-border/60 hover:border-primary/40 hover:gradient-bg-subtle cursor-pointer transition-all bg-muted/20"
                >
                  {fileData ? (
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center shadow-sm">
                        <CheckCircle className="h-6 w-6 text-emerald-500" />
                      </div>
                      <div className="text-left">
                        <p className="text-[13px] font-bold text-emerald-600 dark:text-emerald-400">File Ready</p>
                        <p className="text-xs text-muted-foreground max-w-[200px] truncate">{fileData.name}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 gradient-bg-subtle rounded-xl flex items-center justify-center">
                        <Upload className="h-6 w-6 text-primary" />
                      </div>
                      <div className="text-left">
                        <p className="text-[13px] font-bold text-foreground">Upload Resume PDF</p>
                        <p className="text-xs text-muted-foreground">Click to select your document</p>
                      </div>
                    </div>
                  )}
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobDescription" className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground ml-1">
                Notes / Job Description
              </Label>
              <Textarea
                id="jobDescription"
                name="jobDescription"
                rows={5}
                placeholder="Paste job requirements or add notes about the application..."
                className="rounded-2xl p-4 resize-none min-h-[120px]"
              />
            </div>

            <Separator className="opacity-50" />

            <div className="flex gap-4 pt-2">
              <Button 
                type="submit" 
                variant="gradient"
                size="lg"
                className="flex-1 rounded-2xl h-14 text-base"
              >
                Save Application
              </Button>
              <Link href="/applications" className="flex-1 sm:flex-none">
                <Button type="button" variant="outline" size="lg" className="w-full rounded-2xl h-14 text-base px-10">
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
