import { Mail, MapPin, MessageSquare } from "lucide-react";

import { contactInfo } from "@/src/entities/contact";
import { ContactForm } from "@/src/features/contact-form";
import { FadeIn } from "@/src/shared/ui";
import { Section } from "@/src/shared/ui/Section";

export function ContactSection() {
  return (
    <div className="relative overflow-hidden">
      {/* Background Gradients - now outside the container */}
      <div className="bg-primary/5 absolute left-0 top-1/2 -z-10 h-[500px] w-[500px] -translate-y-1/2 rounded-full blur-3xl" />
      <div className="bg-primary/10 absolute bottom-0 right-0 -z-10 h-[300px] w-[300px] rounded-full blur-3xl" />

      <Section className="py-24 sm:py-32">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left Column: Info */}
          <FadeIn direction="right" duration={0.7} className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Давайте работать вместе
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                У вас есть идея проекта или просто хотите поздороваться? Я
                всегда открыт для обсуждения новых проектов, творческих идей или
                возможности стать частью вашего видения.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 text-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-xl">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Email</h3>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {contactInfo.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 text-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-xl">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Соцсети</h3>
                  <div className="text-muted-foreground flex gap-4">
                    {contactInfo.socialLinks?.telegram && (
                      <a
                        href={contactInfo.socialLinks.telegram}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-primary transition-colors"
                      >
                        Telegram
                      </a>
                    )}
                    {contactInfo.socialLinks?.vk && (
                      <a
                        href={contactInfo.socialLinks.vk}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-primary transition-colors"
                      >
                        VK
                      </a>
                    )}
                    {contactInfo.socialLinks?.github && (
                      <a
                        href={contactInfo.socialLinks.github}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-primary transition-colors"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 text-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-xl">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Локация</h3>
                  <p className="text-muted-foreground">
                    {contactInfo.location || "Не указано"}
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Right Column: Form */}
          <FadeIn
            direction="left"
            duration={0.7}
            delay={0.2}
            className="bg-card/50 border-border/50 relative rounded-3xl border p-8 shadow-2xl backdrop-blur-sm sm:p-10"
          >
            <div className="mb-8">
              <h3 className="text-2xl font-semibold">Напишите мне</h3>
              <p className="text-muted-foreground mt-2">
                Я отвечу вам в течение 24 часов.
              </p>
            </div>
            <ContactForm />
          </FadeIn>
        </div>
      </Section>
    </div>
  );
}
