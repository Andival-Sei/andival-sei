// Типы для сущности Contact

export interface ContactInfo {
  email: string;
  phone?: string;
  location?: string;
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    // TODO: Добавить другие социальные сети
  };
}

