// TODO: Реализовать главную страницу портфолио
// - Добавить Hero секцию
// - Добавить краткое описание
// - Добавить ссылки на основные разделы

import { FeaturedProjectsSection } from "@/src/widgets/featured-projects-section";
import { Footer } from "@/src/widgets/footer";
import { Header } from "@/src/widgets/header";
import { HeroSection } from "@/src/widgets/hero-section";
import { TechStackSection } from "@/src/widgets/tech-stack-section";

export function HomePage() {
  return (
    <>
      <Header />
      <HeroSection />
      <TechStackSection />
      <FeaturedProjectsSection />
      <Footer />
    </>
  );
}
