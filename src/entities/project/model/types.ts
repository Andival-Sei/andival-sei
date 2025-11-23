// Типы для сущности Project

export type ProjectCategory =
  | "Учебный проект"
  | "Коммерческий проект"
  | "Пет-проект"
  | "Open Source";

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies?: string[];
  imageUrl?: string;
  demoUrl?: string;
  codeUrl?: string;
  status?: string;
  timeline?: string;
  focus?: string;
  featured?: boolean;
  category?: ProjectCategory;
  // TODO: Добавить дополнительные поля по необходимости
  // - date: Date
  // - tags: string[]
}
