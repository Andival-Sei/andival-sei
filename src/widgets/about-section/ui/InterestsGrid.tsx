"use client";

import {
  Code2,
  Gamepad2,
  Wrench,
  Mountain,
  Tv,
  Coffee,
  ArrowUpRight,
} from "lucide-react";

import { cn } from "@/src/shared/lib/utils";
import { FadeIn } from "@/src/shared/ui";

interface InterestItem {
  icon: React.ElementType;
  title: string;
  description: string;
  className?: string;
  bgGradient: string;
  textColor: string;
}

const interests: InterestItem[] = [
  {
    icon: Code2,
    title: "Программирование",
    description:
      "Постоянное изучение новых технологий, фреймворков и лучших практик. Моя страсть и работа.",
    className: "md:col-span-2 md:row-span-2",
    bgGradient: "from-blue-500/20 to-cyan-500/20",
    textColor: "text-blue-400",
  },
  {
    icon: Gamepad2,
    title: "Видеоигры",
    description:
      "Погружение в миры Skyrim, RimWorld и WoW. Исследование игровых механик и нарратива.",
    className: "md:col-span-1 md:row-span-2",
    bgGradient: "from-purple-500/20 to-pink-500/20",
    textColor: "text-purple-400",
  },
  {
    icon: Mountain,
    title: "Природа",
    description: "Горы, пещеры, походы. Перезагрузка.",
    className: "md:col-span-1 md:row-span-1",
    bgGradient: "from-green-500/20 to-emerald-500/20",
    textColor: "text-green-400",
  },
  {
    icon: Wrench,
    title: "Моддинг",
    description: "Создание и перевод модов.",
    className: "md:col-span-1 md:row-span-1",
    bgGradient: "from-orange-500/20 to-amber-500/20",
    textColor: "text-orange-400",
  },
  {
    icon: Tv,
    title: "Сериалы",
    description: "Дом дракона, Сверхъестественное.",
    className: "md:col-span-1 md:row-span-1",
    bgGradient: "from-red-500/20 to-rose-500/20",
    textColor: "text-red-400",
  },
  {
    icon: Coffee,
    title: "Кофе",
    description: "Топливо для кода.",
    className: "md:col-span-1 md:row-span-1",
    bgGradient: "from-amber-700/20 to-yellow-600/20",
    textColor: "text-amber-500",
  },
];

export function InterestsGrid() {
  return (
    <section className="container mx-auto px-4 py-24">
      <FadeIn duration={0.5} className="mb-16 text-center">
        <h2 className="mb-4 text-4xl font-bold">Интересы и Хобби</h2>
        <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
          То, что вдохновляет меня за пределами редактора кода.
        </p>
      </FadeIn>

      <div className="mx-auto grid max-w-5xl auto-rows-[200px] grid-cols-1 gap-4 md:grid-cols-3">
        {interests.map((item, index) => (
          <FadeIn
            key={index}
            scale={0.95}
            duration={0.4}
            delay={index * 0.05}
            className={cn(
              "bg-background/50 hover:shadow-primary/5 group relative overflow-hidden rounded-3xl border border-white/10 backdrop-blur-sm transition-all hover:shadow-2xl",
              item.className
            )}
          >
            {/* Gradient Background */}
            <div
              className={cn(
                "bg-linear-to-br absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100",
                item.bgGradient
              )}
            />

            <div className="relative z-10 flex h-full flex-col justify-between p-6">
              <div className="flex items-start justify-between">
                <div
                  className={cn(
                    "rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-md transition-transform duration-300 group-hover:rotate-3 group-hover:scale-110",
                    item.textColor
                  )}
                >
                  <item.icon className="h-6 w-6" />
                </div>
                <ArrowUpRight className="text-muted-foreground h-5 w-5 -translate-y-2 translate-x-2 opacity-0 transition-opacity duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
              </div>

              <div>
                <h3 className="group-hover:text-foreground mb-2 text-xl font-bold transition-colors">
                  {item.title}
                </h3>
                <p className="text-muted-foreground group-hover:text-foreground/80 text-sm leading-relaxed transition-colors">
                  {item.description}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
