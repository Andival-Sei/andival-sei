// TODO: Реализовать навигационное меню
// - Добавить ссылки на страницы
// - Добавить активное состояние
// - Сделать адаптивным (мобильное меню)
// - Добавить плавную прокрутку

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/src/shared/lib/utils";

const navItems = [
  { href: "/", label: "Главная" },
  { href: "/projects", label: "Проекты" },
  { href: "/about", label: "Обо мне" },
  { href: "/lab", label: "Lab" },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center space-x-6">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "hover:text-primary text-sm font-medium transition-colors",
              isActive ? "text-foreground" : "text-muted-foreground"
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
