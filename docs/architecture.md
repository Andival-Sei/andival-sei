# Архитектура проекта

Проект организован по методологии **Feature-Sliced Design (FSD)** с использованием Next.js 16 App Router.

## Полная структура проекта

```
src/
├── app/                              # Next.js App Router + FSD слой App
│   ├── layout.tsx                    # Главный layout
│   ├── layout.module.scss
│   ├── page.tsx                      # Главная страница (роут /)
│   ├── about/
│   │   └── page.tsx                  # Страница "О себе" (роут /about)
│   ├── projects/
│   │   └── page.tsx                  # Страница "Проекты" (роут /projects)
│   ├── contact/
│   │   └── page.tsx                  # Страница "Контакты" (роут /contact)
│   ├── providers/                    # FSD слой App - провайдеры
│   │   ├── AppProviders.tsx
│   │   └── index.ts
│   └── styles/                       # Глобальные стили
│       └── globals.scss
│
├── processes/                        # Бизнес-процессы
│   ├── project-loading/
│   │   ├── model/
│   │   │   └── useProjectLoading.ts
│   │   ├── ui/
│   │   │   └── ProjectLoadingProvider.tsx
│   │   └── index.ts
│   └── form-submission/
│       ├── model/
│       │   └── useFormSubmission.ts
│       ├── ui/
│       │   └── FormSubmissionFlow.tsx
│       └── index.ts
│
├── screens/                          # Страницы (композиция)
│   ├── home/
│   │   ├── ui/
│   │   │   ├── HomePage.tsx
│   │   │   └── HomePage.module.scss
│   │   └── index.ts
│   ├── about/
│   │   ├── ui/
│   │   │   ├── AboutPage.tsx
│   │   │   └── AboutPage.module.scss
│   │   └── index.ts
│   ├── projects/
│   │   ├── ui/
│   │   │   ├── ProjectsPage.tsx
│   │   │   └── ProjectsPage.module.scss
│   │   └── index.ts
│   └── contact/
│       ├── ui/
│       │   ├── ContactPage.tsx
│       │   └── ContactPage.module.scss
│       └── index.ts
│
├── widgets/                          # Виджеты (крупные блоки UI)
│   ├── header/
│   │   ├── ui/
│   │   │   ├── Header.tsx
│   │   │   └── Header.module.scss
│   │   └── index.ts
│   ├── footer/
│   │   ├── ui/
│   │   │   ├── Footer.tsx
│   │   │   └── Footer.module.scss
│   │   └── index.ts
│   ├── hero-section/
│   │   ├── ui/
│   │   │   ├── HeroSection.tsx
│   │   │   └── HeroSection.module.scss
│   │   └── index.ts
│   ├── project-list/
│   │   ├── model/
│   │   │   └── useProjectList.ts
│   │   ├── ui/
│   │   │   ├── ProjectList.tsx
│   │   │   └── ProjectList.module.scss
│   │   └── index.ts
│   ├── project-card/
│   │   ├── ui/
│   │   │   ├── ProjectCard.tsx
│   │   │   └── ProjectCard.module.scss
│   │   └── index.ts
│   └── skills-section/
│       ├── ui/
│       │   ├── SkillsSection.tsx
│       │   └── SkillsSection.module.scss
│       └── index.ts
│
├── features/                         # Фичи (функциональность)
│   ├── contact-form/
│   │   ├── ui/
│   │   │   ├── ContactForm.tsx
│   │   │   └── ContactForm.module.scss
│   │   ├── model/
│   │   │   └── useContactForm.ts
│   │   ├── api/
│   │   │   └── sendMessage.ts
│   │   └── index.ts
│   ├── project-filter/
│   │   ├── ui/
│   │   │   ├── ProjectFilter.tsx
│   │   │   └── ProjectFilter.module.scss
│   │   ├── model/
│   │   │   └── useProjectFilter.ts
│   │   └── index.ts
│   ├── project-search/
│   │   ├── ui/
│   │   │   ├── ProjectSearch.tsx
│   │   │   └── ProjectSearch.module.scss
│   │   ├── model/
│   │   │   └── useProjectSearch.ts
│   │   └── index.ts
│   └── theme-toggle/
│       ├── ui/
│       │   ├── ThemeToggle.tsx
│       │   └── ThemeToggle.module.scss
│       ├── model/
│       │   └── useTheme.ts
│       └── index.ts
│
├── entities/                         # Сущности (бизнес-модели)
│   ├── project/
│   │   ├── model/
│   │   │   ├── types.ts
│   │   │   └── index.ts
│   │   ├── api/
│   │   │   └── projectApi.ts
│   │   ├── lib/
│   │   │   └── utils.ts
│   │   └── index.ts
│   ├── skill/
│   │   ├── model/
│   │   │   ├── types.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── experience/
│   │   ├── model/
│   │   │   ├── types.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   └── contact/
│       ├── model/
│       │   ├── types.ts
│       │   └── index.ts
│       └── index.ts
│
└── shared/                           # Переиспользуемое
    ├── ui/                           # UI компоненты
    │   └── Button/
    │       ├── Button.tsx
    │       ├── Button.module.scss
    │       ├── Button.test.tsx
    │       └── index.ts
    ├── lib/                          # Утилиты
    │   ├── classNames.ts
    │   └── classNames.test.ts
    ├── api/                          # API клиент
    │   └── index.ts
    ├── config/                       # Конфигурация
    │   └── index.ts
    └── types/                        # Общие типы
        └── index.ts
```

## Структура FSD

### Слои (от верхнего к нижнему)

```
app → processes → screens → widgets → features → entities → shared
```

### Описание слоев

#### 🎯 **app/** - Приложение

Глобальные настройки и инфраструктура:

- `app/providers/` - Провайдеры (Theme, ProjectLoading)
- `app/styles/` - Глобальные стили
- Next.js роутинг (`app/page.tsx`, `app/about/page.tsx`, etc.)

#### 🔄 **processes/** - Бизнес-процессы

Сложные многошаговые процессы:

- `project-loading/` - Процесс загрузки проектов (кеширование, обработка ошибок)
- `form-submission/` - Процесс отправки формы (валидация, отправка, уведомления)

#### 📄 **screens/** - Страницы

Композиция виджетов и фич в страницы:

- `home/` - Главная страница
- `about/` - О себе
- `projects/` - Проекты
- `contact/` - Контакты

#### 🧩 **widgets/** - Виджеты

Крупные самостоятельные блоки UI:

- `header/` - Шапка сайта
- `footer/` - Подвал
- `hero-section/` - Герой секция
- `project-list/` - Список проектов
- `project-card/` - Карточка проекта
- `skills-section/` - Секция навыков

#### ⚡ **features/** - Фичи

Конкретные пользовательские сценарии:

- `contact-form/` - Форма обратной связи
- `project-filter/` - Фильтрация проектов
- `project-search/` - Поиск проектов
- `theme-toggle/` - Переключение темы

#### 📦 **entities/** - Сущности

Бизнес-модели и их логика:

- `project/` - Проект (типы, API, утилиты)
- `skill/` - Навык
- `experience/` - Опыт работы
- `contact/` - Контакт

#### 🔧 **shared/** - Переиспользуемое

Общие компоненты и утилиты без бизнес-логики:

- `ui/` - UI компоненты (Button, etc.)
- `lib/` - Утилиты (classNames, etc.)
- `api/` - API клиент
- `config/` - Конфигурация
- `types/` - Общие типы

## Правила импортов

### Разрешенные импорты (сверху вниз):

✅ **Разрешено:**

- `screens` → `widgets`, `features`, `entities`, `shared`
- `widgets` → `features`, `entities`, `shared`
- `features` → `entities`, `shared`
- `entities` → `shared`
- `shared` → только внешние библиотеки

❌ **Запрещено:**

- Импорт из верхних слоев в нижние
- Импорт между слайсами одного слоя (кроме shared)
- Циклические зависимости

## Примеры структуры

### Entity (project)

```
entities/project/
├── model/
│   ├── types.ts      # Типы данных
│   └── index.ts      # Экспорты
├── api/
│   └── projectApi.ts # API методы
└── lib/
    └── utils.ts      # Утилиты
```

### Feature (contact-form)

```
features/contact-form/
├── ui/
│   └── ContactForm.tsx        # UI компонент
├── model/
│   └── useContactForm.ts      # Бизнес-логика (хук)
└── api/
    └── sendMessage.ts         # API вызовы
```

### Widget (header)

```
widgets/header/
├── ui/
│   ├── Header.tsx
│   └── Header.module.scss
└── index.ts
```

## Next.js интеграция

### Роутинг

Next.js App Router находится в `app/` и импортирует страницы из `screens/`:

```tsx
// app/page.tsx
import { HomePage } from '@/screens/home';
export default function Home() {
  return <HomePage />;
}
```

### Провайдеры

Глобальные провайдеры в `app/providers/AppProviders.tsx`:

- ThemeProvider (next-themes)
- ProjectLoadingProvider

## Стилизация

- **SCSS модули** для компонентов
- **CSS переменные** для тем (светлая/темная)
- **Глобальные стили** в `app/styles/globals.scss`

## Тестирование

- **Unit тесты** (Vitest) - в папках компонентов
- **E2E тесты** (Playwright) - в `e2e/`

## Преимущества FSD

1. **Масштабируемость** - легко добавлять новые фичи
2. **Изоляция** - каждый слой имеет четкую ответственность
3. **Переиспользование** - shared компоненты доступны везде
4. **Тестируемость** - изолированные модули легко тестировать
5. **Понятность** - структура интуитивно понятна
