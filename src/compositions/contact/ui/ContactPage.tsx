// TODO: Реализовать страницу контактов
// - Добавить форму обратной связи
// - Добавить контактную информацию
// - Добавить ссылки на социальные сети

import { Header } from '@/src/widgets/header';
import { ContactSection } from '@/src/widgets/contact-section';
import { Footer } from '@/src/widgets/footer';

export function ContactPage() {
  return (
    <>
      <Header />
      <ContactSection />
      <Footer />
    </>
  );
}

