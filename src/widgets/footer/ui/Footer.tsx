// TODO: Реализовать компонент Footer
// - Добавить информацию о копирайте
// - Добавить ссылки на социальные сети
// - Добавить ссылки на важные страницы

import { Github, Send } from "lucide-react";
import Link from "next/link";

import { ThemeToggle } from "@/src/features/theme-toggle";

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-muted-foreground text-sm">
          © {new Date().getFullYear()} Andival-Sei
        </p>

        <div className="flex items-center gap-4">
          <Link
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link
            href="https://t.me"
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Send className="h-5 w-5" />
            <span className="sr-only">Telegram</span>
          </Link>
          <Link
            href="https://vk.com"
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <div className="flex h-5 w-5 items-center justify-center font-bold">
              VK
            </div>
            <span className="sr-only">VK</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
}
