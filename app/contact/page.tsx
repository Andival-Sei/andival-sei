import type { Metadata } from "next";

import { ContactPage } from "@/src/compositions/contact";
import { createPageMetadata } from "@/src/shared/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Связаться",
  description:
    "Свяжитесь со мной для обсуждения проектов, сотрудничества или просто для общения.",
  path: "/contact",
});

export default function Contact() {
  return <ContactPage />;
}
