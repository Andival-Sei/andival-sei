'use client';

import { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';
import { ProjectLoadingProvider } from '@/processes/project-loading';

interface AppProvidersProps {
  children: ReactNode;
}

/**
 * Провайдеры приложения
 * Объединяет все глобальные провайдеры
 */
export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem={true}
      disableTransitionOnChange={false}
    >
      <ProjectLoadingProvider>{children}</ProjectLoadingProvider>
    </ThemeProvider>
  );
};
