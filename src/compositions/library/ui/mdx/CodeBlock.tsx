"use client";

import hljs from "highlight.js";
import { Check, Copy } from "lucide-react";
import {
  type ComponentPropsWithoutRef,
  useEffect,
  useRef,
  useState,
} from "react";

import { cn } from "@/src/shared/lib/utils";
import { Button } from "@/src/shared/ui/Button";

type CodeBlockProps = ComponentPropsWithoutRef<"pre">;

export function CodeBlock({ className, children, ...props }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);
  const codeRef = useRef<HTMLElement | null>(null);

  // Применяем подсветку синтаксиса после монтирования
  useEffect(() => {
    if (preRef.current) {
      const codeElement = preRef.current.querySelector("code");
      if (codeElement && !codeElement.classList.contains("hljs")) {
        codeRef.current = codeElement;
        hljs.highlightElement(codeElement as HTMLElement);
      }
    }
  }, [children]);

  const handleCopy = async () => {
    if (!preRef.current) return;

    // Ищем code элемент внутри pre
    const codeElement = preRef.current.querySelector("code");
    const text = codeElement?.textContent || preRef.current.textContent || "";

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  return (
    <div className="group relative mb-4">
      <pre
        ref={preRef}
        className={cn(
          "bg-muted/50 relative overflow-x-auto rounded-xl border border-white/10 p-4 text-sm backdrop-blur",
          className
        )}
        {...props}
      >
        {/* Кнопка копирования */}
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground absolute right-2 top-2 z-10 h-8 w-8 p-0 opacity-0 transition-opacity group-hover:opacity-100"
          onClick={handleCopy}
          aria-label="Копировать код"
        >
          {copied ? (
            <Check className="text-primary h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>

        {children}
      </pre>
    </div>
  );
}
