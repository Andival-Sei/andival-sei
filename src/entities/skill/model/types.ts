// Типы для сущности Skill

export interface Skill {
  id: string;
  name: string;
  category: "frontend" | "backend" | "tools" | "other";
  level?: "beginner" | "intermediate" | "advanced" | "expert";
  // TODO: Добавить дополнительные поля по необходимости
  // - icon?: string
  // - yearsOfExperience?: number
}
