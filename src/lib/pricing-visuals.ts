/** Existing PEZVO catalogue imagery; prices continue to come from the service API. */
const ITEM_PHOTOS: Array<[RegExp, string]> = [
  [/saree.*diamond/i, "saree-diamond"],
  [/saree.*navvari/i, "saree-navvari"],
  [/saree.*heavy/i, "saree-heavy"],
  [/saree/i, "saree-normal"],
  [/(lehenga|gown|anarkali).*heavy/i, "lehenga-heavy"],
  [/lehenga|gown|anarkali/i, "lehenga"],
  [/blouse|top/i, "blouse"],
  [/sherwani/i, "sherwani"],
  [/\btie\b/i, "tie"],
  [/blazer/i, "blazer"],
  [/jeans/i, "jeans"],
  [/pant|trouser/i, "pant"],
  [/shirt|kids/i, "shirt"],
  [/blanket/i, "blanket"],
  [/bedsheet/i, "bedsheet"],
  [/curtain/i, "curtain"],
  [/pillow/i, "pillow"],
  [/shoe/i, "shoes"],
  [/leather/i, "leather"],
  [/soft toy/i, "soft-toy"],
  [/carpet/i, "carpet"],
  [/sofa/i, "sofa"],
];

export const SERVICE_VISUALS: Record<string, { photo: string; description: string }> = {
  "Dry Clean": { photo: "blazer", description: "Thoughtful cleaning for everyday favourites and occasion pieces." },
  "Steam Press": { photo: "shirt", description: "A crisp collar. A considered crease. Beautifully ready to wear." },
  "Home Linen": { photo: "bedsheet", description: "Fresh sheets, softer layers and a little more comfort at home." },
  "Shoe Cleaning": { photo: "shoes", description: "A fresh start for the pairs that take you everywhere." },
  "Leather Care": { photo: "leather", description: "Considered care for your leather favourites." },
  "Soft Toy Cleaning": { photo: "soft-toy", description: "A little extra care for well-loved companions." },
  "Carpet & Sofa": { photo: "sofa", description: "Care for the textures and fabrics that make a house your home." },
};

export function pricingPhoto(name: string): string | null {
  const photo = ITEM_PHOTOS.find(([pattern]) => pattern.test(name))?.[1];
  return photo ? `/pricing/${photo}.webp` : null;
}

export function pricingUnit(name: string) {
  return /sq\s*ft/i.test(name) ? "sq ft" : /seat/i.test(name) ? "seat" : "piece";
}
