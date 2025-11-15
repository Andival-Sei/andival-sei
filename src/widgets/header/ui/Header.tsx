'use client';

import { useState, useEffect, useRef, useCallback, startTransition } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ThemeToggle } from '@/features/theme-toggle';
import { applyBackdropBlur } from '@/shared/lib/backdrop-blur';
import styles from './Header.module.scss';

const NAV_ITEMS = [
  { href: '/', label: 'Главная' },
  { href: '/about', label: 'О себе' },
  { href: '/projects', label: 'Проекты' },
  { href: '/contact', label: 'Контакты' },
] as const;

/**
 * Виджет "Шапка сайта"
 * Адаптивная навигация с мобильным меню и современными анимациями
 */
export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const scrollPositionRef = useRef(0);

  // Отслеживание скролла для изменения стиля хедера
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Применяем backdrop-filter напрямую через JavaScript
  // Это гарантирует применение эффекта, даже если SCSS модули не работают
  useEffect(() => {
    if (headerRef.current) {
      // Легкое размытие для тонкого эффекта glassmorphism
      if (!isScrolled) {
        applyBackdropBlur(headerRef.current, '4px', '110%');
      } else {
        // Немного усиленное размытие при скролле
        applyBackdropBlur(headerRef.current, '6px', '115%');
      }
    }
  }, [isScrolled]);

  const lockScroll = useCallback(() => {
    scrollPositionRef.current = window.scrollY;

    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollPositionRef.current}px`;
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';
  }, []);

  const unlockScroll = useCallback(() => {
    const scrollY = scrollPositionRef.current;

    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    document.body.style.overflow = '';

    if (scrollY) {
      window.scrollTo(0, scrollY);
    }
  }, []);

  // Закрытие меню при клике вне его области и блокировка скролла
  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;

      if (
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(target) &&
        !buttonRef.current.contains(target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    lockScroll();
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      unlockScroll();
    };
  }, [isMobileMenuOpen, lockScroll, unlockScroll]);

  // Закрытие меню при изменении маршрута
  // Используем startTransition для предотвращения каскадных рендеров
  useEffect(() => {
    startTransition(() => {
      setIsMobileMenuOpen(false);
    });
  }, [pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Проверка активного маршрута
  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  return (
    <>
      <header ref={headerRef} className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
        <div className={styles.container}>
          <Link
            href="/"
            className={styles.logo}
            onClick={closeMobileMenu}
            aria-label="Главная страница"
          >
            <span className={styles.logoText}>Andival SEI</span>
          </Link>

          {/* Десктопная навигация */}
          <nav className={styles.nav} aria-label="Основная навигация">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navLink} ${isActive(item.href) ? styles.active : ''}`}
              >
                <span className={styles.navLinkText}>{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className={styles.actions}>
            <ThemeToggle />

            {/* Кнопка мобильного меню - всегда остается бургером */}
            <button
              ref={buttonRef}
              className={styles.mobileMenuButton}
              onClick={toggleMobileMenu}
              aria-label="Открыть меню"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <span className={styles.burgerIcon}>
                <span className={styles.burgerLine}></span>
                <span className={styles.burgerLine}></span>
                <span className={styles.burgerLine}></span>
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Overlay для мобильного меню */}
      {isMobileMenuOpen && (
        <div className={styles.overlay} onClick={closeMobileMenu} aria-hidden="true" />
      )}

      {/* Мобильное меню */}
      <nav
        ref={menuRef}
        id="mobile-menu"
        className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.open : ''}`}
        aria-label="Мобильная навигация"
        aria-hidden={!isMobileMenuOpen}
      >
        <div className={styles.mobileMenuContent}>
          {/* Кнопка закрытия меню */}
          <button
            className={styles.closeButton}
            onClick={closeMobileMenu}
            aria-label="Закрыть меню"
          >
            <span className={styles.closeIcon}>
              <span className={styles.closeLine}></span>
              <span className={styles.closeLine}></span>
            </span>
          </button>

          {NAV_ITEMS.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.mobileNavLink} ${isActive(item.href) ? styles.active : ''}`}
              onClick={closeMobileMenu}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <span className={styles.mobileNavLinkText}>{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
};
