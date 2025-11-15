'use client';

import { useTheme } from '../model/useTheme';
import { Button } from '@/shared/ui/Button';
import styles from './ThemeToggle.module.scss';

/**
 * Компонент переключения темы
 * Поддерживает светлую, темную и системную темы
 */
export const ThemeToggle = () => {
  const { resolvedTheme, toggleTheme, mounted } = useTheme();

  // Предотвращаем hydration mismatch
  if (!mounted) {
    return (
      <Button variant="outline" className={styles.toggle} disabled>
        <span className={styles.icon}>🌙</span>
        <span className={styles.text}>Загрузка...</span>
      </Button>
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <Button
      variant="outline"
      onClick={toggleTheme}
      className={styles.toggle}
      aria-label={isDark ? 'Переключить на светлую тему' : 'Переключить на темную тему'}
    >
      <span className={styles.icon}>{isDark ? '☀️' : '🌙'}</span>
      <span className={styles.text}>{isDark ? 'Светлая' : 'Темная'}</span>
    </Button>
  );
};
