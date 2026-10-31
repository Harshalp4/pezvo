/**
 * The operation flow.
 *
 * Lives here rather than in the Process component because server pages
 * (how-it-works, its HowTo JSON-LD) need the raw array — a server component
 * importing a value from a "use client" module receives a client reference,
 * not the data.
 *
 * Six steps, matching the six live stages the app exposes, so the website and
 * the app describe the same operation.
 */
export const STEPS = [
  {
    art: "step-1-pickup",
    title: "Doorstep Pickup",
    body: "A rider collects at your slot and verifies with an OTP.",
    tint: "bg-blue-50",
  },
  {
    art: "step-2-inspection",
    title: "Garment Inspection",
    body: "Every piece checked for fabric, stains and care labels.",
    tint: "bg-green-50",
  },
  {
    art: "step-tagging",
    title: "Tagging & Sorting",
    body: "Each item tagged to your order and sorted by process.",
    tint: "bg-surface-lavender",
  },
  {
    art: "step-3-processing",
    title: "Processing",
    body: "Cleaned by fabric-specific process, then hand-finished pressing.",
    tint: "bg-blue-50",
  },
  {
    art: "step-4-packaging",
    title: "Packaging",
    body: "Quality-checked and sealed in protective covers.",
    tint: "bg-green-50",
  },
  {
    art: "step-5-delivery",
    title: "Delivery",
    body: "Back to your door in 48 hours, OTP-verified once more.",
    tint: "bg-surface-lavender",
  },
] as const;
