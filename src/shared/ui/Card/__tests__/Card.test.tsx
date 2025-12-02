import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from "../Card";

describe("Card component", () => {
  it("должен рендериться корректно", () => {
    render(<Card>Контент карточки</Card>);
    const card = screen.getByText("Контент карточки");
    expect(card).toBeInTheDocument();
  });

  it("должен применять кастомные className", () => {
    render(<Card className="custom-card">Контент</Card>);
    const card = screen.getByText("Контент");
    expect(card).toHaveClass("custom-card");
  });

  it("должен работать с forwardRef", () => {
    const ref = vi.fn();
    render(<Card ref={ref}>Контент</Card>);
    expect(ref).toHaveBeenCalled();
    expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLDivElement);
  });

  it("должен иметь data-slot атрибут", () => {
    render(<Card>Контент</Card>);
    const card = screen.getByText("Контент");
    expect(card).toHaveAttribute("data-slot", "card");
  });
});

describe("CardHeader component", () => {
  it("должен рендериться корректно", () => {
    render(
      <Card>
        <CardHeader>Заголовок</CardHeader>
      </Card>
    );
    expect(screen.getByText("Заголовок")).toBeInTheDocument();
  });

  it("должен иметь data-slot атрибут", () => {
    render(
      <Card>
        <CardHeader>Заголовок</CardHeader>
      </Card>
    );
    const header = screen.getByText("Заголовок");
    expect(header).toHaveAttribute("data-slot", "card-header");
  });
});

describe("CardTitle component", () => {
  it("должен рендериться корректно", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Название карточки</CardTitle>
        </CardHeader>
      </Card>
    );
    expect(screen.getByText("Название карточки")).toBeInTheDocument();
  });

  it("должен иметь data-slot атрибут", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Название</CardTitle>
        </CardHeader>
      </Card>
    );
    const title = screen.getByText("Название");
    expect(title).toHaveAttribute("data-slot", "card-title");
  });
});

describe("CardDescription component", () => {
  it("должен рендериться корректно", () => {
    render(
      <Card>
        <CardHeader>
          <CardDescription>Описание карточки</CardDescription>
        </CardHeader>
      </Card>
    );
    expect(screen.getByText("Описание карточки")).toBeInTheDocument();
  });

  it("должен иметь data-slot атрибут", () => {
    render(
      <Card>
        <CardHeader>
          <CardDescription>Описание</CardDescription>
        </CardHeader>
      </Card>
    );
    const description = screen.getByText("Описание");
    expect(description).toHaveAttribute("data-slot", "card-description");
  });
});

describe("CardContent component", () => {
  it("должен рендериться корректно", () => {
    render(
      <Card>
        <CardContent>Основной контент</CardContent>
      </Card>
    );
    expect(screen.getByText("Основной контент")).toBeInTheDocument();
  });

  it("должен иметь data-slot атрибут", () => {
    render(
      <Card>
        <CardContent>Контент</CardContent>
      </Card>
    );
    const content = screen.getByText("Контент");
    expect(content).toHaveAttribute("data-slot", "card-content");
  });
});

describe("CardFooter component", () => {
  it("должен рендериться корректно", () => {
    render(
      <Card>
        <CardFooter>Футер карточки</CardFooter>
      </Card>
    );
    expect(screen.getByText("Футер карточки")).toBeInTheDocument();
  });

  it("должен иметь data-slot атрибут", () => {
    render(
      <Card>
        <CardFooter>Футер</CardFooter>
      </Card>
    );
    const footer = screen.getByText("Футер");
    expect(footer).toHaveAttribute("data-slot", "card-footer");
  });
});

describe("CardAction component", () => {
  it("должен рендериться корректно", () => {
    render(
      <Card>
        <CardHeader>
          <CardAction>Действие</CardAction>
        </CardHeader>
      </Card>
    );
    expect(screen.getByText("Действие")).toBeInTheDocument();
  });

  it("должен иметь data-slot атрибут", () => {
    render(
      <Card>
        <CardHeader>
          <CardAction>Действие</CardAction>
        </CardHeader>
      </Card>
    );
    const action = screen.getByText("Действие");
    expect(action).toHaveAttribute("data-slot", "card-action");
  });
});

describe("Card composition", () => {
  it("должен корректно композировать все части", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Заголовок</CardTitle>
          <CardDescription>Описание</CardDescription>
          <CardAction>Действие</CardAction>
        </CardHeader>
        <CardContent>Контент</CardContent>
        <CardFooter>Футер</CardFooter>
      </Card>
    );

    expect(screen.getByText("Заголовок")).toBeInTheDocument();
    expect(screen.getByText("Описание")).toBeInTheDocument();
    expect(screen.getByText("Действие")).toBeInTheDocument();
    expect(screen.getByText("Контент")).toBeInTheDocument();
    expect(screen.getByText("Футер")).toBeInTheDocument();
  });
});
