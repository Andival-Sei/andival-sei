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

import { FadeIn } from "@/src/shared/ui";
import { Badge } from "@/src/shared/ui/Badge";
import { Section } from "@/src/shared/ui/Section";

// Типы для категорий и технологий
type TechIcon = ComponentType<{
  className?: string;
  style?: React.CSSProperties;
}>;

type SkillLevel = "beginner" | "intermediate" | "advanced" | "expert";

interface Technology {
  name: string;
  icon: TechIcon;
  color?: string;
  level: SkillLevel;
  // Опционально: годы опыта или описание использования
  experience?: string;
}

interface TechCategory {
  title: string;
  icon: TechIcon;
  technologies: Technology[];
}

// Иконки для технологий
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
  VSCode: Code,
  Cursor: Code,
  Antigravity: Sparkles,
  WebStorm: SiJetbrains,
  Git: SiGit,
  GPT: SiOpenai,
  Claude: Brain,
  Gemini: SiGoogle,
};

// Маппинг уровня навыка на процент и текст
const levelConfig: Record<
  SkillLevel,
  { percentage: number; label: string; color: string }
> = {
  beginner: { percentage: 25, label: "Начальный", color: "bg-blue-500" },
  intermediate: {
    percentage: 50,
    label: "Средний",
    color: "bg-yellow-500",
  },
  advanced: { percentage: 75, label: "Продвинутый", color: "bg-orange-500" },
  expert: { percentage: 100, label: "Эксперт", color: "bg-green-500" },
};

// Структура стека технологий по категориям (компактная версия для страницы "О себе")
const techStackCategories: TechCategory[] = [
  {
    title: "Языки",
    icon: FileCode,
    technologies: [
      {
        name: "TypeScript",
        icon: TechIcons.TS,
        color: "#3178c6",
        level: "advanced",
        experience: "Основной язык",
      },
      {
        name: "JavaScript",
        icon: TechIcons.JS,
        color: "#f7df1e",
        level: "advanced",
      },
      {
        name: "HTML",
        icon: TechIcons.HTML,
        color: "#e34c26",
        level: "advanced",
      },
      {
        name: "CSS",
        icon: TechIcons.CSS,
        color: "#264de4",
        level: "advanced",
      },
      {
        name: "SCSS",
        icon: TechIcons.SCSS,
        color: "#cc6699",
        level: "intermediate",
      },
    ],
  },
  {
    title: "Фреймворки",
    icon: Layers,
    technologies: [
      {
        name: "React",
        icon: TechIcons.React,
        color: "#61dafb",
        level: "advanced",
        experience: "Основной фреймворк",
      },
      {
        name: "Next.js",
        icon: TechIcons.Next,
        color: "#000000",
        level: "intermediate",
      },
      {
        name: "Redux",
        icon: TechIcons.Redux,
        color: "#764abc",
        level: "intermediate",
      },
    ],
  },
  {
    title: "Инструменты",
    icon: Package,
    technologies: [
      {
        name: "Git",
        icon: TechIcons.Git,
        color: "#f05032",
        level: "advanced",
      },
      {
        name: "Vite",
        icon: TechIcons.Vite,
        color: "#646cff",
        level: "intermediate",
      },
      {
        name: "Webpack",
        icon: TechIcons.Webpack,
        color: "#8dd6f9",
        level: "intermediate",
      },
    ],
  },
  {
    title: "IDE",
    icon: Code,
    technologies: [
      {
        name: "VS Code",
        icon: TechIcons.VSCode,
        color: "#007acc",
        level: "expert",
        experience: "Основной редактор",
      },
      {
        name: "Cursor",
        icon: TechIcons.Cursor,
        color: "#000000",
        level: "advanced",
      },
      {
        name: "WebStorm",
        icon: TechIcons.WebStorm,
        color: "#000000",
        level: "intermediate",
      },
    ],
  },
  {
    title: "AI помощники",
    icon: Brain,
    technologies: [
      {
        name: "GPT",
        icon: TechIcons.GPT,
        color: "#10a37f",
        level: "advanced",
      },
      {
        name: "Claude",
        icon: TechIcons.Claude,
        color: "#d97757",
        level: "advanced",
      },
      {
        name: "Gemini",
        icon: TechIcons.Gemini,
        color: "#4285f4",
        level: "intermediate",
      },
    ],
  },
];

export function SkillsSection() {
  return (
    <Section className="relative overflow-hidden py-24">
      {/* Background decoration */}
      <div className="bg-primary/5 absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" />

      <div className="container relative z-10 mx-auto px-4">
        <FadeIn direction="up" duration={0.5} className="mb-16 text-center">
          <h2 className="from-primary bg-linear-to-r mb-4 to-purple-500 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
            Технологический стек
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Инструменты и технологии, которые я использую для создания
            современных веб-приложений
          </p>
        </FadeIn>

        <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {techStackCategories.map((category, categoryIndex) => {
            const CategoryIcon = category.icon;
            return (
              <FadeIn
                key={category.title}
                delay={categoryIndex * 0.1}
                direction="up"
                duration={0.5}
                className="group"
              >
                <div className="bg-card/50 hover:border-primary/30 hover:shadow-primary/10 relative h-full rounded-2xl border border-white/10 p-6 backdrop-blur-sm transition-all duration-300 hover:shadow-lg">
                  {/* Category Header */}
                  <div className="mb-6 flex items-center gap-3">
                    <div className="bg-primary/10 group-hover:bg-primary/20 rounded-xl p-2.5 transition-all duration-300 group-hover:scale-110">
                      <CategoryIcon className="text-primary h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-semibold">{category.title}</h3>
                  </div>

                  {/* Technologies List with Progress Bars */}
                  <div className="space-y-4">
                    {category.technologies.map((tech, techIndex) => {
                      const TechIcon = tech.icon;
                      const levelInfo = levelConfig[tech.level];
                      return (
                        <FadeIn
                          key={tech.name}
                          delay={categoryIndex * 0.1 + techIndex * 0.05}
                          direction="up"
                          duration={0.4}
                        >
                          <div className="group/tech space-y-2">
                            {/* Tech Header - First Row: Icon + Name + Level */}
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex min-w-0 items-center gap-2">
                                <TechIcon
                                  className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover/tech:scale-110"
                                  style={
                                    tech.color
                                      ? {
                                          color: tech.color,
                                        }
                                      : undefined
                                  }
                                />
                                <span className="text-sm font-medium">
                                  {tech.name}
                                </span>
                              </div>
                              <span className="text-muted-foreground shrink-0 text-xs font-medium">
                                <span className="hidden sm:inline">
                                  {levelInfo.label}
                                </span>
                                <span className="sm:hidden">
                                  {levelInfo.label === "Начальный"
                                    ? "Нач."
                                    : levelInfo.label === "Средний"
                                      ? "Сред."
                                      : levelInfo.label === "Продвинутый"
                                        ? "Прод."
                                        : "Эксп."}
                                </span>
                              </span>
                            </div>

                            {/* Experience Badge - Second Row (if exists) */}
                            {tech.experience && (
                              <div className="flex items-center">
                                <Badge
                                  variant="outline"
                                  className="bg-primary/5 border-primary/20 text-primary w-fit text-xs"
                                >
                                  {tech.experience}
                                </Badge>
                              </div>
                            )}

                            {/* Progress Bar */}
                            <div className="bg-muted/50 h-2 overflow-hidden rounded-full">
                              <div
                                className={`${levelInfo.color} h-full transition-all duration-1000 ease-out`}
                                style={{
                                  width: `${levelInfo.percentage}%`,
                                }}
                              />
                            </div>
                          </div>
                        </FadeIn>
                      );
                    })}
                  </div>

                  {/* Decorative gradient on hover */}
                  <div className="from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:via-primary/0 group-hover:to-primary/5 bg-linear-to-br absolute inset-0 -z-10 rounded-2xl transition-all duration-300" />
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
