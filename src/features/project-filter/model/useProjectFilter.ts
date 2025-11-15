'use client';

import { useState, useMemo } from 'react';
import type { Project, ProjectCategory } from '@/entities/project';

/**
 * Хук для фильтрации проектов
 * TODO: Реализовать логику фильтрации
 */
export const useProjectFilter = (projects: Project[]) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<Project['status'] | 'all'>('all');

  const filteredProjects = useMemo(() => {
    let result = [...projects];

    if (selectedCategory !== 'all') {
      result = result.filter((project) => project.category === selectedCategory);
    }

    if (selectedStatus !== 'all') {
      result = result.filter((project) => project.status === selectedStatus);
    }

    return result;
  }, [projects, selectedCategory, selectedStatus]);

  return {
    filteredProjects,
    selectedCategory,
    selectedStatus,
    setSelectedCategory,
    setSelectedStatus,
  };
};
