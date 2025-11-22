# Архитектура проекта

## Обзор

Проект использует **Feature-Sliced Design (FSD)** архитектуру, адаптированную для Next.js 16 с App Router. FSD обеспечивает масштабируемую и поддерживаемую структуру кода.

## Структура проекта

```
andival-sei/
├── app/                    # Next.js App Router (роутинг)
│   ├── layout.tsx          # Корневой layout с провайдерами
│   ├── page.tsx            # Главная страница
│   ├── about/page.tsx      # Страница "О себе"
│   ├── projects/page.tsx    # Страница проектов
│   ├── contact/page.tsx    # Страница контактов
│   └── globals.css          # Глобальные стили
│
├── src/                     # FSD слои
│   ├── app/                 # Инициализация приложения
│   ├── processes/           # Бизнес-процессы
│   ├── compositions/        # Композиция страниц (переименовано из pages для избежания конфликта с Next.js)
│   ├── widgets/             # Крупные блоки UI
│   ├── features/            # Функциональные возможности
│   ├── entities/            # Бизнес-сущности
│   └── shared/              # Переиспользуемый код
│
└── docs/                    # Документация
    └── ARCHITECTURE.md      # Этот файл
```

## Слои FSD

### 1. `app/` - Инициализация приложения

**Назначение**: Инициализация приложения, провайдеры, глобальные настройки.

**Структура**:

```
src/app/
├── providers/          # React провайдеры
│   ├── ThemeProvider.tsx
│   └── index.ts
└── styles/            # Глобальные стили (если нужны)
```

**Примеры**:

- `ThemeProvider` - провайдер темы (светлая/тёмная)
- Другие провайдеры (если понадобятся)

**Правила**:

- Может импортировать только из `shared`
- Используется в `app/layout.tsx`

---

### 2. `processes/` - Бизнес-процессы

**Назначение**: Сложные бизнес-процессы, которые координируют работу нескольких фич.

**Структура**:

```
src/processes/
└── send-contact-form/
    ├── ui/
    │   └── SendContactForm.tsx
    └── index.ts
```

**Примеры**:

- `send-contact-form` - процесс отправки контактной формы

**Правила**:

- Может импортировать из `widgets`, `features`, `entities`, `shared`
- Используется в `compositions` или `widgets`

---

### 3. `compositions/` - Композиция страниц

**Назначение**: Композиция виджетов и фич в полноценные страницы.

**Примечание**: Слой переименован из `pages` в `compositions` для избежания конфликта с Next.js, который использует директорию `pages/` для Pages Router.

**Структура**:

```
src/compositions/
├── home/
│   ├── ui/
│   │   └── HomePage.tsx
│   └── index.ts
├── about/
├── projects/
└── contact/
```

**Примеры**:

- `HomePage` - главная страница
- `AboutPage` - страница "О себе"
- `ProjectsPage` - страница проектов
- `ContactPage` - страница контактов

**Правила**:

- Может импортировать из `widgets`, `features`, `entities`, `shared`
- Используется в `app/*/page.tsx`

**Пример использования**:

```typescript
// app/page.tsx
import { HomePage } from "@/src/compositions/home";

export default function Home() {
  return <HomePage />;
}
```

---

### 4. `widgets/` - Крупные блоки UI

**Назначение**: Крупные составные блоки интерфейса, состоящие из фич и сущностей.

**Структура**:

```
src/widgets/
├── header/
│   ├── ui/
│   │   └── Header.tsx
│   └── index.ts
├── footer/
├── hero-section/
├── about-section/
├── projects-section/
└── contact-section/
```

**Примеры**:

- `Header` - шапка сайта с навигацией
- `Footer` - подвал сайта
- `HeroSection` - главная секция
- `AboutSection` - секция "О себе"
- `ProjectsSection` - секция проектов
- `ContactSection` - секция контактов

**Правила**:

- Может импортировать из `features`, `entities`, `shared`
- Используется в `pages` или других `widgets`

---

### 5. `features/` - Функциональные возможности

**Назначение**: Конкретные пользовательские сценарии и интерактивные элементы.

**Структура**:

```
src/features/
├── theme-toggle/
│   ├── ui/
│   │   └── ThemeToggle.tsx
│   └── index.ts
├── project-card/
├── contact-form/
└── navigation/
```

**Примеры**:

- `theme-toggle` - переключатель темы
- `project-card` - карточка проекта
- `contact-form` - форма обратной связи
- `navigation` - навигационное меню

**Правила**:

- Может импортировать из `entities`, `shared`
- Может содержать `model/` для бизнес-логики
- Используется в `widgets` или `pages`

---

### 6. `entities/` - Бизнес-сущности

**Назначение**: Бизнес-сущности приложения с их типами, данными и UI компонентами.

**Структура**:

```
src/entities/
├── project/
│   ├── model/
│   │   ├── types.ts
│   │   └── project-data.ts
│   ├── ui/
│   │   └── ProjectPreview.tsx
│   └── index.ts
├── skill/
└── contact/
```

**Примеры**:

- `project` - сущность проекта
- `skill` - сущность навыка
- `contact` - сущность контакта

**Правила**:

- Может импортировать только из `shared`
- Содержит типы, данные и UI компоненты для отображения сущности
- Используется в `features`, `widgets`, `pages`

**Структура сущности**:

- `model/types.ts` - TypeScript типы
- `model/*-data.ts` - данные (заглушки или реальные данные)
- `ui/` - UI компоненты для отображения сущности

---

### 7. `shared/` - Переиспользуемый код

**Назначение**: Переиспользуемый код, не привязанный к бизнес-логике.

**Структура**:

```
src/shared/
├── ui/              # Базовые UI компоненты
│   ├── Button/
│   ├── Card/
│   ├── Section/
│   ├── Link/
│   └── index.ts
├── lib/             # Утилиты
│   ├── utils.ts
│   └── constants.ts
├── config/          # Конфигурация
│   └── site.ts
└── types/           # Общие типы
    └── common.ts
```

**Примеры**:

- `Button` - кнопка (из Shadcn/ui)
- `Card` - карточка с подкомпонентами (CardHeader, CardTitle, CardDescription, CardContent, CardFooter) (из Shadcn/ui)
- `Input`, `Textarea`, `Label` - компоненты форм (из Shadcn/ui)
- `Badge` - бейдж для тегов (из Shadcn/ui)
- `Dialog` - модальное окно (из Shadcn/ui)
- `DropdownMenu` - выпадающее меню (из Shadcn/ui)
- `Tabs` - вкладки (из Shadcn/ui)
- `Separator` - разделитель (из Shadcn/ui)
- `Section` - секция (кастомный компонент)
- `Link` - ссылка (кастомный компонент)
- `utils.ts` - утилиты (cn, formatters и т.д.)
- `constants.ts` - константы
- `site.ts` - конфигурация сайта

**UI компоненты (Shadcn/ui)**:

Проект использует [Shadcn/ui](https://ui.shadcn.com/) - библиотеку доступных и кастомизируемых UI компонентов на базе Radix UI.

**Добавление новых компонентов Shadcn/ui**:

```bash
# Добавить компонент через CLI
npx shadcn@latest add <component-name>

# Компонент будет создан в src/shared/ui/<component-name>/
# Не забудьте обновить src/shared/ui/index.ts для экспорта
```

**Структура компонентов Shadcn/ui**:

Все компоненты Shadcn/ui размещаются в `src/shared/ui/` с сохранением структуры FSD:

- Каждый компонент в своей папке (PascalCase)
- Файл компонента: `ComponentName.tsx`
- Экспорт через `index.ts`
- Все компоненты экспортируются из `src/shared/ui/index.ts`

**Правила**:

- Не может импортировать из других слоёв FSD
- Используется во всех слоях
- Компоненты Shadcn/ui можно кастомизировать напрямую в коде

---

## Правила импортов

### Иерархия слоёв

Слои могут импортировать только из слоёв **ниже** себя:

```
app → processes → compositions → widgets → features → entities → shared
```

### Примеры правильных импортов

✅ **Правильно**:

```typescript
// compositions/home может импортировать из widgets, features, entities, shared
import { Header } from "@/src/widgets/header";
import { HeroSection } from "@/src/widgets/hero-section";

// widgets/header может импортировать из features, entities, shared
import { Navigation } from "@/src/features/navigation";
import { ThemeToggle } from "@/src/features/theme-toggle";
import { Button } from "@/src/shared/ui";

// features/project-card может импортировать из entities, shared
import { Project } from "@/src/entities/project";
import { Card } from "@/src/shared/ui";

// entities/project может импортировать только из shared
import type { Optional } from "@/src/shared/types/common";
```

❌ **Неправильно**:

```typescript
// entities/project НЕ может импортировать из features
import { ProjectCard } from "@/src/features/project-card"; // ❌

// features НЕ может импортировать из widgets
import { Header } from "@/src/widgets/header"; // ❌

// shared НЕ может импортировать из других слоёв
import { Project } from "@/src/entities/project"; // ❌
```

### Внутри слоя

Внутри одного слоя можно импортировать только из своих сегментов (фич/виджетов/сущностей).

✅ **Правильно**:

```typescript
// widgets/header может импортировать из widgets/footer
import { Footer } from "@/src/widgets/footer";
```

❌ **Неправильно**:

```typescript
// features/theme-toggle НЕ должен импортировать из features/contact-form
// (если нет прямой необходимости)
```

---

## TypeScript алиасы

В `tsconfig.json` настроены следующие алиасы:

- `@/*` → корень проекта
- `@/src/*` → `src/*`
- `@/app/*` → `app/*`

**Примеры использования**:

```typescript
import { Button } from "@/src/shared/ui";
import { HomePage } from "@/src/compositions/home";
import { Header } from "@/src/widgets/header";
```

---

## Next.js App Router интеграция

### Роутинг

Роутинг осуществляется через директорию `app/`:

- `app/page.tsx` → главная страница
- `app/about/page.tsx` → страница "О себе"
- `app/projects/page.tsx` → страница проектов
- `app/contact/page.tsx` → страница контактов

### Layout

`app/layout.tsx` содержит:

- Глобальные метаданные
- Провайдеры (ThemeProvider и т.д.)
- Глобальные стили

### Страницы

Каждая страница в `app/*/page.tsx` - это тонкая обёртка, которая импортирует компонент страницы из `src/compositions/`:

```typescript
// app/page.tsx
import { HomePage } from "@/src/compositions/home";

export default function Home() {
  return <HomePage />;
}
```

---

## Структура компонента

Каждый компонент в FSD следует структуре:

```
feature-name/
├── ui/
│   └── FeatureName.tsx    # UI компонент
├── model/                  # Бизнес-логика (опционально)
│   └── useFeature.ts
└── index.ts                # Публичный API
```

**Публичный API** (`index.ts`):

```typescript
export { FeatureName } from "./ui/FeatureName";
export type { FeatureNameProps } from "./ui/FeatureName";
```

---

## TODO и заглушки

В проекте используются TODO комментарии для обозначения мест, требующих реализации:

```typescript
// TODO: Реализовать функциональность X
// TODO: Добавить валидацию
// TODO: Интегрировать с API
```

Все компоненты содержат заглушки с базовой структурой и TODO комментариями для дальнейшей разработки.

---

## Рекомендации по разработке

1. **Следуйте правилам импортов** - не нарушайте иерархию слоёв
2. **Используйте публичный API** - импортируйте через `index.ts`
3. **Добавляйте типы** - используйте TypeScript для всех компонентов
4. **Документируйте TODO** - оставляйте комментарии для будущей реализации
5. **Переиспользуйте код** - выносите общее в `shared`
6. **Изолируйте логику** - бизнес-логика в `model/`, UI в `ui/`

---

## Дополнительные ресурсы

- [Feature-Sliced Design документация](https://feature-sliced.design/)
- [Next.js App Router документация](https://nextjs.org/docs/app)
- [TypeScript документация](https://www.typescriptlang.org/docs/)

---

## Обновления

Этот документ будет обновляться по мере развития проекта. При изменении архитектуры обновите соответствующие разделы.
