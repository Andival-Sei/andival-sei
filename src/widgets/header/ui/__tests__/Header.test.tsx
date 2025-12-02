import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Header } from "../Header";

// Мокаем Next.js
vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

// Мокаем Navigation
vi.mock("@/src/features/navigation", () => ({
  Navigation: () => <nav data-testid="navigation">Navigation</nav>,
}));

// Мокаем BurgerMenu
vi.mock("../BurgerMenu", () => ({
  BurgerMenu: () => <div data-testid="burger-menu">BurgerMenu</div>,
}));

describe("Header component", () => {
  it("должен рендериться корректно", () => {
    render(<Header />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("должен отображать логотип с ссылкой на главную", () => {
    render(<Header />);
    const logoLink = screen.getByText("Andival-Sei").closest("a");
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute("href", "/");
  });

  it("должен отображать Navigation на десктопе", () => {
    render(<Header />);
    expect(screen.getByTestId("navigation")).toBeInTheDocument();
  });

  it("должен отображать кнопку 'Связаться' на десктопе", () => {
    render(<Header />);
    const contactLink = screen.getByText("Связаться").closest("a");
    expect(contactLink).toBeInTheDocument();
    expect(contactLink).toHaveAttribute("href", "/contact");
  });

  it("должен отображать BurgerMenu", () => {
    render(<Header />);
    expect(screen.getByTestId("burger-menu")).toBeInTheDocument();
  });
});
