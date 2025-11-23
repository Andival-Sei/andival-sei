import { ArrowUpRight, Github, Globe } from "lucide-react";
import Link from "next/link";

import type { Project } from "@/src/entities/project/model/types";
import { Badge } from "@/src/shared/ui/Badge";
import { Button } from "@/src/shared/ui/Button";
import { Card } from "@/src/shared/ui/Card";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const formattedIndex = index ? String(index).padStart(2, "0") : undefined;
  const statusLabel = project.status ?? "Скоро";
  const timelineLabel = project.timeline ?? "В очереди";
  const hasLinks = project.demoUrl || project.codeUrl;

  return (
    <Card className="border-border/60 from-card/80 via-card/70 to-card/60 hover:border-primary/50 group relative flex h-full flex-col overflow-hidden border-2 bg-gradient-to-b shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="from-primary/10 via-primary/5 pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.18),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(56,189,248,0.16),transparent_32%)] to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="via-primary/50 absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent opacity-70" />

      <div className="flex items-start justify-between gap-4 px-6 pt-6">
        <div className="flex flex-wrap items-center gap-3">
          {formattedIndex ? (
            <span className="text-muted-foreground font-mono text-xs tracking-[0.2em]">
              {formattedIndex}
            </span>
          ) : null}
          <Badge className="border-primary/20 bg-primary/10 text-primary border">
            {statusLabel}
          </Badge>
          {project.category ? (
            <Badge variant="outline" className="text-xs">
              {project.category}
            </Badge>
          ) : null}
        </div>
        <span className="text-muted-foreground text-xs uppercase tracking-[0.1em]">
          {timelineLabel}
        </span>
      </div>

      <div className="space-y-4 px-6 pb-6 pt-4">
        <div className="space-y-2">
          <h3 className="text-2xl font-semibold leading-tight">
            {project.title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {project.description}
          </p>
        </div>

        {project.focus ? (
          <div className="bg-background/80 border-border/70 border px-3 py-2 text-sm">
            <span className="text-muted-foreground">Фокус · </span>
            {project.focus}
          </div>
        ) : null}

        <div className="flex flex-wrap gap-2">
          {project.technologies?.map((tech) => (
            <Badge
              key={tech}
              variant="outline"
              className="bg-background/60 text-xs font-medium"
            >
              {tech}
            </Badge>
          ))}
        </div>

        <div className="border-border/60 flex items-center justify-between gap-3 border-t pt-4">
          {hasLinks ? (
            <div className="flex gap-2">
              {project.demoUrl ? (
                <Button asChild variant="ghost" size="sm">
                  <Link
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Globe className="mr-2 h-4 w-4" />
                    Демо
                  </Link>
                </Button>
              ) : null}
              {project.codeUrl ? (
                <Button asChild variant="ghost" size="sm">
                  <Link
                    href={project.codeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    Код
                  </Link>
                </Button>
              ) : null}
            </div>
          ) : (
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="group/cta whitespace-nowrap px-3"
            >
              <Link href="/contact" className="flex items-center gap-1">
                Давайте поговорим
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
