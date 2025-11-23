"use client";

import { Code2, FileCode, Cpu, Database, Globe, Layers } from "lucide-react";
import { type ComponentType } from "react";

import { Badge } from "@/src/shared/ui/Badge";
import { Section } from "@/src/shared/ui/Section";

// Маппинг технологий на иконки
const techStack = [
  { name: "React", icon: Layers },
  { name: "TypeScript", icon: FileCode },
  { name: "Next.js", icon: Globe },
  { name: "Node.js", icon: Cpu },
  { name: "MongoDB", icon: Database },
  { name: "Tailwind", icon: Code2 },
] as const;

export function TechStackSection() {
  return (
    <Section className="py-20">
      <div className="mb-12 flex flex-col gap-4 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Мой стек технологий
        </h2>
        <p className="text-muted-foreground mx-auto max-w-[700px] text-lg">
          Инструменты и технологии, которые я использую для создания современных
          веб-приложений
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        {techStack.map((tech, index) => {
          const Icon: ComponentType<{ className?: string }> = tech.icon;
          return (
            <Badge
              key={tech.name}
              variant="secondary"
              className="hover:bg-primary/10 animate-fade-in-up group flex items-center gap-2 px-4 py-2 text-base opacity-0 transition-colors hover:scale-105"
              style={{
                animationDelay: `${index * 50}ms`,
              }}
            >
              <Icon className="text-primary h-5 w-5 transition-transform group-hover:scale-110" />
              <span className="font-medium">{tech.name}</span>
            </Badge>
          );
        })}
      </div>
    </Section>
  );
}
