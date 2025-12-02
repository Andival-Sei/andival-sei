import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useMounted } from "../useMounted";

describe("useMounted hook", () => {
  it("должен возвращать true после монтирования", () => {
    const { result } = renderHook(() => useMounted());
    expect(result.current).toBe(true);
  });

  it("должен возвращать стабильное значение при ре-рендерах", () => {
    const { result, rerender } = renderHook(() => useMounted());
    expect(result.current).toBe(true);

    rerender();
    expect(result.current).toBe(true);

    rerender();
    expect(result.current).toBe(true);
  });
});
