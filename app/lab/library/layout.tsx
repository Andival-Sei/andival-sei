import { ReactNode } from "react";

import { LibraryLayout } from "@/src/compositions/library";

export default function LibraryBaseLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <LibraryLayout>{children}</LibraryLayout>;
}
