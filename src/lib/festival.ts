/**
 * Festive mode for the website surface.
 *
 * Kept free of imports on purpose: tests/festival.cjs transpiles this file on
 * its own and runs it in a bare VM, the same way tests/banners.cjs does. The
 * banner image URLs inside are short-lived signed URLs — fetch per page
 * session and never persist them.
 */
export type FestivalSkin = "none" | "ganeshotsav" | "navratri" | "diwali" | "christmas" | "holi" | "generic";
export type ReadyByKey = "standard" | "specialty" | "express";

export type FestivalBanner = {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string | null;
  wideImageUrl: string | null;
  mediaType: "image" | "video";
  videoUrl: string | null;
  emoji: string | null;
  gradientStart: string;
  gradientEnd: string;
  actionType: "route" | "url" | "none";
  actionValue: string | null;
  version: number;
};

export type ReadyByRow = {
  key: ReadyByKey;
  label: string;
  hours: number;
  /** ISO instant */
  bookByUtc: string;
  /** Pre-formatted for display, e.g. "Thu 10 Sep, 8:00 am" */
  bookByIst: string;
  passed: boolean;
};

export type FestivalPromo = {
  code: string;
  title: string;
  type: "FlatDiscount" | "PercentDiscount" | string;
  value: number;
  minOrderAmount: number;
  maxDiscountAmount: number | null;
  expiresAt: string | null;
  newCustomersOnly: boolean;
};

export type Festival = {
  active: boolean;
  skin: FestivalSkin;
  name: string;
  /** yyyy-MM-dd, IST */
  date: string | null;
  startDate: string | null;
  slug: string;
  ribbonText: string;
  headline: string;
  subline: string;
  tips: string[];
  banner: FestivalBanner | null;
  /** Text-free hero backgrounds (desktop ~1920×900 with a dark left side; mobile ~1080×1080). Optional. */
  heroImageUrl?: string | null;
  heroImageMobileUrl?: string | null;
  /** Admin-set festive clip for the hero background; the site's care film is used when absent. */
  heroVideoUrl?: string | null;
  readyBy: ReadyByRow[];
  lastPickupUtc: string | null;
  promo: FestivalPromo | null;
  generatedAt: string;
};

export type HeroImagePick = {
  src: string | null;
  /** False when the only artwork is the promo banner, which already carries its own headline. */
  showCopy: boolean;
};

export type CountdownParts = { days: number; hours: number; minutes: number; passed: boolean };
export type SkinPalette = { a: string; b: string; c: string };

const BASE = (process.env.NEXT_PUBLIC_PEZVO_API_BASE_URL || "").replace(/\/$/, "");
const STORAGE_PREFIX = "presso_festival_ribbon_hidden";
/** The site's existing care film, the hero background outside festive mode too. */
export const DEFAULT_HERO_VIDEO = "/photos/hero-press.mp4";
const IST_OFFSET = "+05:30";

const PALETTES: Record<string, SkinPalette> = {
  ganeshotsav: { a: "#c2410c", b: "#f59e0b", c: "#7a1f1f" },
  navratri: { a: "#be185d", b: "#f97316", c: "#facc15" },
  diwali: { a: "#7c2d12", b: "#d4a017", c: "#1e1b4b" },
  christmas: { a: "#0f4c3a", b: "#b91c1c", c: "#d4a017" },
  holi: { a: "#db2777", b: "#2563eb", c: "#eab308" },
  generic: { a: "#0c409f", b: "#34a625", c: "#f59e0b" },
};

/** Brand-adjacent colours per skin. Anything unknown (including "none") falls back to the generic set. */
export function skinPalette(skin: string | null | undefined): SkinPalette {
  const key = (skin || "").toLowerCase();
  return PALETTES[key] ?? PALETTES.generic;
}

/**
 * The API's `active` flag is the source of truth, guarded by the festival's
 * own calendar so a 60-second server cache can never show the campaign
 * outside its window on the client.
 */
export function isFestivalOn(f: Festival | null | undefined, nowIso: string): boolean {
  if (!f || !f.active) return false;
  const now = Date.parse(nowIso);
  if (Number.isNaN(now)) return false;
  if (f.startDate) {
    const start = Date.parse(`${f.startDate}T00:00:00${IST_OFFSET}`);
    if (!Number.isNaN(start) && now < start) return false;
  }
  if (f.date) {
    const end = Date.parse(`${f.date}T23:59:59${IST_OFFSET}`);
    if (!Number.isNaN(end) && now > end) return false;
  }
  return true;
}

/** The requested row, else standard, else the first row the API sent. */
export function pickReadyBy(f: Pick<Festival, "readyBy"> | null | undefined, key: string): ReadyByRow | null {
  const rows = Array.isArray(f?.readyBy) ? f!.readyBy : [];
  if (!rows.length) return null;
  return rows.find((r) => r.key === key) ?? rows.find((r) => r.key === "standard") ?? rows[0];
}

export function countdownParts(targetIso: string | null | undefined, nowIso: string): CountdownParts {
  const target = Date.parse(targetIso || "");
  const now = Date.parse(nowIso);
  if (Number.isNaN(target) || Number.isNaN(now) || target <= now) {
    return { days: 0, hours: 0, minutes: 0, passed: true };
  }
  const diff = target - now;
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const minutes = Math.floor((diff % 3_600_000) / 60_000);
  return { days, hours, minutes, passed: false };
}

/** "3 d 11 h 42 m" — the day part is dropped once it reaches zero. */
export function formatCountdown(parts: CountdownParts): string {
  if (parts.passed) return "";
  const bits: string[] = [];
  if (parts.days > 0) bits.push(`${parts.days} d`);
  bits.push(`${parts.hours} h`, `${parts.minutes} m`);
  return bits.join(" ");
}

/** "Sat, 12 Sept, 8:00 am" → "Sat, 12 Sept" for the narrow sticky bar. */
export function shortBookBy(bookByIst: string): string {
  const parts = (bookByIst || "").split(",").map((p) => p.trim()).filter(Boolean);
  return parts.slice(0, 2).join(", ");
}

/** Dismissal is per festival campaign, so next year's campaign shows again. */
export function ribbonStorageKey(f: Pick<Festival, "slug" | "date" | "skin">): string {
  const id = (f.slug || f.skin || "festival").toLowerCase().replace(/[^a-z0-9-]/g, "");
  return `${STORAGE_PREFIX}_${id}_${f.date || "open"}`;
}

export function isRibbonHidden(f: Pick<Festival, "slug" | "date" | "skin">): boolean {
  try {
    return window.sessionStorage.getItem(ribbonStorageKey(f)) === "1";
  } catch {
    return false;
  }
}

export function hideRibbon(f: Pick<Festival, "slug" | "date" | "skin">): void {
  try {
    window.sessionStorage.setItem(ribbonStorageKey(f), "1");
  } catch {
    /* storage blocked — the ribbon still hides for this render */
  }
}

/**
 * Background for the festive hero. Prefers the text-free hero images (mobile
 * falls back to desktop and vice versa); only when neither exists does it fall
 * back to the promo banner artwork, and then the HTML headline/subline must
 * stay hidden because that artwork already carries its own text.
 */
export function pickHeroImage(
  f: Pick<Festival, "heroImageUrl" | "heroImageMobileUrl" | "banner"> | null | undefined,
  isMobile: boolean,
): HeroImagePick {
  const desktop = f?.heroImageUrl || null;
  const mobile = f?.heroImageMobileUrl || null;
  if (desktop || mobile) {
    return { src: isMobile ? mobile || desktop : desktop || mobile, showCopy: true };
  }
  const banner = f?.banner ?? null;
  const fallback = banner ? banner.wideImageUrl || banner.imageUrl || null : null;
  return { src: fallback, showCopy: !fallback };
}

/** Festive hero clip: the admin-set video, else the site's care film. */
export function pickHeroVideo(f: Pick<Festival, "heroVideoUrl"> | null | undefined): string {
  const url = typeof f?.heroVideoUrl === "string" ? f.heroVideoUrl.trim() : "";
  return url || DEFAULT_HERO_VIDEO;
}

/** Badge copy for the offer sheet: "FLAT ₹150 OFF" or "10% OFF up to ₹200". */
export function promoBadge(promo: Pick<FestivalPromo, "type" | "value" | "maxDiscountAmount">): string {
  if (promo.type === "PercentDiscount") {
    const cap = promo.maxDiscountAmount && promo.maxDiscountAmount > 0 ? ` up to ₹${promo.maxDiscountAmount}` : "";
    return `${promo.value}% OFF${cap}`;
  }
  return `FLAT ₹${promo.value} OFF`;
}

/** Calendar date in IST, e.g. "14 Sept 2026". Empty when the input is missing or unparsable. */
export function istDate(iso: string | null | undefined): string {
  const t = Date.parse(iso || "");
  if (Number.isNaN(t)) return "";
  try {
    return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Kolkata" }).format(new Date(t));
  } catch {
    return new Date(t).toISOString().slice(0, 10);
  }
}

/** Carry the visitor's campaign labels onto an internal link. `campaign` is the string readCampaign() returns. */
export function withCampaign(href: string, campaign: string): string {
  const labels = (campaign || "").replace(/^\?/, "");
  if (!labels) return href;
  const [pathAndQuery, hash] = href.split("#");
  const joiner = pathAndQuery.includes("?") ? "&" : "?";
  return `${pathAndQuery}${joiner}${labels}${hash ? `#${hash}` : ""}`;
}

/** The live festival, cached 60 s server-side. Never cached here; null on any failure so the site falls back to normal. */
export async function fetchFestival(): Promise<Festival | null> {
  try {
    const res = await fetch(`${BASE}/api/festival`, { headers: { Accept: "application/json" }, cache: "no-store" });
    if (!res.ok) return null;
    const body = (await res.json()) as { success?: boolean; data?: Festival | null };
    const f = body?.success ? body.data : null;
    if (!f || typeof f.active !== "boolean" || typeof f.name !== "string") return null;
    return {
      ...f,
      tips: Array.isArray(f.tips) ? f.tips.filter((t) => typeof t === "string" && t.trim()) : [],
      readyBy: Array.isArray(f.readyBy) ? f.readyBy.filter((r) => r && typeof r.key === "string") : [],
      banner: f.banner && typeof f.banner.id === "string" ? f.banner : null,
      heroImageUrl: typeof f.heroImageUrl === "string" && f.heroImageUrl ? f.heroImageUrl : null,
      heroImageMobileUrl: typeof f.heroImageMobileUrl === "string" && f.heroImageMobileUrl ? f.heroImageMobileUrl : null,
      heroVideoUrl: typeof f.heroVideoUrl === "string" && f.heroVideoUrl.trim() ? f.heroVideoUrl : null,
      promo: f.promo && typeof f.promo.code === "string" ? f.promo : null,
    };
  } catch {
    return null;
  }
}
