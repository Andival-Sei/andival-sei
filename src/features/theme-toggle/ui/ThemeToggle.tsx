'use client';

// TODO: Реализовать переключатель темы
// - Добавить иконки для светлой/тёмной темы
// - Добавить анимацию переключения
// - Интегрировать с ThemeProvider

import { useTheme } from '@/src/app/providers';

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const toggleTheme = () => {
    // TODO: Реализовать логику переключения темы
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="inline-flex items-center justify-center rounded-md p-2 hover:bg-accent"
      aria-label="Toggle theme"
    >
      {/* TODO: Добавить иконки */}
      {resolvedTheme === 'dark' ? '🌙' : '☀️'}
    </button>
  );
}

