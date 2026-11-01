export const enquiryTypes = ["Bulk order", "Commercial care"] as const;
export const enquiryServices = ["Laundry & dry cleaning", "Uniform care", "Linen & towels", "Carpet & upholstery", "Multiple services / not sure"] as const;

export type BusinessEnquiry = {
  type: typeof enquiryTypes[number];
  name: string;
  phone: string;
  company: string;
  email: string;
  service: string;
  area: string;
  requirements: string;
};
export type EnquiryErrors = Partial<Record<keyof BusinessEnquiry, string>>;

export function normalizeEnquiryPhone(value: string): string {
  const digits = value.replace(/\D/g, "");
  return digits.length === 12 && digits.startsWith("91") ? digits.slice(2) : digits;
}

export function validateBusinessEnquiry(value: BusinessEnquiry): EnquiryErrors {
  const errors: EnquiryErrors = {};
  if (!enquiryTypes.includes(value.type)) errors.type = "Choose your enquiry type.";
  if (!value.name.trim() || value.name.trim().length > 120) errors.name = "Enter your name (up to 120 characters).";
  if (!/^\d{10}$/.test(normalizeEnquiryPhone(value.phone))) errors.phone = "Enter a 10-digit Indian mobile number.";
  if (value.type === "Commercial care" && !value.company.trim()) errors.company = "Enter your business or organisation name.";
  if (value.company.trim().length > 160) errors.company = "Keep the name under 160 characters.";
  if (value.email.trim() && (value.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email.trim()))) errors.email = "Enter a valid email address, or leave it blank.";
  if (!(enquiryServices as readonly string[]).includes(value.service)) errors.service = "Choose the care you need.";
  if (!value.area.trim() || value.area.trim().length > 160) errors.area = "Enter your area or city (up to 160 characters).";
  if (!value.requirements.trim() || value.requirements.trim().length > 1500) errors.requirements = "Tell us about your items and approximate quantity (up to 1,500 characters).";
  return errors;
}

/** A customer reviews this draft, then chooses to send it in WhatsApp. */
export function businessEnquiryMessage(value: BusinessEnquiry): string {
  return [
    `Hello PEZVO, I have a ${value.type === "Commercial care" ? "commercial care" : "bulk order"} enquiry.`,
    "",
    `Name: ${value.name.trim()}`,
    `Phone: +91 ${normalizeEnquiryPhone(value.phone)}`,
    ...(value.company.trim() ? [`Business / organisation: ${value.company.trim()}`] : []),
    ...(value.email.trim() ? [`Email: ${value.email.trim()}`] : []),
    `Care needed: ${value.service}`,
    `Location: ${value.area.trim()}`,
    "",
    "Requirements:",
    value.requirements.trim(),
    "",
    "Please contact me to discuss availability and a quote.",
  ].join("\n");
}
