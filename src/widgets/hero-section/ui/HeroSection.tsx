'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/shared/ui/Button';
import { TypingText } from '@/shared/ui/TypingText';
import styles from './HeroSection.module.scss';

/**
 * Анимационные варианты для элементов Hero секции
 * Используются для плавного появления элементов при загрузке
 */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const, // Кастомная кривая Безье для плавности
    },
  },
};

/**
 * Виджет "Герой секция"
 * Современная Hero секция с плавными анимациями, градиентами и типизированным текстом
 */
export const HeroSection = () => {
  return (
    <section className={styles.hero}>
      {/* Декоративные градиентные элементы для визуального интереса */}
      <div className={styles.gradientOrb1} aria-hidden="true" />
      <div className={styles.gradientOrb2} aria-hidden="true" />
      <div className={styles.gridPattern} aria-hidden="true" />

      <div className={styles.container}>
        <motion.div
          className={styles.content}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Приветствие */}
          <motion.p className={styles.greeting} variants={itemVariants}>
            Привет, меня зовут Кирилл
          </motion.p>

          {/* Основной заголовок с именем */}
          <motion.h1 className={styles.title} variants={itemVariants}>
            <span className={styles.titlePrefix}>Я</span>
            <span className={styles.titleAccent}>
              <TypingText text="Frontend-разработчик" speed={150} delay={800} showCursor={true} />
            </span>
          </motion.h1>

          {/* Описание */}
          <motion.p className={styles.description} variants={itemVariants}>
            Пока что я только начинаю свой путь. Создаю современные и отзывчивые веб-приложения с
            использованием React и TypeScript. Учусь и развиваюсь с каждым проектом.
          </motion.p>

          {/* Кнопки действий */}
          <motion.div className={styles.actions} variants={itemVariants}>
            <Link href="/projects">
              <Button variant="primary" size="large">
                Посмотреть проекты
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="large">
                Связаться со мной
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Декоративная иллюстрация/графический элемент справа */}
        <motion.div
          className={styles.illustration}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.illustrationCircle}>
            <div className={styles.illustrationInner} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
