import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Link } from "../Link";

// Мокаем Next.js Link
vi.mock("next/link", () => ({
  default: ({ children, href, className, ...props }: any) => {
    return (
      <a href={href} className={className} {...props}>
        {children}
      </a>
    );
  },
}));

describe("Link component", () => {
  it("должен рендериться корректно", () => {
    render(<Link href="/test">Тестовая ссылка</Link>);
    const link = screen.getByText("Тестовая ссылка");
    expect(link).toBeInTheDocument();
  });

  it("должен передавать href корректно", () => {
    render(<Link href="/about">О нас</Link>);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/about");
  });

  it("должен применять variant default по умолчанию", () => {
    render(<Link href="/">Главная</Link>);
    const link = screen.getByRole("link");
    expect(link).not.toHaveClass("underline");
  });

  it("должен применять variant underline", () => {
    render(
      <Link href="/" variant="underline">
        Ссылка
      </Link>
    );
    const link = screen.getByRole("link");
    expect(link).toHaveClass("underline-offset-4");
    expect(link).toHaveClass("hover:underline");
  });

  it("должен применять кастомные className", () => {
    render(
      <Link href="/" className="custom-link">
        Ссылка
      </Link>
    );
    const link = screen.getByRole("link");
    expect(link).toHaveClass("custom-link");
  });

  it("должен передавать другие HTML атрибуты", () => {
    render(
      <Link href="/test" target="_blank" rel="noopener noreferrer">
        Внешняя ссылка
      </Link>
    );
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("должен поддерживать внешние ссылки", () => {
    render(<Link href="https://example.com">Внешний сайт</Link>);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "https://example.com");
  });
});
