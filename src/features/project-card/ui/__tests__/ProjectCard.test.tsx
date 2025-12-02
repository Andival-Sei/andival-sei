import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectCard } from "../ProjectCard";
import type { Project } from "@/src/entities/project/model/types";

// Мокаем Next.js компоненты
vi.mock("next/image", () => ({
  default: ({ src, alt, ...props }: any) => (
    <img src={src} alt={alt} {...props} />
  ),
}));

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

const mockProject: Project = {
  id: "test-project",
  title: "Тестовый проект",
  description: "Описание тестового проекта",
  technologies: ["React", "TypeScript"],
  status: "Завершён",
  timeline: "2024",
  category: "Учебный проект",
  demoUrl: "https://example.com",
  codeUrl: "https://github.com/example",
  featured: true,
};

describe("ProjectCard component", () => {
  it("должен рендериться корректно", () => {
    render(<ProjectCard project={mockProject} />);
    expect(screen.getByText("Тестовый проект")).toBeInTheDocument();
    expect(screen.getByText("Описание тестового проекта")).toBeInTheDocument();
  });

  it("должен отображать статус проекта", () => {
    render(<ProjectCard project={mockProject} />);
    expect(screen.getByText("Завершён")).toBeInTheDocument();
  });

  it("должен отображать категорию проекта", () => {
    render(<ProjectCard project={mockProject} />);
    expect(screen.getByText("Учебный проект")).toBeInTheDocument();
  });

  it("должен отображать технологии", () => {
    render(<ProjectCard project={mockProject} />);
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });

  it("должен отображать ссылки на демо и код", () => {
    render(<ProjectCard project={mockProject} />);
    const demoLink = screen.getByText("Демо").closest("a");
    const codeLink = screen.getByText("Код").closest("a");
    expect(demoLink).toHaveAttribute("href", "https://example.com");
    expect(codeLink).toHaveAttribute("href", "https://github.com/example");
  });

  it("должен отображать индекс если передан", () => {
    render(<ProjectCard project={mockProject} index={1} />);
    expect(screen.getByText("01")).toBeInTheDocument();
  });

  it("должен форматировать индекс с ведущими нулями", () => {
    render(<ProjectCard project={mockProject} index={5} />);
    expect(screen.getByText("05")).toBeInTheDocument();
  });

  it("должен показывать 'Давайте поговорим' если нет ссылок", () => {
    const projectWithoutLinks: Project = {
      ...mockProject,
      demoUrl: undefined,
      codeUrl: undefined,
    };
    render(<ProjectCard project={projectWithoutLinks} />);
    expect(screen.getByText("Давайте поговорим")).toBeInTheDocument();
  });

  it("должен использовать дефолтные значения для статуса и timeline", () => {
    const projectWithoutStatus: Project = {
      ...mockProject,
      status: undefined,
      timeline: undefined,
    };
    render(<ProjectCard project={projectWithoutStatus} />);
    expect(screen.getByText("Скоро")).toBeInTheDocument();
    expect(screen.getByText("В очереди")).toBeInTheDocument();
  });

  it("должен отображать изображение если указано", () => {
    const projectWithImage: Project = {
      ...mockProject,
      imageUrl: "/test-image.jpg",
    };
    render(<ProjectCard project={projectWithImage} />);
    const image = screen.getByAltText("Тестовый проект");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/test-image.jpg");
  });

  it("должен отображать focus если указан", () => {
    const projectWithFocus: Project = {
      ...mockProject,
      focus: "Фокус проекта",
    };
    render(<ProjectCard project={projectWithFocus} />);
    expect(screen.getByText(/Фокус ·/)).toBeInTheDocument();
    expect(screen.getByText("Фокус проекта")).toBeInTheDocument();
  });
});
