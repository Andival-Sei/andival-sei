"use client";

import { ArrowDownUp, ChevronDown, Filter, Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import type {
  Project,
  ProjectCategory,
} from "@/src/entities/project/model/types";
import { Badge } from "@/src/shared/ui/Badge";
import { Button } from "@/src/shared/ui/Button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/shared/ui/DropdownMenu";
import { Input } from "@/src/shared/ui/Input";

export type SortOption =
  | "title-asc"
  | "title-desc"
  | "timeline-desc"
  | "timeline-asc"
  | "featured-first";

export interface ProjectsFilterProps {
  projects: Project[];
  onFilterChange: (filteredProjects: Project[]) => void;
}

export function ProjectsFilter({
  projects,
  onFilterChange,
}: ProjectsFilterProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>(
    []
  );
  const [selectedCategories, setSelectedCategories] = useState<
    ProjectCategory[]
  >([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<SortOption>("featured-first");

  // Получаем все уникальные технологии из проектов
  const allTechnologies = useMemo(() => {
    const techSet = new Set<string>();
    projects.forEach((project) => {
      project.technologies?.forEach((tech) => techSet.add(tech));
    });
    return Array.from(techSet).sort();
  }, [projects]);

  // Получаем все уникальные категории
  const allCategories = useMemo(() => {
    const catSet = new Set<ProjectCategory>();
    projects.forEach((project) => {
      if (project.category) {
        catSet.add(project.category);
      }
    });
    return Array.from(catSet).sort();
  }, [projects]);

  // Получаем все уникальные статусы
  const allStatuses = useMemo(() => {
    const statusSet = new Set<string>();
    projects.forEach((project) => {
      if (project.status) {
        statusSet.add(project.status);
      }
    });
    return Array.from(statusSet).sort();
  }, [projects]);

  // Применяем фильтры и сортировку
  const filteredAndSortedProjects = useMemo(() => {
    const filtered = projects.filter((project) => {
      // Поиск по названию и описанию
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = project.title.toLowerCase().includes(query);
        const matchesDescription = project.description
          .toLowerCase()
          .includes(query);
        if (!matchesTitle && !matchesDescription) {
          return false;
        }
      }

      // Фильтр по технологиям
      if (
        selectedTechnologies.length > 0 &&
        (!project.technologies ||
          !selectedTechnologies.some((tech) =>
            project.technologies?.includes(tech)
          ))
      ) {
        return false;
      }

      // Фильтр по категориям
      if (
        selectedCategories.length > 0 &&
        (!project.category || !selectedCategories.includes(project.category))
      ) {
        return false;
      }

      // Фильтр по статусам
      if (
        selectedStatuses.length > 0 &&
        (!project.status || !selectedStatuses.includes(project.status))
      ) {
        return false;
      }

      return true;
    });

    // Сортировка
    const sorted = [...filtered].sort((a, b) => {
      switch (sortOption) {
        case "title-asc":
          return a.title.localeCompare(b.title, "ru");
        case "title-desc":
          return b.title.localeCompare(a.title, "ru");
        case "timeline-desc":
          return (b.timeline || "").localeCompare(a.timeline || "", "ru");
        case "timeline-asc":
          return (a.timeline || "").localeCompare(b.timeline || "", "ru");
        case "featured-first":
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
        default:
          return 0;
      }
    });

    return sorted;
  }, [
    projects,
    searchQuery,
    selectedTechnologies,
    selectedCategories,
    selectedStatuses,
    sortOption,
  ]);

  // Обновляем отфильтрованные проекты при изменении фильтров
  useEffect(() => {
    onFilterChange(filteredAndSortedProjects);
  }, [filteredAndSortedProjects, onFilterChange]);

  // Проверяем, есть ли активные фильтры
  const hasActiveFilters =
    searchQuery.length > 0 ||
    selectedTechnologies.length > 0 ||
    selectedCategories.length > 0 ||
    selectedStatuses.length > 0;

  // Сброс всех фильтров
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedTechnologies([]);
    setSelectedCategories([]);
    setSelectedStatuses([]);
    setSortOption("featured-first");
  };

  const toggleTechnology = (tech: string) => {
    setSelectedTechnologies((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  const toggleCategory = (category: ProjectCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleStatus = (status: string) => {
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  const getSortLabel = (option: SortOption) => {
    switch (option) {
      case "title-asc":
        return "Название (А-Я)";
      case "title-desc":
        return "Название (Я-А)";
      case "timeline-desc":
        return "Дата (новые)";
      case "timeline-asc":
        return "Дата (старые)";
      case "featured-first":
        return "Рекомендуемые";
      default:
        return "По умолчанию";
    }
  };

  return (
    <div className="space-y-4">
      {/* Строка поиска и сортировки */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        {/* Поиск */}
        <div className="relative flex-1">
          <Search className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />
          <Input
            type="text"
            placeholder="Поиск по названию или описанию..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-border/50 bg-background/50 hover:border-border/70 focus-visible:border-primary/50 pl-10"
          />
        </div>

        {/* Сортировка */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="border-border/50 bg-background/50 hover:border-border/70 hover:bg-accent/50 w-full sm:w-auto"
            >
              <ArrowDownUp className="mr-2 size-4" />
              {getSortLabel(sortOption)}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="border-border/50 bg-popover/95 w-56 backdrop-blur-sm"
          >
            <DropdownMenuLabel>Сортировка</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={sortOption}
              onValueChange={(value) => setSortOption(value as SortOption)}
            >
              <DropdownMenuRadioItem value="featured-first">
                Рекомендуемые
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="title-asc">
                Название (А-Я)
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="title-desc">
                Название (Я-А)
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="timeline-desc">
                Дата (новые)
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="timeline-asc">
                Дата (старые)
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Фильтры */}
      <div className="flex flex-wrap gap-2">
        {/* Фильтр по технологиям */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="border-border/50 bg-background/50 hover:border-border/70 hover:bg-accent/50"
            >
              <Filter className="mr-2 size-4" />
              Технологии
              {selectedTechnologies.length > 0 && (
                <Badge
                  variant="secondary"
                  className="ml-2 h-5 min-w-5 px-1.5 text-xs"
                >
                  {selectedTechnologies.length}
                </Badge>
              )}
              <ChevronDown className="ml-2 size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="border-border/50 bg-popover/95 max-h-[300px] w-64 backdrop-blur-sm"
          >
            <DropdownMenuLabel>Технологии</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-[250px] overflow-y-auto">
              {allTechnologies.map((tech) => (
                <DropdownMenuCheckboxItem
                  key={tech}
                  checked={selectedTechnologies.includes(tech)}
                  onCheckedChange={() => toggleTechnology(tech)}
                >
                  {tech}
                </DropdownMenuCheckboxItem>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Фильтр по категориям */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="border-border/50 bg-background/50 hover:border-border/70 hover:bg-accent/50"
            >
              <Filter className="mr-2 size-4" />
              Категории
              {selectedCategories.length > 0 && (
                <Badge
                  variant="secondary"
                  className="ml-2 h-5 min-w-5 px-1.5 text-xs"
                >
                  {selectedCategories.length}
                </Badge>
              )}
              <ChevronDown className="ml-2 size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="border-border/50 bg-popover/95 w-56 backdrop-blur-sm"
          >
            <DropdownMenuLabel>Категории</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {allCategories.map((category) => (
              <DropdownMenuCheckboxItem
                key={category}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => toggleCategory(category)}
              >
                {category}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Фильтр по статусам */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="border-border/50 bg-background/50 hover:border-border/70 hover:bg-accent/50"
            >
              <Filter className="mr-2 size-4" />
              Статус
              {selectedStatuses.length > 0 && (
                <Badge
                  variant="secondary"
                  className="ml-2 h-5 min-w-5 px-1.5 text-xs"
                >
                  {selectedStatuses.length}
                </Badge>
              )}
              <ChevronDown className="ml-2 size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="border-border/50 bg-popover/95 w-56 backdrop-blur-sm"
          >
            <DropdownMenuLabel>Статус</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {allStatuses.map((status) => (
              <DropdownMenuCheckboxItem
                key={status}
                checked={selectedStatuses.includes(status)}
                onCheckedChange={() => toggleStatus(status)}
              >
                {status}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Кнопка сброса фильтров */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="mr-2 size-4" />
            Сбросить
          </Button>
        )}
      </div>

      {/* Активные фильтры (чипсы) */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {selectedTechnologies.map((tech) => (
            <Badge
              key={tech}
              variant="secondary"
              className="cursor-pointer gap-1 pr-1"
              onClick={() => toggleTechnology(tech)}
            >
              {tech}
              <X className="size-3" />
            </Badge>
          ))}
          {selectedCategories.map((category) => (
            <Badge
              key={category}
              variant="secondary"
              className="cursor-pointer gap-1 pr-1"
              onClick={() => toggleCategory(category)}
            >
              {category}
              <X className="size-3" />
            </Badge>
          ))}
          {selectedStatuses.map((status) => (
            <Badge
              key={status}
              variant="secondary"
              className="cursor-pointer gap-1 pr-1"
              onClick={() => toggleStatus(status)}
            >
              {status}
              <X className="size-3" />
            </Badge>
          ))}
        </div>
      )}

      {/* Счетчик результатов */}
      <div className="text-muted-foreground text-sm">
        Найдено проектов: {filteredAndSortedProjects.length} из{" "}
        {projects.length}
      </div>
    </div>
  );
}
