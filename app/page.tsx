import type { Metadata } from "next";

import { HomePage } from "@/src/compositions/home";
import { createPageMetadata } from "@/src/shared/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Главная",
  description:
    "Frontend-разработчик. Создаю современные и отзывчивые веб-приложения с использованием React и TypeScript.",
  path: "/",
});

export default function Home() {
  return <HomePage />;
}
