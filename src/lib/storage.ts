import { Application } from '@/types';

const STORAGE_KEYS = {
  APPLICATIONS: 'jobtracker_applications',
  THEME: 'jobtracker_theme',
} as const;

export const loadApplications = (): Application[] => {
  if (typeof window === 'undefined') return [];
  const saved = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
  return saved ? (JSON.parse(saved) as Application[]) : [];
};

export const saveApplications = (applications: Application[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(applications));
};

