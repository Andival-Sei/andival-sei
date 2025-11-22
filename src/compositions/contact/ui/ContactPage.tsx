// TODO: Реализовать страницу контактов
// - Добавить форму обратной связи
// - Добавить контактную информацию
// - Добавить ссылки на социальные сети

import { ContactSection } from "@/src/widgets/contact-section";
import { Footer } from "@/src/widgets/footer";
import { Header } from "@/src/widgets/header";

export function ContactPage() {
  return (
    <>
      <Header />
      <ContactSection />
      <Footer />
    </>
  );
}
