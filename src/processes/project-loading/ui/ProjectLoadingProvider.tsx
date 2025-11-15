'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useProjectLoading } from '../model/useProjectLoading';
import type { Project } from '@/entities/project';

interface ProjectLoadingContextType {
  projects: Project[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

const ProjectLoadingContext = createContext<ProjectLoadingContextType | undefined>(undefined);

interface ProjectLoadingProviderProps {
  children: ReactNode;
}

/**
 * Провайдер для процесса загрузки проектов
 * TODO: Реализовать глобальное состояние проектов
 */
export const ProjectLoadingProvider = ({ children }: ProjectLoadingProviderProps) => {
  const projectLoading = useProjectLoading();

  return (
    <ProjectLoadingContext.Provider value={projectLoading}>
      {children}
    </ProjectLoadingContext.Provider>
  );
};

export const useProjectLoadingContext = () => {
  const context = useContext(ProjectLoadingContext);
  if (!context) {
    throw new Error('useProjectLoadingContext must be used within ProjectLoadingProvider');
  }
  return context;
};
