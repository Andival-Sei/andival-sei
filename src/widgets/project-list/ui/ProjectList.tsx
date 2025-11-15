'use client';

import { useProjectList } from '../model/useProjectList';
import { ProjectCard } from '@/widgets/project-card';
import { ProjectFilter } from '@/features/project-filter';
import { ProjectSearch } from '@/features/project-search';
import styles from './ProjectList.module.scss';

/**
 * Виджет "Список проектов"
 * TODO: Добавить пагинацию и улучшить UI
 */
export const ProjectList = () => {
  const { projects, isLoading, error } = useProjectList();

  if (isLoading) {
    return <div className={styles.loading}>Загрузка проектов...</div>;
  }

  if (error) {
    return <div className={styles.error}>Ошибка: {error.message}</div>;
  }

  if (projects.length === 0) {
    return <div className={styles.empty}>Проекты не найдены</div>;
  }

  return (
    <div className={styles.list}>
      <div className={styles.controls}>
        <ProjectSearch projects={projects} />
        <ProjectFilter projects={projects} />
      </div>

      <div className={styles.grid}>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};
