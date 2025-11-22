// TODO: Реализовать страницу "О себе"
// - Добавить информацию о себе
// - Добавить секцию с навыками
// - Добавить образование и опыт

import { Header } from '@/src/widgets/header';
import { AboutSection } from '@/src/widgets/about-section';
import { Footer } from '@/src/widgets/footer';

export function AboutPage() {
  return (
    <>
      <Header />
      <AboutSection />
      <Footer />
    </>
  );
}

