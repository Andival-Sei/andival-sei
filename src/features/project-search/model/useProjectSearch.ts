'use client';

import { useState, useMemo } from 'react';
import type { Project } from '@/entities/project';
import { projectUtils } from '@/entities/project/lib/utils';

/**
 * Хук для поиска проектов
 * TODO: Реализовать расширенный поиск
 */
export const useProjectSearch = (projects: Project[]) => {
  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!query.trim()) {
      return projects;
    }
    return projectUtils.search(projects, query);
  }, [projects, query]);

  return {
    query,
    setQuery,
    searchResults,
  };
};
