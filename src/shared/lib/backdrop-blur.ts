/**
 * Утилита для применения эффекта размытия (backdrop-filter)
 * Проверяет поддержку браузером и применяет эффект размытия
 */

/**
 * Проверяет, поддерживает ли браузер backdrop-filter
 */
export const supportsBackdropFilter = (): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }

  // Проверяем поддержку через CSS.supports
  if (typeof CSS !== 'undefined' && CSS.supports) {
    return (
      CSS.supports('backdrop-filter', 'blur(1px)') ||
      CSS.supports('-webkit-backdrop-filter', 'blur(1px)')
    );
  }

  // Fallback проверка
  const testElement = document.createElement('div');
  testElement.style.cssText = 'backdrop-filter: blur(1px); -webkit-backdrop-filter: blur(1px);';
  // Используем индексацию через строку для webkit префиксного свойства (TypeScript не знает о нем)
  return (
    !!testElement.style.backdropFilter ||
    !!(testElement.style as unknown as Record<string, string>)['webkitBackdropFilter']
  );
};

/**
 * Применяет эффект размытия к элементу
 */
export const applyBackdropBlur = (
  element: HTMLElement | null,
  blurValue: string = '40px',
  saturateValue: string = '180%'
): void => {
  if (!element || !supportsBackdropFilter()) {
    return;
  }

  // Применяем backdrop-filter напрямую через style
  const backdropFilterValue = `blur(${blurValue}) saturate(${saturateValue})`;
  element.style.backdropFilter = backdropFilterValue;
  // Используем индексацию через строку для webkit префиксного свойства (TypeScript не знает о нем)
  (element.style as unknown as Record<string, string>)['webkitBackdropFilter'] =
    backdropFilterValue;
};
