// TODO: Реализовать карточку проекта
// - Добавить изображение проекта
// - Добавить описание
// - Добавить теги технологий
// - Добавить ссылки (демо, код)
// - Добавить hover эффекты

import type { Project } from "@/src/entities/project/model/types";
import { Card, CardContent } from "@/src/shared/ui/Card";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card>
      {/* TODO: Добавить изображение проекта */}
      <div className="bg-muted aspect-video w-full" />

      <CardContent>
        <h3 className="text-xl font-semibold">{project.title}</h3>
        <p className="text-muted-foreground mt-2 text-sm">
          {project.description}
        </p>

        {/* TODO: Добавить теги технологий */}
        <div className="mt-4 flex flex-wrap gap-2">
          {project.technologies?.map((tech) => (
            <span
              key={tech}
              className="bg-muted rounded-full px-2 py-1 text-xs"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* TODO: Добавить ссылки на проект */}
        <div className="mt-4 flex gap-2">
          {/* TODO: Добавить кнопки для демо и кода */}
        </div>
      </CardContent>
    </Card>
  );
}
