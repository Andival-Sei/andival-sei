"use client";

import { notFound } from "next/navigation";
import { use } from "react";

import { LibraryPage, getLibraryEntry } from "@/src/compositions/library";
import { getMdxContent } from "@/src/compositions/library/lib/mdxContentMap";

type LibrarySlugPageProps = {
  params: Promise<{
    slug: string[];
  }>;
};

export default function LibrarySlugPage({ params }: LibrarySlugPageProps) {
  const { slug } = use(params);
  const entry = getLibraryEntry(slug);

  if (!entry) {
    return notFound();
  }

  // Получаем MDX контент из статического маппинга
  const MdxContent = getMdxContent(entry.slug);

  return <LibraryPage entry={entry} MdxContent={MdxContent} />;
}
