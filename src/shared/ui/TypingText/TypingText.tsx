'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './TypingText.module.scss';

export interface TypingTextProps {
  /**
   * Текст для анимации печатания
   */
  text: string;
  /**
   * Скорость печатания в миллисекундах
   */
  speed?: number;
  /**
   * Задержка перед началом анимации в миллисекундах
   */
  delay?: number;
  /**
   * Показывать ли курсор
   */
  showCursor?: boolean;
  /**
   * Класс для дополнительной стилизации
   */
  className?: string;
}

/**
 * Компонент для анимации печатания текста с курсором
 * Создает эффект постепенного появления текста, как при печатании
 */
export const TypingText = ({
  text,
  speed = 100,
  delay = 0,
  showCursor = true,
  className,
}: TypingTextProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Задержка перед началом анимации
    const delayTimer = setTimeout(() => {
      setIsTyping(true);
      setDisplayedText('');
    }, delay);

    return () => clearTimeout(delayTimer);
  }, [delay]);

  useEffect(() => {
    if (!isTyping) {
      return;
    }

    // Очищаем предыдущий таймер
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Если весь текст уже отображен, завершаем анимацию
    if (displayedText.length >= text.length) {
      // Используем requestAnimationFrame для асинхронного обновления состояния
      const frameId = requestAnimationFrame(() => {
        setIsTyping(false);
      });
      return () => cancelAnimationFrame(frameId);
    }

    // Добавляем следующий символ
    timerRef.current = setTimeout(() => {
      setDisplayedText(text.slice(0, displayedText.length + 1));
    }, speed);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [displayedText, text, speed, isTyping]);

  return (
    <span className={className}>
      {displayedText}
      {showCursor && (
        <motion.span
          className={styles.cursor}
          animate={{ opacity: [1, 0] }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        >
          |
        </motion.span>
      )}
    </span>
  );
};
