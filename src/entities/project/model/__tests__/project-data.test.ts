import { describe, it, expect } from "vitest";
import { projects } from "../project-data";
import type { Project, ProjectCategory } from "../types";

describe("projects", () => {
  it("должен быть массивом", () => {
    expect(Array.isArray(projects)).toBe(true);
  });

  it("должен содержать хотя бы один проект", () => {
    expect(projects.length).toBeGreaterThan(0);
  });

  it("каждый проект должен иметь обязательные поля", () => {
    projects.forEach((project) => {
      expect(project).toHaveProperty("id");
      expect(project).toHaveProperty("title");
      expect(project).toHaveProperty("description");
      expect(typeof project.id).toBe("string");
      expect(typeof project.title).toBe("string");
      expect(typeof project.description).toBe("string");
    });
  });

  it("каждый проект должен иметь валидный id", () => {
    projects.forEach((project) => {
      expect(project.id).toBeTruthy();
      expect(project.id.length).toBeGreaterThan(0);
    });
  });

  it("каждый проект должен иметь валидный title", () => {
    projects.forEach((project) => {
      expect(project.title).toBeTruthy();
      expect(project.title.length).toBeGreaterThan(0);
    });
  });

  it("каждый проект должен иметь валидный description", () => {
    projects.forEach((project) => {
      expect(project.description).toBeTruthy();
      expect(project.description.length).toBeGreaterThan(0);
    });
  });

  it("технологии должны быть массивом строк если указаны", () => {
    projects.forEach((project) => {
      if (project.technologies) {
        expect(Array.isArray(project.technologies)).toBe(true);
        project.technologies.forEach((tech) => {
          expect(typeof tech).toBe("string");
        });
      }
    });
  });

  it("URL должны быть валидными если указаны", () => {
    projects.forEach((project) => {
      if (project.demoUrl) {
        expect(project.demoUrl).toMatch(/^https?:\/\//);
      }
      if (project.codeUrl) {
        expect(project.codeUrl).toMatch(/^https?:\/\//);
      }
    });
  });

  it("category должен быть валидным типом если указан", () => {
    const validCategories: ProjectCategory[] = [
      "Учебный проект",
      "Коммерческий проект",
      "Пет-проект",
      "Open Source",
    ];

    projects.forEach((project) => {
      if (project.category) {
        expect(validCategories).toContain(project.category);
      }
    });
  });

  it("featured должен быть boolean если указан", () => {
    projects.forEach((project) => {
      if (project.featured !== undefined) {
        expect(typeof project.featured).toBe("boolean");
      }
    });
  });

  it("должен иметь хотя бы один featured проект", () => {
    const featuredProjects = projects.filter((p) => p.featured === true);
    expect(featuredProjects.length).toBeGreaterThan(0);
  });

  it("каждый проект должен соответствовать типу Project", () => {
    const isValidProject = (data: unknown): data is Project => {
      if (typeof data !== "object" || data === null) return false;
      const obj = data as Record<string, unknown>;
      return (
        typeof obj.id === "string" &&
        typeof obj.title === "string" &&
        typeof obj.description === "string" &&
        (obj.technologies === undefined ||
          (Array.isArray(obj.technologies) &&
            obj.technologies.every((t) => typeof t === "string"))) &&
        (obj.category === undefined ||
          [
            "Учебный проект",
            "Коммерческий проект",
            "Пет-проект",
            "Open Source",
          ].includes(obj.category as string)) &&
        (obj.featured === undefined || typeof obj.featured === "boolean")
      );
    };

    projects.forEach((project) => {
      expect(isValidProject(project)).toBe(true);
    });
  });

  it("id проектов должны быть уникальными", () => {
    const ids = projects.map((p) => p.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });
});
