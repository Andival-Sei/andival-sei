"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/src/shared/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/shared/ui/Card";
import { Section } from "@/src/shared/ui/Section";
import { Footer } from "@/src/widgets/footer";
import { Header } from "@/src/widgets/header";

const labSections = [
  {
    title: "Библиотека",
    description:
      "Раздел с короткими конспектами по технологиям. Начните с главной страницы и переходите по темам через сайд-меню.",
    href: "/lab/library/main",
    status: "Доступно",
  },
];

export function LabPage() {
  return (
    <>
      <Header />
      <div className="from-background via-background/90 to-muted/20 bg-linear-to-b">
        <Section className="space-y-8">
          <div className="space-y-3 text-center sm:text-left">
            <p className="text-primary text-xs uppercase tracking-[0.2em]">
              Лаборатория
            </p>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Эксперименты, черновики и заметки
            </h1>
            <p className="text-muted-foreground max-w-3xl text-lg">
              Здесь собираются пробные разделы и внутренние инструменты. Первым
              открываем вход в библиотеку.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {labSections.map((section) => (
              <Card
                key={section.title}
                className="border-primary/10 relative overflow-hidden"
              >
                <div className="pointer-events-none absolute inset-0 opacity-40">
                  <div className="from-primary/10 via-primary/5 bg-linear-to-b absolute inset-0 to-transparent" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.08),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(56,189,248,0.07),transparent_30%)]" />
                </div>

                <CardHeader className="relative">
                  <div className="flex items-center justify-between gap-3">
                    <CardTitle className="text-xl">{section.title}</CardTitle>
                    <span className="text-primary/80 bg-primary/10 rounded-full px-3 py-1 text-xs font-semibold">
                      {section.status}
                    </span>
                  </div>
                  <CardDescription>{section.description}</CardDescription>
                </CardHeader>
                <CardContent className="relative">
                  <Button asChild>
                    <Link href={section.href}>
                      Перейти
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>
      </div>
      <Footer />
    </>
  );
}
