import { GITHUB_CONFIG, GITHUB_CACHE_DURATION } from '@/constants/github';

export interface GitHubRepo {
  stargazers_count: number;
  full_name: string;
}

export interface CacheData {
  count: number;
  timestamp: number;
}

export class GitHubApiService {
  private static readonly BASE_URL = 'https://api.github.com';
  private static readonly CACHE_PREFIX = 'github-stars';

  static getCacheKey(): string {
    return `${this.CACHE_PREFIX}-${GITHUB_CONFIG.USERNAME}-${GITHUB_CONFIG.REPO}`;
  }

  static getCache(): CacheData | null {
    if (typeof window === 'undefined') return null;
    const cached = localStorage.getItem(this.getCacheKey());
    if (!cached) return null;

    try {
      const data = JSON.parse(cached) as CacheData;
      const now = Date.now();
      // Check if cache is still valid
      if (now - data.timestamp < GITHUB_CACHE_DURATION) {
        return data;
      }
    } catch {
      // Invalid cache
    }
    return null;
  }

  static setCache(count: number): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(
        this.getCacheKey(),
        JSON.stringify({
          count,
          timestamp: Date.now(),
        })
      );
    } catch {
      // localStorage might be disabled, ignore
    }
  }

  static async fetchStars(): Promise<number> {
    const response = await fetch(
      `${this.BASE_URL}/repos/${GITHUB_CONFIG.USERNAME}/${GITHUB_CONFIG.REPO}`,
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch repository data');
    }

    const data: GitHubRepo = await response.json();
    return data.stargazers_count;
  }

  static getRepoUrl(): string {
    return `https://github.com/${GITHUB_CONFIG.USERNAME}/${GITHUB_CONFIG.REPO}`;
  }

  static isConfigured(): boolean {
    return (
      GITHUB_CONFIG.USERNAME !== 'your-username' &&
      GITHUB_CONFIG.REPO !== 'your-repo-name'
    );
  }
}

