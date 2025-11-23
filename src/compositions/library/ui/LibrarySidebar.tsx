"use client";

import {
  BookOpen,
  Brain,
  Code,
  Code2,
  FileCode,
  FolderKanban,
  Sparkles,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SiCss3,
  SiGit,
  SiGoogle,
  SiHtml5,
  SiJavascript,
  SiJetbrains,
  SiNextdotjs,
  SiOpenai,
  SiReact,
  SiRedux,
  SiSass,
  SiTypescript,
  SiVite,
  SiWebpack,
} from "react-icons/si";

import {
  LIBRARY_BASE_PATH,
  libraryCategories,
  libraryMainEntry,
  slugify,
} from "@/src/compositions/library/model/libraryNavigation";
import { cn } from "@/src/shared/lib/utils";

// Иконки для категорий
const categoryIcons: Record<string, typeof Code2> = {
  languages: Code2,
  "build-tools": Wrench,
  frameworks: FileCode,
  ide: FolderKanban,
  "ai-assistants": Sparkles,
};

// Иконки для топиков
const topicIcons: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  HTML: SiHtml5,
  CSS: SiCss3,
  SCSS: SiSass,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  Webpack: SiWebpack,
  Vite: SiVite,
  Redux: SiRedux,
  React: SiReact,
  "Next.js": SiNextdotjs,
  "VS Code": Code,
  Cursor: Code,
  Antigravity: Sparkles,
  WebStorm: SiJetbrains,
  Git: SiGit,
  GPT: SiOpenai,
  Claude: Brain,
  Gemini: SiGoogle,
};

const navClasses =
  "group flex items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-all duration-300 hover:scale-[1.02]";

export function LibrarySidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    const normalized = pathname?.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;
    return normalized === path;
  };

  return (
    <div className="w-full lg:w-[280px]">
      <div className="bg-card/70 relative overflow-hidden rounded-3xl border border-white/10 p-6 shadow-xl backdrop-blur-sm">
        <div className="relative z-10 mb-6 flex items-center gap-3">
          <div className="bg-primary/10 rounded-xl p-2">
            <BookOpen className="text-primary h-5 w-5" />
          </div>
          <div>
            <p className="text-foreground text-lg font-semibold">Библиотека</p>
          </div>
        </div>

        <nav className="relative z-10 space-y-6">
          <div>
            <Link
              href={libraryMainEntry.path}
              className={cn(
                navClasses,
                isActive(libraryMainEntry.path)
                  ? "border-primary/60 bg-primary/10 text-primary shadow-primary/20 shadow-md"
                  : "hover:border-primary/40 hover:bg-primary/5 border-white/10 hover:shadow-md"
              )}
            >
              <BookOpen
                className={cn(
                  "h-4 w-4 shrink-0 transition-transform duration-300",
                  isActive(libraryMainEntry.path)
                    ? "text-primary"
                    : "text-muted-foreground group-hover:text-primary group-hover:scale-110"
                )}
              />
              <span className="font-medium">Обзор</span>
            </Link>
          </div>

          <div className="space-y-6">
            {libraryCategories.map((category) => {
              const CategoryIcon = categoryIcons[category.slug] || Code2;

              return (
                <div key={category.slug} className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CategoryIcon className="text-primary h-4 w-4" />
                    <p className="text-muted-foreground text-xs font-semibold uppercase tracking-[0.15em]">
                      {category.title}
                    </p>
                  </div>
                  <div className="space-y-2">
                    {category.topics.map((topic) => {
                      const topicPath = `${LIBRARY_BASE_PATH}/${category.slug}/${slugify(
                        topic.title
                      )}`;
                      const active = isActive(topicPath);
                      const TopicIcon = topicIcons[topic.title] || Code2;

                      return (
                        <Link
                          key={topic.title}
                          href={topicPath}
                          className={cn(
                            navClasses,
                            active
                              ? "border-primary/60 bg-primary/10 text-primary shadow-primary/20 shadow-md"
                              : "hover:border-primary/40 hover:bg-primary/5 border-white/10 hover:shadow-md"
                          )}
                        >
                          <TopicIcon
                            className={cn(
                              "h-4 w-4 shrink-0 transition-transform duration-300",
                              active
                                ? "text-primary"
                                : "text-muted-foreground group-hover:text-primary group-hover:scale-110"
                            )}
                          />
                          <span className="flex-1">{topic.title}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}
