export const zipRegex = /^\d{5}$/;
export const nameCityRegex = /^[A-Za-z.' -]+$/;
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const PHONE_RULES: Record<string, { digits: number; example: string }> = {
  "1": { digits: 10, example: "+11234567890" },
  "44": { digits: 10, example: "+441234567890" },
  "61": { digits: 9, example: "+61123456789" },
  "91": { digits: 10, example: "+911234567890" },
  "92": { digits: 10, example: "+921234567890" },
  "966": { digits: 9, example: "+966123456789" },
  "971": { digits: 9, example: "+971123456789" },
};

export const getPhoneError = (value: string, required = false) => {
  const normalized = value.replace(/[\s()-]/g, "");

  if (!normalized) return required ? "Phone number is required." : "";
  if (!normalized.startsWith("+") || !/^\+\d+$/.test(normalized)) {
    return "Use phone number with country code, for example +921234567890.";
  }

  const digits = normalized.slice(1);
  const matchedCode = Object.keys(PHONE_RULES)
    .sort((firstCode, secondCode) => secondCode.length - firstCode.length)
    .find((code) => digits.startsWith(code));

  if (!matchedCode) {
    return `Unsupported country code. Use one of: ${Object.keys(PHONE_RULES)
      .map((code) => `+${code}`)
      .join(", ")}.`;
  }

  const nationalNumber = digits.slice(matchedCode.length);
  const rule = PHONE_RULES[matchedCode];

  if (nationalNumber.length !== rule.digits) {
    return `For +${matchedCode}, number must have exactly ${rule.digits} digits after country code. Example: ${rule.example}`;
  }

  return "";
};
