'use client';

import { useState, useMemo, useDeferredValue } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { ApplicationCard } from '@/components/features/application-card';
import { useApplications } from '@/hooks';
import { filterApplications } from '@/lib/stats';
import { ApplicationStatus } from '@/types';
import { Search, Briefcase, Filter } from 'lucide-react';

export default function ApplicationsPage() {
  const { applications, isLoaded } = useApplications();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  const deferredSearch = useDeferredValue(searchTerm);
  
  const filteredApps = useMemo(
    () => filterApplications(applications, deferredSearch, statusFilter),
    [applications, deferredSearch, statusFilter]
  );

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500 space-y-8">
      <header className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center shadow-lg">
            <Briefcase className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight">
              <span className="gradient-text-primary">My</span> Applications
            </h2>
            <p className="text-muted-foreground text-xs font-medium">
              Tracking {filteredApps.length} {filteredApps.length === 1 ? 'company' : 'companies'}
            </p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search companies or roles..."
              className="pl-10 h-11"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px] h-11">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Status</SelectItem>
                {Object.values(ApplicationStatus).map(status => (
                  <SelectItem key={status} value={status}>{status}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredApps.map(app => (
          <ApplicationCard key={app.id} app={app} />
        ))}
        {filteredApps.length === 0 && (
          <Card className="col-span-full">
            <CardContent className="py-16 text-center gradient-bg-subtle rounded-xl">
              <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground font-semibold">
                {applications.length === 0 ? 'No applications yet' : 'No matching applications'}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {applications.length === 0 ? 'Add your first application to get started' : 'Try adjusting your search or filter'}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
