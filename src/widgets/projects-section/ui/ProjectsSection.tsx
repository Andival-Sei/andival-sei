"use client";

import { useState } from "react";

import { projects } from "@/src/entities/project/model/project-data";
import type { Project } from "@/src/entities/project/model/types";
import { ProjectCard } from "@/src/features/project-card";
import { ProjectsFilter } from "@/src/features/projects-filter";
import { FadeIn } from "@/src/shared/ui";

export function ProjectsSection() {
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);

  const completedProjects = projects.filter(
    (p) => p.status === "Завершён"
  ).length;
  const metrics = [
    {
      label: "Завершённых проектов",
      value: completedProjects.toString().padStart(2, "0"),
      hint: "Готовые к демонстрации",
    },
    {
      label: "Всего проектов",
      value: projects.length.toString().padStart(2, "0"),
      hint: "В портфолио",
    },
    {
      label: "Технологии",
      value: "React, TypeScript",
      hint: "Современный стек",
    },
  ];

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      {/* Декоративные фоновые элементы */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Градиентные круги */}
        <div className="bg-primary/10 absolute -left-1/4 top-1/4 h-96 w-96 rounded-full blur-3xl" />
        <div className="bg-primary/5 absolute -right-1/4 bottom-1/4 h-96 w-96 rounded-full blur-3xl" />
        <div className="bg-primary/5 absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" />

        {/* Сетка паттерн */}
        <div
          className="bg-size-[24px_24px] absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)]"
          style={{
            maskImage:
              "radial-gradient(ellipse 80% 50% at 50% 0%, #000 70%, transparent 110%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 50% at 50% 0%, #000 70%, transparent 110%)",
          }}
        />
      </div>

      <div className="container mx-auto px-4">
        <div className="space-y-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <FadeIn className="max-w-2xl space-y-5" direction="right">
              <div className="text-primary flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em]">
                <span className="bg-primary/10 text-primary rounded-full px-3 py-1 font-semibold">
                  Портфолио проектов
                </span>
                <span className="text-muted-foreground">
                  Реализованные проекты с открытым исходным кодом
                </span>
              </div>

              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Все проекты
              </h2>
              <p className="text-muted-foreground text-lg">
                Полная коллекция реализованных веб-приложений, демонстрирующих
                навыки разработки на современном стеке. Каждый проект включает
                ссылки на демо-версию и исходный код на GitHub.
              </p>

              <div className="grid gap-3 sm:grid-cols-3">
                {metrics.map((metric, index) => (
                  <FadeIn
                    key={metric.label}
                    delay={0.1 + index * 0.1}
                    scale={0.95}
                    className="bg-card/70 border-border/70 rounded-xl border p-4 shadow-sm backdrop-blur"
                  >
                    <p className="text-muted-foreground text-xs uppercase tracking-[0.2em]">
                      {metric.label}
                    </p>
                    <p className="text-2xl font-semibold">{metric.value}</p>
                    <p className="text-muted-foreground text-sm">
                      {metric.hint}
                    </p>
                  </FadeIn>
                ))}
              </div>
            </FadeIn>

            <FadeIn
              direction="left"
              delay={0.2}
              className="bg-card/80 border-border/70 rounded-2xl border p-6 shadow-lg backdrop-blur"
            >
              <div className="text-muted-foreground text-xs uppercase tracking-[0.15em]">
                О проектах
              </div>
              <div className="text-muted-foreground mt-4 space-y-3 text-sm leading-relaxed">
                <div className="text-foreground font-semibold">
                  Полнофункциональные веб-приложения
                </div>
                <p>
                  Каждый проект демонстрирует практические навыки работы с
                  современными технологиями и инструментами разработки.
                </p>
                <ul className="space-y-2">
                  <li className="flex gap-3">
                    <span className="bg-primary/70 mt-2 h-2 w-2 rounded-full" />
                    <div>
                      <p className="text-foreground">Открытый исходный код</p>
                      <p>Все проекты доступны на GitHub для изучения.</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="bg-primary/70 mt-2 h-2 w-2 rounded-full" />
                    <div>
                      <p className="text-foreground">Рабочие демо</p>
                      <p>Каждый проект развёрнут и доступен онлайн.</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="bg-primary/70 mt-2 h-2 w-2 rounded-full" />
                    <div>
                      <p className="text-foreground">Современный стек</p>
                      <p>
                        React, TypeScript, современные инструменты и практики.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </FadeIn>
          </div>

          {/* Фильтры и сортировка */}
          <FadeIn
            delay={0.3}
            className="bg-card/50 border-border/70 rounded-xl border p-6 backdrop-blur"
          >
            <ProjectsFilter
              projects={projects}
              onFilterChange={setFilteredProjects}
            />
          </FadeIn>

          {/* Отфильтрованные проекты */}
          {filteredProjects.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredProjects.map((project, index) => (
                <FadeIn key={project.id} delay={index * 0.05} fullWidth>
                  <ProjectCard project={project} index={index + 1} />
                </FadeIn>
              ))}
            </div>
          ) : (
            <FadeIn className="bg-card/50 border-border/70 rounded-xl border p-12 text-center">
              <p className="text-muted-foreground text-lg">
                Проекты не найдены по выбранным фильтрам
              </p>
              <p className="text-muted-foreground mt-2 text-sm">
                Попробуйте изменить параметры фильтрации
              </p>
            </FadeIn>
          )}
        </div>
      </div>
    </section>
  );
}
