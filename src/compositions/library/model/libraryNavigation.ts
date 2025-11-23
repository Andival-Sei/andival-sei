export type LibraryEntry = {
  title: string;
  description: string;
  slug: string[];
  path: string;
  category: string;
};

export type LibraryCategory = {
  title: string;
  slug: string;
  topics: Array<Omit<LibraryEntry, "slug" | "path" | "category">>;
};

export const LIBRARY_BASE_PATH = "/lab/library";

export const libraryCategories: LibraryCategory[] = [
  {
    title: "Языки программирования",
    slug: "languages",
    topics: [
      {
        title: "HTML",
        description:
          "Семантика, структура документа, формы, доступность и лучшие практики разметки.",
      },
      {
        title: "CSS",
        description:
          "Макеты, типографика, адаптивность, кастомные свойства и современные возможности.",
      },
      {
        title: "SCSS",
        description:
          "Препроцессор для CSS: вложенность, миксины, переменные и архитектура стилей.",
      },
      {
        title: "JavaScript",
        description:
          "Ядро клиентской логики: DOM, асинхронность, паттерны, модули и экосистема.",
      },
      {
        title: "TypeScript",
        description:
          "Строгая типизация поверх JS: модели данных, утилиты типов и стабильные API.",
      },
    ],
  },
  {
    title: "Инструменты сборки",
    slug: "build-tools",
    topics: [
      {
        title: "Webpack",
        description:
          "Классический бандлер с гибкой конфигурацией, загрузчиками и плагинами для любых задач.",
      },
      {
        title: "Vite",
        description:
          "Dev-сервер на esbuild и сборка через Rollup: быстрые итерации и удобный DX.",
      },
    ],
  },
  {
    title: "Фреймворки и библиотеки",
    slug: "frameworks",
    topics: [
      {
        title: "Redux",
        description:
          "Хранилище состояния, редьюсеры, middleware и best practices для управления данными.",
      },
      {
        title: "React",
        description:
          "Компоненты, хуки, контекст, эффекты и оптимизация рендера в современном React.",
      },
      {
        title: "Next.js",
        description:
          "Маршрутизация App Router, SSR/SSG, data fetching, middleware и продакшн-сборки.",
      },
    ],
  },
  {
    title: "IDE и редакторы",
    slug: "ide",
    topics: [
      {
        title: "VS Code",
        description:
          "Расширения, настройки, шорткаты и улучшение продуктивности в VS Code.",
      },
      {
        title: "Cursor",
        description:
          "AI-редактор с подсказками, командной палитрой и автодополнениями для кода.",
      },
      {
        title: "Antigravity",
        description:
          "Экспериментальная IDE с акцентом на AI-подсказках и визуальных сценариях работы.",
      },
      {
        title: "WebStorm",
        description:
          "JetBrains IDE: рефакторинги, инспекции, дебаг и глубокие фичи для фронтенда.",
      },
      {
        title: "Git",
        description:
          "Базовые и продвинутые команды Git, ветвление, ревью, хуки и рабочие процессы.",
      },
    ],
  },
  {
    title: "AI помощники",
    slug: "ai-assistants",
    topics: [
      {
        title: "GPT",
        description:
          "Работа с GPT-моделями: промтинг, ограничения, плагины и интеграции.",
      },
      {
        title: "Claude",
        description:
          "Советник с упором на длинный контекст: стратегии, ограничения и кейсы.",
      },
      {
        title: "Gemini",
        description:
          "Мультимодальный ассистент: работа с кодом, изображениями и API из одной точки.",
      },
    ],
  },
];

export const libraryMainEntry: LibraryEntry = {
  title: "Библиотека",
  description:
    "Короткие заметки по инструментам и технологиям. Стартовая точка перед тем, как углубляться в детали.",
  slug: ["main"],
  path: `${LIBRARY_BASE_PATH}/main`,
  category: "Обзор",
};

export const slugify = (value: string) =>
  value.toLowerCase().replace(/\s+/g, "-");

export const libraryEntries: LibraryEntry[] = [
  libraryMainEntry,
  ...libraryCategories.flatMap((category) =>
    category.topics.map((topic) => ({
      ...topic,
      slug: [category.slug, slugify(topic.title)],
      path: `${LIBRARY_BASE_PATH}/${category.slug}/${slugify(topic.title)}`,
      category: category.title,
    }))
  ),
];

export function getLibraryEntry(
  slug: string[] = ["main"]
): LibraryEntry | undefined {
  const normalized = slug.length > 0 ? slug : ["main"];
  const key = normalized.join("/");
  return libraryEntries.find((item) => item.slug.join("/") === key);
}

export function findLibraryEntry(slug: string[] = ["main"]): LibraryEntry {
  return getLibraryEntry(slug) ?? libraryMainEntry;
}
