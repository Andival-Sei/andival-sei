"use client";

import { motion } from "framer-motion";
import { MapPin, Mail } from "lucide-react";

import { Badge } from "@/src/shared/ui/Badge";
import { Button } from "@/src/shared/ui/Button";

export function AboutHero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Background Elements */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-full w-full max-w-7xl -translate-x-1/2">
        <div className="bg-primary/10 absolute right-10 top-20 h-72 w-72 animate-pulse rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 h-96 w-96 animate-pulse rounded-full bg-indigo-500/10 blur-3xl delay-1000" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="flex flex-col items-center gap-12 md:flex-row md:gap-20">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1 space-y-6 text-center md:text-left"
          >
            <Badge
              variant="outline"
              className="border-primary/20 bg-primary/5 text-primary mb-4 px-4 py-1 text-sm"
            >
              Frontend Developer
            </Badge>

            <h1 className="from-foreground to-foreground/70 bg-linear-to-r bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-6xl">
              Создание современных <br />
              <span className="text-primary">интерфейсов</span>
            </h1>

            <p className="text-muted-foreground mx-auto max-w-xl text-lg leading-relaxed md:mx-0 md:text-xl">
              Увлеченный разработчик интерфейсов с фокусом на создание
              современных и отзывчивых веб-приложений. Специализируюсь на React,
              Next.js и TypeScript, постоянно изучаю новые технологии и лучшие
              практики.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4 md:justify-start">
              <div className="text-muted-foreground flex items-center">
                <MapPin className="text-primary mr-2 h-5 w-5" />
                Самара
              </div>
              <div className="bg-border hidden h-6 w-px sm:block" />
              <Button
                variant="default"
                className="shadow-primary/20 rounded-full shadow-lg"
              >
                <Mail className="mr-2 h-4 w-4" />
                Связаться
              </Button>
            </div>
          </motion.div>

          {/* Image/Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative flex-1"
          >
            <div className="relative mx-auto aspect-square w-full max-w-md">
              {/* Decorative Rings */}
              <div className="border-primary/20 absolute inset-0 animate-[spin_20s_linear_infinite] rounded-full border-2 border-dashed" />
              <div className="border-primary/10 absolute inset-4 rounded-full border" />

              {/* Main Image Container */}
              <div className="bg-linear-to-br group absolute inset-8 flex items-center justify-center overflow-hidden rounded-full border border-white/10 from-zinc-800 to-zinc-950 shadow-2xl">
                <div className="bg-primary/5 group-hover:bg-primary/10 absolute inset-0 transition-colors duration-500" />

                {/* Placeholder for User Photo - using a stylish avatar or abstract shape if no photo provided */}
                <div className="p-6 text-center">
                  <span className="mb-4 block text-6xl">👨‍💻</span>
                  <p className="text-muted-foreground text-sm font-medium">
                    Andival-Sei
                  </p>
                </div>
              </div>

              {/* Floating Cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="bg-background/80 absolute -right-4 top-10 rounded-2xl border border-white/10 p-4 shadow-xl backdrop-blur-md"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/20 font-bold text-blue-500">
                    TS
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Main Stack</p>
                    <p className="text-sm font-bold">TypeScript</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="bg-background/80 absolute -left-4 bottom-20 rounded-2xl border border-white/10 p-4 shadow-xl backdrop-blur-md"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500/20 font-bold text-cyan-500">
                    R
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Framework</p>
                    <p className="text-sm font-bold">React & Next.js</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
