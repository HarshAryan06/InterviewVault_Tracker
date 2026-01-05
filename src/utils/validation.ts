import { ApplicationStatus } from '@/types';

export const validation = {
  isEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  isUrl: (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },

  isNotEmpty: (value: string | null | undefined): boolean => {
    return value !== null && value !== undefined && value.trim().length > 0;
  },

  isValidStatus: (status: string): status is ApplicationStatus => {
    return Object.values(ApplicationStatus).includes(status as ApplicationStatus);
  },

  isValidDate: (dateString: string): boolean => {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  },

  isPastDate: (dateString: string): boolean => {
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    return date <= today;
  },
};

