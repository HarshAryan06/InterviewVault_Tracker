'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Application } from '@/types';
import { StatusBadge } from './status-badge';
import { Briefcase, Calendar, FileText, Paperclip } from 'lucide-react';
import Link from 'next/link';

interface ApplicationCardProps {
  app: Application;
}

export function ApplicationCard({ app }: ApplicationCardProps) {
  return (
    <Link href={`/applications/${app.id}`}>
      <Card className="group cursor-pointer h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
        <div className="absolute inset-0 gradient-bg opacity-0 group-hover:opacity-5 transition-opacity" />
        <CardContent className="p-5 flex flex-col h-full relative">
          <div className="flex justify-between items-start mb-4">
            <div className="w-11 h-11 gradient-bg-subtle rounded-xl flex items-center justify-center group-hover:gradient-bg transition-all">
              <Briefcase className="h-5 w-5 text-primary group-hover:text-white transition-colors" />
            </div>
            <StatusBadge status={app.status} size="sm" />
          </div>
          
          <div className="flex-1">
            <h3 className="text-base font-bold mb-1 line-clamp-1 group-hover:gradient-text-primary transition-all">
              {app.companyName}
            </h3>
            <p className="text-xs text-muted-foreground font-medium mb-4 line-clamp-1">
              {app.role}
            </p>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1.5 gradient-bg-subtle px-2.5 py-1 rounded-lg max-w-full">
              <FileText className="h-3 w-3 text-primary" />
              <span className="text-[10px] font-bold text-primary truncate uppercase tracking-tight">
                {app.resumeName}
              </span>
            </div>
          </div>
          
          <div className="flex justify-between items-center pt-4 border-t border-border text-[10px] font-semibold text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3 w-3" />
              <span>{app.dateApplied}</span>
            </div>
            {app.resumeFile && (
              <Paperclip className="h-3 w-3 text-primary" />
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
