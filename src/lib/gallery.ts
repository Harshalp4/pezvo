/**
 * Gallery content.
 *
 * TWO DELIBERATELY SEPARATE COLLECTIONS — do not merge them.
 *
 * `CARE_SHOTS` is illustrative: licensed photography showing the kind of work
 * each service covers. It is captioned as such and never implies a specific
 * garment passed through PEZVO.
 *
 * `BEFORE_AFTER` is evidence: a garment PEZVO actually cleaned, photographed
 * at intake and again at packing. It carries a much stronger claim, so it may
 * only ever contain real PEZVO work. It ships empty on purpose. Filling it
 * with stock photography would be fabricating results.
 *
 * To add a real pair: shoot the same garment, same angle, same light, at intake
 * and at packing; drop both into public/gallery/pairs/; add an entry below. The
 * /gallery page reveals the before/after section automatically once any exist.
 */

export const CATEGORIES = [
  { id: "all", label: "Everything" },
  { id: "dryclean", label: "Dry Clean" },
  { id: "steampress", label: "Steam Press" },
  { id: "linen", label: "Home Linen" },
  { id: "shoes", label: "Shoe Care" },
  { id: "leather", label: "Leather" },
  { id: "wedding", label: "Wedding & Ethnic" },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]["id"];

export type CareShot = {
  src: string;
  alt: string;
  caption: string;
  category: Exclude<CategoryId, "all">;
  /** Portrait images span two rows in the masonry grid. */
  tall?: boolean;
};

export const CARE_SHOTS: CareShot[] = [
  {
    src: "/gallery/dryclean-covers.webp",
    alt: "Cleaned shirts hanging in protective covers on a conveyor",
    caption: "Sealed in covers after quality check",
    category: "dryclean",
  },
  {
    src: "/gallery/dryclean-rack.webp",
    alt: "A rail of freshly pressed shirts",
    caption: "Pressed and rehung, ready to return",
    category: "dryclean",
  },
  {
    src: "/gallery/press-iron.webp",
    alt: "A steam iron pressing blue fabric",
    caption: "Hand-finished pressing, fabric by fabric",
    category: "steampress",
  },
  {
    src: "/gallery/press-board.webp",
    alt: "A steam iron resting on an ironing board",
    caption: "Steam press — no wash, just a sharp finish",
    category: "steampress",
    tall: true,
  },
  {
    src: "/gallery/press-studio.webp",
    alt: "A steam iron photographed against a dark background",
    caption: "The tool behind every crease",
    category: "steampress",
  },
  {
    src: "/pricing/bedsheet.webp",
    alt: "Bed linen showing its fabric and finish",
    caption: "Fresh care for sheets and bed linen",
    category: "linen",
  },
  {
    src: "/gallery/shoes-care.webp",
    alt: "White trainers beside a shoe brush, cleaner and shoe trees",
    caption: "Deep clean and deodorise, leather to knit",
    category: "shoes",
  },
  {
    src: "/gallery/shoes-white.webp",
    alt: "A cleaned white trainer",
    caption: "Back to white, back in 48 hours",
    category: "shoes",
    tall: true,
  },
  {
    src: "/gallery/leather-stitch.webp",
    alt: "Close-up of black leather with visible stitching",
    caption: "Restoration-grade cleaning and conditioning",
    category: "leather",
  },
  {
    src: "/gallery/wedding-embroidery.webp",
    alt: "Close-up of blue silk with gold embroidery",
    caption: "Embellished work, handled by specialists",
    category: "wedding",
  },
  {
    src: "/gallery/wedding-cream.webp",
    alt: "Close-up of cream fabric with beaded embroidery",
    caption: "Beadwork and zari, cleaned without loss",
    category: "wedding",
    tall: true,
  },
];

export type BeforeAfterPair = {
  before: string;
  after: string;
  alt: string;
  caption: string;
  category: Exclude<CategoryId, "all">;
};

/**
 * EMPTY BY DESIGN. See the note at the top of this file — only real PEZVO work
 * belongs here. The page hides the section entirely while this is empty.
 */
export const BEFORE_AFTER: BeforeAfterPair[] = [];

export const hasPairs = () => BEFORE_AFTER.length > 0;
