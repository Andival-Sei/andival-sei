import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Navigation } from "../Navigation";

// Мокаем Next.js
const mockPathname = vi.fn(() => "/");

vi.mock("next/link", () => ({
  default: ({ children, href, className }: any) => {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  },
}));

vi.mock("next/navigation", () => ({
  usePathname: () => mockPathname(),
}));

describe("Navigation component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("должен рендериться корректно", () => {
    render(<Navigation />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("должен отображать все пункты навигации", () => {
    render(<Navigation />);
    expect(screen.getByText("Главная")).toBeInTheDocument();
    expect(screen.getByText("Проекты")).toBeInTheDocument();
    expect(screen.getByText("Обо мне")).toBeInTheDocument();
    expect(screen.getByText("Lab")).toBeInTheDocument();
  });

  it("должен иметь правильные href для всех ссылок", () => {
    render(<Navigation />);
    expect(screen.getByText("Главная").closest("a")).toHaveAttribute(
      "href",
      "/"
    );
    expect(screen.getByText("Проекты").closest("a")).toHaveAttribute(
      "href",
      "/projects"
    );
    expect(screen.getByText("Обо мне").closest("a")).toHaveAttribute(
      "href",
      "/about"
    );
    expect(screen.getByText("Lab").closest("a")).toHaveAttribute(
      "href",
      "/lab"
    );
  });

  it("должен выделять активную ссылку когда pathname совпадает", () => {
    mockPathname.mockReturnValue("/projects");
    render(<Navigation />);

    const projectsLink = screen.getByText("Проекты").closest("a");
    expect(projectsLink).toHaveClass("text-foreground");
  });

  it("должен применять неактивный стиль для неактивных ссылок", () => {
    mockPathname.mockReturnValue("/projects");
    render(<Navigation />);

    const homeLink = screen.getByText("Главная").closest("a");
    expect(homeLink).toHaveClass("text-muted-foreground");
  });

  it("должен корректно обрабатывать главную страницу как активную", () => {
    mockPathname.mockReturnValue("/");
    render(<Navigation />);

    const homeLink = screen.getByText("Главная").closest("a");
    expect(homeLink).toHaveClass("text-foreground");
  });
});
