import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// TODO: Установить clsx и tailwind-merge если их нет
// npm install clsx tailwind-merge

/**
 * Утилита для объединения классов Tailwind CSS
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// TODO: Добавить другие утилиты по необходимости
// - formatDate
// - truncate
// - debounce
// - throttle

