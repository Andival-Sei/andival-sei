// TODO: Реализовать компонент Footer
// - Добавить информацию о копирайте
// - Добавить ссылки на социальные сети
// - Добавить ссылки на важные страницы

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        {/* TODO: Добавить контент футера */}
        <p className="text-muted-foreground text-sm">
          © {new Date().getFullYear()} Portfolio. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
