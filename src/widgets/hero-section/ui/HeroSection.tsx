"use client";

import { ArrowRight, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { FadeIn } from "@/src/shared/ui";
import { Button } from "@/src/shared/ui/Button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pb-12 pt-12 md:pb-16 md:pt-20 lg:pb-20 lg:pt-32">
      {/* Декоративные фоновые элементы */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Градиентные круги */}
        <div className="bg-primary/10 absolute -left-1/4 top-1/4 h-96 w-96 rounded-full blur-3xl" />
        <div className="bg-primary/5 absolute -right-1/4 bottom-1/4 h-96 w-96 rounded-full blur-3xl" />
        <div className="bg-primary/5 absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" />

        {/* Сетка паттерн */}
        <div
          className="bg-size-[24px_24px] absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)]"
          style={{
            maskImage:
              "radial-gradient(ellipse 80% 50% at 50% 0%, #000 70%, transparent 110%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 50% at 50% 0%, #000 70%, transparent 110%)",
          }}
        />
      </div>

      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-8">
          {/* Левая колонка - Контент */}
          <div className="space-y-8 text-center lg:text-left">
            {/* Заголовок с анимацией */}
            <FadeIn className="space-y-4" direction="up" immediate={true}>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                <span className="from-foreground to-foreground/70 bg-linear-to-r bg-clip-text text-transparent">
                  Привет, я{" "}
                </span>
                <span className="from-primary via-primary to-primary/70 bg-linear-to-r bg-clip-text text-transparent">
                  Кирилл
                </span>
              </h1>
              <h2 className="text-muted-foreground text-xl font-medium sm:text-2xl md:text-3xl">
                Frontend-разработчик
              </h2>
            </FadeIn>

            {/* Описание с анимацией */}
            <FadeIn
              className="space-y-6"
              direction="up"
              delay={0.15}
              immediate={true}
            >
              <p className="text-muted-foreground mx-auto max-w-[600px] text-base leading-relaxed sm:text-lg md:text-xl lg:mx-0">
                Создаю современные и отзывчивые веб-приложения с использованием
                React и TypeScript. Учусь и развиваюсь с каждым проектом, изучаю
                новые технологии и подходы к разработке.
              </p>

              {/* CTA кнопки */}
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
                <Button asChild size="lg" className="group rounded-md">
                  <Link href="/projects">
                    Посмотреть проекты
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-md"
                >
                  <Link href="/contact">
                    <Mail className="mr-2 h-4 w-4" />
                    Связаться
                  </Link>
                </Button>
              </div>
            </FadeIn>
          </div>

          {/* Правая колонка - Визуальный элемент */}
          <div className="relative flex items-center justify-center lg:justify-end">
            <FadeIn
              className="relative"
              direction="left"
              delay={0.2}
              immediate={true}
            >
              {/* Декоративная градиентная рамка */}
              <div className="from-primary/20 via-primary/10 bg-linear-to-br absolute inset-0 rounded-2xl to-transparent blur-2xl" />

              {/* Основной визуальный элемент */}
              <div className="bg-card/50 md:h-112 md:w-md group relative flex h-80 w-80 items-center justify-center overflow-hidden rounded-2xl border backdrop-blur-sm sm:h-96 sm:w-96">
                {/* Градиентный фон */}
                <div className="from-primary/5 to-primary/10 bg-linear-to-br absolute inset-0 rounded-2xl" />

                {/* Фото пользователя */}
                <div className="relative h-full w-full">
                  <Image
                    src="/profile/me.jpg"
                    alt="Кирилл - Frontend разработчик"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority
                    sizes="(max-width: 768px) 320px, (max-width: 1024px) 384px, 448px"
                  />
                  {/* Overlay для лучшей видимости */}
                  <div className="from-primary/5 bg-linear-to-br absolute inset-0 rounded-2xl to-transparent" />
                </div>

                {/* Декоративные плавающие элементы */}
                <div className="bg-primary/40 absolute -left-4 -top-4 h-3 w-3 animate-ping rounded-full" />
                <div className="bg-primary/30 absolute -right-6 top-1/4 h-2 w-2 animate-pulse rounded-full" />
                <div className="bg-primary/40 absolute -bottom-6 left-1/4 h-2.5 w-2.5 animate-ping rounded-full" />
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
