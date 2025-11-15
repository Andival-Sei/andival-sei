import type { Project } from '../model';

/**
 * API для работы с проектами
 * TODO: Реализовать загрузку проектов с сервера
 */

export const projectApi = {
  /**
   * Получить все проекты
   */
  async getAll(): Promise<Project[]> {
    // TODO: Реализовать загрузку с сервера
    return [];
  },

  /**
   * Получить проект по ID
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getById(_id: string): Promise<Project | null> {
    // TODO: Реализовать загрузку с сервера
    return null;
  },

  /**
   * Получить проекты по категории
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getByCategory(_category: Project['category']): Promise<Project[]> {
    // TODO: Реализовать загрузку с сервера
    return [];
  },
};
