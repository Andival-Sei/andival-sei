import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "../Footer";

// Мокаем Next.js
vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

// Мокаем ThemeToggle
vi.mock("@/src/features/theme-toggle", () => ({
  ThemeToggle: () => <div data-testid="theme-toggle">ThemeToggle</div>,
}));

// Мокаем siteConfig
vi.mock("@/src/shared/config/site", () => ({
  siteConfig: {
    links: {
      github: "https://github.com/Andival-Sei",
      telegram: "https://t.me/Andiewahl",
      vk: "https://vk.com/andiewahl",
    },
  },
}));

// Мокаем useTheme hook
vi.mock("@/src/app/providers", () => ({
  ThemeProvider: ({ children }: any) => <>{children}</>,
  useTheme: () => ({
    theme: "light",
    setTheme: vi.fn(),
    resolvedTheme: "light",
    mounted: true,
  }),
}));

describe("Footer component", () => {
  it("должен рендериться корректно", () => {
    render(<Footer />);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("должен отображать копирайт с текущим годом", () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(`© ${currentYear} Andival-Sei`)
    ).toBeInTheDocument();
  });

  it("должен отображать ссылку на GitHub", () => {
    render(<Footer />);
    const githubLink = screen.getByRole("link", {
      name: /github/i,
    });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute(
      "href",
      "https://github.com/Andival-Sei"
    );
  });

  it("должен отображать ссылку на Telegram", () => {
    render(<Footer />);
    const telegramLink = screen.getByRole("link", {
      name: /telegram/i,
    });
    expect(telegramLink).toBeInTheDocument();
    expect(telegramLink).toHaveAttribute("href", "https://t.me/Andiewahl");
  });

  it("должен отображать ссылку на VK", () => {
    render(<Footer />);
    const vkLink = screen.getByRole("link", {
      name: /vk/i,
    });
    expect(vkLink).toBeInTheDocument();
    expect(vkLink).toHaveAttribute("href", "https://vk.com/andiewahl");
  });

  it("должен отображать ThemeToggle", () => {
    render(<Footer />);
    expect(screen.getByTestId("theme-toggle")).toBeInTheDocument();
  });

  it("должен открывать внешние ссылки в новой вкладке", () => {
    render(<Footer />);
    const githubLink = screen.getByRole("link", {
      name: /github/i,
    });
    expect(githubLink).toHaveAttribute("target", "_blank");
    expect(githubLink).toHaveAttribute("rel", "noreferrer");
  });
});
