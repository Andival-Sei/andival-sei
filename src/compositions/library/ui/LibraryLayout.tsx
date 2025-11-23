"use client";

import { type PropsWithChildren } from "react";

import { LibrarySidebar } from "@/src/compositions/library/ui/LibrarySidebar";
import { Section } from "@/src/shared/ui/Section";
import { Footer } from "@/src/widgets/footer";
import { Header } from "@/src/widgets/header";

export function LibraryLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <div className="bg-background relative min-h-screen overflow-hidden">
        {/* Декоративные фоновые элементы */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          {/* Градиентные круги */}
          <div className="bg-primary/10 absolute -left-1/4 top-1/4 h-96 w-96 animate-pulse rounded-full blur-3xl" />
          <div className="bg-primary/5 absolute -right-1/4 bottom-1/4 h-96 w-96 animate-pulse rounded-full blur-3xl delay-1000" />
          <div className="bg-primary/5 absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full blur-3xl delay-500" />

          {/* Сетка паттерн */}
          <div
            className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"
            style={{
              maskImage:
                "radial-gradient(ellipse 80% 50% at 50% 0%, #000 70%, transparent 110%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 80% 50% at 50% 0%, #000 70%, transparent 110%)",
            }}
          />
        </div>

        <Section className="relative py-16 md:py-24">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
            <aside className="lg:sticky lg:top-24 lg:h-fit lg:w-[280px] lg:shrink-0">
              <LibrarySidebar />
            </aside>
            <main className="min-w-0 flex-1">
              <div className="bg-card/80 relative overflow-hidden rounded-3xl border border-white/10 p-6 shadow-xl backdrop-blur-sm lg:p-8">
                {/* Контент */}
                <div className="relative z-10">{children}</div>
              </div>
            </main>
          </div>
        </Section>
      </div>
      <Footer />
    </>
  );
}
