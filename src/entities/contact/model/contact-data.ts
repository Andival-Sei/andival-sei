import { siteConfig } from "@/src/shared/config/site";

import type { ContactInfo } from "./types";

export const contactInfo: ContactInfo = {
  email: "freedomdragon777@gmail.com",
  location: "Удалённо / Самара",
  socialLinks: {
    github: siteConfig.links.github,
    telegram: siteConfig.links.telegram,
    vk: siteConfig.links.vk,
  },
};
