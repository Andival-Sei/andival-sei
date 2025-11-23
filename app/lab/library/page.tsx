import { redirect } from "next/navigation";

import { LIBRARY_BASE_PATH } from "@/src/compositions/library";

export default function LibraryRedirectPage() {
  redirect(`${LIBRARY_BASE_PATH}/main`);
}
