import Link from "next/link";
import { type ComponentPropsWithoutRef } from "react";

import { cn } from "@/src/shared/lib/utils";

import { CodeBlock } from "./CodeBlock";

// Типизация для компонентов заголовков
type HeadingProps = ComponentPropsWithoutRef<"h1">;

// Стилизованные заголовки с якорными ссылками
function H1({ className, children, ...props }: HeadingProps) {
  return (
    <h1
      className={cn(
        "from-foreground to-foreground/70 bg-linear-to-r mb-6 mt-8 scroll-mt-24 bg-clip-text text-3xl font-bold tracking-tight text-transparent first:mt-0 md:text-4xl",
        className
      )}
      {...props}
    >
      {children}
    </h1>
  );
}

function H2({ className, children, ...props }: HeadingProps) {
  return (
    <h2
      className={cn(
        "from-foreground to-foreground/80 border-primary/20 bg-linear-to-r mb-4 mt-8 scroll-mt-24 border-b bg-clip-text pb-2 text-2xl font-semibold tracking-tight text-transparent md:text-3xl",
        className
      )}
      {...props}
    >
      {children}
    </h2>
  );
}

function H3({ className, children, ...props }: HeadingProps) {
  return (
    <h3
      className={cn(
        "mb-3 mt-6 scroll-mt-24 text-xl font-semibold tracking-tight md:text-2xl",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
}

function H4({ className, children, ...props }: HeadingProps) {
  return (
    <h4
      className={cn(
        "mb-2 mt-4 scroll-mt-24 text-lg font-semibold tracking-tight",
        className
      )}
      {...props}
    >
      {children}
    </h4>
  );
}

// Стилизованный параграф
function P({ className, ...props }: ComponentPropsWithoutRef<"p">) {
  return (
    <p
      className={cn("text-foreground/90 mb-4 leading-relaxed", className)}
      {...props}
    />
  );
}

// Стилизованная ссылка
function A({ className, href = "", ...props }: ComponentPropsWithoutRef<"a">) {
  const isExternal = href.startsWith("http");

  if (isExternal) {
    return (
      <a
        className={cn(
          "text-primary hover:text-primary/80 decoration-primary/30 font-medium underline underline-offset-4 transition-colors",
          className
        )}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      />
    );
  }

  return (
    <Link
      className={cn(
        "text-primary hover:text-primary/80 decoration-primary/30 font-medium underline underline-offset-4 transition-colors",
        className
      )}
      href={href}
      {...props}
    />
  );
}

// Блок кода с подсветкой синтаксиса и кнопкой копирования
function Pre({ className, ...props }: ComponentPropsWithoutRef<"pre">) {
  return <CodeBlock className={className} {...props} />;
}

function Code({ className, ...props }: ComponentPropsWithoutRef<"code">) {
  // Если это inline код (не внутри pre), используем обычный стиль
  // Если это код внутри pre (блок кода), стили применяются через hljs классы
  const isBlockCode =
    className?.includes("language-") || className?.includes("hljs");

  return (
    <code
      className={cn(
        isBlockCode
          ? "block font-mono text-sm" // Блок кода - стили применяются через hljs
          : "bg-muted rounded px-1.5 py-0.5 font-mono text-sm", // Inline код
        className
      )}
      {...props}
    />
  );
}

// Цитаты и блоки
function Blockquote({
  className,
  ...props
}: ComponentPropsWithoutRef<"blockquote">) {
  return (
    <blockquote
      className={cn(
        "border-primary/40 bg-primary/5 hover:bg-primary/10 text-muted-foreground group relative mb-4 overflow-hidden rounded-r-xl border-l-4 pl-4 italic transition-colors duration-300",
        className
      )}
      {...props}
    >
      <div className="from-primary/5 to-primary/10 bg-linear-to-br absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative z-10">{props.children}</div>
    </blockquote>
  );
}

// Списки
function Ul({ className, ...props }: ComponentPropsWithoutRef<"ul">) {
  return (
    <ul className={cn("mb-4 ml-6 list-disc space-y-2", className)} {...props} />
  );
}

function Ol({ className, ...props }: ComponentPropsWithoutRef<"ol">) {
  return (
    <ol
      className={cn("mb-4 ml-6 list-decimal space-y-2", className)}
      {...props}
    />
  );
}

function Li({ className, ...props }: ComponentPropsWithoutRef<"li">) {
  return <li className={cn("leading-relaxed", className)} {...props} />;
}

// Таблицы
function Table({ className, ...props }: ComponentPropsWithoutRef<"table">) {
  return (
    <div className="border-border mb-4 overflow-x-auto rounded-xl border">
      <table
        className={cn("w-full border-collapse text-sm", className)}
        {...props}
      />
    </div>
  );
}

function Thead({ className, ...props }: ComponentPropsWithoutRef<"thead">) {
  return <thead className={cn("", className)} {...props} />;
}

function Tbody({ className, ...props }: ComponentPropsWithoutRef<"tbody">) {
  return <tbody className={cn("", className)} {...props} />;
}

function Tr({ className, ...props }: ComponentPropsWithoutRef<"tr">) {
  return (
    <tr
      className={cn(
        "border-border hover:bg-muted/50 border-b transition-colors",
        className
      )}
      {...props}
    />
  );
}

function Th({ className, ...props }: ComponentPropsWithoutRef<"th">) {
  return (
    <th
      className={cn(
        "border-border bg-primary/5 dark:bg-primary/3 border px-4 py-3 text-left font-semibold",
        className
      )}
      {...props}
    />
  );
}

function Td({ className, ...props }: ComponentPropsWithoutRef<"td">) {
  return (
    <td
      className={cn("border-border border px-4 py-2", className)}
      {...props}
    />
  );
}

// Горизонтальная линия
function Hr({ className, ...props }: ComponentPropsWithoutRef<"hr">) {
  return (
    <hr className={cn("border-border my-8 border-t", className)} {...props} />
  );
}

// Тип для MDX компонентов
type MDXComponentsMap = {
  h1?: typeof H1;
  h2?: typeof H2;
  h3?: typeof H3;
  h4?: typeof H4;
  p?: typeof P;
  a?: typeof A;
  pre?: typeof Pre;
  code?: typeof Code;
  blockquote?: typeof Blockquote;
  ul?: typeof Ul;
  ol?: typeof Ol;
  li?: typeof Li;
  table?: typeof Table;
  thead?: typeof Thead;
  tbody?: typeof Tbody;
  tr?: typeof Tr;
  th?: typeof Th;
  td?: typeof Td;
  hr?: typeof Hr;
};

// Экспорт всех MDX компонентов
export const mdxComponents: MDXComponentsMap = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  p: P,
  a: A,
  pre: Pre,
  code: Code,
  blockquote: Blockquote,
  ul: Ul,
  ol: Ol,
  li: Li,
  table: Table,
  thead: Thead,
  tbody: Tbody,
  tr: Tr,
  th: Th,
  td: Td,
  hr: Hr,
};
