import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "../Input";

describe("Input component", () => {
  it("должен рендериться корректно", () => {
    render(<Input placeholder="Введите текст" />);
    const input = screen.getByPlaceholderText("Введите текст");
    expect(input).toBeInTheDocument();
  });

  it("должен принимать и отображать значение", () => {
    render(<Input value="Тестовое значение" readOnly />);
    const input = screen.getByDisplayValue("Тестовое значение");
    expect(input).toBeInTheDocument();
  });

  it("должен обрабатывать изменения значения", async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();
    render(<Input onChange={handleChange} />);

    const input = screen.getByRole("textbox");
    await user.type(input, "тест");

    expect(handleChange).toHaveBeenCalled();
    expect(input).toHaveValue("тест");
  });

  it("должен поддерживать различные типы input", () => {
    const { rerender } = render(<Input type="text" />);
    let input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("type", "text");

    rerender(<Input type="email" />);
    input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("type", "email");

    rerender(<Input type="password" />);
    input = screen.getByDisplayValue("");
    expect(input).toHaveAttribute("type", "password");
  });

  it("должен быть disabled когда передан disabled prop", () => {
    render(<Input disabled />);
    const input = screen.getByRole("textbox");
    expect(input).toBeDisabled();
  });

  it("должен применять кастомные className", () => {
    render(<Input className="custom-class" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("custom-class");
  });

  it("должен передавать другие HTML атрибуты", () => {
    render(
      <Input
        id="test-input"
        name="testName"
        aria-label="Тестовый input"
        maxLength={10}
      />
    );
    const input = screen.getByLabelText("Тестовый input");
    expect(input).toHaveAttribute("id", "test-input");
    expect(input).toHaveAttribute("name", "testName");
    expect(input).toHaveAttribute("maxLength", "10");
  });

  it("должен работать с forwardRef", () => {
    const ref = vi.fn();
    render(<Input ref={ref} />);
    const input = screen.getByRole("textbox");
    expect(ref).toHaveBeenCalled();
    expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLInputElement);
  });

  it("должен иметь data-slot атрибут", () => {
    render(<Input />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("data-slot", "input");
  });

  it("должен поддерживать aria-invalid для валидации", () => {
    render(<Input aria-invalid="true" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("aria-invalid", "true");
  });
});
