import type { Metadata } from "next";

import { ProjectsPage } from "@/src/compositions/projects";
import { createPageMetadata } from "@/src/shared/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Проекты",
  description:
    "Портфолио моих проектов: веб-приложения, созданные с использованием современных технологий и лучших практик разработки.",
  path: "/projects",
});

export default function Projects() {
  return <ProjectsPage />;
}
