// Общие типы для всего приложения

// TODO: Добавить общие типы по необходимости
// - ApiResponse<T>
// - PaginationParams
// - FormState
// - и т.д.

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

