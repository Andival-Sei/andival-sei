import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  createPageMetadata,
  createOpenGraphMetadata,
  createTwitterMetadata,
} from "../metadata";
import { siteConfig } from "@/src/shared/config/site";

// Мокаем siteConfig для изоляции тестов
vi.mock("@/src/shared/config/site", () => ({
  siteConfig: {
    name: "Andival-Sei",
    url: "https://andival-sei.vercel.app",
    author: "Кирилл",
    keywords: ["frontend", "разработчик"],
    locale: "ru_RU",
  },
}));

describe("createPageMetadata", () => {
  it("должен создавать базовые метаданные с минимальными параметрами", () => {
    const metadata = createPageMetadata({
      title: "Тестовая страница",
      description: "Описание тестовой страницы",
    });

    expect(metadata.title).toEqual({
      absolute: "Тестовая страница | Andival-Sei",
    });
    expect(metadata.description).toBe("Описание тестовой страницы");
    expect(metadata.authors).toEqual([{ name: "Кирилл" }]);
    expect(metadata.creator).toBe("Кирилл");
  });

  it("должен создавать метаданные с кастомным путем", () => {
    const metadata = createPageMetadata({
      title: "О проекте",
      description: "Описание проекта",
      path: "/about",
    });

    expect(metadata.openGraph?.url).toBe(
      "https://andival-sei.vercel.app/about"
    );
    expect(metadata.alternates?.canonical).toBe(
      "https://andival-sei.vercel.app/about"
    );
  });

  it("должен использовать кастомное OG изображение если передано", () => {
    const metadata = createPageMetadata({
      title: "Проект",
      description: "Описание",
      ogImage: "/custom-image.jpg",
    });

    const ogImages = metadata.openGraph?.images;
    const ogImage = Array.isArray(ogImages) ? ogImages[0] : ogImages;
    const ogImageUrl =
      typeof ogImage === "string" || ogImage instanceof URL
        ? ogImage.toString()
        : ogImage && typeof ogImage === "object" && "url" in ogImage
          ? ogImage.url
          : undefined;
    expect(ogImageUrl).toBe("https://andival-sei.vercel.app/custom-image.jpg");

    const twitterImages = metadata.twitter?.images;
    const twitterImage = Array.isArray(twitterImages)
      ? twitterImages[0]
      : twitterImages;
    expect(twitterImage).toBe(
      "https://andival-sei.vercel.app/custom-image.jpg"
    );
  });

  it("должен использовать абсолютный URL для OG изображения если передан", () => {
    const metadata = createPageMetadata({
      title: "Проект",
      description: "Описание",
      ogImage: "https://example.com/image.jpg",
    });

    const ogImages = metadata.openGraph?.images;
    const ogImage = Array.isArray(ogImages) ? ogImages[0] : ogImages;
    const ogImageUrl =
      typeof ogImage === "string" || ogImage instanceof URL
        ? ogImage.toString()
        : ogImage && typeof ogImage === "object" && "url" in ogImage
          ? ogImage.url
          : undefined;
    expect(ogImageUrl).toBe("https://example.com/image.jpg");
  });

  it("должен использовать дефолтное OG изображение если не передано", () => {
    const metadata = createPageMetadata({
      title: "Проект",
      description: "Описание",
    });

    const ogImages = metadata.openGraph?.images;
    const ogImage = Array.isArray(ogImages) ? ogImages[0] : ogImages;
    const ogImageUrl =
      typeof ogImage === "string" || ogImage instanceof URL
        ? ogImage.toString()
        : ogImage && typeof ogImage === "object" && "url" in ogImage
          ? ogImage.url
          : undefined;
    expect(ogImageUrl).toBe("https://andival-sei.vercel.app/opengraph-image");
  });

  it("должен устанавливать noIndex в robots если передан", () => {
    const metadata = createPageMetadata({
      title: "Секретная страница",
      description: "Не индексировать",
      noIndex: true,
    });

    const robots = metadata.robots;
    if (typeof robots === "object" && robots !== null) {
      expect(robots.index).toBe(false);
      expect(robots.follow).toBe(false);
      if (robots.googleBot && typeof robots.googleBot === "object") {
        expect(robots.googleBot.index).toBe(false);
        expect(robots.googleBot.follow).toBe(false);
      }
    }
  });

  it("должен включать keywords из siteConfig", () => {
    const metadata = createPageMetadata({
      title: "Страница",
      description: "Описание",
    });

    expect(metadata.keywords).toEqual(["frontend", "разработчик"]);
  });

  it("должен создавать полные Open Graph метаданные", () => {
    const metadata = createPageMetadata({
      title: "Тест",
      description: "Описание",
      path: "/test",
    });

    expect(metadata.openGraph).toEqual({
      title: "Тест | Andival-Sei",
      description: "Описание",
      url: "https://andival-sei.vercel.app/test",
      siteName: "Andival-Sei",
      images: [
        {
          url: "https://andival-sei.vercel.app/opengraph-image",
          width: 1200,
          height: 630,
          alt: "Тест",
        },
      ],
      locale: "ru_RU",
      type: "website",
    });
  });

  it("должен создавать полные Twitter Card метаданные", () => {
    const metadata = createPageMetadata({
      title: "Тест",
      description: "Описание",
    });

    expect(metadata.twitter).toEqual({
      card: "summary_large_image",
      title: "Тест | Andival-Sei",
      description: "Описание",
      images: ["https://andival-sei.vercel.app/opengraph-image"],
    });
  });
});

describe("createOpenGraphMetadata", () => {
  it("должен создавать Open Graph метаданные", () => {
    const ogMetadata = createOpenGraphMetadata(
      "Заголовок",
      "Описание",
      "https://example.com/page",
      "https://example.com/image.jpg"
    );

    expect(ogMetadata).toEqual({
      title: "Заголовок",
      description: "Описание",
      url: "https://example.com/page",
      siteName: "Andival-Sei",
      images: [
        {
          url: "https://example.com/image.jpg",
          width: 1200,
          height: 630,
          alt: "Заголовок",
        },
      ],
      locale: "ru_RU",
      type: "website",
    });
  });
});

describe("createTwitterMetadata", () => {
  it("должен создавать Twitter Card метаданные", () => {
    const twitterMetadata = createTwitterMetadata(
      "Заголовок",
      "Описание",
      "https://example.com/image.jpg"
    );

    expect(twitterMetadata).toEqual({
      card: "summary_large_image",
      title: "Заголовок",
      description: "Описание",
      images: ["https://example.com/image.jpg"],
    });
  });
});
