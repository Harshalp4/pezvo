import { site } from "./site";

/**
 * Answers are written to be quotable verbatim — an answer engine should be able
 * to lift one sentence and be correct. Keep them factual and specific; these are
 * also emitted as FAQPage JSON-LD and mirrored into /llms.txt.
 */
export const FAQS = [
  {
    q: "How long does PEZVO take?",
    a: `Standard orders return within ${site.turnaroundHours} hours. Specialty care — leather, carpets, soft toys and wedding wear — can take up to 72 hours.`,
  },
  {
    q: "How is pricing calculated?",
    a: "Per piece, never per kilo. Every item has a fixed rate you can see before you book, and the final price is confirmed at doorstep inspection.",
  },
  {
    q: "Which areas does PEZVO serve?",
    a: "Kharghar and Belapur (400706), Nerul and Seawoods (400705), and Vashi (400614), all in Navi Mumbai. More areas open every month — leave your number and we'll tell you when we reach you.",
  },
  {
    q: "When do I pay?",
    a: "Never before pickup. An agent confirms the price on the call, and you pay after collection. There is no online checkout on this website.",
  },
  {
    q: "What if I'm not happy with the result?",
    a: "We collect the garment again and re-clean it at no cost. That is the re-clean guarantee.",
  },
  {
    q: "Is the handover secure?",
    a: "Both pickup and delivery are OTP-verified, and you can watch all six stages of the order live in the PEZVO app.",
  },
  {
    q: "Can I cancel a pickup?",
    a: "Yes — call or message us any time before the rider is dispatched, and there is no charge.",
  },
  {
    q: "Do you wash clothes by weight?",
    a: "No. PEZVO is per-piece only. There is no per-kg laundry option, because weight-based pricing hides what each garment actually costs to treat.",
  },
] as const;
