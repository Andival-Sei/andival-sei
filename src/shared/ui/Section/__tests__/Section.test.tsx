import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Section } from "../Section";

describe("Section component", () => {
  it("должен рендериться корректно", () => {
    render(<Section>Контент секции</Section>);
    const section = screen.getByText("Контент секции");
    expect(section).toBeInTheDocument();
    expect(section.tagName).toBe("SECTION");
  });

  it("должен применять кастомные className", () => {
    render(<Section className="custom-section">Контент</Section>);
    const section = screen.getByText("Контент");
    expect(section).toHaveClass("custom-section");
  });

  it("должен применять базовые стили", () => {
    render(<Section>Контент</Section>);
    const section = screen.getByText("Контент");
    expect(section).toHaveClass("container");
    expect(section).toHaveClass("mx-auto");
    expect(section).toHaveClass("px-4");
  });

  it("должен работать с forwardRef", () => {
    const ref = vi.fn();
    render(<Section ref={ref}>Контент</Section>);
    expect(ref).toHaveBeenCalled();
    expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLElement);
  });

  it("должен передавать другие HTML атрибуты", () => {
    render(
      <Section id="about-section" aria-label="О проекте">
        Контент
      </Section>
    );
    const section = screen.getByText("Контент");
    expect(section).toHaveAttribute("id", "about-section");
    expect(section).toHaveAttribute("aria-label", "О проекте");
  });
});
