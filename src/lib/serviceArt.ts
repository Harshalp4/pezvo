/**
 * Maps API service names onto the brand illustration set.
 *
 * The design system forbids emoji in body copy, and the API returns an emoji
 * per service — so we deliberately ignore `service.emoji` and draw from the
 * shipped illustration idiom instead. Unknown services fall back to the
 * dry-clean mark rather than rendering nothing.
 */
const MAP: Record<string, string> = {
  "dry clean": "svc-dryclean",
  "steam press": "svc-steampress",
  "home linen": "svc-homelinen",
  "shoe cleaning": "svc-shoes",
  "leather care": "svc-leather",
  "soft toy cleaning": "svc-softtoy",
  "carpet & sofa": "svc-carpetsofa",
};

export function serviceArt(name: string) {
  const key = name.trim().toLowerCase();
  const file =
    MAP[key] ??
    Object.entries(MAP).find(([k]) => key.includes(k.split(" ")[0]))?.[1] ??
    "svc-dryclean";
  return `/illustrations/${file}.svg`;
}

/** Short, human descriptions. The API's own text is terse and inconsistent. */
export const SERVICE_COPY: Record<string, string> = {
  "Dry Clean": "Suits, sarees and silks — solvent-cleaned by fabric specialists, hand-finished.",
  "Steam Press": "Crease and press for daily wear. No wash, just a sharp finish.",
  "Home Linen": "Blankets, bedsheets, curtains and covers — washed at volume, folded sharp.",
  "Shoe Cleaning": "Deep clean and deodorise, leather to knit. Back in 48 to 72 hours.",
  "Leather Care": "Restoration-grade cleaning and conditioning for jackets and accessories.",
  "Soft Toy Cleaning": "Sanitised wash by size. Safe for the ones that get slept with.",
  "Carpet & Sofa": "Carpets by the square foot, sofa covers by the seat. Collected and returned.",
};

export const serviceCopy = (s: { name: string; description: string | null }) =>
  SERVICE_COPY[s.name] ?? s.description ?? "";
