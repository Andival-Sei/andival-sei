'use client';

import { useState, useEffect } from 'react';
import type { Project } from '@/entities/project';
import { projectApi } from '@/entities/project/api/projectApi';

/**
 * Хук для управления списком проектов
 * TODO: Реализовать загрузку проектов
 */
export const useProjectList = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setIsLoading(true);
        // TODO: Загрузить проекты через projectApi
        const data = await projectApi.getAll();
        setProjects(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Ошибка загрузки проектов'));
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, []);

  return {
    projects,
    isLoading,
    error,
    refetch: () => {
      // TODO: Реализовать перезагрузку
    },
  };
};
