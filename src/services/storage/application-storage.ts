import { Application } from '@/types';
import { STORAGE_KEYS } from '@/constants/storage-keys';

export class ApplicationStorageService {
  private static readonly KEY = STORAGE_KEYS.APPLICATIONS;

  static load(): Application[] {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem(this.KEY);
    return saved ? (JSON.parse(saved) as Application[]) : [];
  }

  static save(applications: Application[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.KEY, JSON.stringify(applications));
  }

  static clear(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(this.KEY);
  }
}

