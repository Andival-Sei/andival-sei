import { render, RenderOptions } from "@testing-library/react";
import { ReactElement } from "react";
import { vi } from "vitest";

import { ThemeProvider } from "@/src/app/providers";

/**
 * Кастомный render с провайдерами
 */
export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) {
  // Мокаем localStorage для ThemeProvider
  const localStorageMock = {
    getItem: vi.fn(() => null),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  };

  Object.defineProperty(window, "localStorage", {
    value: localStorageMock,
    writable: true,
  });

  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn(() => ({
      matches: false,
      media: "",
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });

  function Wrapper({ children }: { children: React.ReactNode }) {
    return <ThemeProvider>{children}</ThemeProvider>;
  }

  return render(ui, { wrapper: Wrapper, ...options });
}

/**
 * Моки для Next.js
 */
export function setupNextMocks() {
  const mockPathname = vi.fn(() => "/");
  const mockRouter = {
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
  };

  vi.mock("next/link", () => ({
    default: ({
      children,
      href,
      ...props
    }: {
      children: React.ReactNode;
      href: string;
      [key: string]: unknown;
    }) => (
      <a href={href} {...props}>
        {children}
      </a>
    ),
  }));

  vi.mock("next/navigation", () => ({
    usePathname: () => mockPathname(),
    useRouter: () => mockRouter,
    useSearchParams: () => new URLSearchParams(),
  }));

  vi.mock("next/image", () => ({
    default: ({
      src,
      alt,
      ...props
    }: {
      src: string;
      alt: string;
      [key: string]: unknown;
    }) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt={alt} {...props} />
    ),
  }));

  return { mockPathname, mockRouter };
}

/**
 * Моки для framer-motion
 */
export function setupFramerMotionMocks() {
  vi.mock("framer-motion", () => ({
    motion: {
      div: ({
        children,
        ...props
      }: {
        children: React.ReactNode;
        [key: string]: unknown;
      }) => <div {...props}>{children}</div>,
      span: ({
        children,
        ...props
      }: {
        children: React.ReactNode;
        [key: string]: unknown;
      }) => <span {...props}>{children}</span>,
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => (
      <>{children}</>
    ),
  }));
}
