// TODO: Реализовать карточку проекта
// - Добавить изображение проекта
// - Добавить описание
// - Добавить теги технологий
// - Добавить ссылки (демо, код)
// - Добавить hover эффекты

import { Github, Globe } from "lucide-react";
import Link from "next/link";

import type { Project } from "@/src/entities/project/model/types";
import { Badge } from "@/src/shared/ui/Badge";
import { Button } from "@/src/shared/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/shared/ui/Card";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="hover:border-primary/50 group flex h-full flex-col overflow-hidden transition-all hover:shadow-xl">
      <div className="bg-muted relative aspect-video w-full overflow-hidden">
        {/* Placeholder gradient if no image */}
        <div className="bg-linear-to-br absolute inset-0 from-indigo-500/10 to-purple-500/10 transition-transform duration-500 group-hover:scale-105" />
        {/* TODO: Add actual image component here */}
      </div>

      <CardHeader>
        <CardTitle className="text-xl">{project.title}</CardTitle>
        <CardDescription className="line-clamp-2">
          {project.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1">
        <div className="flex flex-wrap gap-2">
          {project.technologies?.map((tech) => (
            <Badge key={tech} variant="secondary" className="font-normal">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="gap-2 pt-0">
        {project.demoUrl && (
          <Button asChild variant="outline" size="sm" className="w-full">
            <Link href={project.demoUrl} target="_blank">
              <Globe className="mr-2 size-4" />
              Demo
            </Link>
          </Button>
        )}
        {project.codeUrl && (
          <Button asChild variant="outline" size="sm" className="w-full">
            <Link href={project.codeUrl} target="_blank">
              <Github className="mr-2 size-4" />
              Code
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
