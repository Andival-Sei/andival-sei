/**
 * Утилита для объединения CSS классов
 * @param classes - Массив классов или объектов с условиями
 * @returns Объединенная строка классов
 */
export default function classNames(
  ...classes: (string | undefined | null | false | Record<string, boolean>)[]
): string {
  return classes
    .filter(Boolean)
    .map((cls) => {
      if (typeof cls === 'string') {
        return cls;
      }
      if (typeof cls === 'object' && cls !== null) {
        return Object.entries(cls)
          .filter(([, condition]) => condition)
          .map(([key]) => key)
          .join(' ');
      }
      return '';
    })
    .filter(Boolean)
    .join(' ');
}
