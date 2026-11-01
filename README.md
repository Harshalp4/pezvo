# PEZVO — Freshness, Delivered.

PEZVO's premium laundry and dry-cleaning website, built with Next.js 15.5.18, React 19 and TypeScript. This repository contains the standalone marketing website, its media, configuration templates and tests.

## Run locally

```sh
git clone https://github.com/Harshalp4/pezvo.git
cd pezvo
npm ci
npm run dev
```

Open http://localhost:3100. Dependencies and build output are not committed. If an existing local workspace uses a `node_modules` symlink, remove that symlink with `unlink node_modules` before running `npm ci`.

```sh
npm run typecheck
npm run test
npm run build
npm run start
```

Do not run development and a production build against the same `.next` directory concurrently.

## Implemented

- Exact supplied PEZVO raster wordmark and icon, consistent teal/aqua/ivory identity, favicon, Apple icon, metadata, social preview, sitemap and search-engine brief.
- Four-scene hero: licensed ironing and white-shirt steaming videos plus two photographic scenes, with progress, manual controls, touch navigation, visibility pause, blocked-playback poster fallback and reduced-motion support. Hover/focus holds slide rotation while the active film keeps playing; the explicit pause control stops both.
- Original homepage, services, searchable item-level pricing, care process, story, contact/coverage, gallery, business, FAQ and pickup pages.
- Journal articles, optional content/enquiry integration, festive route and legacy redirects retained in the new shell.
- Real existing catalogue identifiers and price calculations preserved. No invented reviews, ratings, subscriptions or new checkout.
- PEZVO versions of the supplied boutique and delivery photos. Gallery identifies these as brand concepts, not photographs of actual premises.
- Existing lead payload and fallback delivery behavior preserved with explicit PEZVO configuration. Input validation, unavailable-system errors and mocked delivery regression checks added.

## Configuration and launch

Copy `.env.example` to `.env.local` and set only approved PEZVO destinations. There is deliberately no default production API or invented brand domain.

- `NEXT_PUBLIC_PEZVO_API_BASE_URL`: brand-approved API origin implementing the existing public API contract. Blank displays the existing catalogue snapshot; pickup submission and live coverage checks return truthful unavailable responses.
- `NEXT_PUBLIC_SITE_URL`: verified canonical origin. Blank keeps the preview out of search engines.
- `PEZVO_LEAD_WEBHOOK_URL`: optional server-only fallback for lead delivery.
- Contact email, social and app-store links are optional. Legacy brand profiles are not shown. Phone numbers and street address were retained from the source business configuration.
- Revora variables retain their existing contracts and remain unconfigured in this isolated project.

Before launch: confirm the operator/legal policies, phone/address ownership for PEZVO, rates/coverage, production domain and separate backend routing. If sharing the existing backend, implement brand/tenant isolation server-side first. The preserved lead API does not itself enforce brand tenancy; its `source` field is attribution, not isolation. No customer accounts, orders, payment configuration, production database or live deployment were changed.

Use the existing Next-compatible deployment pipeline for this project after configuration and approval. `npm run build` produces `.next`. Do not overwrite the existing deployment. No hosting or production deployment was performed here.

## Remaining media

Scenes 1 and 2 use real ironing and white-shirt steaming footage. Scenes 3 and 4 use supplied/edited collection and delivery photos. `docs/ASSETS.md` includes source credits, encoding details and two remaining video prompts with integration paths. No paid video generation was started.

See `docs/AUDIT.md` and `docs/VERIFICATION.md` for the audit and checks.

### Bulk and commercial enquiries

`BusinessEnquiryForm` on `/contact` and `/business` prepares a structured WhatsApp draft to the existing PEZVO number in `src/lib/site.ts`. Visitors validate their details, review them and choose **Continue to WhatsApp**, then send in WhatsApp. This flow does not use the pickup lead endpoint, email delivery or browser storage, and does not report delivery before the customer sends the draft. `/business` selects commercial care and requires an organisation name. Validation and message-preservation checks run with `npm test`.
