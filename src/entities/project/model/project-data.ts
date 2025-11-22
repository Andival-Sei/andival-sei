// TODO: Заменить заглушки на реальные данные проектов

import type { Project } from "./types";

export const projects: Project[] = [
  {
    id: "1",
    title: "Project 1",
    description: "TODO: Добавить описание проекта",
    technologies: ["React", "TypeScript"],
    // TODO: Добавить изображения проектов
    // imageUrl: '/projects/project-1.jpg',
    // demoUrl: 'https://example.com',
    // codeUrl: 'https://github.com/example',
  },
  {
    id: "2",
    title: "Project 2",
    description: "TODO: Добавить описание проекта",
    technologies: ["Next.js", "Tailwind CSS"],
  },
  {
    id: "3",
    title: "Project 3",
    description: "TODO: Добавить описание проекта",
    technologies: ["Node.js", "PostgreSQL"],
  },
];
