import { defineConfig, devices } from '@playwright/test';

/**
 * Конфигурация Playwright для E2E тестирования
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  // Директория с тестами
  testDir: './e2e',

  // Запускать все тесты параллельно
  fullyParallel: true,

  // Запретить test.only на CI
  forbidOnly: !!process.env.CI,

  // Повторы на CI
  retries: process.env.CI ? 2 : 0,

  // Количество воркеров на CI
  workers: process.env.CI ? 1 : undefined,

  // Репортер
  reporter: process.env.CI ? 'github' : 'html',

  // Общие настройки для всех тестов
  use: {
    // Базовый URL для действий типа `await page.goto('/')`
    baseURL: 'http://localhost:3000',

    // Собирать trace при повторе упавшего теста
    trace: 'on-first-retry',

    // Скриншоты при ошибках
    screenshot: 'only-on-failure',

    // Видео при ошибках
    video: 'retain-on-failure',
  },

  // Проекты для разных браузеров
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  // Запуск локального dev сервера перед тестами
  webServer: {
    command: 'pnpm dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
