import { ArrowUpRight, Github, Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import type { Project } from "@/src/entities/project/model/types";
import { Badge } from "@/src/shared/ui/Badge";
import { Button } from "@/src/shared/ui/Button";

interface FeaturedProjectCardProps {
  project: Project;
  index: number;
  reversed?: boolean;
}

export function FeaturedProjectCard({
  project,
  index,
  reversed = false,
}: FeaturedProjectCardProps) {
  const formattedIndex = String(index).padStart(2, "0");
  const statusLabel = project.status ?? "Скоро";
  const timelineLabel = project.timeline ?? "В очереди";
  const hasLinks = project.demoUrl || project.codeUrl;

  return (
    <div
      className={`border-border/60 from-card/90 via-card/80 to-card/70 hover:border-primary/50 bg-linear-to-br group relative flex min-h-[500px] flex-col overflow-hidden rounded-2xl border-2 p-6 shadow-lg transition-all duration-500 hover:shadow-2xl md:min-h-[600px] md:p-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:p-12 ${
        reversed ? "lg:flex-row-reverse" : ""
      }`}
    >
      {/* Фоновые эффекты */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-70 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(99,102,241,0.15),transparent_40%),radial-gradient(circle_at_70%_10%,rgba(56,189,248,0.12),transparent_35%),radial-gradient(circle_at_10%_70%,rgba(16,185,129,0.08),transparent_35%)]" />
        <div className="bg-size-[32px_32px] absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px)]" />
      </div>

      <div className="via-primary/50 bg-linear-to-r absolute inset-x-0 top-0 h-px from-transparent to-transparent opacity-70" />

      {/* Декоративная область для мобильных (сверху) */}
      <div className="from-primary/5 via-primary/3 bg-linear-to-br relative z-10 mb-6 block aspect-video w-full overflow-hidden rounded-xl to-transparent lg:hidden">
        {project.imageUrl ? (
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <div className="text-muted-foreground text-center">
              <div className="mb-2 text-4xl font-bold opacity-20">
                {formattedIndex}
              </div>
              <div className="text-xs uppercase tracking-widest opacity-40">
                {project.title}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Контент */}
      <div className="relative z-10 flex flex-1 flex-col justify-between lg:w-1/2">
        <div className="space-y-6">
          {/* Заголовок и метаданные */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="text-muted-foreground font-mono text-xs font-semibold tracking-[0.2em] sm:text-sm">
                {formattedIndex}
              </span>
              <Badge className="border-primary/20 bg-primary/10 text-primary border text-xs sm:text-sm">
                {statusLabel}
              </Badge>
              {project.category ? (
                <Badge variant="outline" className="text-xs">
                  {project.category}
                </Badge>
              ) : null}
              <span className="text-muted-foreground text-xs uppercase tracking-[0.1em]">
                {timelineLabel}
              </span>
            </div>

            <h3 className="text-2xl font-bold leading-tight tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
              {project.title}
            </h3>
          </div>

          {/* Описание */}
          <p className="text-muted-foreground text-base leading-relaxed sm:text-lg">
            {project.description}
          </p>

          {/* Фокус проекта */}
          {project.focus ? (
            <div className="bg-background/80 border-border/70 rounded-lg border p-4">
              <span className="text-muted-foreground text-sm font-medium">
                Фокус проекта ·{" "}
              </span>
              <span className="text-sm">{project.focus}</span>
            </div>
          ) : null}

          {/* Технологии */}
          {project.technologies && project.technologies.length > 0 ? (
            <div className="space-y-3">
              <span className="text-muted-foreground text-xs font-medium uppercase tracking-[0.1em]">
                Технологии
              </span>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge
                    key={tech}
                    variant="outline"
                    className="bg-background/60 text-sm font-medium"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        {/* Действия */}
        <div className="border-border/60 mt-8 flex flex-wrap items-center gap-4 border-t pt-6">
          {hasLinks ? (
            <div className="flex flex-wrap gap-3">
              {project.demoUrl ? (
                <Button asChild variant="default" size="lg">
                  <Link
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link"
                  >
                    <Globe className="mr-2 h-5 w-5" />
                    Демо
                    <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                  </Link>
                </Button>
              ) : null}
              {project.codeUrl ? (
                <Button asChild variant="outline" size="lg">
                  <Link
                    href={project.codeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link"
                  >
                    <Github className="mr-2 h-5 w-5" />
                    Код
                    <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                  </Link>
                </Button>
              ) : null}
            </div>
          ) : (
            <Button asChild variant="default" size="lg" className="group/cta">
              <Link href="/contact" className="flex items-center gap-2">
                Давайте поговорим
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5" />
              </Link>
            </Button>
          )}
        </div>
      </div>

      {/* Декоративная область справа/слева */}
      <div className="relative z-10 hidden lg:block lg:w-1/2">
        <div className="from-primary/5 via-primary/3 bg-linear-to-br relative aspect-video w-full overflow-hidden rounded-xl to-transparent">
          {/* Можно добавить изображение проекта, если оно будет */}
          {project.imageUrl ? (
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <div className="text-muted-foreground text-center">
                <div className="mb-4 text-6xl font-bold opacity-20">
                  {formattedIndex}
                </div>
                <div className="text-sm uppercase tracking-widest opacity-40">
                  {project.title}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
