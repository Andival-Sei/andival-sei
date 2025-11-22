// TODO: Реализовать главную страницу портфолио
// - Добавить Hero секцию
// - Добавить краткое описание
// - Добавить ссылки на основные разделы

import { Header } from '@/src/widgets/header';
import { HeroSection } from '@/src/widgets/hero-section';
import { ProjectsSection } from '@/src/widgets/projects-section';
import { Footer } from '@/src/widgets/footer';

export function HomePage() {
  return (
    <>
      <Header />
      <HeroSection />
      <ProjectsSection />
      <Footer />
    </>
  );
}

