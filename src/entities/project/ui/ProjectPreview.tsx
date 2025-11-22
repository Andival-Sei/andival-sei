// TODO: Реализовать превью проекта (для использования в списках)
// Компонент для отображения краткой информации о проекте

import type { Project } from "../model/types";

interface ProjectPreviewProps {
  project: Project;
}

export function ProjectPreview({ project }: ProjectPreviewProps) {
  return (
    <div>
      {/* TODO: Реализовать превью проекта */}
      <h3>{project.title}</h3>
      <p>{project.description}</p>
    </div>
  );
}
