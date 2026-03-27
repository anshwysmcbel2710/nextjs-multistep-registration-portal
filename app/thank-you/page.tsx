// Server component — exports metadata, renders the animated client component
import type { Metadata } from "next";
import ThankYouContent from "./ThankYouContent";

export const metadata: Metadata = {
  title: "Thank You | EEC Confirmation",
  description: "Your participation has been confirmed.",
};

export default function ThankYouPage() {
  return <ThankYouContent />;
}