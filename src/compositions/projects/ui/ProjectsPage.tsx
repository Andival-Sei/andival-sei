// TODO: Реализовать страницу проектов
// - Добавить список всех проектов
// - Добавить фильтры по технологиям
// - Добавить поиск проектов

import { Footer } from "@/src/widgets/footer";
import { Header } from "@/src/widgets/header";
import { ProjectsSection } from "@/src/widgets/projects-section";

export function ProjectsPage() {
  return (
    <>
      <Header />
      <ProjectsSection />
      <Footer />
    </>
  );
}
