import type { Metadata } from "next";
import { ReactNode } from "react";

import { LibraryLayout } from "@/src/compositions/library";
import { createPageMetadata } from "@/src/shared/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Библиотека",
  description:
    "Короткие заметки по инструментам и технологиям. Стартовая точка перед тем, как углубляться в детали.",
  path: "/lab/library",
});

export default function LibraryBaseLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <LibraryLayout>{children}</LibraryLayout>;
}
