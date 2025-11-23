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
];
