'use client';

import { useState, useEffect } from 'react';
import type { Project } from '@/entities/project';
import { projectApi } from '@/entities/project/api/projectApi';

/**
 * Процесс "Загрузка проектов"
 * Управляет загрузкой, кешированием и обработкой ошибок
 * TODO: Реализовать кеширование и оптимизацию
 */
export const useProjectLoading = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [cache, setCache] = useState<Project[] | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // TODO: Проверить кеш
        if (cache) {
          setProjects(cache);
          setIsLoading(false);
          return;
        }

        // Загрузка с сервера
        const data = await projectApi.getAll();
        setProjects(data);
        setCache(data);
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Ошибка загрузки проектов');
        setError(error);
        console.error('Ошибка загрузки проектов:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, []);

  const refetch = async () => {
    setCache(null);
    // TODO: Перезагрузить проекты
  };

  return {
    projects,
    isLoading,
    error,
    refetch,
  };
};
