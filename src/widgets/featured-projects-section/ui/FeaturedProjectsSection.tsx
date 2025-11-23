import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { projects } from "@/src/entities/project/model/project-data";
import { FeaturedProjectCard } from "@/src/features/featured-project-card";
import { Button } from "@/src/shared/ui/Button";
import { Section } from "@/src/shared/ui/Section";

export function FeaturedProjectsSection() {
  // Показываем только 3 лучших featured проекта
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <Section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-70">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.08),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(56,189,248,0.08),transparent_30%),radial-gradient(circle_at_10%_80%,rgba(16,185,129,0.06),transparent_30%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:28px_28px]" />
      </div>

      <div className="space-y-12">
        <div className="flex items-center justify-between">
          <div className="space-y-3">
            <div className="text-primary flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em]">
              <span className="bg-primary/10 text-primary rounded-full px-3 py-1 font-semibold">
                Избранные проекты
              </span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Лучшие проекты
            </h2>
            <p className="text-muted-foreground max-w-2xl text-lg">
              Топ-3 проекта, демонстрирующих мои навыки и опыт в разработке
              современных веб-приложений.
            </p>
          </div>
          <Button asChild variant="outline" className="hidden lg:flex">
            <Link href="/projects">
              Все проекты
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="space-y-8">
          {featuredProjects.map((project, index) => (
            <FeaturedProjectCard
              key={project.id}
              project={project}
              index={index + 1}
              reversed={index % 2 === 1}
            />
          ))}
        </div>

        <div className="flex justify-center pt-4 lg:hidden">
          <Button asChild variant="outline">
            <Link href="/projects">
              Все проекты
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </Section>
  );
}
