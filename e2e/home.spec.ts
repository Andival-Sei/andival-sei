import { test, expect } from '@playwright/test';

test.describe('Главная страница', () => {
  test('должна отображать заголовок', async ({ page }) => {
    await page.goto('/');

    const title = page.getByRole('heading', { name: /добро пожаловать/i });
    await expect(title).toBeVisible();
  });

  test('должна отображать кнопки', async ({ page }) => {
    await page.goto('/');

    const primaryButton = page.getByRole('button', { name: /начать работу/i });
    const outlineButton = page.getByRole('button', { name: /узнать больше/i });

    await expect(primaryButton).toBeVisible();
    await expect(outlineButton).toBeVisible();
  });

  test('кнопки должны быть кликабельными', async ({ page }) => {
    await page.goto('/');

    const primaryButton = page.getByRole('button', { name: /начать работу/i });
    await expect(primaryButton).toBeEnabled();
  });

  test('должна иметь правильный title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Andival SEI/i);
  });
});
