# Руководство по тестированию

Этот документ описывает стратегию тестирования проекта и лучшие практики.

## Обзор

Проект использует два типа тестов:

1. **Vitest** - для модульных и интеграционных тестов (unit/integration tests)
2. **Playwright** - для end-to-end (E2E) тестов

## Структура тестов

### Vitest тесты

Тесты находятся рядом с тестируемым кодом:

```
src/
  shared/
    ui/
      Button/
        __tests__/
          Button.test.tsx
  features/
    contact-form/
      ui/
        __tests__/
          ContactForm.test.tsx
```

### Playwright тесты

E2E тесты находятся в директории `e2e/`:

```
e2e/
  navigation.spec.ts
  contact-form.spec.ts
  pages.spec.ts
  accessibility.spec.ts
```

## Запуск тестов

### Vitest тесты

```bash
# Запустить все тесты
pnpm test

# Запустить тесты в watch режиме
pnpm test:ui

# Запустить тесты с покрытием
pnpm test:coverage

# Запустить тесты для конкретного файла
pnpm test src/features/contact-form
```

### Playwright тесты

```bash
# Запустить все E2E тесты
pnpm test:e2e

# Запустить E2E тесты в UI режиме
pnpm test:e2e:ui

# Запустить тесты для конкретного файла
pnpm test:e2e e2e/navigation.spec.ts
```

## Принципы тестирования

### 1. Тестируйте поведение, а не реализацию

✅ **Хорошо:**

```typescript
it("должен показывать ошибку при пустом email", async () => {
  render(<ContactForm />);
  await user.type(screen.getByLabelText("Email"), "");
  await user.click(screen.getByRole("button", { name: /отправить/i }));
  expect(screen.getByText("Некорректный email")).toBeInTheDocument();
});
```

❌ **Плохо:**

```typescript
it("должен вызывать validateEmail", () => {
  const validateEmail = jest.spyOn(utils, "validateEmail");
  render(<ContactForm />);
  expect(validateEmail).toHaveBeenCalled();
});
```

### 2. Используйте семантические селекторы

✅ **Хорошо:**

```typescript
screen.getByRole("button", { name: /отправить/i });
screen.getByLabelText("Email");
screen.getByText("Сообщение отправлено");
```

❌ **Плохо:**

```typescript
screen.getByTestId("submit-btn");
screen.getByClassName("email-input");
```

### 3. Тестируйте пользовательские сценарии

Фокусируйтесь на том, что видит и делает пользователь, а не на внутренних деталях компонента.

### 4. Изолируйте тесты

Каждый тест должен быть независимым и не зависеть от других тестов.

## Моки и утилиты

### Моки Next.js

Для мокирования Next.js компонентов используйте:

```typescript
vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
  }),
}));
```

### Тестовые утилиты

Используйте хелперы из `src/test/helpers.tsx`:

```typescript
import { renderWithProviders, createMockLocalStorage } from "@/src/test/helpers";

// Рендер с провайдерами
renderWithProviders(<MyComponent />);

// Мок localStorage
const localStorage = createMockLocalStorage();
```

## Покрытие кода

Целевые показатели покрытия:

- **Shared слой**: 90%+
- **Features слой**: 80%+
- **Widgets слой**: 70%+
- **API routes**: 90%+

Проверить покрытие:

```bash
pnpm test:coverage
```

## Playwright тесты

### Лучшие практики

1. **Используйте data-testid только когда необходимо**

```typescript
// Предпочтительно
await page.getByRole("button", { name: /отправить/i }).click();

// Если нет другого способа
await page.getByTestId("submit-button").click();
```

2. **Мокайте API запросы**

```typescript
await page.route("**/api/contact", async (route) => {
  await route.fulfill({
    status: 200,
    body: JSON.stringify({ message: "Успешно" }),
  });
});
```

3. **Тестируйте на разных размерах экрана**

```typescript
test("должна работать на мобильных устройствах", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  // ...
});
```

## Отладка тестов

### Vitest

```bash
# Запустить тесты в UI режиме для отладки
pnpm test:ui

# Запустить конкретный тест
pnpm test src/features/contact-form/ui/__tests__/ContactForm.test.tsx
```

### Playwright

```bash
# Запустить в UI режиме
pnpm test:e2e:ui

# Запустить в headed режиме
pnpm test:e2e --headed

# Запустить с замедлением
pnpm test:e2e --slow-mo=1000
```

## CI/CD

Тесты автоматически запускаются в CI/CD пайплайне:

- Vitest тесты запускаются на каждом коммите
- Playwright тесты запускаются на pull requests
- Coverage проверяется на каждом коммите

## Полезные ресурсы

- [Vitest документация](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Playwright документация](https://playwright.dev/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

## FAQ

### Как добавить тест для нового компонента?

1. Создайте файл `__tests__/ComponentName.test.tsx` рядом с компонентом
2. Напишите тесты, следуя принципам выше
3. Убедитесь, что тесты проходят: `pnpm test ComponentName`

### Как мокировать внешние зависимости?

Используйте `vi.mock()` в начале файла теста:

```typescript
vi.mock("external-library", () => ({
  someFunction: vi.fn(),
}));
```

### Как тестировать асинхронные операции?

Используйте `waitFor` и `findBy` queries:

```typescript
await waitFor(() => {
  expect(screen.getByText("Успешно")).toBeInTheDocument();
});
```

### Как тестировать компоненты с провайдерами?

Используйте `renderWithProviders` из `src/test/helpers.tsx`:

```typescript
import { renderWithProviders } from "@/src/test/helpers";

renderWithProviders(<MyComponent />);
```
