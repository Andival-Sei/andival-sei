'use client';

import { useProjectFilter } from '../model/useProjectFilter';
import type { Project } from '@/entities/project';
import styles from './ProjectFilter.module.scss';

interface ProjectFilterProps {
  projects: Project[];
  onFilterChange?: (filteredProjects: Project[]) => void;
}

/**
 * Компонент фильтрации проектов
 * TODO: Добавить стили и улучшить UI
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ProjectFilter = ({
  projects,
  onFilterChange: _onFilterChange,
}: ProjectFilterProps) => {
  const {
    filteredProjects,
    selectedCategory,
    selectedStatus,
    setSelectedCategory,
    setSelectedStatus,
  } = useProjectFilter(projects);

  // TODO: Вызывать onFilterChange при изменении фильтров

  return (
    <div className={styles.filter}>
      <div className={styles.group}>
        <label>Категория:</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value as Project['category'] | 'all')}
        >
          <option value="all">Все</option>
          <option value="web">Web</option>
          <option value="mobile">Mobile</option>
          <option value="desktop">Desktop</option>
          <option value="other">Другое</option>
        </select>
      </div>

      <div className={styles.group}>
        <label>Статус:</label>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value as Project['status'] | 'all')}
        >
          <option value="all">Все</option>
          <option value="completed">Завершено</option>
          <option value="in-progress">В работе</option>
          <option value="archived">Архив</option>
        </select>
      </div>

      <div className={styles.count}>Найдено: {filteredProjects.length}</div>
    </div>
  );
};
