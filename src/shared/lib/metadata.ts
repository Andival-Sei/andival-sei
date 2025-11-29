import type { Metadata } from "next";

import { siteConfig } from "@/src/shared/config/site";

type PageMetadataOptions = {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
  noIndex?: boolean;
};

/**
 * Создает базовые метаданные для страницы
 */
export function createPageMetadata({
  title,
  description,
  path = "",
  ogImage,
  noIndex = false,
}: PageMetadataOptions): Metadata {
  // Используем только title без "| Andival-Sei", так как template в layout.tsx уже добавит его
  // Это предотвращает дублирование "| Andival-Sei | Andival-Sei"
  const url = `${siteConfig.url}${path}`;
  const imageUrl = ogImage
    ? ogImage.startsWith("http")
      ? ogImage
      : `${siteConfig.url}${ogImage}`
    : `${siteConfig.url}/opengraph-image`;

  // Для Open Graph и Twitter используем полный title с именем сайта
  const fullTitle = `${title} | ${siteConfig.name}`;

  return {
    // Используем title.absolute чтобы явно указать полный title и игнорировать template
    // Это гарантирует правильное отображение без дублирования
    title: {
      absolute: fullTitle,
    },
    description,
    keywords: siteConfig.keywords,
    authors: [{ name: siteConfig.author }],
    creator: siteConfig.author,
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: siteConfig.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [imageUrl],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: url,
    },
  };
}

/**
 * Создает Open Graph метаданные
 */
export function createOpenGraphMetadata(
  title: string,
  description: string,
  url: string,
  imageUrl: string
) {
  return {
    title,
    description,
    url,
    siteName: siteConfig.name,
    images: [
      {
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
    locale: siteConfig.locale,
    type: "website" as const,
  };
}

/**
 * Создает Twitter Card метаданные
 */
export function createTwitterMetadata(
  title: string,
  description: string,
  imageUrl: string
) {
  return {
    card: "summary_large_image" as const,
    title,
    description,
    images: [imageUrl],
  };
}
