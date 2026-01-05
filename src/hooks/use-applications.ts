'use client';

import { useState, useEffect, useCallback } from 'react';
import { Application, ApplicationStatus } from '@/types';
import { ApplicationStorageService } from '@/services/storage';

export const useApplications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load applications on mount - use setTimeout to avoid synchronous setState
    const timer = setTimeout(() => {
      const loaded = ApplicationStorageService.load();
      setApplications(loaded);
      setIsLoaded(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      ApplicationStorageService.save(applications);
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

