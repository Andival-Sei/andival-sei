/**
 * Конфигурация навыков с иконками и цветами брендов
 * Содержит маппинг навыков на компоненты иконок из react-icons
 * и официальные цвета брендов из simple-icons
 */

import type { IconType } from 'react-icons';
import {
  SiJavascript,
  SiHtml5,
  SiGit,
  SiCss3,
  SiTypescript,
  SiReact,
  SiSass,
  SiRedux,
  SiWebpack,
  SiVite,
  SiNextdotjs,
} from 'react-icons/si';
import type { Skill } from '../model/types';

/**
 * Тип для маппинга иконок навыков
 * Связывает название навыка с компонентом иконки из react-icons
 */
export type SkillIconMap = Record<string, IconType>;

/**
 * Тип для маппинга цветов навыков
 * Связывает название навыка с официальным цветом бренда из simple-icons
 */
export type SkillColorMap = Record<string, string>;

/**
 * Маппинг названий навыков на компоненты иконок из react-icons
 * Используется библиотека Simple Icons для логотипов технологий
 */
export const skillIconMap: SkillIconMap = {
  JavaScript: SiJavascript,
  HTML5: SiHtml5,
  Git: SiGit,
  CSS3: SiCss3,
  TypeScript: SiTypescript,
  React: SiReact,
  SCSS: SiSass,
  Redux: SiRedux,
  Webpack: SiWebpack,
  Vite: SiVite,
  'Next.js': SiNextdotjs,
};

/**
 * Маппинг названий навыков на официальные цвета брендов
 * Цвета взяты из simple-icons и соответствуют официальным цветам технологий
 */
export const skillColorMap: SkillColorMap = {
  JavaScript: '#F7DF1E', // Официальный цвет JavaScript
  HTML5: '#E34F26', // Официальный цвет HTML5
  Git: '#F05032', // Официальный цвет Git
  CSS3: '#1572B6', // Официальный цвет CSS3
  TypeScript: '#3178C6', // Официальный цвет TypeScript
  React: '#61DAFB', // Официальный цвет React
  SCSS: '#CC6699', // Официальный цвет Sass/SCSS
  Redux: '#764ABC', // Официальный цвет Redux
  Webpack: '#8DD6F9', // Официальный цвет Webpack
  Vite: '#646CFF', // Официальный цвет Vite
  'Next.js': '#000000', // Официальный цвет Next.js (черный)
};

/**
 * Список всех доступных навыков с их конфигурацией
 * Данные из скриншота пользователя + Next.js
 */
export const skillsData: Skill[] = [
  {
    id: '1',
    name: 'JavaScript',
    level: 'intermediate',
    category: 'frontend',
    icon: 'JavaScript',
  },
  {
    id: '2',
    name: 'HTML5',
    level: 'intermediate',
    category: 'frontend',
    icon: 'HTML5',
  },
  {
    id: '3',
    name: 'Git',
    level: 'intermediate',
    category: 'other',
    icon: 'Git',
  },
  {
    id: '4',
    name: 'CSS3',
    level: 'intermediate',
    category: 'frontend',
    icon: 'CSS3',
  },
  {
    id: '5',
    name: 'TypeScript',
    level: 'intermediate',
    category: 'frontend',
    icon: 'TypeScript',
  },
  {
    id: '6',
    name: 'React',
    level: 'intermediate',
    category: 'frontend',
    icon: 'React',
  },
  {
    id: '7',
    name: 'SCSS',
    level: 'intermediate',
    category: 'frontend',
    icon: 'SCSS',
  },
  {
    id: '8',
    name: 'Redux',
    level: 'intermediate',
    category: 'frontend',
    icon: 'Redux',
  },
  {
    id: '9',
    name: 'Webpack',
    level: 'intermediate',
    category: 'frontend',
    icon: 'Webpack',
  },
  {
    id: '10',
    name: 'Vite',
    level: 'intermediate',
    category: 'frontend',
    icon: 'Vite',
  },
  {
    id: '11',
    name: 'Next.js',
    level: 'intermediate',
    category: 'frontend',
    icon: 'Next.js',
  },
];

/**
 * Получить компонент иконки для навыка
 * @param skillName - Название навыка
 * @returns Компонент иконки или null, если иконка не найдена
 */
export const getSkillIcon = (skillName: string): IconType | null => {
  return skillIconMap[skillName] || null;
};

/**
 * Получить официальный цвет бренда для навыка
 * @param skillName - Название навыка
 * @returns Цвет в формате HEX или null, если цвет не найден
 */
export const getSkillColor = (skillName: string): string | null => {
  return skillColorMap[skillName] || null;
};
