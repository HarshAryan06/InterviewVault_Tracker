'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Application } from '@/types';
import { StatusBadge } from './status-badge';
import { Briefcase, Calendar, FileText, Paperclip, MapPin, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

interface ApplicationCardProps {
  app: Application;
}

export function ApplicationCard({ app }: ApplicationCardProps) {
  return (
    <Link href={`/applications/${app.id}`}>
      <Card className="group cursor-pointer h-full overflow-hidden card-hover relative">
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 gradient-bg opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500 pointer-events-none" />
        
        <CardContent className="p-5 flex flex-col h-full relative">
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 gradient-bg-subtle rounded-xl flex items-center justify-center shadow-sm transition-all duration-500 ease-out group-hover:bg-gradient-to-br group-hover:from-orange-500 group-hover:to-amber-500 group-hover:scale-105">
              <Briefcase className="h-5 w-5 text-primary transition-colors duration-500 group-hover:text-white" />
            </div>
            <div className="flex items-center gap-2">
              <StatusBadge status={app.status} size="sm" />
              <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out group-hover:bg-primary/10">
                <ArrowUpRight className="h-4 w-4 text-primary" />
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-1 line-clamp-1 transition-colors duration-300 group-hover:text-primary">
              {app.companyName}
            </h3>
            <p className="text-sm text-muted-foreground font-medium mb-2 line-clamp-1">
              {app.role}
            </p>
            {app.location && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                <MapPin className="h-3 w-3" />
                <span className="truncate">{app.location}</span>
              </div>
            )}
          </div>

          {/* Resume Tag */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1.5 gradient-bg-subtle px-3 py-1.5 rounded-lg max-w-full transition-colors duration-300 group-hover:bg-primary/10">
              <FileText className="h-3 w-3 text-primary" />
              <span className="text-[10px] font-bold text-primary truncate uppercase tracking-tight">
                {app.resumeName}
              </span>
            </div>
            {app.resumeFile && (
              <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <Paperclip className="h-3 w-3 text-emerald-500" />
              </div>
            )}
          </div>
          
          {/* Footer */}
          <div className="flex justify-between items-center pt-4 border-t border-border/50 text-[10px] font-semibold text-muted-foreground transition-colors duration-300 group-hover:border-primary/20">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3 w-3" />
              <span>{app.dateApplied}</span>
            </div>
            <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[10px] font-bold">
              View Details →
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
