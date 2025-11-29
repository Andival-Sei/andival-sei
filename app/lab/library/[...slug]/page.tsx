import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

import { getLibraryEntry } from "@/src/compositions/library";
import { siteConfig } from "@/src/shared/config/site";

import { LibrarySlugClient } from "./LibrarySlugClient";

type LibrarySlugPageProps = {
  params: Promise<{
    slug: string[];
  }>;
};

export async function generateMetadata(
  { params }: LibrarySlugPageProps,
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const entry = getLibraryEntry(slug);

  if (!entry) {
    return {};
  }

  // Используем общий route handler для OG изображений библиотеки
  // Передаем slug через query параметр
  const slugParam = encodeURIComponent(entry.slug.join("/"));
  const ogImageUrl = `/lab/library/opengraph-image?slug=${slugParam}`;

  // Для страницы main (обзор) используем просто "Библиотека"
  // Для остальных страниц: "Библиотека | название-страницы"
  const pageTitle =
    entry.slug.length === 1 && entry.slug[0] === "main"
      ? "Библиотека"
      : `Библиотека | ${entry.title}`;

  // Создаем метаданные без "| Andival-Sei" для страниц библиотеки
  const url = `${siteConfig.url}${entry.path}`;
  const imageUrl = ogImageUrl.startsWith("http")
    ? ogImageUrl
    : `${siteConfig.url}${ogImageUrl}`;

  return {
    title: {
      absolute: pageTitle, // Без "| Andival-Sei"
    },
    description: entry.description,
    keywords: [...siteConfig.keywords],
    authors: [{ name: siteConfig.author }],
    creator: siteConfig.author,
    openGraph: {
      title: pageTitle,
      description: entry.description,
      url,
      siteName: siteConfig.name,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: entry.title,
        },
      ],
      locale: siteConfig.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: entry.description,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function LibrarySlugPage({
  params,
}: LibrarySlugPageProps) {
  const { slug } = await params;
  const entry = getLibraryEntry(slug);

  if (!entry) {
    notFound();
  }

  // Передаем уже распарсенные данные в клиентский компонент
  return <LibrarySlugClient entry={entry} slug={slug} />;
}
