import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge } from "../Badge";

describe("Badge component", () => {
  it("должен рендериться корректно", () => {
    render(<Badge>Тестовый бейдж</Badge>);
    const badge = screen.getByText("Тестовый бейдж");
    expect(badge).toBeInTheDocument();
  });

  it("должен применять variant default по умолчанию", () => {
    render(<Badge>Бейдж</Badge>);
    const badge = screen.getByText("Бейдж");
    expect(badge).toHaveClass("bg-primary");
    expect(badge).toHaveClass("text-primary-foreground");
  });

  it("должен применять variant secondary", () => {
    render(<Badge variant="secondary">Вторичный</Badge>);
    const badge = screen.getByText("Вторичный");
    expect(badge).toHaveClass("bg-secondary");
    expect(badge).toHaveClass("text-secondary-foreground");
  });

  it("должен применять variant destructive", () => {
    render(<Badge variant="destructive">Ошибка</Badge>);
    const badge = screen.getByText("Ошибка");
    expect(badge).toHaveClass("bg-destructive");
  });

  it("должен применять variant outline", () => {
    render(<Badge variant="outline">Контур</Badge>);
    const badge = screen.getByText("Контур");
    expect(badge).toHaveClass("text-foreground");
  });

  it("должен применять кастомные className", () => {
    render(<Badge className="custom-badge">Бейдж</Badge>);
    const badge = screen.getByText("Бейдж");
    expect(badge).toHaveClass("custom-badge");
  });

  it("должен передавать другие HTML атрибуты", () => {
    render(
      <Badge aria-label="Статус" data-testid="status-badge">
        Активен
      </Badge>
    );
    const badge = screen.getByTestId("status-badge");
    expect(badge).toHaveAttribute("aria-label", "Статус");
  });

  it("должен иметь data-slot атрибут", () => {
    render(<Badge>Бейдж</Badge>);
    const badge = screen.getByText("Бейдж");
    expect(badge).toHaveAttribute("data-slot", "badge");
  });

  it("должен работать с asChild prop", () => {
    render(
      <Badge asChild>
        <a href="/test">Ссылка-бейдж</a>
      </Badge>
    );
    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/test");
    // Проверяем, что классы применились к ссылке
    expect(link).toHaveClass("bg-primary");
  });

  it("должен поддерживать aria-invalid для валидации", () => {
    render(<Badge aria-invalid="true">Невалидный</Badge>);
    const badge = screen.getByText("Невалидный");
    expect(badge).toHaveAttribute("aria-invalid", "true");
  });
});
