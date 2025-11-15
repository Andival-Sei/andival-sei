import { test, expect } from '@playwright/test';

test.describe('Главная страница', () => {
  test('должна отображать заголовок', async ({ page }) => {
    await page.goto('/');

    const title = page.getByRole('heading', { name: /привет, я разработчик/i });
    await expect(title).toBeVisible();
  });

  test('должна отображать кнопки в hero секции', async ({ page }) => {
    await page.goto('/');

    const primaryButton = page.getByRole('button', { name: /посмотреть проекты/i });
    const outlineButton = page.getByRole('button', { name: /связаться со мной/i });

    await expect(primaryButton).toBeVisible();
    await expect(outlineButton).toBeVisible();
  });

  test('должна отображать header с навигацией', async ({ page }) => {
    await page.goto('/');

    const header = page.getByRole('banner');
    await expect(header).toBeVisible();

    const navLinks = ['Главная', 'О себе', 'Проекты', 'Контакты'];
    for (const link of navLinks) {
      await expect(page.getByRole('link', { name: link })).toBeVisible();
    }
  });

  test('должна иметь правильный title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Andival SEI/i);
  });
});
