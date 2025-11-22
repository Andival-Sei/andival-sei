// TODO: Реализовать компонент Header
// - Добавить логотип/название
// - Добавить навигационное меню
// - Добавить переключатель темы
// - Сделать адаптивным (мобильное меню)

import { Navigation } from '@/src/features/navigation';
import { ThemeToggle } from '@/src/features/theme-toggle';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        {/* TODO: Добавить логотип */}
        <div className="mr-4 flex">Portfolio</div>
        
        <Navigation />
        
        <div className="flex flex-1 items-center justify-end space-x-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

