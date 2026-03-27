// app/confirm/page.tsx — redirect legacy /confirm paths to home
import { redirect } from "next/navigation";

export default function ConfirmIndex() {
  redirect("/");
}
