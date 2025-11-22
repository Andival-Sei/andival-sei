import { describe, it, expect } from "vitest";
import { cn } from "../utils";

describe("cn utility", () => {
  it("должна объединять классы", () => {
    const result = cn("class1", "class2");
    expect(result).toContain("class1");
    expect(result).toContain("class2");
  });

  it("должна обрабатывать условные классы", () => {
    const result = cn("base", true && "conditional", false && "hidden");
    expect(result).toContain("base");
    expect(result).toContain("conditional");
    expect(result).not.toContain("hidden");
  });

  it("должна обрабатывать объекты с условиями", () => {
    const result = cn({
      active: true,
      disabled: false,
    });
    expect(result).toContain("active");
    expect(result).not.toContain("disabled");
  });

  it("должна объединять Tailwind классы корректно", () => {
    // tailwind-merge должен разрешать конфликты
    const result = cn("px-2", "px-4");
    // px-4 должен перезаписать px-2
    expect(result).toContain("px-4");
  });

  it("должна обрабатывать undefined и null", () => {
    const result = cn("base", undefined, null, "end");
    expect(result).toContain("base");
    expect(result).toContain("end");
  });

  it("должна обрабатывать массивы", () => {
    const result = cn(["class1", "class2"], "class3");
    expect(result).toContain("class1");
    expect(result).toContain("class2");
    expect(result).toContain("class3");
  });
});
