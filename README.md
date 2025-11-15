# Andival SEI - Portfolio

Современное портфолио, созданное с использованием Next.js 16, TypeScript, SCSS модулей и лучших практик разработки.

## 🚀 Технологии

- **Next.js 16** - React фреймворк с App Router
- **TypeScript** - Статическая типизация
- **SCSS модули** - Модульная стилизация компонентов
- **ESLint + Prettier** - Качество кода и форматирование
- **Husky + lint-staged** - Git hooks для проверки кода
- **Vitest** - Быстрое unit-тестирование
- **Playwright** - E2E тестирование
- **pnpm** - Быстрый менеджер пакетов

## 📦 Установка

```bash
# Установка зависимостей
pnpm install

# Установка браузеров для Playwright (только при первом запуске)
pnpm exec playwright install --with-deps
```

## 🛠️ Разработка

```bash
# Запуск dev сервера
pnpm dev

# Сборка для production
pnpm build

# Запуск production сервера
pnpm start
```

## 🧪 Тестирование

```bash
# Unit тесты (Vitest)
pnpm test

# Unit тесты с UI
pnpm test:ui

# Unit тесты с покрытием
pnpm test:coverage

# E2E тесты (Playwright)
pnpm test:e2e

# E2E тесты с UI
pnpm test:e2e:ui

# E2E тесты в headed режиме
pnpm test:e2e:headed
```

## 🔍 Проверка кода

```bash
# Линтинг
pnpm lint

# Линтинг с автоисправлением
pnpm lint:fix

# Проверка форматирования
pnpm format:check

# Форматирование всех файлов
pnpm format

# Проверка типов TypeScript
pnpm type-check
```

## 📁 Структура проекта

```
andival-sei/
├── src/
│   ├── app/              # Next.js App Router страницы
│   ├── components/       # React компоненты
│   ├── lib/              # Утилиты и хелперы
│   └── styles/           # Глобальные стили
├── e2e/                  # E2E тесты (Playwright)
├── .husky/               # Git hooks
├── public/               # Статические файлы
└── ...config files       # Конфигурационные файлы
```

## 🎨 Стилизация

Проект использует SCSS модули для стилизации компонентов. Пример:

```tsx
// Button.module.scss
.button {
  padding: 0.75rem 1.5rem;
  // ...
}

// Button.tsx
import styles from './Button.module.scss';
<button className={styles.button}>Click me</button>
```

## 🚢 Деплой

Проект готов к деплою на Vercel:

1. Подключите репозиторий к Vercel
2. Vercel автоматически определит настройки Next.js
3. Деплой произойдет автоматически при push в main ветку

Или используйте Vercel CLI:

```bash
pnpm add -g vercel
vercel
```

## 📝 Git Hooks

При каждом коммите автоматически запускаются:

- ESLint проверка с автоисправлением
- Prettier форматирование
- Проверка только измененных файлов (lint-staged)

## 🔧 Конфигурация

- **ESLint**: `eslint.config.mjs` - интеграция с Prettier и Next.js правилами
- **Prettier**: `.prettierrc` - настройки форматирования
- **Vitest**: `vitest.config.ts` - конфигурация unit тестов
- **Playwright**: `playwright.config.ts` - конфигурация E2E тестов
- **TypeScript**: `tsconfig.json` - настройки TypeScript

## 📚 Дополнительные ресурсы

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Vitest Documentation](https://vitest.dev)
- [Playwright Documentation](https://playwright.dev)
- [SCSS Documentation](https://sass-lang.com/documentation)

## 📄 Лицензия

MIT
