import Form from "@/components/Form";

export const metadata = {
  title: "University Participation Form | EEC Event",
  description: "Submit your university's participation details for the EEC Event.",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Form />
    </div>
  );
}
