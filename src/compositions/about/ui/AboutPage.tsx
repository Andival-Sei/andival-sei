// TODO: Реализовать страницу "О себе"
// - Добавить информацию о себе
// - Добавить секцию с навыками
// - Добавить образование и опыт

import {
  AboutHero,
  ExperienceTimeline,
  InterestsGrid,
} from "@/src/widgets/about-section";
import { Footer } from "@/src/widgets/footer";
import { Header } from "@/src/widgets/header";

export function AboutPage() {
  return (
    <div className="bg-background selection:bg-primary/20 selection:text-primary min-h-screen font-sans antialiased">
      <Header />
      <main className="flex-1">
        <AboutHero />
        <ExperienceTimeline />
        <InterestsGrid />
      </main>
      <Footer />
    </div>
  );
}
