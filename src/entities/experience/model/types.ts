/**
 * Сущность "Опыт работы"
 * Описывает опыт работы разработчика
 */

export interface Company {
  id: string;
  name: string;
  logo?: string;
  website?: string;
}

export interface Position {
  id: string;
  title: string;
  company: Company;
  startDate: string;
  endDate?: string;
  description: string;
  technologies: string[];
  achievements?: string[];
}
