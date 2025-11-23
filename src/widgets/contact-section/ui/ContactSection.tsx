// TODO: Реализовать секцию контактов
// - Добавить форму обратной связи
// - Добавить контактную информацию
// - Добавить карту (опционально)

import { ContactForm } from "@/src/features/contact-form";
import { Section } from "@/src/shared/ui/Section";

export function ContactSection() {
  return (
    <Section className="py-20">
      <div className="grid gap-12 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Get in Touch
            </h2>
            <p className="text-muted-foreground text-lg">
              Have a project in mind or just want to say hi? I&apos;d love to
              hear from you.
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-muted-foreground">hello@example.com</p>
              </div>
            </div>
            {/* Add more contact info here if needed */}
          </div>
        </div>

        <div className="bg-card rounded-2xl border p-8 shadow-sm">
          <ContactForm />
        </div>
      </div>
    </Section>
  );
}
