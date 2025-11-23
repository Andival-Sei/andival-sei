// Типы для сущности Project

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
  // TODO: Добавить дополнительные поля по необходимости
  // - date: Date
  // - category: string
  // - tags: string[]
}
