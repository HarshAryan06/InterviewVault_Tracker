import { Application, ApplicationStatus } from '@/types';

export const applicationSelectors = {
  byId: (applications: Application[], id: string): Application | undefined => {
    return applications.find((app) => app.id === id);
  },

  byStatus: (applications: Application[], status: ApplicationStatus): Application[] => {
    return applications.filter((app) => app.status === status);
  },

  byCompanyName: (applications: Application[], companyName: string): Application[] => {
    const lower = companyName.toLowerCase();
    return applications.filter((app) =>
      app.companyName.toLowerCase().includes(lower)
    );
  },

  byRole: (applications: Application[], role: string): Application[] => {
    const lower = role.toLowerCase();
    return applications.filter((app) => app.role.toLowerCase().includes(lower));
  },

  bySearchTerm: (applications: Application[], searchTerm: string): Application[] => {
    const lower = searchTerm.toLowerCase();
    return applications.filter(
      (app) =>
        app.companyName.toLowerCase().includes(lower) ||
        app.role.toLowerCase().includes(lower)
    );
  },

  recent: (applications: Application[], limit: number = 5): Application[] => {
    return [...applications]
      .sort((a, b) => new Date(b.dateApplied).getTime() - new Date(a.dateApplied).getTime())
      .slice(0, limit);
  },

  thisWeek: (applications: Application[]): Application[] => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return applications.filter(
      (app) => new Date(app.dateApplied) >= oneWeekAgo
    );
  },

  uniqueResumes: (applications: Application[]): string[] => {
    return Array.from(new Set(applications.map((app) => app.resumeName)));
  },

  resumeUsageCount: (applications: Application[], resumeName: string): number => {
    return applications.filter((app) => app.resumeName === resumeName).length;
  },
};

