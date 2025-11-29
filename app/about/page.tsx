import type { Metadata } from "next";

import { AboutPage } from "@/src/compositions/about";
import { createPageMetadata } from "@/src/shared/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Обо мне",
  description:
    "Узнайте больше о моем опыте, навыках и подходе к разработке современных веб-приложений.",
  path: "/about",
});

export default function About() {
  return <AboutPage />;
}
