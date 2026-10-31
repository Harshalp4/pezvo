# PEZVO deployment

This repository contains the standalone Next.js marketing website. Backend,
administration and mobile applications are separate projects and are not deployed
by these instructions.

## Build and run

```sh
npm ci
npm test
npm run build
npm run start
```

The start script serves the production build on port 3100. Use a hosting platform
that supports Next.js server routes; a static-only host cannot run the enquiry
and coverage endpoints. Do not run a development server and a build against the
same `.next` directory simultaneously.

## Environment

Use `.env.example` as the configuration reference. Keep real credentials in the
hosting provider's environment settings or an ignored local environment file.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Verified PEZVO canonical origin. Blank keeps the preview out of search engines. |
| `NEXT_PUBLIC_PEZVO_API_BASE_URL` | Approved API implementing the existing service, service-zone, store and lead contracts. |
| `PEZVO_LEAD_WEBHOOK_URL` | Optional server-only fallback for enquiry delivery. |
| `NEXT_PUBLIC_CONTACT_EMAIL` and social/app URL variables | Verified PEZVO contact and profile destinations. |
| `REVORA_*` | Optional content/enquiry integration; leave blank unless configured. |

With no API configured, the website displays its catalogue snapshot and clearly
reports live coverage and enquiry submission as unavailable. It does not claim
that a booking was completed. The enquiry form requests a callback; it is not a
customer account, checkout or payment flow.

## Before publishing

- Confirm PEZVO's domain, business contact details, current rates, coverage and legal policies.
- Configure and test the approved backend and/or enquiry fallback in a test environment.
- If sharing an existing business backend, implement brand/tenant isolation server-side. Attribution fields alone do not provide tenancy.
- Review media credits in `docs/ASSETS.md`. Stock footage and generated brand concepts are illustrative rather than records of PEZVO premises or staff.
- Run the build and check the homepage, pricing, services and enquiry error/success states on desktop and mobile.

Pushing this repository does not deploy the website or apply database migrations.
