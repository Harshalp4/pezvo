export type Article = {
  slug: string; title: string; category: string; image: string; alt: string;
  excerpt: string; service: string; takeaway: string;
  sections: { title: string; body: string }[];
};

export const ARTICLES: Article[] = [
  {
    slug: "dry-cleaning-or-steam-press", title: "Dry cleaning or steam pressing? Start with what your garment needs.",
    category: "Choosing care", image: "/photos/hero-press.jpg", alt: "An iron finishing a garment", service: "Steam Press",
    excerpt: "Cleaning and finishing solve different problems. Here is how to choose your next service.",
    takeaway: "A clean but creased garment may need pressing. A worn or stained garment needs a cleaning assessment first.",
    sections: [
      { title: "First, separate cleaning from finishing", body: "Pressing shapes a garment and smooths creases. It is not a substitute for removing soil, perspiration or stains. If your shirt is freshly washed and simply needs a sharper finish, a pressing service may be appropriate. If it has been worn, tell the team about its condition before choosing a service." },
      { title: "Let the care label lead", body: "The fibre name alone does not determine the right process. Linings, dyes, prints, glued details and trims can change how an item should be treated. Keep the label intact and share any previous shrinking, colour transfer or repairs. A garment marked for professional care needs an assessment, not an experiment with a hotter iron." },
      { title: "Describe the problem when you book", body: "Tell us whether you need crease removal, general cleaning or attention to a particular mark. Mention what caused a stain if you know, and anything already applied to it. Do not iron over a stain while waiting for collection. The team can confirm the suitable process and price after reviewing the garment; not every mark can be completely removed." },
    ],
  },
  {
    slug: "silk-saree-care", title: "A little care between wears goes a long way for a silk saree.",
    category: "Wardrobe care", image: "/gallery/wedding-cream.webp", alt: "Delicate fabric and decorative detailing", service: "Dry Clean",
    excerpt: "From airing to storage, make the next wear easier without taking risks with a special piece.",
    takeaway: "Follow the saree's label and protect its fabric, border and embellishments together.",
    sections: [
      { title: "Give it space after wearing", body: "Before returning a saree to storage, check the neckline, hem and folds for marks and moisture. Let it air in a shaded, ventilated place. Avoid strong sunlight and do not pack a damp garment away. A special piece deserves a few minutes of attention after an occasion, especially if it has been worn outdoors." },
      { title: "Be cautious with spot treatments", body: "A saree can combine silk, metallic threads, dyes and attached decoration. A treatment that suits one part may affect another. Avoid rubbing a spill or trying bleach, perfume or a home stain-removal mixture. Blot a fresh spill gently without spreading it and ask for a professional assessment. Share what spilled and when it happened." },
      { title: "Store without pressure", body: "Use a clean, dry storage space and a breathable cover suitable for the garment. Avoid overpacking and putting heavy items on delicate embroidery. Check stored pieces periodically, especially during humid weather. If the care label is missing or the weave is heirloom or unfamiliar, discuss that with the team before cleaning or pressing." },
    ],
  },
  {
    slug: "monsoon-wardrobe-navi-mumbai", title: "A calmer wardrobe routine for Navi Mumbai's monsoon.",
    category: "Seasonal care", image: "/gallery/dryclean-rack.webp", alt: "Clothes spaced along a garment rail", service: "Home Linen",
    excerpt: "Keep moisture out of storage and give everyday clothes room to dry completely.",
    takeaway: "Only put completely dry clothes and linen into storage, even when they feel almost ready.",
    sections: [
      { title: "Check the wardrobe, not just the clothes", body: "Look for damp walls, musty smells and crowded shelves before changing your laundry routine. Keep garments away from wet surfaces and leave room for air to circulate. A clean garment can pick up odours again if the space it returns to is damp. Address the source of moisture rather than covering it with fragrance." },
      { title: "Do not rush the final drying stage", body: "Cuffs, waistbands, pockets and thick seams may remain damp after the rest of an item feels dry. Check these areas before folding. Give bed linen and towels enough space as well. Avoid leaving damp clothes in a closed bag while waiting for pickup; let the team know about their condition when you arrange collection." },
      { title: "Check occasional-wear pieces too", body: "Inspect stored suits, sarees and wedding outfits during the season. If you find visible mould or persistent mustiness, keep the affected item separate and request an assessment before wearing or treating it. Different fabrics need different care, and cleaning alone cannot resolve a damp storage environment." },
    ],
  },
  {
    slug: "professional-blazer-care", title: "What good blazer care should pay attention to.",
    category: "Wardrobe care", image: "/pricing/blazer.webp", alt: "Tailored blazer with structured lapels", service: "Dry Clean",
    excerpt: "The lapel, lining and shoulder matter just as much as the fabric you see.",
    takeaway: "A blazer is a constructed garment. Preserve its shape as well as its surface.",
    sections: [
      { title: "Look beyond the outer fabric", body: "A blazer may contain a lining, shoulder padding and internal layers that help it hold its shape. Mention loose buttons, damaged seams and previous alterations at collection. Check pockets for receipts, pens and small objects. If it belongs to a matching suit, ask whether both pieces should be assessed together." },
      { title: "Finishing should respect the shape", body: "A sharp finish does not mean flattening every part. Lapels and shoulders have their own structure. Avoid pressing a blazer with high heat at home without following its care instructions. Shine, flattened texture and distortion are reasons to stop and ask for advice rather than make repeated passes with an iron." },
      { title: "Give it a good place to rest", body: "After wearing, use a suitable supportive hanger and leave space around the jacket. Avoid cramming it into a wardrobe while warm or damp. Tell the care team whether your concern is an isolated mark, odour or simply creasing. Inspection determines the process; the appearance of a stain is not a guarantee that it will disappear." },
    ],
  },
  {
    slug: "understanding-garment-pricing", title: "Normal, heavy, specialty: understanding your care quote.",
    category: "Choosing care", image: "/gallery/wedding-embroidery.webp", alt: "Detailed embroidery on occasion wear", service: "Dry Clean",
    excerpt: "Why two garments with the same name can need different handling and pricing.",
    takeaway: "Use the rate card as a starting point. Confirm the exact garment category before approving care.",
    sections: [
      { title: "The item name is only the beginning", body: "Two sarees or blazers can differ in construction, decoration and the amount of handling they need. The catalogue lists variants for some garments so you can see those differences. Do not assume a heavy category is determined only by weight. Ask the team which listed category applies to your piece." },
      { title: "Check the unit beside the price", body: "Garment prices are usually per piece, while other services may use a different unit. Carpet care can be priced by area and sofa care by seat. Read the unit and variant on the rate card rather than comparing starting prices alone. A service-level starting price refers to its lowest-priced listed item, not every garment in that category." },
      { title: "Confirm before care begins", body: "Share details of embroidery, attached accessories, unusual fabric or existing damage when booking. Ask for the item category, quantity, total and expected return time to be confirmed. If a garment needs specialist assessment, wait for that assessment rather than treating an online starting price as a final quote." },
    ],
  },
  {
    slug: "wedding-outfit-aftercare", title: "After the celebration: caring for your wedding outfit.",
    category: "Occasion wear", image: "/gallery/wedding-cream.webp", alt: "Light-coloured occasion fabric", service: "Dry Clean",
    excerpt: "A practical handover checklist for garments with memories, layers and delicate details.",
    takeaway: "Record existing marks and loose details, and discuss the whole outfit before handing it over.",
    sections: [
      { title: "Inspect every part of the outfit", body: "Check hems, underarms and the areas that touched food, makeup or the ground. Count separate pieces such as the blouse, dupatta and removable accessories. Take your own photographs of existing marks or damage and point these out at handover. Good information helps the team understand what needs attention." },
      { title: "Share the details that are easy to miss", body: "Mention glued stones, metallic decoration, hand painting or a missing care label. Keep detachable jewellery and valuables at home. Tell the team about any home treatment already used on a mark. Avoid testing a stain remedy immediately before pickup; delicate decoration and fabric can respond differently." },
      { title: "Plan for care and storage", body: "Ask about the expected turnaround before booking around another event. Specialty care may need longer than a standard order. On return, inspect the outfit, confirm all separate pieces are present and discuss suitable long-term storage. Keep it in a dry space without crushing raised embroidery, and revisit stored garments periodically." },
    ],
  },
];

export const articleMinutes = (article: Article) => Math.max(2, Math.ceil(article.sections.reduce((n, s) => n + s.body.split(/\s+/).length, 0) / 200));
