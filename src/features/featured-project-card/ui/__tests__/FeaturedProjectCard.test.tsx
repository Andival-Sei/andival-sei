import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { FeaturedProjectCard } from "../FeaturedProjectCard";
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

describe("FeaturedProjectCard component", () => {
  it("должен рендериться корректно", () => {
    render(<FeaturedProjectCard project={mockProject} index={1} />);
    // Используем getAllByText так как заголовок может быть в нескольких местах
    const titles = screen.getAllByText("Тестовый проект");
    expect(titles.length).toBeGreaterThan(0);
    expect(screen.getByText("Описание тестового проекта")).toBeInTheDocument();
  });

  it("должен отображать индекс с ведущими нулями", () => {
    render(<FeaturedProjectCard project={mockProject} index={1} />);
    // Индекс может быть в нескольких местах
    const indices = screen.getAllByText("01");
    expect(indices.length).toBeGreaterThan(0);
  });

  it("должен отображать статус и категорию", () => {
    render(<FeaturedProjectCard project={mockProject} index={1} />);
    expect(screen.getByText("Завершён")).toBeInTheDocument();
    expect(screen.getByText("Учебный проект")).toBeInTheDocument();
  });

  it("должен отображать технологии", () => {
    render(<FeaturedProjectCard project={mockProject} index={1} />);
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });

  it("должен отображать ссылки на демо и код", () => {
    render(<FeaturedProjectCard project={mockProject} index={1} />);
    const demoLink = screen.getByText("Демо").closest("a");
    const codeLink = screen.getByText("Код").closest("a");
    expect(demoLink).toHaveAttribute("href", "https://example.com");
    expect(codeLink).toHaveAttribute("href", "https://github.com/example");
  });

  it("должен показывать 'Давайте поговорим' если нет ссылок", () => {
    const projectWithoutLinks: Project = {
      ...mockProject,
      demoUrl: undefined,
      codeUrl: undefined,
    };
    render(<FeaturedProjectCard project={projectWithoutLinks} index={1} />);
    expect(screen.getByText("Давайте поговорим")).toBeInTheDocument();
  });

  it("должен использовать дефолтные значения для статуса и timeline", () => {
    const projectWithoutStatus: Project = {
      ...mockProject,
      status: undefined,
      timeline: undefined,
    };
    render(<FeaturedProjectCard project={projectWithoutStatus} index={1} />);
    expect(screen.getByText("Скоро")).toBeInTheDocument();
    expect(screen.getByText("В очереди")).toBeInTheDocument();
  });

  it("должен отображать изображение если указано", () => {
    const projectWithImage: Project = {
      ...mockProject,
      imageUrl: "/test-image.jpg",
    };
    render(<FeaturedProjectCard project={projectWithImage} index={1} />);
    const images = screen.getAllByAltText("Тестовый проект");
    expect(images.length).toBeGreaterThan(0);
  });

  it("должен отображать focus если указан", () => {
    const projectWithFocus: Project = {
      ...mockProject,
      focus: "Фокус проекта",
    };
    render(<FeaturedProjectCard project={projectWithFocus} index={1} />);
    expect(screen.getByText(/Фокус проекта ·/)).toBeInTheDocument();
    expect(screen.getByText("Фокус проекта")).toBeInTheDocument();
  });

  it("должен применять reversed класс когда reversed=true", () => {
    const { container } = render(
      <FeaturedProjectCard project={mockProject} index={1} reversed={true} />
    );
    const card = container.firstChild;
    expect(card).toHaveClass("lg:flex-row-reverse");
  });
});
