'use client';

import Link from 'next/link';
import { ThemeToggle } from '@/features/theme-toggle';
import styles from './Header.module.scss';

/**
 * Виджет "Шапка сайта"
 * TODO: Добавить навигацию и улучшить стили
 */
export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          Andival SEI
        </Link>

        <nav className={styles.nav}>
          <Link href="/">Главная</Link>
          <Link href="/about">О себе</Link>
          <Link href="/projects">Проекты</Link>
          <Link href="/contact">Контакты</Link>
        </nav>

        <div className={styles.actions}>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};
