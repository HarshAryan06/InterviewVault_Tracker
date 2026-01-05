'use client';

import { useState, useEffect, startTransition } from 'react';
import { useGitHubStars } from '@/hooks/use-github-stars';
import GithubIcon from '@/components/ui/github-icon';

export function GitHubStarButton() {
  const [isMounted, setIsMounted] = useState(false);
  const { starCount, isLoading, repoUrl, isConfigured } = useGitHubStars();

  useEffect(() => {
    startTransition(() => {
      setIsMounted(true);
    });
  }, []);

  if (!isMounted || !isConfigured) {
    return null;
  }

  return (
    <a
      href={repoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-2 sm:py-2.5 h-9 sm:h-10 rounded-lg border border-border/50 bg-card/50 hover:bg-card/80 active:scale-95 transition-all duration-200 group min-w-fit"
    >
      <GithubIcon size={14} color="currentColor" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0" />
      <span className="text-xs sm:text-sm font-semibold text-muted-foreground group-hover:text-foreground transition-colors whitespace-nowrap">
        {isLoading ? '...' : starCount !== null && typeof starCount === 'number' ? starCount.toLocaleString() : 'Star'}
      </span>
    </a>
  );
}

