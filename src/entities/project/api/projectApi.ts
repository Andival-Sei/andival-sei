import type { Project } from '../model';

/**
 * API для работы с проектами
 * TODO: Реализовать загрузку проектов с сервера
 */

// Временные данные-заглушки для демонстрации
const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Портфолио сайт',
    description: 'Современный портфолио сайт с адаптивным дизайном и поддержкой темной темы',
    fullDescription: 'Личный сайт-портфолио, созданный с использованием Next.js, TypeScript и SCSS',
    image: '/images/portfolio.jpg',
    technologies: ['Next.js', 'TypeScript', 'React', 'SCSS'],
    category: 'web',
    status: 'in-progress',
    github: 'https://github.com',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Интернет-магазин',
    description: 'Полнофункциональный интернет-магазин с корзиной и системой оплаты',
    fullDescription: 'E-commerce платформа с современным UI/UX дизайном',
    image: '/images/shop.jpg',
    technologies: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
    category: 'web',
    status: 'completed',
    link: 'https://example.com',
    github: 'https://github.com',
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    title: 'Мобильное приложение',
    description: 'Кроссплатформенное мобильное приложение для управления задачами',
    fullDescription: 'Приложение для управления задачами с синхронизацией в облаке',
    image: '/images/mobile-app.jpg',
    technologies: ['React Native', 'TypeScript', 'Firebase'],
    category: 'mobile',
    status: 'in-progress',
    github: 'https://github.com',
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export const projectApi = {
  /**
   * Получить все проекты
   */
  async getAll(): Promise<Project[]> {
    // TODO: Реализовать загрузку с сервера
    // Временно возвращаем заглушки для демонстрации
    return mockProjects;
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
