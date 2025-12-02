import { describe, it, expect } from "vitest";
import { contactInfo } from "../contact-data";
import type { ContactInfo } from "../types";

describe("contactInfo", () => {
  it("должен быть определен", () => {
    expect(contactInfo).toBeDefined();
  });

  it("должен иметь корректную структуру ContactInfo", () => {
    expect(contactInfo).toHaveProperty("email");
    expect(contactInfo).toHaveProperty("location");
    expect(contactInfo).toHaveProperty("socialLinks");
  });

  it("должен иметь валидный email", () => {
    expect(contactInfo.email).toBeTruthy();
    expect(typeof contactInfo.email).toBe("string");
    expect(contactInfo.email).toContain("@");
  });

  it("должен иметь location", () => {
    expect(contactInfo.location).toBeTruthy();
    expect(typeof contactInfo.location).toBe("string");
  });

  it("должен иметь socialLinks объект", () => {
    expect(contactInfo.socialLinks).toBeDefined();
    expect(typeof contactInfo.socialLinks).toBe("object");
  });

  it("должен иметь валидные социальные ссылки", () => {
    const { socialLinks } = contactInfo;
    if (socialLinks) {
      if (socialLinks.github) {
        expect(socialLinks.github).toMatch(/^https?:\/\//);
      }
      if (socialLinks.telegram) {
        expect(socialLinks.telegram).toMatch(/^https?:\/\//);
      }
      if (socialLinks.vk) {
        expect(socialLinks.vk).toMatch(/^https?:\/\//);
      }
    }
  });

  it("должен соответствовать типу ContactInfo", () => {
    const isValidContactInfo = (data: unknown): data is ContactInfo => {
      if (typeof data !== "object" || data === null) return false;
      const obj = data as Record<string, unknown>;
      return (
        typeof obj.email === "string" &&
        (obj.location === undefined || typeof obj.location === "string") &&
        (obj.socialLinks === undefined || typeof obj.socialLinks === "object")
      );
    };

    expect(isValidContactInfo(contactInfo)).toBe(true);
  });
});
