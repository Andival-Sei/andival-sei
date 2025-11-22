"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useLayoutEffect,
  type ReactNode,
} from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: "light" | "dark";
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = "theme-preference";

/**
 * Получает системную тему пользователя
 */
function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") {
    return "light";
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

/**
 * Получает сохраненную тему из localStorage или возвращает 'system'
 */
function getStoredTheme(): Theme {
  if (typeof window === "undefined") {
    return "system";
  }
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === "light" || stored === "dark" || stored === "system") {
    return stored;
  }
  return "system";
}

/**
 * Применяет тему к документу через data-атрибут
 */
function applyTheme(resolvedTheme: "light" | "dark") {
  if (typeof document === "undefined") {
    return;
  }
  document.documentElement.setAttribute("data-theme", resolvedTheme);
}

// Инициализация темы (SSR-safe)
function getInitialTheme(): Theme {
  if (typeof window === "undefined") {
    return "system";
  }
  return getStoredTheme();
}

function getInitialResolvedTheme(): "light" | "dark" {
  if (typeof window === "undefined") {
    return "light";
  }
  const storedTheme = getStoredTheme();
  return storedTheme === "system" ? getSystemTheme() : storedTheme;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">(
    getInitialResolvedTheme
  );
  const [mounted, setMounted] = useState(false);

  // Инициализация при монтировании (SSR-safe)
  // Используем useLayoutEffect для синхронной инициализации темы
  // чтобы избежать мерцания при загрузке страницы
  useLayoutEffect(() => {
    const storedTheme = getStoredTheme();
    const initialResolved =
      storedTheme === "system" ? getSystemTheme() : storedTheme;

    // Применяем тему только если она отличается от начальной
    if (storedTheme !== theme) {
      setTheme(storedTheme);
    }
    if (initialResolved !== resolvedTheme) {
      setResolvedTheme(initialResolved);
    }
    applyTheme(initialResolved);
    setMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Обработка изменения темы
  useLayoutEffect(() => {
    if (!mounted) {
      return;
    }

    let newResolvedTheme: "light" | "dark";

    if (theme === "system") {
      newResolvedTheme = getSystemTheme();
    } else {
      newResolvedTheme = theme;
    }

    // Обновляем resolvedTheme только если изменилось
    if (newResolvedTheme !== resolvedTheme) {
      setResolvedTheme(newResolvedTheme);
    }
    applyTheme(newResolvedTheme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme, mounted]);

  // Слушатель изменения системной темы (только если выбрана 'system')
  useEffect(() => {
    if (!mounted || theme !== "system") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      const newResolvedTheme = e.matches ? "dark" : "light";
      setResolvedTheme(newResolvedTheme);
      applyTheme(newResolvedTheme);
    };

    // Современные браузеры
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
    // Старые браузеры (fallback)
    else {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, [theme, mounted]);

  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme: handleSetTheme, resolvedTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
