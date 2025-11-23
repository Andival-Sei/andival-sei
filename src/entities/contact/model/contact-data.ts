// TODO: Заменить заглушки на реальные контактные данные

import { siteConfig } from "@/src/shared/config/site";

import type { ContactInfo } from "./types";

export const contactInfo: ContactInfo = {
  email: "your.email@example.com",
  phone: "+7 (XXX) XXX-XX-XX",
  location: "Moscow, Russia",
  socialLinks: {
    github: siteConfig.links.github,
    telegram: siteConfig.links.telegram,
    vk: siteConfig.links.vk,
  },
};
