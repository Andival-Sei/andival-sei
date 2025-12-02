import { describe, it, expect } from "vitest";
import { SITE_NAME, SITE_DESCRIPTION } from "../constants";

describe("constants", () => {
  it("должен экспортировать SITE_NAME", () => {
    expect(SITE_NAME).toBeDefined();
    expect(typeof SITE_NAME).toBe("string");
    expect(SITE_NAME).toBe("Portfolio");
  });

  it("должен экспортировать SITE_DESCRIPTION", () => {
    expect(SITE_DESCRIPTION).toBeDefined();
    expect(typeof SITE_DESCRIPTION).toBe("string");
    expect(SITE_DESCRIPTION).toBe("Personal portfolio website");
  });
});
