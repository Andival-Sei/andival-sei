'use client';

import { useTheme } from '@/src/app/providers';
import { cn } from '@/src/shared/lib/utils';

/**
 * Иконка солнца (светлая тема)
 */
function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

/**
 * Иконка луны (тёмная тема)
 */
function MoonIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

/**
 * Иконка монитора (системная тема)
 */
function MonitorIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="14" x="2" y="3" rx="2" />
      <path d="M8 21h8" />
      <path d="M12 17v4" />
    </svg>
  );
}

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const toggleTheme = () => {
    // Циклическое переключение: light -> dark -> system -> light
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }
  };

  const getThemeLabel = () => {
    if (theme === 'system') {
      return 'Системная тема';
    }
    return theme === 'light' ? 'Светлая тема' : 'Тёмная тема';
  };

  const getNextThemeLabel = () => {
    if (theme === 'light') {
      return 'Переключить на тёмную тему';
    }
    if (theme === 'dark') {
      return 'Переключить на системную тему';
    }
    return 'Переключить на светлую тему';
  };

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        'inline-flex items-center justify-center rounded-md p-2',
        'hover:bg-accent hover:text-accent-foreground',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'transition-colors duration-150',
        'relative overflow-hidden'
      )}
      aria-label={getNextThemeLabel()}
      title={getNextThemeLabel()}
    >
      <span className="relative h-5 w-5">
        {/* Иконка для светлой темы */}
        <SunIcon
          className={cn(
            'absolute inset-0 h-5 w-5 transition-all duration-300',
            resolvedTheme === 'light' && theme !== 'system'
              ? 'rotate-0 scale-100 opacity-100'
              : 'rotate-90 scale-0 opacity-0'
          )}
        />
        {/* Иконка для тёмной темы */}
        <MoonIcon
          className={cn(
            'absolute inset-0 h-5 w-5 transition-all duration-300',
            resolvedTheme === 'dark' && theme !== 'system'
              ? 'rotate-0 scale-100 opacity-100'
              : '-rotate-90 scale-0 opacity-0'
          )}
        />
        {/* Иконка для системной темы */}
        <MonitorIcon
          className={cn(
            'absolute inset-0 h-5 w-5 transition-all duration-300',
            theme === 'system'
              ? 'rotate-0 scale-100 opacity-100'
              : 'rotate-90 scale-0 opacity-0'
          )}
        />
      </span>
      <span className="sr-only">{getThemeLabel()}</span>
    </button>
  );
}

