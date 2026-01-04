'use client';

import { useState, useEffect, useCallback } from 'react';
import { Application, ApplicationStatus } from '@/types';
import { loadApplications, saveApplications } from '@/lib/storage';

export const useApplications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setApplications(loadApplications());
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      saveApplications(applications);
    }
  }, [applications, isLoaded]);

  const addApplication = useCallback((app: Application) => {
    setApplications(prev => [app, ...prev]);
  }, []);

  const updateApplicationStatus = useCallback((id: string, newStatus: ApplicationStatus) => {
    setApplications(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
  }, []);

  const deleteApplication = useCallback((id: string) => {
    setApplications(prev => prev.filter(a => a.id !== id));
  }, []);

  return {
    applications,
    isLoaded,
    addApplication,
    updateApplicationStatus,
    deleteApplication,
  };
};

