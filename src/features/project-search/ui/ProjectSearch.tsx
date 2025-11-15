'use client';

import { useProjectSearch } from '../model/useProjectSearch';
import type { Project } from '@/entities/project';
import styles from './ProjectSearch.module.scss';

interface ProjectSearchProps {
  projects: Project[];
  onSearchChange?: (results: Project[]) => void;
}

/**
 * Компонент поиска проектов
 * TODO: Добавить стили и улучшить UI
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ProjectSearch = ({
  projects,
  onSearchChange: _onSearchChange,
}: ProjectSearchProps) => {
  const { query, setQuery, searchResults } = useProjectSearch(projects);

  // TODO: Вызывать onSearchChange при изменении результатов

  return (
    <div className={styles.search}>
      <input
        type="text"
        placeholder="Поиск проектов..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={styles.input}
      />
      {query && <div className={styles.results}>Найдено: {searchResults.length}</div>}
    </div>
  );
};
