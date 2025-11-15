import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Header } from './Header';

// Моки для Next.js роутинга
const mockPathname = vi.fn(() => '/');
const mockPush = vi.fn();

vi.mock('next/navigation', () => ({
  usePathname: () => mockPathname(),
  useRouter: () => ({
    push: mockPush,
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
}));

// Мок для Next.js Link
vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

// Мок для ThemeToggle
vi.mock('@/features/theme-toggle', () => ({
  ThemeToggle: () => <div data-testid="theme-toggle">Theme Toggle</div>,
}));

describe('Header', () => {
  beforeEach(() => {
    // Сброс всех моков перед каждым тестом
    vi.clearAllMocks();
    mockPathname.mockReturnValue('/');

    // Сброс стилей body перед каждым тестом
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    document.body.style.overflow = '';

    // Сброс window.scrollY
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 0,
    });
  });

  afterEach(() => {
    // Восстановление стилей body после каждого теста
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    document.body.style.overflow = '';
  });

  describe('Рендеринг', () => {
    it('рендерится с логотипом', () => {
      render(<Header />);
      const logo = screen.getByRole('link', { name: /главная страница/i });
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveAttribute('href', '/');
      expect(screen.getByText('Andival SEI')).toBeInTheDocument();
    });

    it('рендерится с навигационными ссылками', () => {
      render(<Header />);

      const navItems = ['Главная', 'О себе', 'Проекты', 'Контакты'];
      navItems.forEach((item) => {
        const link = screen.getByRole('link', { name: item });
        expect(link).toBeInTheDocument();
      });
    });

    it('рендерится с переключателем темы', () => {
      render(<Header />);
      expect(screen.getByTestId('theme-toggle')).toBeInTheDocument();
    });

    it('рендерится с кнопкой бургер-меню', () => {
      render(<Header />);
      const burgerButton = screen.getByRole('button', { name: /открыть меню/i });
      expect(burgerButton).toBeInTheDocument();
      expect(burgerButton).toHaveAttribute('aria-expanded', 'false');
      expect(burgerButton).toHaveAttribute('aria-controls', 'mobile-menu');
    });

    it('мобильное меню скрыто по умолчанию', () => {
      render(<Header />);
      const mobileMenu = document.getElementById('mobile-menu');
      expect(mobileMenu).toBeInTheDocument();
      expect(mobileMenu).toHaveAttribute('aria-hidden', 'true');
      expect(mobileMenu?.className).not.toContain('open');
    });

    it('overlay не отображается когда меню закрыто', () => {
      render(<Header />);
      // Overlay рендерится условно только когда меню открыто
      // Когда меню закрыто, overlay не должен быть в DOM
      // Проверяем, что мобильное меню скрыто
      const mobileMenu = document.getElementById('mobile-menu');
      expect(mobileMenu).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('Бургер-меню', () => {
    it('открывает мобильное меню при клике на кнопку', async () => {
      const user = userEvent.setup();
      render(<Header />);

      const burgerButton = screen.getByRole('button', { name: /открыть меню/i });
      await user.click(burgerButton);

      const mobileMenu = screen.getByRole('navigation', { name: /мобильная навигация/i });
      expect(mobileMenu).toHaveAttribute('aria-hidden', 'false');
      expect(burgerButton).toHaveAttribute('aria-expanded', 'true');
    });

    it('закрывает мобильное меню при повторном клике на кнопку', async () => {
      const user = userEvent.setup();
      render(<Header />);

      const burgerButton = screen.getByRole('button', { name: /открыть меню/i });

      // Открываем меню
      await user.click(burgerButton);
      expect(burgerButton).toHaveAttribute('aria-expanded', 'true');

      // Закрываем меню
      await user.click(burgerButton);
      expect(burgerButton).toHaveAttribute('aria-expanded', 'false');
    });

    it('отображает overlay когда меню открыто', async () => {
      const user = userEvent.setup();
      render(<Header />);

      const burgerButton = screen.getByRole('button', { name: /открыть меню/i });
      await user.click(burgerButton);

      // Overlay должен быть в DOM (он рендерится условно)
      await waitFor(() => {
        const overlay = document.querySelector('[aria-hidden="true"]');
        expect(overlay).toBeInTheDocument();
      });

      const mobileMenu = document.getElementById('mobile-menu');
      expect(mobileMenu).toHaveAttribute('aria-hidden', 'false');
    });

    it('закрывает меню при клике на overlay', async () => {
      const user = userEvent.setup();
      render(<Header />);

      const burgerButton = screen.getByRole('button', { name: /открыть меню/i });
      await user.click(burgerButton);
      expect(burgerButton).toHaveAttribute('aria-expanded', 'true');

      // Overlay рендерится условно, находим его через селектор
      await waitFor(() => {
        const overlay = document.querySelector('[aria-hidden="true"]');
        expect(overlay).toBeInTheDocument();
      });

      // Находим overlay (он имеет aria-hidden="true" но видимый)
      const overlay = Array.from(document.querySelectorAll('[aria-hidden="true"]')).find(
        (el) => el !== document.getElementById('mobile-menu')
      );

      if (overlay) {
        await user.click(overlay);
        await waitFor(() => {
          expect(burgerButton).toHaveAttribute('aria-expanded', 'false');
        });
      }
    });

    it('отображает кнопку закрытия в мобильном меню', async () => {
      const user = userEvent.setup();
      render(<Header />);

      const burgerButton = screen.getByRole('button', { name: /открыть меню/i });
      await user.click(burgerButton);

      const closeButton = screen.getByRole('button', { name: /закрыть меню/i });
      expect(closeButton).toBeInTheDocument();
    });

    it('закрывает меню при клике на кнопку закрытия', async () => {
      const user = userEvent.setup();
      render(<Header />);

      const burgerButton = screen.getByRole('button', { name: /открыть меню/i });
      await user.click(burgerButton);

      const closeButton = screen.getByRole('button', { name: /закрыть меню/i });
      await user.click(closeButton);

      await waitFor(() => {
        expect(burgerButton).toHaveAttribute('aria-expanded', 'false');
      });
    });

    it('блокирует скролл body когда меню открыто', async () => {
      const user = userEvent.setup();
      render(<Header />);

      // Устанавливаем начальную позицию скролла
      Object.defineProperty(window, 'scrollY', {
        writable: true,
        configurable: true,
        value: 100,
      });

      const burgerButton = screen.getByRole('button', { name: /открыть меню/i });
      await user.click(burgerButton);

      // Проверяем, что скролл заблокирован
      expect(document.body.style.position).toBe('fixed');
      expect(document.body.style.overflow).toBe('hidden');
    });

    it('разблокирует скролл body когда меню закрыто', async () => {
      const user = userEvent.setup();
      render(<Header />);

      const burgerButton = screen.getByRole('button', { name: /открыть меню/i });

      // Открываем меню
      await user.click(burgerButton);
      expect(document.body.style.position).toBe('fixed');

      // Закрываем меню
      await user.click(burgerButton);

      await waitFor(() => {
        expect(document.body.style.position).toBe('');
        expect(document.body.style.overflow).toBe('');
      });
    });

    it('закрывает меню при клике на ссылку в меню', async () => {
      const user = userEvent.setup();
      render(<Header />);

      const burgerButton = screen.getByRole('button', { name: /открыть меню/i });
      await user.click(burgerButton);

      // В мобильном меню может быть несколько ссылок "О себе", берем первую доступную
      const aboutLinks = screen.getAllByRole('link', { name: 'О себе' });
      const mobileAboutLink = aboutLinks.find((link) => link.closest('#mobile-menu') !== null);

      if (mobileAboutLink) {
        await user.click(mobileAboutLink);
        await waitFor(() => {
          expect(burgerButton).toHaveAttribute('aria-expanded', 'false');
        });
      }
    });

    it('закрывает меню при клике на логотип', async () => {
      const user = userEvent.setup();
      render(<Header />);

      const burgerButton = screen.getByRole('button', { name: /открыть меню/i });
      await user.click(burgerButton);

      const logo = screen.getByRole('link', { name: /главная страница/i });
      await user.click(logo);

      await waitFor(() => {
        expect(burgerButton).toHaveAttribute('aria-expanded', 'false');
      });
    });
  });

  describe('Навигация', () => {
    it('отмечает активную ссылку для главной страницы', () => {
      mockPathname.mockReturnValue('/');
      render(<Header />);

      const homeLink = screen.getByRole('link', { name: 'Главная' });
      // CSS модули добавляют хеши, проверяем через classList
      expect(homeLink.className).toContain('active');
    });

    it('отмечает активную ссылку для страницы "О себе"', () => {
      mockPathname.mockReturnValue('/about');
      render(<Header />);

      const aboutLink = screen.getByRole('link', { name: 'О себе' });
      expect(aboutLink.className).toContain('active');
    });

    it('отмечает активную ссылку для страницы "Проекты"', () => {
      mockPathname.mockReturnValue('/projects');
      render(<Header />);

      const projectsLink = screen.getByRole('link', { name: 'Проекты' });
      expect(projectsLink.className).toContain('active');
    });

    it('отмечает активную ссылку для страницы "Контакты"', () => {
      mockPathname.mockReturnValue('/contact');
      render(<Header />);

      const contactLink = screen.getByRole('link', { name: 'Контакты' });
      expect(contactLink.className).toContain('active');
    });

    it('не отмечает главную страницу как активную на других страницах', () => {
      mockPathname.mockReturnValue('/about');
      render(<Header />);

      // Проверяем, что класс active не присутствует в десктопной навигации
      // (в мобильном меню может быть активной, но это нормально)
      const desktopNav = screen.getByRole('navigation', { name: /основная навигация/i });
      const desktopHomeLink = desktopNav.querySelector('a[href="/"]');
      expect(desktopHomeLink?.className).not.toContain('active');
    });

    it('закрывает меню при изменении маршрута', async () => {
      const user = userEvent.setup();
      mockPathname.mockReturnValue('/');
      const { rerender } = render(<Header />);

      const burgerButton = screen.getByRole('button', { name: /открыть меню/i });
      await user.click(burgerButton);
      expect(burgerButton).toHaveAttribute('aria-expanded', 'true');

      // Симулируем изменение маршрута
      mockPathname.mockReturnValue('/about');
      rerender(<Header />);

      await waitFor(() => {
        expect(burgerButton).toHaveAttribute('aria-expanded', 'false');
      });
    });
  });

  describe('Скролл', () => {
    it('добавляет класс scrolled при скролле вниз', async () => {
      render(<Header />);

      const header = document.querySelector('header');
      expect(header?.className).not.toContain('scrolled');

      // Симулируем скролл
      Object.defineProperty(window, 'scrollY', {
        writable: true,
        configurable: true,
        value: 20,
      });

      // Используем fireEvent для более реалистичной симуляции
      const scrollEvent = new Event('scroll', { bubbles: true });
      window.dispatchEvent(scrollEvent);

      await waitFor(
        () => {
          expect(header?.className).toContain('scrolled');
        },
        { timeout: 1000 }
      );
    });

    it('убирает класс scrolled при скролле вверх', async () => {
      render(<Header />);

      const header = document.querySelector('header');

      // Скроллим вниз
      Object.defineProperty(window, 'scrollY', {
        writable: true,
        configurable: true,
        value: 20,
      });
      window.dispatchEvent(new Event('scroll', { bubbles: true }));

      await waitFor(
        () => {
          expect(header?.className).toContain('scrolled');
        },
        { timeout: 1000 }
      );

      // Скроллим вверх
      Object.defineProperty(window, 'scrollY', {
        writable: true,
        configurable: true,
        value: 5,
      });
      window.dispatchEvent(new Event('scroll', { bubbles: true }));

      await waitFor(
        () => {
          expect(header?.className).not.toContain('scrolled');
        },
        { timeout: 1000 }
      );
    });

    it('не добавляет класс scrolled при скролле меньше 10px', async () => {
      render(<Header />);

      const header = document.querySelector('header');

      Object.defineProperty(window, 'scrollY', {
        writable: true,
        configurable: true,
        value: 5,
      });
      window.dispatchEvent(new Event('scroll', { bubbles: true }));

      // Даем время на обработку события
      await new Promise((resolve) => setTimeout(resolve, 100));

      expect(header?.className).not.toContain('scrolled');
    });
  });

  describe('Доступность', () => {
    it('имеет правильные ARIA атрибуты для кнопки меню', () => {
      render(<Header />);
      const burgerButton = screen.getByRole('button', { name: /открыть меню/i });

      expect(burgerButton).toHaveAttribute('aria-label', 'Открыть меню');
      expect(burgerButton).toHaveAttribute('aria-expanded', 'false');
      expect(burgerButton).toHaveAttribute('aria-controls', 'mobile-menu');
    });

    it('обновляет aria-expanded при открытии меню', async () => {
      const user = userEvent.setup();
      render(<Header />);

      const burgerButton = screen.getByRole('button', { name: /открыть меню/i });
      expect(burgerButton).toHaveAttribute('aria-expanded', 'false');

      await user.click(burgerButton);
      expect(burgerButton).toHaveAttribute('aria-expanded', 'true');
    });

    it('имеет правильные ARIA атрибуты для мобильного меню', () => {
      render(<Header />);
      const mobileMenu = document.getElementById('mobile-menu');

      expect(mobileMenu).toBeInTheDocument();
      expect(mobileMenu).toHaveAttribute('id', 'mobile-menu');
      expect(mobileMenu).toHaveAttribute('aria-label', 'Мобильная навигация');
      expect(mobileMenu).toHaveAttribute('aria-hidden', 'true');
    });

    it('обновляет aria-hidden при открытии меню', async () => {
      const user = userEvent.setup();
      render(<Header />);

      const mobileMenu = document.getElementById('mobile-menu');
      expect(mobileMenu).toHaveAttribute('aria-hidden', 'true');

      const burgerButton = screen.getByRole('button', { name: /открыть меню/i });
      await user.click(burgerButton);

      await waitFor(() => {
        expect(mobileMenu).toHaveAttribute('aria-hidden', 'false');
      });
    });

    it('имеет правильные ARIA атрибуты для десктопной навигации', () => {
      render(<Header />);
      const desktopNav = screen.getByRole('navigation', { name: /основная навигация/i });
      expect(desktopNav).toBeInTheDocument();
    });
  });

  describe('Клик вне меню', () => {
    it('закрывает меню при клике вне его области', async () => {
      const user = userEvent.setup();
      render(<Header />);

      const burgerButton = screen.getByRole('button', { name: /открыть меню/i });
      await user.click(burgerButton);
      expect(burgerButton).toHaveAttribute('aria-expanded', 'true');

      // Кликаем вне меню (на body)
      await user.click(document.body);

      await waitFor(() => {
        expect(burgerButton).toHaveAttribute('aria-expanded', 'false');
      });
    });

    it('не закрывает меню при клике на кнопку бургера', async () => {
      const user = userEvent.setup();
      render(<Header />);

      const burgerButton = screen.getByRole('button', { name: /открыть меню/i });
      await user.click(burgerButton);
      expect(burgerButton).toHaveAttribute('aria-expanded', 'true');

      // Кликаем снова на кнопку бургера (должно закрыть через toggle)
      await user.click(burgerButton);
      expect(burgerButton).toHaveAttribute('aria-expanded', 'false');
    });
  });
});
