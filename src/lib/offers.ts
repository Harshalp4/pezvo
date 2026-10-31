/**
 * Content constants for the first-visit welcome celebration.
 * Mirrors the offer shown in the customer app's welcome popup.
 */
export const WELCOME_OFFER = {
  code: "WELCOME150",
  amountOff: 150,
  minOrder: 299,
  headline: "Welcome to PEZVO",
  sub: "Fresh Clothes. Happy You.",
  get line() {
    return `₹${this.amountOff} off your first pickup — min order ₹${this.minOrder}.`;
  },
} as const;

/** localStorage key guarding the once-per-browser rule. */
export const WELCOME_STORAGE_KEY = "presso_welcomed";
