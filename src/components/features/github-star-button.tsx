'use client';

import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { useGitHubStars } from '@/hooks/use-github-stars';

export function GitHubStarButton() {
  const [isMounted, setIsMounted] = useState(false);
  const { starCount, isLoading, repoUrl, isConfigured } = useGitHubStars();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || !isConfigured) {
    return null;
  }

  return (
    <a
      href={repoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 h-9 rounded-lg border border-border bg-background hover:bg-accent transition-colors duration-200 group"
    >
      <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
      <span className="text-sm font-medium text-foreground">
        {isLoading ? '...' : starCount !== null && typeof starCount === 'number' ? starCount.toLocaleString() : 'Star'}
      </span>
    </a>
  );
}

