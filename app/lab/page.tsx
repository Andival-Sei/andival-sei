import type { Metadata } from "next";

import { LabPage } from "@/src/compositions/lab";
import { createPageMetadata } from "@/src/shared/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Lab",
  description:
    "Экспериментальные проекты и библиотека знаний по веб-разработке и современным технологиям.",
  path: "/lab",
});

export default function Lab() {
  return <LabPage />;
}
