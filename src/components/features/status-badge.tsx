import { Badge } from '@/components/ui/badge';
import { ApplicationStatus } from '@/types';
import { cn } from '@/utils';

interface StatusBadgeProps {
  status: ApplicationStatus;
  size?: 'sm' | 'md' | 'lg';
}

const statusStyles: Record<ApplicationStatus, string> = {
  [ApplicationStatus.APPLIED]: 'bg-gradient-to-r from-blue-500/10 to-cyan-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
  [ApplicationStatus.PENDING]: 'bg-gradient-to-r from-amber-500/10 to-orange-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  [ApplicationStatus.INTERVIEWING]: 'bg-gradient-to-r from-orange-500/10 to-amber-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20',
  [ApplicationStatus.OFFER]: 'bg-gradient-to-r from-emerald-500/10 to-green-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  [ApplicationStatus.REJECTED]: 'bg-gradient-to-r from-rose-500/10 to-red-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
  [ApplicationStatus.GHOSTED]: 'bg-gradient-to-r from-slate-500/10 to-gray-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20',
};

const sizeStyles = {
  sm: 'px-2 py-0.5 text-[9px]',
  md: 'px-2.5 py-1 text-[10px]',
  lg: 'px-3 py-1.5 text-xs',
};

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        'font-bold uppercase tracking-wide transition-all border',
        statusStyles[status],
        sizeStyles[size]
      )}
    >
      {status}
    </Badge>
  );
}
