'use client';

import { useProjectList } from '../model/useProjectList';
import { ProjectCard } from '@/widgets/project-card';
import { ProjectFilter } from '@/features/project-filter';
import { ProjectSearch } from '@/features/project-search';
import styles from './ProjectList.module.scss';

/**
 * Виджет "Список проектов"
 * Отображает проекты в виде адаптивной сетки карточек
 * TODO: Добавить пагинацию и улучшить UI
 */
export const ProjectList = () => {
  const { projects, isLoading, error } = useProjectList();

  if (isLoading) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.loading}>Загрузка проектов...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.error}>Ошибка: {error.message}</div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Проекты</h2>
        <p className={styles.subtitle}>Примеры моих работ и проектов, над которыми я работал</p>

        {projects.length === 0 ? (
          <div className={styles.empty}>Проекты не найдены</div>
        ) : (
          <>
            <div className={styles.controls}>
              <ProjectSearch projects={projects} />
              <ProjectFilter projects={projects} />
            </div>

            <div className={styles.grid}>
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};
