// TODO: Реализовать секцию проектов
// - Добавить отображение списка проектов
// - Добавить фильтры по технологиям
// - Добавить пагинацию (если много проектов)

import { Section } from '@/src/shared/ui/Section';
import { ProjectCard } from '@/src/features/project-card';
import { projects } from '@/src/entities/project/model/project-data';

export function ProjectsSection() {
  return (
    <Section>
      <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* TODO: Добавить фильтрацию и сортировку проектов */}
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </Section>
  );
}

