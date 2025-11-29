"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Briefcase, GraduationCap, Rocket, Star, Calendar } from "lucide-react";
import { useRef } from "react";

import { FadeIn } from "@/src/shared/ui";
import { Badge } from "@/src/shared/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/shared/ui/Card";

interface ExperienceItem {
  year: string;
  title: string;
  company: string;
  description: string;
  type: "work" | "education" | "project";
  tags?: string[];
  icon?: React.ElementType;
}

// Reversed order: Oldest to Newest
const experienceData: ExperienceItem[] = [
  {
    year: "2018-2022",
    title: "Оператор колл-центра",
    company: "Различные компании",
    description:
      "Работа с клиентами в колл-центрах. Получение опыта в коммуникации, многозадачности и работе под давлением.",
    type: "work",
    icon: Briefcase,
  },
  {
    year: "2022",
    title: "Специалист поддержки",
    company: "Авито",
    description:
      "Работа в службе поддержки пользователей по всем каналам коммуникации: чаты, email-переписка и телефонные звонки. Решение проблем клиентов, консультирование по функционалу платформы.",
    type: "work",
    icon: Briefcase,
  },
  {
    year: "2024",
    title: "Модератор",
    company: "Авито",
    description:
      "Модерация контента и объявлений на платформе. Проверка соответствия публикаций правилам сервиса, работа с нарушениями, обеспечение качества размещаемого контента.",
    type: "work",
    icon: Star,
  },
  {
    year: "2024",
    title: "Курс Frontend разработки",
    company: "Яндекс Практикум",
    description:
      "Интенсивное обучение современной веб-разработке: React, TypeScript, Redux, тестирование, работа с API и деплой приложений.",
    type: "education",
    tags: ["Education", "Frontend"],
    icon: GraduationCap,
  },
  {
    year: "2025",
    title: "Портфолио проектов",
    company: "Личные достижения",
    description:
      "Создал несколько полноценных проектов с использованием современного стека: SPA приложения, интернет-магазин, интерактивные гайды.",
    type: "project",
    tags: ["React", "Next.js", "TypeScript", "Tailwind"],
    icon: Rocket,
  },
];

export function ExperienceTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="relative overflow-hidden py-24" ref={containerRef}>
      {/* Background decoration */}
      <div className="from-background via-primary/5 to-background bg-linear-to-b pointer-events-none absolute inset-0" />

      <div className="container relative z-10 mx-auto px-4">
        <FadeIn direction="up" duration={0.5} className="mb-20 text-center">
          <h2 className="from-primary bg-linear-to-r mb-6 to-purple-500 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
            Мой Путь
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            От первых шагов в коммуникации до создания сложных веб-интерфейсов.
          </p>
        </FadeIn>

        <div className="relative mx-auto max-w-5xl">
          {/* Central Line Container */}
          <div
            className="bg-border/30 absolute left-[20px] top-0 w-1 transform overflow-hidden rounded-full md:left-1/2 md:-translate-x-1/2"
            style={{ bottom: "24px" }}
          >
            <motion.div
              style={{ height: lineHeight }}
              className="from-primary bg-linear-to-b w-full via-purple-500 to-blue-500 shadow-[0_0_20px_rgba(var(--primary),0.5)]"
            />
          </div>

          <div className="space-y-24">
            {experienceData.map((item, index) => {
              const Icon = item.icon || Briefcase;
              const isLeft = index % 2 === 0; // Карточки слева на чётных индексах (0, 2, 4...)

              return (
                <FadeIn
                  key={index}
                  direction="up"
                  duration={0.6}
                  delay={index * 0.1}
                  viewportMargin="-100px"
                  className="relative"
                >
                  {/* Timeline Node */}
                  <div className="absolute left-[20px] z-20 md:left-1/2 md:-translate-x-1/2">
                    <div className="bg-background border-primary shadow-primary/30 flex h-12 w-12 items-center justify-center rounded-full border-4 shadow-lg transition-transform duration-300">
                      <Icon className="text-primary h-5 w-5" />
                    </div>
                  </div>

                  {/* Content Card */}
                  <div
                    className={`flex ${isLeft ? "md:justify-start" : "md:justify-end"}`}
                  >
                    <div
                      className={`w-full md:w-[calc(50%-4rem)] ${isLeft ? "pl-16 md:pl-0 md:pr-4" : "pl-16 md:pl-4"}`}
                    >
                      <div className="group relative">
                        {/* Subtle Glow Effect */}
                        <div className="from-primary/10 bg-linear-to-r absolute -inset-0.5 rounded-2xl to-purple-500/10 opacity-0 blur transition duration-300 group-hover:opacity-50" />

                        <Card className="bg-card/50 relative h-full overflow-hidden border-white/10 backdrop-blur-xl transition-all duration-300 hover:border-white/20">
                          <div className="absolute right-0 top-0 p-4 opacity-10 transition-opacity group-hover:opacity-20">
                            <Icon className="h-24 w-24 rotate-12 transform" />
                          </div>

                          <CardHeader className="relative z-10 pb-2">
                            <div className="mb-2 flex flex-wrap items-center gap-3">
                              <Badge
                                variant="secondary"
                                className="bg-primary/10 text-primary border-primary/20 font-mono text-xs"
                              >
                                <Calendar className="mr-1 h-3 w-3" />
                                {item.year}
                              </Badge>
                              {item.type === "project" && (
                                <Badge className="bg-linear-to-r border-0 from-orange-500 to-red-500">
                                  Top Project
                                </Badge>
                              )}
                            </div>
                            <CardTitle className="group-hover:text-primary text-2xl font-bold transition-colors">
                              {item.title}
                            </CardTitle>
                            <div className="text-muted-foreground text-lg font-medium">
                              {item.company}
                            </div>
                          </CardHeader>

                          <CardContent className="relative z-10">
                            <p className="text-muted-foreground mb-4 leading-relaxed">
                              {item.description}
                            </p>
                            {item.tags && (
                              <div className="flex flex-wrap gap-2 pt-2">
                                {item.tags.map((tag) => (
                                  <Badge
                                    key={tag}
                                    variant="outline"
                                    className="bg-background/50 hover:bg-primary/10 hover:text-primary transition-colors"
                                  >
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
