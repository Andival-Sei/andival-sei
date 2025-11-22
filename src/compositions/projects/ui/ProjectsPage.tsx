// TODO: Реализовать страницу проектов
// - Добавить список всех проектов
// - Добавить фильтры по технологиям
// - Добавить поиск проектов

import { Header } from '@/src/widgets/header';
import { ProjectsSection } from '@/src/widgets/projects-section';
import { Footer } from '@/src/widgets/footer';

export function ProjectsPage() {
  return (
    <>
      <Header />
      <ProjectsSection />
      <Footer />
    </>
  );
}

