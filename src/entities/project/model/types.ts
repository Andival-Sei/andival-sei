/**
 * Сущность "Проект"
 * Описывает структуру проекта в портфолио
 */

export type ProjectCategory = 'web' | 'mobile' | 'desktop' | 'other';
export type ProjectStatus = 'completed' | 'in-progress' | 'archived';

export interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription?: string;
  image: string;
  technologies: string[];
  category: ProjectCategory;
  status: ProjectStatus;
  link?: string;
  github?: string;
  createdAt: string;
  updatedAt?: string;
}
