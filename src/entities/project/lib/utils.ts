import type { Project, ProjectCategory } from '../model';

/**
 * Утилиты для работы с проектами
 */

export const projectUtils = {
  /**
   * Фильтровать проекты по категории
   */
  filterByCategory(projects: Project[], category: ProjectCategory): Project[] {
    return projects.filter((project) => project.category === category);
  },

  /**
   * Фильтровать проекты по статусу
   */
  filterByStatus(projects: Project[], status: Project['status']): Project[] {
    return projects.filter((project) => project.status === status);
  },

  /**
   * Поиск проектов по тексту
   */
  search(projects: Project[], query: string): Project[] {
    const lowerQuery = query.toLowerCase();
    return projects.filter(
      (project) =>
        project.title.toLowerCase().includes(lowerQuery) ||
        project.description.toLowerCase().includes(lowerQuery) ||
        project.technologies.some((tech) => tech.toLowerCase().includes(lowerQuery))
    );
  },
};
