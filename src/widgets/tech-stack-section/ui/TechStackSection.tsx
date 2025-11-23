"use client";

import { FileCode, Layers, Package, Sparkles, Brain, Code } from "lucide-react";
import { type ComponentType } from "react";
import {
  SiHtml5,
  SiCss3,
  SiSass,
  SiJavascript,
  SiTypescript,
  SiWebpack,
  SiVite,
  SiRedux,
  SiReact,
  SiNextdotjs,
  SiJetbrains,
  SiOpenai,
  SiGoogle,
  SiGit,
} from "react-icons/si";

import { Badge } from "@/src/shared/ui/Badge";
import { Card } from "@/src/shared/ui/Card";
import { Section } from "@/src/shared/ui/Section";

// Типы для категорий и технологий
type TechIcon = ComponentType<{
  className?: string;
  style?: React.CSSProperties;
}>;

interface Technology {
  name: string;
  icon: TechIcon;
  color?: string;
}

interface TechCategory {
  title: string;
  icon: TechIcon;
  description: string;
  technologies: Technology[];
}

// Иконки для технологий из react-icons и lucide-react
const TechIcons = {
  HTML: SiHtml5,
  CSS: SiCss3,
  SCSS: SiSass,
  JS: SiJavascript,
  TS: SiTypescript,
  Webpack: SiWebpack,
  Vite: SiVite,
  Redux: SiRedux,
  React: SiReact,
  Next: SiNextdotjs,
  VSCode: Code, // Используем иконку Code из lucide-react для VS Code
  Cursor: Code, // Используем иконку Code из lucide-react для Cursor (похожий редактор)
  Antigravity: Sparkles, // Оставляем кастомную иконку для Antigravity (специфичный инструмент)
  WebStorm: SiJetbrains, // Используем JetBrains иконку для WebStorm
  Git: SiGit, // Git - контроль версий
  GPT: SiOpenai, // OpenAI/GPT - реальная иконка OpenAI
  Claude: Brain, // Anthropic Claude - используем иконку мозга из lucide-react
  Gemini: SiGoogle, // Google Gemini - используем иконку Google
};

// Структура стека технологий по категориям
const techStackCategories: TechCategory[] = [
  {
    title: "Языки программирования",
    icon: FileCode,
    description: "Основы веб-разработки",
    technologies: [
      { name: "HTML", icon: TechIcons.HTML, color: "#e34c26" },
      { name: "CSS", icon: TechIcons.CSS, color: "#264de4" },
      { name: "SCSS", icon: TechIcons.SCSS, color: "#cc6699" },
      { name: "JavaScript", icon: TechIcons.JS, color: "#f7df1e" },
      { name: "TypeScript", icon: TechIcons.TS, color: "#3178c6" },
    ],
  },
  {
    title: "Инструменты сборки",
    icon: Package,
    description: "Сборка и оптимизация проектов",
    technologies: [
      { name: "Webpack", icon: TechIcons.Webpack, color: "#8dd6f9" },
      { name: "Vite", icon: TechIcons.Vite, color: "#646cff" },
    ],
  },
  {
    title: "Фреймворки и библиотеки",
    icon: Layers,
    description: "Современные инструменты разработки",
    technologies: [
      { name: "Redux", icon: TechIcons.Redux, color: "#764abc" },
      { name: "React", icon: TechIcons.React, color: "#61dafb" },
      { name: "Next.js", icon: TechIcons.Next, color: "#000000" },
    ],
  },
  {
    title: "IDE и редакторы",
    icon: Code,
    description: "Среды разработки и инструменты",
    technologies: [
      { name: "VS Code", icon: TechIcons.VSCode, color: "#007acc" },
      { name: "Cursor", icon: TechIcons.Cursor, color: "#000000" },
      { name: "Antigravity", icon: TechIcons.Antigravity, color: "#6366f1" },
      { name: "WebStorm", icon: TechIcons.WebStorm, color: "#000000" },
      { name: "Git", icon: TechIcons.Git, color: "#f05032" },
    ],
  },
  {
    title: "AI помощники",
    icon: Brain,
    description: "Искусственный интеллект в работе",
    technologies: [
      { name: "GPT", icon: TechIcons.GPT, color: "#10a37f" },
      { name: "Claude", icon: TechIcons.Claude, color: "#d97757" },
      { name: "Gemini", icon: TechIcons.Gemini, color: "#4285f4" },
    ],
  },
];

export function TechStackSection() {
  return (
    <Section className="pb-20 pt-12 md:pt-16 lg:pt-20">
      <div className="mb-16 flex flex-col gap-4 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Мой стек технологий
        </h2>
        <p className="text-muted-foreground mx-auto max-w-[700px] text-lg">
          Инструменты и технологии, которые я использую для создания современных
          веб-приложений
        </p>
      </div>

      <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {techStackCategories.map((category, categoryIndex) => {
          const CategoryIcon = category.icon;
          return (
            <Card
              key={category.title}
              className="bg-card/50 hover:border-primary/50 hover:shadow-primary/10 group relative overflow-hidden border-2 transition-all duration-300 hover:shadow-lg"
              style={{
                animationDelay: `${categoryIndex * 100}ms`,
              }}
            >
              <div className="p-6">
                {/* Заголовок категории */}
                <div className="mb-4 flex items-center gap-3">
                  <div className="bg-primary/10 group-hover:bg-primary/20 rounded-lg p-2 transition-transform duration-300 group-hover:scale-110">
                    <CategoryIcon className="text-primary h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{category.title}</h3>
                    <p className="text-muted-foreground text-xs">
                      {category.description}
                    </p>
                  </div>
                </div>

                {/* Технологии в категории */}
                <div className="flex flex-wrap gap-2">
                  {category.technologies.map((tech, techIndex) => {
                    const TechIcon = tech.icon;
                    return (
                      <Badge
                        key={tech.name}
                        variant="secondary"
                        className="group/tech animate-fade-in-up bg-background/80 hover:border-primary/30 hover:bg-primary/5 flex items-center gap-1.5 border px-3 py-1.5 text-sm font-medium opacity-0 shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-md"
                        style={{
                          animationDelay: `${categoryIndex * 100 + techIndex * 50}ms`,
                        }}
                      >
                        <TechIcon
                          className="h-4 w-4 transition-transform duration-200 group-hover/tech:scale-110"
                          style={
                            tech.color
                              ? {
                                  color: tech.color,
                                }
                              : undefined
                          }
                        />
                        <span>{tech.name}</span>
                      </Badge>
                    );
                  })}
                </div>
              </div>

              {/* Декоративный градиент при наведении */}
              <div className="from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:via-primary/0 group-hover:to-primary/5 absolute inset-0 -z-10 bg-gradient-to-br transition-all duration-300" />
            </Card>
          );
        })}
      </div>
    </Section>
  );
}
