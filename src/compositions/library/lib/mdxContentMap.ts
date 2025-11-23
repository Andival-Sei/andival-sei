"use client";

// Статические импорты MDX файлов
import { type ComponentType } from "react";

import ClaudeContent from "@/src/compositions/library/content/ai-assistants/claude.mdx";
import GeminiContent from "@/src/compositions/library/content/ai-assistants/gemini.mdx";
import GptContent from "@/src/compositions/library/content/ai-assistants/gpt.mdx";
import ViteContent from "@/src/compositions/library/content/build-tools/vite.mdx";
import WebpackContent from "@/src/compositions/library/content/build-tools/webpack.mdx";
import NextJsContent from "@/src/compositions/library/content/frameworks/next.js.mdx";
import ReactContent from "@/src/compositions/library/content/frameworks/react.mdx";
import ReduxContent from "@/src/compositions/library/content/frameworks/redux.mdx";
import AntigravityContent from "@/src/compositions/library/content/ide/antigravity.mdx";
import CursorContent from "@/src/compositions/library/content/ide/cursor.mdx";
import GitContent from "@/src/compositions/library/content/ide/git.mdx";
import VsCodeContent from "@/src/compositions/library/content/ide/vs-code.mdx";
import WebStormContent from "@/src/compositions/library/content/ide/webstorm.mdx";
import CssContent from "@/src/compositions/library/content/languages/css.mdx";
import HtmlContent from "@/src/compositions/library/content/languages/html.mdx";
import JavaScriptContent from "@/src/compositions/library/content/languages/javascript.mdx";
import ScssContent from "@/src/compositions/library/content/languages/scss.mdx";
import TypeScriptContent from "@/src/compositions/library/content/languages/typescript.mdx";

// Маппинг slug к MDX компонентам
const mdxContentMap: Record<string, ComponentType> = {
  // Языки программирования
  "languages/html": HtmlContent,
  "languages/css": CssContent,
  "languages/scss": ScssContent,
  "languages/javascript": JavaScriptContent,
  "languages/typescript": TypeScriptContent,

  // Инструменты сборки
  "build-tools/webpack": WebpackContent,
  "build-tools/vite": ViteContent,

  // Фреймворки и библиотеки
  "frameworks/redux": ReduxContent,
  "frameworks/react": ReactContent,
  "frameworks/next.js": NextJsContent,

  // IDE и редакторы
  "ide/vs-code": VsCodeContent,
  "ide/cursor": CursorContent,
  "ide/antigravity": AntigravityContent,
  "ide/webstorm": WebStormContent,
  "ide/git": GitContent,

  // AI помощники
  "ai-assistants/gpt": GptContent,
  "ai-assistants/claude": ClaudeContent,
  "ai-assistants/gemini": GeminiContent,
};

/**
 * Получить MDX компонент по slug
 * @param slug - массив сегментов пути (например, ['languages', 'html'])
 * @returns MDX компонент или undefined если не найден
 */
export function getMdxContent(slug: string[]): ComponentType | undefined {
  const path = slug.join("/");
  return mdxContentMap[path];
}
