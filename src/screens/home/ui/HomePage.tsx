import { HeroSection } from '@/widgets/hero-section';
import { ProjectList } from '@/widgets/project-list';
import { SkillsSection } from '@/widgets/skills-section';
import styles from './HomePage.module.scss';

/**
 * Страница "Главная"
 * Композиция виджетов для главной страницы
 */
export const HomePage = () => {
  return (
    <div className={styles.page}>
      <HeroSection />
      <SkillsSection />
      <ProjectList />
    </div>
  );
};
