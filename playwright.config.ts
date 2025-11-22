import { defineConfig, devices } from "@playwright/test";

/**
 * Конфигурация Playwright для E2E тестов
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: "./e2e",
  /* Максимальное время выполнения одного теста */
  timeout: 30 * 1000,
  expect: {
    /* Максимальное время ожидания для expect */
    timeout: 5000,
  },
  /* Запускать тесты в файлах параллельно */
  fullyParallel: true,
  /* Не запускать тесты в CI, если не указано явно */
  forbidOnly: !!process.env.CI,
  /* Повторно запускать тесты при сбое в CI */
  retries: process.env.CI ? 2 : 0,
  /* Оптимальное количество воркеров для CI */
  workers: process.env.CI ? 1 : undefined,
  /* Конфигурация репортеров */
  reporter: "html",
  /* Общие настройки для всех проектов */
  use: {
    /* Base URL для использования в действиях, таких как `await page.goto('/')` */
    baseURL: process.env.PLAYWRIGHT_TEST_BASE_URL || "http://localhost:3000",
    /* Собирать трейс при повторе неудачного теста */
    trace: "on-first-retry",
    /* Скриншоты при неудаче */
    screenshot: "only-on-failure",
    /* Видео при неудаче */
    video: "retain-on-failure",
  },

  /* Настройка проектов для разных браузеров */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
    /* Мобильные устройства */
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] },
    },
    {
      name: "Mobile Safari",
      use: { ...devices["iPhone 12"] },
    },
  ],

  /* Запускать локальный dev сервер перед тестами */
  webServer: {
    command: "pnpm dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
