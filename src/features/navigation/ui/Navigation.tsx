// TODO: Реализовать навигационное меню
// - Добавить ссылки на страницы
// - Добавить активное состояние
// - Сделать адаптивным (мобильное меню)
// - Добавить плавную прокрутку

import Link from "next/link";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export function Navigation() {
  return (
    <nav className="flex items-center space-x-6">
      {/* TODO: Добавить активное состояние для текущей страницы */}
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="hover:text-foreground/80 text-sm font-medium transition-colors"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
