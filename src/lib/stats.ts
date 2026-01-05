import { Application, ApplicationStatus, DashboardStats } from '@/types';
import { applicationSelectors } from '@/selectors';

export const calculateStats = (applications: Application[]): DashboardStats => ({
  total: applications.length,
  interviews: applicationSelectors.byStatus(applications, ApplicationStatus.INTERVIEWING).length,
  offers: applicationSelectors.byStatus(applications, ApplicationStatus.OFFER).length,
  pending: applicationSelectors.byStatus(applications, ApplicationStatus.PENDING).length,
  rejected: applicationSelectors.byStatus(applications, ApplicationStatus.REJECTED).length,
  applied: applicationSelectors.byStatus(applications, ApplicationStatus.APPLIED).length,
});

export const calculateProgressPercentage = (stats: DashboardStats): number => {
  return stats.total > 0 ? Math.round((stats.interviews / stats.total) * 100) : 0;
};

export const filterApplications = (
  applications: Application[],
  searchTerm: string,
  statusFilter: string
): Application[] => {
  let result = applications;

  if (statusFilter !== 'All') {
    result = applicationSelectors.byStatus(result, statusFilter as ApplicationStatus);
  }

  if (searchTerm) {
    result = applicationSelectors.bySearchTerm(result, searchTerm);
  }

  return result;
};
