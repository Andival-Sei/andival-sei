"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface FadeInProps extends HTMLMotionProps<"div"> {
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
  fullWidth?: boolean;
  viewportMargin?: string;
  once?: boolean;
  scale?: number;
  immediate?: boolean; // Для hero секций, которые всегда в viewport
}

/**
 * Парсит margin строку в число для IntersectionObserver
 */
function parseMargin(margin: string): number {
  const match = margin.match(/-?\d+/);
  return match ? parseInt(match[0], 10) : 0;
}

export function FadeIn({
  children,
  direction = "up",
  delay = 0,
  duration = 0.5,
  fullWidth = false,
  viewportMargin = "-50px",
  once = true,
  scale,
  immediate = false,
  className,
  ...props
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  // Для immediate элементов сразу устанавливаем видимость
  const [isVisible, setIsVisible] = useState(immediate);

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
      x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
      scale: scale || 1,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration,
        delay,
        ease: "easeOut" as const,
      },
    },
  };

  // Проверяем, находится ли элемент во вьюпорте при монтировании
  useEffect(() => {
    // Для immediate элементов не нужно проверять видимость
    if (immediate) {
      return;
    }

    if (!ref.current) {
      return;
    }

    const element = ref.current;
    const marginValue = parseMargin(viewportMargin);
    let observer: IntersectionObserver | null = null;
    let hasBeenVisible = false;

    // Функция для проверки видимости
    const checkVisibility = () => {
      if (!element || hasBeenVisible) {
        return;
      }

      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const windowWidth = window.innerWidth;

      const isInView =
        rect.top < windowHeight - marginValue &&
        rect.bottom > marginValue &&
        rect.left < windowWidth - marginValue &&
        rect.right > marginValue;

      if (isInView) {
        hasBeenVisible = true;
        setIsVisible(true);
        if (observer) {
          observer.disconnect();
        }
      }
    };

    // Используем IntersectionObserver для более надёжной проверки
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasBeenVisible) {
            hasBeenVisible = true;
            setIsVisible(true);
            if (once && observer) {
              observer.disconnect();
            }
          }
        });
      },
      {
        rootMargin: `${marginValue}px`,
        threshold: 0.01, // Срабатывает даже если видна небольшая часть
      }
    );

    // Проверяем сразу после рендера
    requestAnimationFrame(() => {
      if (element) {
        observer?.observe(element);
        // Также проверяем через небольшую задержку для надёжности
        setTimeout(checkVisibility, 150);
      }
    });

    // Проверяем при изменении размера окна
    window.addEventListener("resize", checkVisibility);

    return () => {
      window.removeEventListener("resize", checkVisibility);
      if (observer) {
        observer.disconnect();
      }
    };
  }, [immediate, viewportMargin, once]);

  // Для hero секций используем animate вместо whileInView
  if (immediate || isVisible) {
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate="visible"
        variants={variants}
        className={`${fullWidth ? "w-full" : ""} ${className || ""}`}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: viewportMargin }}
      variants={variants}
      className={`${fullWidth ? "w-full" : ""} ${className || ""}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
