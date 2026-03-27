// app/thank-you/page.tsx
import Link from "next/link";

export const metadata = {
  title: "Thank You | EEC Confirmation",
};

export default function ThankYouPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-xl w-full text-center bg-white rounded-2xl shadow-lg p-12 border border-gray-100">
        {/* Success icon */}
        <div className="mx-auto mb-6 flex items-center justify-center w-20 h-20 rounded-full bg-green-50 border-2 border-green-200">
          <svg
            className="w-10 h-10 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-extrabold text-gray-900 mb-3">
          Confirmation Submitted!
        </h1>

        <p className="text-gray-600 text-base mb-2">
          Thank you for confirming your participation.
        </p>
        <p className="text-gray-500 text-sm mb-8">
          An acknowledgment email has been sent to the email address you
          provided. Please check your inbox (and spam folder, just in case).
        </p>

        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-800">
          If you have any questions, please reach out to the event organiser
          directly.
        </div>
      </div>
    </div>
  );
}
