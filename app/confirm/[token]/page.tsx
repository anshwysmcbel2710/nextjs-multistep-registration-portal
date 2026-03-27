// app/confirm/[token]/page.tsx — legacy token links redirect to the open form
import { redirect } from "next/navigation";

export default function ConfirmTokenPage() {
  redirect("/");
}
