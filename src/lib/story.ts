import { site } from "./site";

/**
 * The origin story.
 *
 * Every claim here comes from Harshal directly: two years operating as
 * AquaWash, and the press-retention problem that prompted the rebrand. Nothing
 * in this file is invented. Where a number is needed but not yet known, it is
 * marked NEEDS_FIGURE rather than filled with something plausible.
 */

/** Year the business began trading as AquaWash. */
export const FOUNDED_YEAR = 2024;
export const PREVIOUS_NAME = "AquaWash";

export const yearsTrading = () => new Date().getFullYear() - FOUNDED_YEAR;

/**
 * Figures we cannot yet substantiate. Fill these from the orders table and the
 * Google Business Profile, then add them to the stats row in about/page.tsx.
 *
 *   garmentsProcessed — count of OrderItems across all completed orders
 *   customersServed   — distinct users with at least one delivered order
 *   repeatRate        — share of customers with two or more orders
 *
 * Until then the About page shows only figures that are provably true.
 */
export const NEEDS_FIGURE = ["garmentsProcessed", "customersServed", "repeatRate"] as const;

export const STORY = {
  kicker: "Our story",
  lead: "We spent two years",
  accent: "on the wrong problem.",

  opening: `PEZVO is not new. For ${yearsTrading()} years we ran the same vans, the same
    machines and the same team under the name ${PREVIOUS_NAME}. We cleaned well.
    Customers were happy on the day their clothes came back.`,

  turn: `The complaint we kept hearing was never about the clean. It was about the week after.`,

  problem: {
    head: "The problem nobody was solving",
    body: `A shirt comes back pressed and looks perfect. It hangs in the wardrobe for
      five days without being worn. By the time you reach for it, the collar has
      softened, the crease has dropped and the shoulders have slumped. You end up
      ironing a garment you just paid someone else to finish.`,
    line: "People were not asking for a better wash. They were asking for a press that lasts.",
  },

  insight: {
    head: "What we changed",
    body: `Press retention is not decided at the iron. It is decided by how much
      moisture is left in the fabric when it is finished, how the garment is hung
      while it cools, and what it is packed in. Get those three wrong and the
      press starts falling out before the order reaches your door.`,
    line: "So we rebuilt the finishing end of the process, and renamed the company around it.",
  },

  mission:
    "Your clothes should look pressed on the day you wear them — not just on the day they come back.",

  vision:
    "We are not trying to be the biggest cleaner in Navi Mumbai. We are trying to be the one whose work is still visible a week later.",
} as const;

export type Milestone = { year: string; title: string; body: string; done: boolean };

export const MILESTONES: Milestone[] = [
  {
    year: String(FOUNDED_YEAR),
    title: `Started as ${PREVIOUS_NAME}`,
    body: "Doorstep collection across a handful of Navi Mumbai buildings, run out of one unit in Mahape.",
    done: true,
  },
  {
    year: `${FOUNDED_YEAR + 1}`,
    title: "Per-piece pricing",
    body: "Dropped per-kilo entirely. Weight pricing hides what a garment actually costs to treat, and it punishes anyone sending delicate items.",
    done: true,
  },
  {
    year: `${FOUNDED_YEAR + 1}`,
    title: "Finishing rebuilt",
    body: "Controlled moisture at press, cooled on the hanger before packing, sealed in breathable covers. This is the change the rebrand is named after.",
    done: true,
  },
  {
    year: String(FOUNDED_YEAR + 2),
    title: "Became PEZVO",
    body: `Same team, same facility, a new name and an app with OTP handover and six live tracking stages. Now serving ${site.city}.`,
    done: true,
  },
  {
    year: "Next",
    title: "More of the map",
    body: "Expanding street by street rather than all at once, so turnaround never slips while we grow.",
    done: false,
  },
];
