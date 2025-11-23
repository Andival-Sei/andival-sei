import type { Project } from "./types";

/**
 * Данные проектов портфолио
 * Заполняется вручную
 */
export const projects: Project[] = [
  {
    id: "skillswap-40-2",
    title: "SkillSwap",
    description:
      "Платформа для обмена навыками между пользователями. Итоговая работа по Яндекс Практикуму. Позволяет находить наставников, создавать заявки на обмен навыками, управлять активными обменами и избранными пользователями.",
    technologies: [
      "TypeScript",
      "React",
      "Vite",
      "SCSS",
      "Supabase",
      "PostgreSQL",
      "Vitest",
      "Testing Library",
    ],
    status: "Завершён",
    timeline: "2024",
    focus:
      "Полнофункциональное веб-приложение с авторизацией, каталогом наставников, системой обмена навыками и уведомлений.",
    category: "Учебный проект",
    demoUrl: "https://skill-swap-40-2.vercel.app/",
    codeUrl: "https://github.com/Andival-Sei/SkillSwap_40_2",
    featured: true,
  },
  {
    id: "web-larek-frontend",
    title: "Web Larek Frontend",
    description:
      "Фронтенд приложение для интернет-магазина. Реализован каталог товаров, корзина, оформление заказов и управление профилем пользователя.",
    technologies: ["TypeScript", "React", "Webpack", "SCSS", "Redux"],
    status: "Завершён",
    timeline: "2024",
    focus:
      "Современный интерфейс интернет-магазина с удобной навигацией и функциональностью корзины.",
    category: "Учебный проект",
    demoUrl: "https://web-larek-frontend-xi.vercel.app/",
    codeUrl: "https://github.com/Andival-Sei/web-larek-frontend",
    featured: true,
  },
  {
    id: "ono-tebe-nado-fd",
    title: "Оно тебе надо",
    description:
      "Первая проектная работа по Яндекс Практикуму. Лендинг аукциона необычных вещей, в которые изначально никто не верил. Сайт рассказывает историю лотов и демонстрирует базовые навыки верстки.",
    technologies: ["HTML", "CSS"],
    status: "Завершён",
    timeline: "2024",
    focus:
      "Освоение основ HTML и CSS, верстка лендинга с использованием семантической разметки и стилей.",
    category: "Учебный проект",
    demoUrl: "https://andival-sei.github.io/ono-tebe-nado-fd/",
    codeUrl: "https://github.com/Andival-Sei/ono-tebe-nado-fd",
    featured: false,
  },
  {
    id: "posmotri-v-okno-fd",
    title: "Посмотри в окно",
    description:
      "Проектная работа по Яндекс Практикуму. Верстка страницы с использованием HTML и CSS. Проект развивает навыки создания адаптивных веб-страниц.",
    technologies: ["HTML", "CSS"],
    status: "Завершён",
    timeline: "2024",
    focus:
      "Практика верстки, работа с макетом и создание структурированной HTML-разметки.",
    category: "Учебный проект",
    demoUrl: "https://andival-sei.github.io/posmotri-v-okno-fd/",
    codeUrl: "https://github.com/Andival-Sei/posmotri-v-okno-fd",
    featured: false,
  },
  {
    id: "slozhno-sosredotochitsya-fd",
    title: "Сложно сосредоточиться",
    description:
      "Проектная работа по Яндекс Практикуму на тему адаптивной верстки. Сайт демонстрирует навыки создания отзывчивых интерфейсов, работающих на разных устройствах.",
    technologies: ["HTML", "CSS", "JavaScript"],
    status: "Завершён",
    timeline: "2024",
    focus:
      "Изучение адаптивной верстки и медиа-запросов, создание интерфейсов для различных экранов.",
    category: "Учебный проект",
    demoUrl: "https://andival-sei.github.io/slozhno-sosredotochitsya-fd/",
    codeUrl: "https://github.com/Andival-Sei/slozhno-sosredotochitsya-fd",
    featured: false,
  },
];
