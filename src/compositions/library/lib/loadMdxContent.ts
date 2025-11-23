import { type ComponentType } from "react";

export type MdxModule = {
  default: ComponentType;
  metadata?: {
    title?: string;
    description?: string;
  };
};

/**
 * Динамически загружает MDX контент по slug
 * @param slug - массив сегментов пути (например, ['languages', 'html'])
 * @returns Promise с MDX модулем или null если не найден
 */
export async function loadMdxContent(
  slug: string[]
): Promise<MdxModule | null> {
  if (!slug || slug.length === 0) {
    return null;
  }

  const path = slug.join("/");

  try {
    // Динамический импорт MDX файла
    const mdxModule = await import(
      `@/src/compositions/library/content/${path}.mdx`
    );
    return mdxModule as MdxModule;
  } catch (error) {
    // Файл не найден или ошибка импорта
    console.warn(`MDX content not found for path: ${path}`, error);
    return null;
  }
}
