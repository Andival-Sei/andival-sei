import type { Skill } from '@/entities/skill';
import styles from './SkillsSection.module.scss';

/**
 * Виджет "Секция навыков"
 * TODO: Реализовать отображение навыков
 */
export const SkillsSection = () => {
  // TODO: Загрузить навыки из entities/skill
  const skills: Skill[] = [];

  if (skills.length === 0) {
    return (
      <section className={styles.section}>
        <h2 className={styles.title}>Навыки</h2>
        <p>Навыки будут добавлены позже</p>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Навыки</h2>
      <div className={styles.grid}>{/* TODO: Отобразить навыки */}</div>
    </section>
  );
};
