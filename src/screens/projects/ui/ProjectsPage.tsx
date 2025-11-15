import { ProjectList } from '@/widgets/project-list';
import styles from './ProjectsPage.module.scss';

/**
 * Страница "Проекты"
 * Композиция виджетов для страницы проектов
 */
export const ProjectsPage = () => {
  return (
    <div className={styles.page}>
      <section className={styles.section}>
        <h1 className={styles.title}>Мои проекты</h1>
        <ProjectList />
      </section>
    </div>
  );
};
