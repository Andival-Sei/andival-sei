import type { Skill } from '@/entities/skill';
import styles from './SkillsSection.module.scss';

/**
 * Виджет "Секция навыков"
 * Отображает навыки разработчика в виде адаптивной сетки карточек
 * TODO: Загрузить реальные навыки из entities/skill
 */

// Временные данные-заглушки для демонстрации
const mockSkills: Skill[] = [
  { id: '1', name: 'React', level: 'intermediate', category: 'frontend' },
  { id: '2', name: 'TypeScript', level: 'intermediate', category: 'frontend' },
  { id: '3', name: 'Next.js', level: 'beginner', category: 'frontend' },
  { id: '4', name: 'JavaScript', level: 'intermediate', category: 'frontend' },
  { id: '5', name: 'HTML/CSS', level: 'intermediate', category: 'frontend' },
  { id: '6', name: 'SCSS', level: 'beginner', category: 'frontend' },
];

/**
 * Получить иконку для навыка (временная заглушка)
 */
const getSkillIcon = (name: string): string => {
  const iconMap: Record<string, string> = {
    React: '⚛️',
    TypeScript: '📘',
    'Next.js': '▲',
    JavaScript: '📜',
    'HTML/CSS': '🎨',
    SCSS: '💅',
  };
  return iconMap[name] || '💻';
};

/**
 * Получить цвет для уровня навыка
 */
const getLevelColor = (level: Skill['level']): string => {
  const colorMap: Record<Skill['level'], string> = {
    beginner: 'var(--warning)',
    intermediate: 'var(--primary)',
    advanced: 'var(--secondary)',
    expert: 'var(--success)',
  };
  return colorMap[level] || 'var(--muted-foreground)';
};

export const SkillsSection = () => {
  // TODO: Загрузить навыки из entities/skill
  const skills: Skill[] = mockSkills;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Навыки</h2>
        <p className={styles.subtitle}>Технологии и инструменты, с которыми я работаю</p>
        <div className={styles.grid}>
          {skills.map((skill) => (
            <div key={skill.id} className={styles.card}>
              <div className={styles.icon}>{getSkillIcon(skill.name)}</div>
              <h3 className={styles.name}>{skill.name}</h3>
              <div className={styles.level}>
                <span
                  className={styles.levelDot}
                  style={{ backgroundColor: getLevelColor(skill.level) }}
                />
                <span className={styles.levelText}>
                  {skill.level === 'beginner' && 'Начальный'}
                  {skill.level === 'intermediate' && 'Средний'}
                  {skill.level === 'advanced' && 'Продвинутый'}
                  {skill.level === 'expert' && 'Эксперт'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
