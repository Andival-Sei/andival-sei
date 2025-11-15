'use client';

import { useTheme as useNextTheme } from 'next-themes';
import { useState, useEffect } from 'react';

/**
 * Хук для управления темой приложения
 * Обертка над next-themes с дополнительной логикой
 */
export const useTheme = () => {
  const { theme, setTheme, systemTheme, resolvedTheme } = useNextTheme();
  const [mounted, setMounted] = useState(false);

  // Предотвращаем hydration mismatch
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    if (theme === 'system') {
      // Если выбрана системная тема, переключаем на противоположную системной
      setTheme(systemTheme === 'dark' ? 'light' : 'dark');
    } else {
      // Переключаем между light и dark
      setTheme(theme === 'dark' ? 'light' : 'dark');
    }
  };

  // Текущая активная тема (учитывает системную)
  const currentTheme = resolvedTheme || theme;

  return {
    theme,
    setTheme,
    systemTheme,
    resolvedTheme: currentTheme,
    toggleTheme,
    mounted,
  };
};
