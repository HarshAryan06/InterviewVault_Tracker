export const dateUtils = {
  formatDate: (date: Date | string, options?: Intl.DateTimeFormatOptions): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      ...options,
    });
  },

  formatShortDate: (date: Date | string): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  },

  formatISO: (date: Date): string => {
    return date.toISOString().split('T')[0];
  },

  getOneWeekAgo: (): Date => {
    const date = new Date();
    date.setDate(date.getDate() - 7);
    return date;
  },

  isWithinWeek: (date: Date | string): boolean => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const oneWeekAgo = dateUtils.getOneWeekAgo();
    return dateObj >= oneWeekAgo;
  },
};

