/** PEZVO presentation configuration. No production backend or domain is assumed. */
export const site = {
  name: "PEZVO", legalName: "PEZVO", promise: "Freshness, Delivered.",
  tagline: "Premium Laundry & Dry Cleaning",
  description: "Thoughtful laundry, specialist dry cleaning and precision finishing for the clothes you love. Discover PEZVO garment care and doorstep pickup in Navi Mumbai.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3100",
  phone: "+918828676480", phoneDisplay: "+91 88286 76480",
  phoneAlt: "+919326954087", phoneAltDisplay: "+91 93269 54087", whatsapp: "918828676480",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
  address: { line1: "Shop No. 02", line2: "Kukshet Gaon, Plot No. 232, Sector 14", locality: "Nerul (W)", city: "Navi Mumbai", pincode: "400706", get full() { return `${this.line1}, ${this.line2}, ${this.locality}, ${this.city} ${this.pincode}`; } },
  hours: { open: "09:00", close: "21:00", display: "9am–9pm, every day" },
  callbackMinutes: 15, turnaroundHours: 48, city: "Navi Mumbai", state: "Maharashtra", country: "IN",
  social: { instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "", facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || "", linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || "" },
  playStore: process.env.NEXT_PUBLIC_PLAY_STORE_URL || "/book-pickup", appStore: process.env.NEXT_PUBLIC_APP_STORE_URL || "/book-pickup",
} as const;
export const whatsappLink = (message: string) => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
export const NAV_LINKS = [{ href: "/services", label: "Our services" }, { href: "/how-it-works", label: "How it works" }, { href: "/pricing", label: "Pricing" }, { href: "/about", label: "Our story" }, { href: "/contact", label: "Contact" }] as const;
