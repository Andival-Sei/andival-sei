"use client";

import type { LibraryEntry } from "@/src/compositions/library";
import { LibraryPage } from "@/src/compositions/library";
import { getMdxContent } from "@/src/compositions/library/lib/mdxContentMap";

type LibrarySlugClientProps = {
  entry: LibraryEntry;
  slug: string[];
};

export function LibrarySlugClient({ entry }: LibrarySlugClientProps) {
  // Получаем MDX контент из статического маппинга
  const MdxContent = getMdxContent(entry.slug);

  return <LibraryPage entry={entry} MdxContent={MdxContent} />;
}
