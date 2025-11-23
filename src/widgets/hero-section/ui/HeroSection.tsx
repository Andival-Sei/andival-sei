// TODO: Реализовать Hero секцию
// - Добавить заголовок и подзаголовок
// - Добавить призыв к действию (CTA)
// - Добавить анимации при загрузке
// - Добавить фоновые элементы/декорации

import { ArrowRight, Mail } from "lucide-react";
import Link from "next/link";

import { Button } from "@/src/shared/ui/Button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      <div className="container mx-auto flex flex-col items-center justify-center gap-8 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl">
            Andival-Sei
          </h1>
          <h2 className="text-muted-foreground text-2xl font-medium md:text-3xl">
            Frontend-разработчик
          </h2>
          <p className="text-muted-foreground mx-auto max-w-[700px] text-lg md:text-xl">
            Привет, я Кирилл, Frontend-разработчик. Пока что я только начинаю
            свой путь. Создаю современные и отзывчивые веб-приложения с
            использованием React и TypeScript. Учусь и развиваюсь с каждым
            проектом.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Button asChild size="lg" className="rounded-md">
            <Link href="/projects">
              Посмотреть проекты <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="secondary" className="rounded-md">
            <Link href="mailto:contact@example.com">
              <Mail className="mr-2 h-4 w-4" /> Отправить Email
            </Link>
          </Button>
        </div>

        <div className="mt-20 space-y-4">
          <h3 className="text-2xl font-bold">Мой стек технологий</h3>
          <p className="text-muted-foreground">
            Инструменты и технологии, которые я использую для создания
            современных веб-приложений
          </p>
          {/* Tech stack icons could go here */}
        </div>
      </div>
    </section>
  );
}
