// components/PhoneInput.tsx

"use client";
import { useState, useEffect } from "react";

const COUNTRY_CODES = [
  { code: "AF", dial: "+93",  name: "Afghanistan" },
  { code: "AL", dial: "+355", name: "Albania" },
  { code: "DZ", dial: "+213", name: "Algeria" },
  { code: "AR", dial: "+54",  name: "Argentina" },
  { code: "AU", dial: "+61",  name: "Australia" },
  { code: "AT", dial: "+43",  name: "Austria" },
  { code: "BD", dial: "+880", name: "Bangladesh" },
  { code: "BE", dial: "+32",  name: "Belgium" },
  { code: "BR", dial: "+55",  name: "Brazil" },
  { code: "CA", dial: "+1",   name: "Canada" },
  { code: "CL", dial: "+56",  name: "Chile" },
  { code: "CN", dial: "+86",  name: "China" },
  { code: "CO", dial: "+57",  name: "Colombia" },
  { code: "HR", dial: "+385", name: "Croatia" },
  { code: "CZ", dial: "+420", name: "Czech Republic" },
  { code: "DK", dial: "+45",  name: "Denmark" },
  { code: "EG", dial: "+20",  name: "Egypt" },
  { code: "FI", dial: "+358", name: "Finland" },
  { code: "FR", dial: "+33",  name: "France" },
  { code: "DE", dial: "+49",  name: "Germany" },
  { code: "GH", dial: "+233", name: "Ghana" },
  { code: "GR", dial: "+30",  name: "Greece" },
  { code: "HK", dial: "+852", name: "Hong Kong" },
  { code: "HU", dial: "+36",  name: "Hungary" },
  { code: "IN", dial: "+91",  name: "India" },
  { code: "ID", dial: "+62",  name: "Indonesia" },
  { code: "IE", dial: "+353", name: "Ireland" },
  { code: "IL", dial: "+972", name: "Israel" },
  { code: "IT", dial: "+39",  name: "Italy" },
  { code: "JP", dial: "+81",  name: "Japan" },
  { code: "JO", dial: "+962", name: "Jordan" },
  { code: "KZ", dial: "+7",   name: "Kazakhstan" },
  { code: "KE", dial: "+254", name: "Kenya" },
  { code: "KW", dial: "+965", name: "Kuwait" },
  { code: "LB", dial: "+961", name: "Lebanon" },
  { code: "MY", dial: "+60",  name: "Malaysia" },
  { code: "MX", dial: "+52",  name: "Mexico" },
  { code: "MA", dial: "+212", name: "Morocco" },
  { code: "NL", dial: "+31",  name: "Netherlands" },
  { code: "NZ", dial: "+64",  name: "New Zealand" },
  { code: "NG", dial: "+234", name: "Nigeria" },
  { code: "NO", dial: "+47",  name: "Norway" },
  { code: "OM", dial: "+968", name: "Oman" },
  { code: "PK", dial: "+92",  name: "Pakistan" },
  { code: "PE", dial: "+51",  name: "Peru" },
  { code: "PH", dial: "+63",  name: "Philippines" },
  { code: "PL", dial: "+48",  name: "Poland" },
  { code: "PT", dial: "+351", name: "Portugal" },
  { code: "QA", dial: "+974", name: "Qatar" },
  { code: "RO", dial: "+40",  name: "Romania" },
  { code: "RU", dial: "+7",   name: "Russia" },
  { code: "SA", dial: "+966", name: "Saudi Arabia" },
  { code: "SG", dial: "+65",  name: "Singapore" },
  { code: "ZA", dial: "+27",  name: "South Africa" },
  { code: "KR", dial: "+82",  name: "South Korea" },
  { code: "ES", dial: "+34",  name: "Spain" },
  { code: "LK", dial: "+94",  name: "Sri Lanka" },
  { code: "SE", dial: "+46",  name: "Sweden" },
  { code: "CH", dial: "+41",  name: "Switzerland" },
  { code: "TW", dial: "+886", name: "Taiwan" },
  { code: "TZ", dial: "+255", name: "Tanzania" },
  { code: "TH", dial: "+66",  name: "Thailand" },
  { code: "TR", dial: "+90",  name: "Turkey" },
  { code: "UG", dial: "+256", name: "Uganda" },
  { code: "UA", dial: "+380", name: "Ukraine" },
  { code: "AE", dial: "+971", name: "United Arab Emirates" },
  { code: "GB", dial: "+44",  name: "United Kingdom" },
  { code: "US", dial: "+1",   name: "United States" },
  { code: "VN", dial: "+84",  name: "Vietnam" },
  { code: "ZM", dial: "+260", name: "Zambia" },
  { code: "ZW", dial: "+263", name: "Zimbabwe" },
];

interface PhoneInputProps {
  value:     string;
  onChange:  (fullNumber: string) => void;
  required?: boolean;
}

export default function PhoneInput({
  value,
  onChange,
  required = false,
}: PhoneInputProps) {
  const [dialCode,    setDialCode]    = useState("+91");
  const [localNumber, setLocalNumber] = useState("");

  // Sync internal state when the parent resets or sets value externally.
  // This makes the component properly controlled.
  useEffect(() => {
    // When value is cleared (e.g. form reset), clear both fields.
    if (!value) {
      setDialCode("+91");
      setLocalNumber("");
      return;
    }

    // Find the longest matching dial code so "+1" doesn't win over "+91".
    const match = COUNTRY_CODES
      .filter(c => value.startsWith(c.dial))
      .sort((a, b) => b.dial.length - a.dial.length)[0];

    if (match) {
      setDialCode(match.dial);
      setLocalNumber(value.slice(match.dial.length).trim());
    }
  }, [value]);

  function handleDialChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const d = e.target.value;
    setDialCode(d);
    onChange(`${d} ${localNumber}`.trim());
  }

  function handleNumberChange(e: React.ChangeEvent<HTMLInputElement>) {
    const n = e.target.value.replace(/[^\d\s\-()]/g, "");
    setLocalNumber(n);
    onChange(`${dialCode} ${n}`.trim());
  }

  return (
    <div className="flex gap-2">
      <select
        value={dialCode}
        onChange={handleDialChange}
        aria-label="Country dial code"
        className="form-input flex-shrink-0"
        style={{ width: "160px" }}
      >
        {COUNTRY_CODES.map(c => (
          <option key={`${c.code}-${c.dial}`} value={c.dial}>
            {c.name} ({c.dial})
          </option>
        ))}
      </select>

      <input
        type="tel"
        value={localNumber}
        onChange={handleNumberChange}
        placeholder="Phone number"
        required={required}
        aria-label="Phone number"
        className="form-input flex-1"
      />
    </div>
  );
}