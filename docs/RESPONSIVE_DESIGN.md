# Адаптивный дизайн

## Обзор

Проект поддерживает адаптивный дизайн для всех устройств - от мобильных телефонов (320px) до ультрашироких экранов (1920px+), включая раскладные устройства.

## Breakpoints

Система breakpoints находится в `src/shared/lib/breakpoints.scss`:

```scss
$breakpoints: (
  xs: 320px,
  // Минимальная ширина (старые телефоны)
  sm: 640px,
  // Мобильные устройства (современные телефоны)
  md: 768px,
  // Планшеты (портретная ориентация)
  lg: 1024px,
  // Планшеты (ландшафтная) / маленькие ноутбуки
  xl: 1280px,
  // Десктопы
  2xl: 1536px,
  // Большие десктопы
  3xl: 1920px, // Ультраширокие экраны (21:9 и выше)
);
```

## Использование

### Импорт breakpoints

```scss
@import '@/shared/lib/breakpoints';
```

### Миксины

#### `@include respond-to($breakpoint)`

Mobile-first подход - применяет стили от указанного breakpoint и выше:

```scss
.element {
  font-size: 1rem;

  @include respond-to(md) {
    font-size: 1.25rem;
  }
}
```

#### `@include respond-below($breakpoint)`

Desktop-first подход - применяет стили до указанного breakpoint:

```scss
.element {
  font-size: 1.25rem;

  @include respond-below(md) {
    font-size: 1rem;
  }
}
```

#### `@include respond-between($min, $max)`

Применяет стили в диапазоне между двумя breakpoints:

```scss
.element {
  @include respond-between(sm, lg) {
    // Стили для планшетов
  }
}
```

#### `@include container`

Создает контейнер с ограничением максимальной ширины и адаптивными отступами:

```scss
.container {
  @include container;
}
```

#### `@include fluid-font($min-size, $max-size)`

Создает адаптивный размер шрифта:

```scss
.title {
  @include fluid-font(1.5rem, 3rem);
}
```

#### `@include orientation($orientation)`

Стили для определенной ориентации экрана:

```scss
.element {
  @include orientation(landscape) {
    // Стили для ландшафтной ориентации
  }
}
```

### Поддержка foldable устройств

#### `@include foldable-horizontal`

Стили для устройств с двумя горизонтальными панелями:

```scss
.grid {
  @include foldable-horizontal {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
}
```

#### `@include foldable-vertical`

Стили для устройств с двумя вертикальными панелями:

```scss
.layout {
  @include foldable-vertical {
    // Адаптация для вертикального foldable
  }
}
```

## Рекомендации

### Mobile-first подход

Всегда начинайте со стилей для мобильных устройств, затем добавляйте стили для больших экранов:

```scss
.button {
  width: 100%; // Мобильные по умолчанию

  @include respond-to(sm) {
    width: auto; // Десктоп
  }
}
```

### Минимальные размеры для touch-устройств

Используйте минимальную высоту 44px для интерактивных элементов:

```scss
.button {
  min-height: 44px;
}
```

### Предотвращение зума на iOS

Используйте `font-size: 16px` для полей ввода на мобильных:

```scss
.input {
  font-size: 16px; // Предотвращение зума на iOS

  @include respond-to(sm) {
    font-size: 1rem;
  }
}
```

### Hover эффекты

Используйте медиа-запрос для hover только на устройствах с курсором:

```scss
.card {
  @media (hover: hover) and (pointer: fine) {
    &:hover {
      transform: translateY(-4px);
    }
  }
}
```

### Максимальная ширина контента

На ультрашироких экранах контент ограничен 1400px для оптимальной читаемости:

```scss
.container {
  @include container; // max-width: 1400px с центрированием
}
```

## Поддерживаемые устройства

- **Мобильные телефоны**: 320px - 640px
- **Планшеты**: 641px - 1024px
- **Ноутбуки и десктопы**: 1025px - 1920px
- **Ультраширокие экраны**: 1921px+
- **Раскладные устройства**: Samsung Galaxy Fold, Microsoft Surface Duo и аналогичные

## Тестирование

Рекомендуется тестировать на следующих разрешениях:

- 320px (iPhone SE)
- 375px (iPhone 12/13/14)
- 768px (iPad)
- 1024px (iPad Pro)
- 1280px (Ноутбук)
- 1920px (Десктоп)
- 2560px+ (Ультраширокий)

## Дополнительные ресурсы

- [MDN: Media Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries)
- [MDN: Viewport Segments API](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/horizontal-viewport-segments)
- [CSS Container Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Container_Queries)
