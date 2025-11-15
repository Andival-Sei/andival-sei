/**
 * Сущность "Навык"
 * Описывает навыки разработчика
 */

export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';
export type SkillCategory = 'frontend' | 'backend' | 'mobile' | 'devops' | 'design' | 'other';

export interface Skill {
  id: string;
  name: string;
  level: SkillLevel;
  category: SkillCategory;
  icon?: string;
  yearsOfExperience?: number;
}
