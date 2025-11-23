// TODO: Реализовать секцию проектов
// - Добавить отображение списка проектов
// - Добавить фильтры по технологиям
// - Добавить пагинацию (если много проектов)

import { projects } from "@/src/entities/project/model/project-data";
import { ProjectCard } from "@/src/features/project-card";
import { Section } from "@/src/shared/ui/Section";

export function ProjectsSection() {
  return (
    <Section className="py-20">
      <div className="mb-12 flex flex-col gap-4 text-center md:text-left">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Featured Projects
        </h2>
        <p className="text-muted-foreground max-w-[700px] text-lg">
          A collection of my recent work and experiments.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </Section>
  );
}
