export const STORAGE_KEYS = {
  APPLICATIONS: 'jobtracker_applications',
  THEME: 'jobtracker_theme',
} as const;

export type StorageKey = typeof STORAGE_KEYS[keyof typeof STORAGE_KEYS];

