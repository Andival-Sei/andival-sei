'use client';

import { IconContext } from 'react-icons';
import { skillsData, getSkillIcon, getSkillColor } from '@/entities/skill';
import styles from './SkillsSection.module.scss';

/**
 * Виджет "Секция навыков"
 * Отображает навыки разработчика в виде адаптивной сетки карточек с иконками технологий
 * Использует react-icons для отображения логотипов технологий
 */
export const SkillsSection = () => {
  /**
   * Получить цвет для уровня навыка
   * Использует CSS переменные для поддержки тем
   */
  const getLevelColor = (level: string): string => {
    const colorMap: Record<string, string> = {
      beginner: 'var(--warning)',
      intermediate: 'var(--primary)',
      advanced: 'var(--secondary)',
      expert: 'var(--success)',
    };
    return colorMap[level] || 'var(--muted-foreground)';
  };

  /**
   * Получить текст уровня навыка на русском
   */
  const getLevelText = (level: string): string => {
    const levelMap: Record<string, string> = {
      beginner: 'Начальный',
      intermediate: 'Средний',
      advanced: 'Продвинутый',
      expert: 'Эксперт',
    };
    return levelMap[level] || level;
  };

  return (
    <section className={styles.section} id="skills">
      <div className={styles.container}>
        <h2 className={styles.title}>Навыки</h2>
        <p className={styles.subtitle}>Технологии и инструменты, с которыми я работаю</p>
        <div className={styles.grid}>
          {skillsData.map((skill) => {
            const IconComponent = skill.icon ? getSkillIcon(skill.icon) : null;
            const iconColor = skill.icon ? getSkillColor(skill.icon) : null;

            return (
              <div key={skill.id} className={styles.card}>
                <div className={styles.iconWrapper}>
                  {IconComponent ? (
                    <IconContext.Provider
                      value={{
                        className: styles.icon,
                        style: {
                          width: '100%',
                          height: '100%',
                          color: iconColor || undefined,
                        },
                      }}
                    >
                      <IconComponent />
                    </IconContext.Provider>
                  ) : (
                    <div className={styles.iconPlaceholder}>💻</div>
                  )}
                </div>
                <h3 className={styles.name}>{skill.name}</h3>
                <div className={styles.level}>
                  <span
                    className={styles.levelDot}
                    style={{ backgroundColor: getLevelColor(skill.level) }}
                    aria-hidden="true"
                  />
                  <span className={styles.levelText}>{getLevelText(skill.level)}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
