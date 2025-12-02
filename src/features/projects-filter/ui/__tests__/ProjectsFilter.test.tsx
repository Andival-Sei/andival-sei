import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProjectsFilter } from "../ProjectsFilter";
import type { Project } from "@/src/entities/project/model/types";

const mockProjects: Project[] = [
  {
    id: "1",
    title: "React проект",
    description: "Проект на React",
    technologies: ["React", "TypeScript"],
    category: "Учебный проект",
    status: "Завершён",
    timeline: "2024",
    featured: true,
  },
  {
    id: "2",
    title: "Vue проект",
    description: "Проект на Vue",
    technologies: ["Vue", "JavaScript"],
    category: "Пет-проект",
    status: "В разработке",
    timeline: "2023",
    featured: false,
  },
  {
    id: "3",
    title: "Next.js проект",
    description: "Проект на Next.js",
    technologies: ["Next.js", "TypeScript", "React"],
    category: "Учебный проект",
    status: "Завершён",
    timeline: "2024",
    featured: true,
  },
];

describe("ProjectsFilter component", () => {
  const mockOnFilterChange = vi.fn();
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
    mockOnFilterChange.mockClear();
  });

  it("должен рендериться корректно", () => {
    render(
      <ProjectsFilter
        projects={mockProjects}
        onFilterChange={mockOnFilterChange}
      />
    );
    expect(
      screen.getByPlaceholderText("Поиск по названию или описанию...")
    ).toBeInTheDocument();
  });

  it("должен фильтровать проекты по поисковому запросу", async () => {
    render(
      <ProjectsFilter
        projects={mockProjects}
        onFilterChange={mockOnFilterChange}
      />
    );

    const searchInput = screen.getByPlaceholderText(
      "Поиск по названию или описанию..."
    );
    await user.type(searchInput, "React");

    await waitFor(() => {
      expect(mockOnFilterChange).toHaveBeenCalled();
      const lastCall =
        mockOnFilterChange.mock.calls[
          mockOnFilterChange.mock.calls.length - 1
        ][0];
      // Должно быть минимум 1 проект с React (может быть 2: React проект и Next.js проект)
      expect(lastCall.length).toBeGreaterThanOrEqual(1);
      expect(
        lastCall.some(
          (p: Project) =>
            p.title.includes("React") || p.technologies?.includes("React")
        )
      ).toBe(true);
    });
  });

  it("должен показывать счетчик результатов", () => {
    render(
      <ProjectsFilter
        projects={mockProjects}
        onFilterChange={mockOnFilterChange}
      />
    );
    expect(screen.getByText(/Найдено проектов: 3 из 3/)).toBeInTheDocument();
  });

  it("должен вызывать onFilterChange при изменении фильтров", async () => {
    render(
      <ProjectsFilter
        projects={mockProjects}
        onFilterChange={mockOnFilterChange}
      />
    );

    await waitFor(() => {
      expect(mockOnFilterChange).toHaveBeenCalled();
    });
  });

  it("должен сортировать проекты", async () => {
    render(
      <ProjectsFilter
        projects={mockProjects}
        onFilterChange={mockOnFilterChange}
      />
    );

    // Находим кнопку сортировки
    const sortButton = screen.getByText(/Рекомендуемые/);
    await user.click(sortButton);

    // Ждем появления меню и выбираем опцию
    await waitFor(() => {
      const sortOption = screen.getByText("Название (А-Я)");
      expect(sortOption).toBeInTheDocument();
    });

    const sortOption = screen.getByText("Название (А-Я)");
    await user.click(sortOption);

    await waitFor(() => {
      expect(mockOnFilterChange).toHaveBeenCalled();
    });
  });

  it("должен показывать кнопку сброса при активных фильтрах", async () => {
    render(
      <ProjectsFilter
        projects={mockProjects}
        onFilterChange={mockOnFilterChange}
      />
    );

    const searchInput = screen.getByPlaceholderText(
      "Поиск по названию или описанию..."
    );
    await user.type(searchInput, "React");

    await waitFor(() => {
      expect(screen.getByText("Сбросить")).toBeInTheDocument();
    });
  });

  it("должен сбрасывать фильтры при нажатии на кнопку сброса", async () => {
    render(
      <ProjectsFilter
        projects={mockProjects}
        onFilterChange={mockOnFilterChange}
      />
    );

    const searchInput = screen.getByPlaceholderText(
      "Поиск по названию или описанию..."
    );
    await user.type(searchInput, "React");

    await waitFor(() => {
      expect(screen.getByText("Сбросить")).toBeInTheDocument();
    });

    const resetButton = screen.getByText("Сбросить");
    await user.click(resetButton);

    await waitFor(() => {
      expect(searchInput).toHaveValue("");
    });
  });
});
