import { test, expect } from "@playwright/test";

test.describe("Главная страница", () => {
  test("должна загружаться корректно", async ({ page }) => {
    await page.goto("/");

    // Проверяем, что страница загрузилась
    await expect(page).toHaveTitle(/Portfolio|Andival/i);

    // Проверяем наличие основных элементов
    // TODO: Добавить проверки для конкретных элементов вашего приложения
  });

  test("должна иметь корректную структуру", async ({ page }) => {
    await page.goto("/");

    // Проверяем наличие основных секций
    // TODO: Добавить проверки для header, footer, main content
  });
});

test.describe("Навигация", () => {
  test("должна работать корректно", async ({ page }) => {
    await page.goto("/");

    // TODO: Добавить проверки навигации между страницами
    // Например: await page.click('text=О себе'); await expect(page).toHaveURL('/about');
  });
});
