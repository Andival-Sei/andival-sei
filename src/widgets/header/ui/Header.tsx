// TODO: Реализовать компонент Header
// - Добавить логотип/название
// - Добавить навигационное меню
// - Добавить переключатель темы
// - Сделать адаптивным (мобильное меню)

import Link from "next/link";

import { Navigation } from "@/src/features/navigation";
import { Button } from "@/src/shared/ui/Button";

export function Header() {
  return (
    <header className="bg-background/80 sticky top-0 z-50 w-full backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 text-xl font-bold tracking-tight">
          <Link
            href="/"
            className="text-foreground hover:text-primary transition-colors"
          >
            Andival-Sei
          </Link>
        </div>

        <div className="hidden md:flex">
          <Navigation />
        </div>

        <div className="flex items-center gap-4">
          <Button
            asChild
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium"
          >
            <Link href="/contact">Связаться</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
