import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { projects } from "@/src/entities/project/model/project-data";
import { FeaturedProjectCard } from "@/src/features/featured-project-card";
import { Button } from "@/src/shared/ui/Button";

export function FeaturedProjectsSection() {
  // Показываем только 3 лучших featured проекта
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-4">
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
      </div>
    </section>
  );
}
