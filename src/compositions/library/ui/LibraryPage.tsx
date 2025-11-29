"use client";

import { MDXProvider } from "@mdx-js/react";

import { type LibraryEntry } from "@/src/compositions/library/model/libraryNavigation";
import { FadeIn } from "@/src/shared/ui";
import { Badge } from "@/src/shared/ui/Badge";

import { mdxComponents } from "./mdx/MdxComponents";

type LibraryPageProps = {
  entry: LibraryEntry;
  MdxContent?: React.ComponentType;
};

export function LibraryPage({ entry, MdxContent }: LibraryPageProps) {
  return (
    <article className="space-y-8">
      <header className="mb-10 space-y-6">
        <FadeIn direction="up" delay={0}>
          <Badge
            variant="outline"
            className="border-primary/40 bg-primary/5 text-primary text-[11px] uppercase tracking-[0.2em]"
          >
            {entry.category}
          </Badge>
        </FadeIn>

        <FadeIn direction="up" delay={0.1}>
          <div className="space-y-4">
            <h1 className="from-foreground to-foreground/70 bg-gradient-to-r bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-4xl lg:text-5xl">
              {entry.title}
            </h1>
          </div>
        </FadeIn>

        <FadeIn direction="up" delay={0.2}>
          <p className="text-muted-foreground max-w-3xl text-lg leading-relaxed">
            {entry.description}
          </p>
        </FadeIn>
      </header>

      <FadeIn direction="up" delay={0.3}>
        {MdxContent ? (
          <MDXProvider components={mdxComponents}>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <MdxContent />
            </div>
          </MDXProvider>
        ) : (
          <div className="bg-muted/30 text-muted-foreground border-primary/20 rounded-2xl border border-dashed p-8 text-sm">
            <p className="m-0">
              Здесь появится полноценный контент по разделу. Пока что это
              входная точка: выбирайте тему в сайд-меню слева, а справа будет
              краткое описание выбранного пункта.
            </p>
          </div>
        )}
      </FadeIn>
    </article>
  );
}
