# Пример использования SCSS модулей с темами

Этот пример демонстрирует, как использовать SCSS модули в проекте с системой тем.

## Основные принципы

1. **Использование CSS переменных**: Все цвета берутся из CSS переменных, определённых в `app/globals.css`
2. **Data-атрибуты**: Темы применяются через `data-theme` атрибут на элементе `<html>`
3. **Плавные переходы**: Все изменения цветов должны иметь плавные переходы

## Пример использования

```tsx
import styles from './ExampleComponent.module.scss';

export function ExampleComponent() {
  return (
    <div className={styles.example}>
      <h2 className={styles.example__title}>Заголовок</h2>
      <p className={styles.example__content}>Содержимое</p>
    </div>
  );
}
```

## Доступные CSS переменные

Все переменные определены в `app/globals.css`:

- `--background` / `--foreground` - основные цвета
- `--muted` / `--muted-foreground` - приглушенные цвета
- `--accent` / `--accent-foreground` - акцентные цвета
- `--border` / `--ring` - границы и фокус
- `--card` / `--card-foreground` - цвета карточек
- `--primary` / `--primary-foreground` - основные цвета
- `--secondary` / `--secondary-foreground` - вторичные цвета
- `--destructive` / `--destructive-foreground` - цвета для деструктивных действий

## Рекомендации

1. Всегда используйте CSS переменные вместо хардкода цветов
2. Добавляйте плавные переходы для всех свойств, связанных с цветом
3. Используйте вложенные селекторы для организации кода
4. При необходимости используйте data-атрибуты для специфичных стилей тем

