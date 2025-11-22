// TODO: Реализовать секцию контактов
// - Добавить форму обратной связи
// - Добавить контактную информацию
// - Добавить карту (опционально)

import { Section } from '@/src/shared/ui/Section';
import { ContactForm } from '@/src/features/contact-form';

export function ContactSection() {
  return (
    <Section>
      <h2 className="text-3xl font-bold tracking-tight">Get in Touch</h2>
      <div className="mt-8">
        {/* TODO: Добавить контактную информацию */}
        <ContactForm />
      </div>
    </Section>
  );
}

