import { describe, it, expect } from "vitest";
import { skills } from "../skill-data";
import type { Skill } from "../types";

describe("skills", () => {
  it("должен быть массивом", () => {
    expect(Array.isArray(skills)).toBe(true);
  });

  it("должен содержать хотя бы один навык", () => {
    expect(skills.length).toBeGreaterThan(0);
  });

  it("каждый навык должен иметь обязательные поля", () => {
    skills.forEach((skill) => {
      expect(skill).toHaveProperty("id");
      expect(skill).toHaveProperty("name");
      expect(skill).toHaveProperty("category");
      expect(typeof skill.id).toBe("string");
      expect(typeof skill.name).toBe("string");
      expect(typeof skill.category).toBe("string");
    });
  });

  it("каждый навык должен иметь валидный id", () => {
    skills.forEach((skill) => {
      expect(skill.id).toBeTruthy();
      expect(skill.id.length).toBeGreaterThan(0);
    });
  });

  it("каждый навык должен иметь валидный name", () => {
    skills.forEach((skill) => {
      expect(skill.name).toBeTruthy();
      expect(skill.name.length).toBeGreaterThan(0);
    });
  });

  it("category должен быть валидным типом", () => {
    const validCategories = ["frontend", "backend", "tools", "other"];

    skills.forEach((skill) => {
      expect(validCategories).toContain(skill.category);
    });
  });

  it("level должен быть валидным типом если указан", () => {
    const validLevels = ["beginner", "intermediate", "advanced", "expert"];

    skills.forEach((skill) => {
      if (skill.level) {
        expect(validLevels).toContain(skill.level);
      }
    });
  });

  it("каждый навык должен соответствовать типу Skill", () => {
    const isValidSkill = (data: unknown): data is Skill => {
      if (typeof data !== "object" || data === null) return false;
      const obj = data as Record<string, unknown>;
      return (
        typeof obj.id === "string" &&
        typeof obj.name === "string" &&
        ["frontend", "backend", "tools", "other"].includes(
          obj.category as string
        ) &&
        (obj.level === undefined ||
          ["beginner", "intermediate", "advanced", "expert"].includes(
            obj.level as string
          ))
      );
    };

    skills.forEach((skill) => {
      expect(isValidSkill(skill)).toBe(true);
    });
  });

  it("id навыков должны быть уникальными", () => {
    const ids = skills.map((s) => s.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });
});
