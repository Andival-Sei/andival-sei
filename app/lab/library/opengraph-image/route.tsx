import { ImageResponse } from "next/og";

import { getLibraryEntry } from "@/src/compositions/library";
import { siteConfig } from "@/src/shared/config/site";

export const runtime = "edge";
export const alt = "Library Entry";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export async function GET(request: Request) {
  // Извлекаем slug из URL
  const url = new URL(request.url);

  // Путь будет вида /lab/library/opengraph-image?slug=...
  // Или из referer можно получить полный путь
  const referer = request.headers.get("referer");
  let slug: string[] = ["main"];

  if (referer) {
    try {
      const refererUrl = new URL(referer);
      const pathParts = refererUrl.pathname
        .replace("/lab/library/", "")
        .split("/")
        .filter(Boolean);
      if (pathParts.length > 0 && pathParts[0] !== "opengraph-image") {
        slug = pathParts;
      }
    } catch {
      // Игнорируем ошибки парсинга
    }
  }

  // Также проверяем query параметр
  const slugParam = url.searchParams.get("slug");
  if (slugParam) {
    slug = slugParam.split("/").filter(Boolean);
  }

  const entry = getLibraryEntry(slug);

  if (!entry) {
    // Fallback к базовому изображению
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 64,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontFamily: "system-ui",
          }}
        >
          <div style={{ fontSize: 80, fontWeight: "bold" }}>
            {siteConfig.name}
          </div>
        </div>
      ),
      {
        ...size,
      }
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 64,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontFamily: "system-ui",
          padding: 80,
        }}
      >
        <div
          style={{
            fontSize: 24,
            opacity: 0.8,
            marginBottom: 20,
            textTransform: "uppercase",
            letterSpacing: 2,
          }}
        >
          {entry.category}
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: "bold",
            marginBottom: 30,
            textAlign: "center",
          }}
        >
          {entry.title}
        </div>
        <div
          style={{
            fontSize: 28,
            opacity: 0.9,
            textAlign: "center",
            maxWidth: 1000,
            lineHeight: 1.4,
          }}
        >
          {entry.description}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
