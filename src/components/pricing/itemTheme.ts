/**
 * Colour and variant handling for rate-card tiles.
 *
 * The first pass drew every glyph in one blue on one pale-blue disc, and drew
 * the identical shape for Saree (Normal / Heavy / Diamond / Navvari). Forty-three
 * tiles that all look alike are no more scannable than the price list they
 * replaced, so:
 *
 *   1. each service gets its own colour pair, drawn only from the brand blue and
 *      green ramps — no invented hues;
 *   2. variants get a drawn modifier, so Heavy, Diamond and Navvari differ on
 *      the tile rather than only in the label.
 */

export type Tone = { fg: string; accent: string; bg: string; ring: string };

/** Keyed by service name. Blue ramp for garments, green for soft goods. */
const SERVICE_TONES: Record<string, Tone> = {
  "Dry Clean": { fg: "#073D4B", accent: "#147B80", bg: "#EFF7F6", ring: "#DCEEEF" },
  "Steam Press": { fg: "#167482", accent: "#073D4B", bg: "#F2F6FF", ring: "#DCEEEF" },
  "Home Linen": { fg: "#136B73", accent: "#073D4B", bg: "#F0F8F5", ring: "#DDF1EF" },
  "Shoe Cleaning": { fg: "#0B5360", accent: "#55CBD0", bg: "#EEF0FF", ring: "#DCEEEF" },
  "Leather Care": { fg: "#002E3C", accent: "#55CBD0", bg: "#DCEEEF", ring: "#A5DDE0" },
  "Soft Toy Cleaning": { fg: "#249DA5", accent: "#073D4B", bg: "#F0F8F5", ring: "#DDF1EF" },
  "Carpet & Sofa": { fg: "#063540", accent: "#147B80", bg: "#EEF0FF", ring: "#A5DDE0" },
};

const FALLBACK: Tone = { fg: "#073D4B", accent: "#147B80", bg: "#EFF7F6", ring: "#DCEEEF" };

export const toneFor = (serviceName: string): Tone => SERVICE_TONES[serviceName] ?? FALLBACK;

export type Variant =
  | "heavy"
  | "diamond"
  | "navvari"
  | "roll"
  | "single"
  | "double"
  | "small"
  | "large"
  | "kids"
  | null;

/** Reads the qualifier out of "Saree (Diamond)" etc. */
export function variantOf(name: string): Variant {
  const n = name.toLowerCase();
  if (/roll\s*press/.test(n)) return "roll";
  if (/diamond/.test(n)) return "diamond";
  if (/navvari/.test(n)) return "navvari";
  if (/heavy/.test(n)) return "heavy";
  if (/double/.test(n)) return "double";
  if (/single/.test(n)) return "single";
  if (/\(small\)/.test(n)) return "small";
  if (/\(large\)/.test(n)) return "large";
  if (/kids/.test(n)) return "kids";
  return null;
}

/** "Saree (Diamond)" → { base: "Saree", qualifier: "Diamond" } */
export function splitName(name: string): { base: string; qualifier: string | null } {
  const m = name.match(/^(.*?)\s*\(([^)]+)\)\s*$/);
  if (!m) return { base: name.trim(), qualifier: null };
  return { base: m[1].trim(), qualifier: m[2].trim() };
}
