import type {
  ApiResponse,
  Service,
  ServiceZone,
  Store,
  Testimonial,
  TestimonialSummary,
  ZoneCheck,
} from "./types";
import { FALLBACK_SERVICES, FALLBACK_ZONES, FALLBACK_STORES } from "./pricing.fallback";

const BASE = (process.env.NEXT_PUBLIC_PEZVO_API_BASE_URL || "").replace(/\/$/, "");

/** ISR window for catalogue data. Prices change rarely; an hour is plenty. */
const REVALIDATE = 3600;

/**
 * The API runs on Render's free tier, which sleeps. A cold start can take
 * 30–50s, which would hang a build. We cap the wait and fall back instead —
 * a page built from the local mirror beats a page that fails to build.
 */
const TIMEOUT_MS = 12_000;

async function get<T>(path: string, revalidate = REVALIDATE): Promise<T | null> {
  if (!BASE) return null;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(`${BASE}${path}`, {
      signal: controller.signal,
      headers: { Accept: "application/json" },
      next: { revalidate },
    });
    if (!res.ok) return null;
    const body = (await res.json()) as ApiResponse<T>;
    return body?.success ? (body.data ?? null) : null;
  } catch {
    // Unreachable, timed out, or malformed — callers substitute the mirror.
    return null;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Live per-piece catalogue. Falls back to the committed mirror so pricing
 * pages render even when the API is asleep or down.
 */
export async function getServices(): Promise<{ services: Service[]; live: boolean }> {
  const data = await get<Service[]>("/api/services");
  if (data && data.length) return { services: data, live: true };
  return { services: FALLBACK_SERVICES, live: false };
}

/** Active coverage zones — the truthful source for area chips. */
export async function getZones(): Promise<{ zones: ServiceZone[]; live: boolean }> {
  const data = await get<ServiceZone[]>("/api/service-zones/active");
  if (data && data.length) return { zones: data, live: true };
  return { zones: FALLBACK_ZONES, live: false };
}

export async function getStores(): Promise<{ stores: Store[]; live: boolean }> {
  const data = await get<Store[]>("/api/stores");
  if (data && data.length) return { stores: data, live: true };
  return { stores: FALLBACK_STORES, live: false };
}

export async function getConfig(): Promise<Record<string, string>> {
  return (await get<Record<string, string>>("/api/config")) ?? {};
}

/**
 * Published customer testimonials.
 *
 * There is deliberately NO fallback list. If the API returns nothing, the site
 * shows no testimonials at all — an empty section is honest, invented quotes
 * are not. The three placeholder quotes that used to live here were written by
 * me during the build and have been removed.
 */
export async function getTestimonials(): Promise<Testimonial[]> {
  return (await get<Testimonial[]>("/api/testimonials")) ?? [];
}

/**
 * Aggregate rating, computed by the API from published testimonials only.
 * Returns null when there is nothing to back a rating — callers must then not
 * print one, and must not emit aggregateRating structured data.
 */
export async function getRating(): Promise<TestimonialSummary | null> {
  const s = await get<TestimonialSummary>("/api/testimonials/summary");
  return s && s.count > 0 ? s : null;
}

/**
 * Client-side pincode check. Called from the browser, so no ISR — and the
 * backend answers a malformed pincode with HTTP 400 whose body is still a
 * well-formed ApiResponse, which is why we read the body regardless of status.
 */
export async function checkPincode(pincode: string): Promise<ZoneCheck> {
  const trimmed = pincode.trim();
  if (!/^\d{6}$/.test(trimmed)) {
    return { serviceable: false, name: null, message: "Enter a valid 6-digit pincode." };
  }
  try {
    const res = await fetch(`/api/coverage?pincode=${trimmed}`, { cache: "no-store" });
    const body = await res.json();
    if (body && typeof body.serviceable === "boolean") return body;
  } catch { /* Show the honest unavailable state below. */ }
  return { serviceable: false, name: null, message: "Live availability is unavailable. Please call our team to confirm your area." };
}

/** Flatten a service into per-piece rate rows for the rate card. */
export function rateRows(service: Service) {
  if (!service.garmentTypes?.length) {
    return [{ name: service.name, price: service.pricePerPiece }];
  }
  return service.garmentTypes
    .slice()
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((g) => ({ name: g.name, price: g.priceOverride ?? service.pricePerPiece }));
}

/** Cheapest per-piece price across a service, for "from ₹X". */
export function fromPrice(service: Service) {
  const rows = rateRows(service);
  return rows.reduce((min, r) => Math.min(min, r.price), Number.POSITIVE_INFINITY);
}
