import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Label } from "../Label";
import { Input } from "@/src/shared/ui/Input";

describe("Label component", () => {
  it("должен рендериться корректно", () => {
    render(<Label>Тестовая метка</Label>);
    const label = screen.getByText("Тестовая метка");
    expect(label).toBeInTheDocument();
  });

  it("должен связываться с input через htmlFor", () => {
    render(
      <>
        <Label htmlFor="test-input">Имя</Label>
        <Input id="test-input" />
      </>
    );

    const label = screen.getByText("Имя");
    const input = screen.getByRole("textbox");

    expect(label).toHaveAttribute("for", "test-input");
    expect(input).toHaveAttribute("id", "test-input");
  });

  it("должен применять кастомные className", () => {
    render(<Label className="custom-label">Метка</Label>);
    const label = screen.getByText("Метка");
    expect(label).toHaveClass("custom-label");
  });

  it("должен передавать другие HTML атрибуты", () => {
    render(
      <Label htmlFor="input" aria-label="Дополнительная метка">
        Метка
      </Label>
    );
    const label = screen.getByText("Метка");
    expect(label).toHaveAttribute("aria-label", "Дополнительная метка");
  });

  it("должен иметь data-slot атрибут", () => {
    render(<Label>Метка</Label>);
    const label = screen.getByText("Метка");
    expect(label).toHaveAttribute("data-slot", "label");
  });

  it("должен работать с forwardRef", () => {
    const ref = { current: null };
    render(<Label ref={ref}>Метка</Label>);
    expect(ref.current).toBeInstanceOf(HTMLLabelElement);
  });
});
