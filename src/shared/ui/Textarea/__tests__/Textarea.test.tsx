import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Textarea } from "../Textarea";

describe("Textarea component", () => {
  it("должен рендериться корректно", () => {
    render(<Textarea placeholder="Введите сообщение" />);
    const textarea = screen.getByPlaceholderText("Введите сообщение");
    expect(textarea).toBeInTheDocument();
  });

  it("должен принимать и отображать значение", () => {
    render(<Textarea value="Тестовое сообщение" readOnly />);
    const textarea = screen.getByDisplayValue("Тестовое сообщение");
    expect(textarea).toBeInTheDocument();
  });

  it("должен обрабатывать изменения значения", async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();
    render(<Textarea onChange={handleChange} />);

    const textarea = screen.getByRole("textbox");
    await user.type(textarea, "тестовое сообщение");

    expect(handleChange).toHaveBeenCalled();
    expect(textarea).toHaveValue("тестовое сообщение");
  });

  it("должен поддерживать многострочный ввод", async () => {
    const user = userEvent.setup();
    render(<Textarea />);

    const textarea = screen.getByRole("textbox");
    await user.type(textarea, "Первая строка{Enter}Вторая строка");

    expect(textarea).toHaveValue("Первая строка\nВторая строка");
  });

  it("должен быть disabled когда передан disabled prop", () => {
    render(<Textarea disabled />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toBeDisabled();
  });

  it("должен применять кастомные className", () => {
    render(<Textarea className="custom-class" />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveClass("custom-class");
  });

  it("должен передавать другие HTML атрибуты", () => {
    render(
      <Textarea
        id="test-textarea"
        name="testMessage"
        aria-label="Тестовый textarea"
        rows={5}
        maxLength={100}
      />
    );
    const textarea = screen.getByLabelText("Тестовый textarea");
    expect(textarea).toHaveAttribute("id", "test-textarea");
    expect(textarea).toHaveAttribute("name", "testMessage");
    expect(textarea).toHaveAttribute("rows", "5");
    expect(textarea).toHaveAttribute("maxLength", "100");
  });

  it("должен работать с forwardRef", () => {
    const ref = vi.fn();
    render(<Textarea ref={ref} />);
    const textarea = screen.getByRole("textbox");
    expect(ref).toHaveBeenCalled();
    expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLTextAreaElement);
  });

  it("должен иметь data-slot атрибут", () => {
    render(<Textarea />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveAttribute("data-slot", "textarea");
  });

  it("должен поддерживать aria-invalid для валидации", () => {
    render(<Textarea aria-invalid="true" />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveAttribute("aria-invalid", "true");
  });
});
