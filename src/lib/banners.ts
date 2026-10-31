/**
 * Promo banners for the website surface.
 *
 * Kept free of imports on purpose: tests/banners.cjs transpiles this file on
 * its own and runs it in a bare VM, the same way tests/attribution.cjs does.
 * Image and video URLs are short-lived signed URLs — fetch them per page
 * session and never persist them.
 */
export type Banner = {
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
  slot: string;
  startDate: string | null;
  endDate: string | null;
  version: number;
};

export type BannerEventType = "view" | "click";
export type BannerViewport = "desktop" | "mobile";
export type BannerLink = { href: string; external: boolean };

const BASE = (process.env.NEXT_PUBLIC_PEZVO_API_BASE_URL || "").replace(/\/$/, "");
const SURFACE = "web";
const STORAGE_PREFIX = "presso_banner_hidden";

/** Desktop prefers the wide (3:1) crop; mobile the square-ish (2:1) one. Each falls back to the other. */
export function pickBannerImage(banner: Pick<Banner, "imageUrl" | "wideImageUrl">, viewport: BannerViewport): string | null {
  const wide = banner.wideImageUrl || null;
  const standard = banner.imageUrl || null;
  return viewport === "desktop" ? wide || standard : standard || wide;
}

function bareHost(hostname: string): string {
  return hostname.toLowerCase().replace(/^www\./, "");
}

/**
 * The website only follows explicit https URLs. App routes (`route`) and
 * `none` have no meaning here, and anything that is not https:// (javascript:,
 * http:, relative paths) is refused rather than trusted from the CMS.
 */
export function bannerLink(banner: Pick<Banner, "actionType" | "actionValue">, siteUrl: string): BannerLink | null {
  if (banner.actionType !== "url") return null;
  const value = (banner.actionValue || "").trim();
  if (!value.startsWith("https://")) return null;
  try {
    const target = new URL(value);
    if (target.protocol !== "https:") return null;
    let external = true;
    try {
      external = bareHost(target.hostname) !== bareHost(new URL(siteUrl).hostname);
    } catch {
      /* unknown site URL — treat as external */
    }
    return { href: target.toString(), external };
  } catch {
    return null;
  }
}

/** Dismissal is per banner *version*, so an edited banner shows again. */
export function bannerStorageKey(banner: Pick<Banner, "id" | "version">): string {
  return `${STORAGE_PREFIX}_${banner.id}_v${banner.version}`;
}

export function isBannerHidden(banner: Pick<Banner, "id" | "version">): boolean {
  try {
    return window.sessionStorage.getItem(bannerStorageKey(banner)) === "1";
  } catch {
    return false;
  }
}

export function hideBanner(banner: Pick<Banner, "id" | "version">): void {
  try {
    window.sessionStorage.setItem(bannerStorageKey(banner), "1");
  } catch {
    /* storage blocked — the strip still hides for this render */
  }
}

/** Live banners for the website, already ordered by the API. Never cached. */
export async function fetchWebBanners(): Promise<Banner[]> {
  try {
    const res = await fetch(`${BASE}/api/banners?surface=${SURFACE}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) return [];
    const body = (await res.json()) as { success?: boolean; data?: Banner[] | null };
    if (!body?.success || !Array.isArray(body.data)) return [];
    return body.data.filter((b) => b && typeof b.id === "string" && typeof b.title === "string");
  } catch {
    return [];
  }
}

/** Fire-and-forget impression/click counter. Carries no personal data. */
export function postBannerEvent(bannerId: string, type: BannerEventType): void {
  try {
    void fetch(`${BASE}/api/banners/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ events: [{ bannerId, type, count: 1, surface: SURFACE }] }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    /* ignore — analytics must never break the page */
  }
}
