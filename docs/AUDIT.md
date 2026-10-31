# Source audit and PEZVO boundary

Inspected 31 October 2026.

The workspace contains legacy static websites, Next.js website versions, an Angular administration frontend, customer and operations Flutter applications, an ECC frontend and the .NET API. `presso-web-v4` is the current marketing frontend. Existing unrelated changes were present across that frontend and the apps/backend; this work was isolated in `pezvo-web` instead of changing them.

## Reused

- Next.js 15.5.18 App Router, React 19, TypeScript, Tailwind, Lucide and existing Framer Motion support.
- `/api/services`, active/check service-zone and store contract types; item-level price overrides and `fromPrice`/`rateRows` helpers.
- Catalogue snapshot dated 8 August 2026. It is presented as indicative when the API is unconfigured/unavailable.
- Callback context, focus-trapped dialog, lead payload (`name`, `phone`, `pincode`, `area`, `service`, `preferredSlot`, `notes`, `source`, `utm`, `hp`) and primary `/api/leads` plus webhook fallback pattern.
- Attribution allowlist, optional Revora plain-text content adapter and enquiry contract.
- Care journal content and genuine testimonial integration (no fabricated review fallback).
- Existing stock ironing footage, catalogue product photography and selected neutral garment-care imagery.

## Redesigned

Homepage and public page presentation, navigation, mobile booking bar, service discovery, price table/filter/search, care process, contact/coverage, gallery, brand metadata, icons and social image. Unused legacy presentation components and old logos, app screenshots, badges and illustrated brand assets were removed from the isolated copy.

Public routes: `/`, `/services`, `/pricing`, `/how-it-works`, `/about`, `/contact`, `/gallery`, `/blog`, six `/blog/[slug]` articles, `/faq`, `/business`, `/book-pickup`, `/privacy`, `/terms`, `/enquire`, `/insights`, optional `/insights/[slug]`, and `/festival/[slug]`. `/ai-booking` now routes to the actual website pickup flow, rather than falsely advertising a PEZVO mobile app. Existing corporate/location/service redirects are retained.

## Transactional boundary

The audited marketing site has no customer authentication, order checkout, payment or account pages. Those features belong to the separate applications. They were not copied, renamed, altered or presented as PEZVO capabilities. A callback request is clearly differentiated from a confirmed booking.

All implicit production API defaults were removed. Production contact details were not fabricated: existing phone/address values were retained; legacy email and social destinations were omitted pending verified PEZVO replacements. New canonical domains and app IDs were not invented. Existing API contracts and internal attribution/app identifiers remain unchanged where needed for compatibility.

No live API mutations, production deployment, test orders or real messages were sent. Default preview submission returns 503 and a call alternative. Mock tests exercise success and failure without transmitting personal information.

The original source's legal-name value was `Presso Enterprises`. PEZVO is used as the website brand; the registered operating entity and legal policies require confirmation before launch. The source does not contain brand-aware account/order tenancy, so sharing production infrastructure needs an explicit backend plan.
