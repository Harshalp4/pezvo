/**
 * Shapes mirrored from PEZVO.API/Application/DTOs/**.
 * Verified against the live API — do not guess these.
 */

export type ApiResponse<T> = {
  success: boolean;
  message: string | null;
  data: T | null;
  errors: string[] | null;
};

/** PEZVO.API/Application/DTOs/Service/ServiceDto.cs */
export type GarmentType = {
  id: string;
  name: string;
  emoji: string | null;
  priceOverride: number | null;
  sortOrder: number;
};

export type ServiceTreatment = {
  id: string;
  name: string;
  description: string | null;
  priceMultiplier: number;
  sortOrder: number;
};

export type Service = {
  id: string;
  name: string;
  description: string | null;
  category: string;
  pricePerPiece: number;
  iconUrl: string | null;
  emoji: string | null;
  sortOrder: number;
  garmentTypes: GarmentType[];
  treatments: ServiceTreatment[];
};

/** PEZVO.API/Application/DTOs/Admin — ServiceZoneDto */
export type ServiceZone = {
  id: string;
  name: string;
  pincode: string;
  city: string | null;
  area: string | null;
  description: string | null;
  isActive: boolean;
  sortOrder: number;
  assignedStoreId: string | null;
  assignedStoreName: string | null;
  createdAt: string;
  updatedAt: string;
};

/** ServiceZoneCheckResponse */
export type ZoneCheck = {
  serviceable: boolean;
  name: string | null;
  message: string;
};

/** PEZVO.API/Application/DTOs/Store — StoreLocationDto */
export type Store = {
  id: string;
  name: string;
  addressLine1: string | null;
  addressLine2: string | null;
  city: string | null;
  state: string | null;
  pincode: string | null;
  latitude: number;
  longitude: number;
  phone: string | null;
  email: string | null;
  googleMapsUrl: string | null;
  openTime: string | null;
  closeTime: string | null;
  isOpenSunday: boolean;
  serviceRadiusKm: number;
  isActive: boolean;
  isHeadquarters: boolean;
};

/** A per-piece rate-card row, flattened for display. */
export type RateRow = { name: string; price: number };

/** PEZVO.API/Application/DTOs/Testimonial */
export type Testimonial = {
  id: string;
  author: string;
  area: string | null;
  service: string | null;
  quote: string;
  rating: number;
  source: string | null;
  sourceUrl: string | null;
  isPublished: boolean;
  sortOrder: number;
  createdAt: string;
};

export type TestimonialSummary = { count: number; averageRating: number };

/** The payload the callback modal submits. */
export type LeadPayload = {
  name: string;
  phone: string;
  pincode?: string;
  area?: string;
  service?: string;
  preferredSlot?: string;
  notes?: string;
  source?: string;
  utm?: string;
  /** Honeypot — must stay empty. */
  hp?: string;
};
