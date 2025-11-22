// TODO: Реализовать карточку проекта
// - Добавить изображение проекта
// - Добавить описание
// - Добавить теги технологий
// - Добавить ссылки (демо, код)
// - Добавить hover эффекты

import { Card } from '@/src/shared/ui/Card';
import type { Project } from '@/src/entities/project/model/types';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card>
      {/* TODO: Добавить изображение проекта */}
      <div className="aspect-video w-full bg-muted" />
      
      <div className="p-6">
        <h3 className="text-xl font-semibold">{project.title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {project.description}
        </p>
        
        {/* TODO: Добавить теги технологий */}
        <div className="mt-4 flex flex-wrap gap-2">
          {project.technologies?.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-muted px-2 py-1 text-xs"
            >
              {tech}
            </span>
          ))}
        </div>
        
        {/* TODO: Добавить ссылки на проект */}
        <div className="mt-4 flex gap-2">
          {/* TODO: Добавить кнопки для демо и кода */}
        </div>
      </div>
    </Card>
  );
}

