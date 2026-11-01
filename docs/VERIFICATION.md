# Verification — 31 October 2026

- `npm run build`: passed with Next.js 15.5.18; 33 generated static outputs plus the dynamic routes. Includes compiler/type checks.
- `npm run typecheck`: passed after removing unreachable legacy components.
- Five mocked regression suites passed: lead delivery, coverage, attribution, banners and festival policy. No real lead, order, notification or payment was created.
- `node tests/smoke.cjs` against the updated local production build: 20 public route checks passed, including service and pricing filters; 16 media/SEO resources returned 200 (including the new steaming video and poster); expected 400/503 input/unavailable states, 404 and the legacy booking redirect passed.
- Rendered public HTML checked for PRESSO, AquaWash, Laundra, Loander, PRESTIGE, old email/domain branding and empty mail links. No matches.
- Browser inspection at desktop 1440×1000 and mobile 390×844, plus initial narrow 320px view. No horizontal page overflow. No broken loaded images or captured browser warnings/errors in the inspected flow.
- Hero playback correction: hovering/focusing holds auto-rotation without pausing the film. Manually selecting scenes 1 and 2 starts their muted inline videos. The explicit pause button stops both film and rotation; resume restores them. Cancelled play promises from scene changes no longer show an incorrect autoplay-blocked control.
- Browser regression check: scene 1 advanced from 4.84s to 11.27s with the hero hovered and `paused: false`. Scene 2 played after manual selection and advanced from 0.33s to 8.12s on mobile. Pause held the media time at 0.1159s across observations. Scrolling the hero offscreen paused the second video; returning resumed it. Both clips reported readyState 4.
- New 10-second white-shirt steaming clip: complete FFmpeg decode passed, H.264/yuv420p/25 fps, 1440×760, 1,257,983 bytes, no audio. Both MP4s have the `moov` metadata before `mdat` for progressive playback. One active video is mounted at a time.
- Pricing filter + search: Steam Press → shirt returned the existing ₹19 per-piece rate.
- Mobile menu opened and Home navigation closed it correctly.
- Callback dialog opened, accepted synthetic local test details and displayed the honest unavailable-backend message with a phone alternative. It did not claim a completed booking.
- Final mobile refinement accounts for the fixed booking bar in hero height so progress controls remain visible at 390×844.

Screenshots: `screenshots/pezvo-desktop.jpg`, `screenshots/pezvo-homepage-full.jpg`, `screenshots/pezvo-mobile.jpg`.

Updated steaming hero screenshots: `screenshots/pezvo-steaming-desktop.jpg`, `screenshots/pezvo-steaming-mobile.jpg`. Production preview was left running at http://127.0.0.1:3100 as requested. The current pass checked the normal 883px in-app viewport and 390×844 mobile viewport; neither had horizontal overflow or broken loaded images after the server restart.

Not claimed: production booking/payment/account integration, real-device performance scores, exhaustive cross-browser behavior, live current pricing, rights clearance for every supplied image, or collection/delivery video footage. Reduced-motion and swipe handling are implemented; device/OS accessibility testing remains a launch check. Current live-API and enquiry adapters need explicitly approved configuration. The original operating applications and production data were not exercised or modified.

## Earlier white-shirt visibility refinement (superseded below)

- Replaced the extreme close-up with Ron Lach / Pexels 10558368, trimmed to 10 seconds (720×1366, H.264, 1,152,034 bytes, silent, fast-start). Complete FFmpeg decode passed.
- Scene 2 now uses solid PEZVO teal behind the copy and an unshaded portrait panel. The collar, hanger and steamer remain recognizable instead of being enlarged behind a dark gradient. Other scenes retain their full-bleed composition.
- Responsive checks at 1440×900, 883×988, 768×900, 390×844, 375×812 and 320×740: no horizontal overflow; media and heading stay separate. Compact-phone spacing was corrected to keep the CTA clear of the motion controls.
- The film continued playing after scene selection and through viewport changes. The existing pause/visibility behavior remains intact.
- Screenshot evidence: `screenshots/pezvo-clear-shirt-desktop.jpg` and `screenshots/pezvo-clear-shirt-mobile.jpg`.

## Matching full-background hero revision

- Removed the scene-2-only portrait panel and all showcase layout overrides. All four slides now share the same full-background composition, type scale, overlay, copy spacing and controls.
- Replaced the portrait clip with Ron Lach / Pexels 10558374, a wider view of the shirt, hanger and steamer. Trimmed to 12 seconds; mirrored so the shirt sits to the right of the copy. H.264, 1440×760, 25 fps, yuv420p, silent, fast-start, 1,122,539 bytes. Matching WebP poster. Full FFmpeg decode passed.
- Browser checks at 1440×900, 883×988, 768×844, 390×844, 375×844 and 320×844: full video coverage, no horizontal overflow, and action buttons remain clear of motion controls (at least 22px in the narrow checks).
- Scene 2 remains a real playing video: readyState 4, paused false, and media time advancing after manual selection and across viewport changes. Playback/rotation pause logic was preserved.
- Production build, typecheck, all five existing mocked test suites, and the production smoke check (20 routes, 16 assets/SEO resources) passed.
- Screenshot evidence: `screenshots/pezvo-full-background-desktop.jpg` and `screenshots/pezvo-full-background-mobile.jpg`.

## Shoe-care hero and supplied gold-droplet logo

- Added a shoe-cleaning film as scene 3; the carousel now has five scenes. All share the same full-background layout. The progress grid follows the scene count, with at least 44px touch targets at the checked 320px width.
- The supplied PNG is preserved byte for byte. Its lossless WebP is used in the header and footer; the social preview and organization metadata use the new logo too. Responsive image sizes select a small logo resource instead of downloading the full artwork for navigation.
- Complete shoe-video decode passed: 10 seconds, 1440×810, H.264/yuv420p, 25 fps, silent, 1,112,298 bytes. The `moov` metadata precedes `mdat` for progressive playback.
- Browser checks at 1440×900, 390×844 and 320×740 found no horizontal overflow. The film reported readyState 4 and paused false; playback advanced from 3.43s to 7.20s, continued across viewport changes and looped. Five scene controls remained available. The shoe-care CTA opened the Shoe Cleaning service filter.
- Production build and all five existing mocked suites passed. Production smoke checks passed for 20 routes and 18 media/SEO resources, including the new logo, film and poster.
- Production preview screenshots: `screenshots/pezvo-shoe-care-desktop.jpg` and `screenshots/pezvo-shoe-care-mobile.jpg`.

## Product visibility refinement

- Replaced white-on-white steaming footage with a sage collared shirt against a neutral wall. Replaced the large-hand/black-shoe footage with a brown-leather finishing sequence. Desktop media remains full-bleed, with a soft offset for the shirt to keep its collar and body beside the copy.
- Reduced the headline scale and copy width; the dark gradient is concentrated behind the left-side text and fades to clear on the product side. The serif accent and PEZVO palette are retained. Mobile uses a wider 4:3 view of the footage above the copy with a feathered lower edge, plus a scene-specific focal position.
- Checked all five scenes at 320×740 and 768×900: no horizontal overflow or CTA/control overlap; the minimum measured gap was 22px. Also inspected the garment and shoe films at 1440×900 and 390×844. Motion buttons are now 44×44px on mobile as well as desktop. The headline accent uses balanced line breaks to avoid a single trailing word.
- New films decoded completely with FFmpeg. Garment: 12 seconds, 1440×760, 939,211 bytes. Shoe: 8 seconds, 1440×810, 2,260,821 bytes. Both use H.264/yuv420p, 25 fps, no audio and fast-start metadata.
- Production build and five existing mocked suites passed. Updated production smoke checks passed for 20 routes and 18 media/SEO resources. Playback is still limited to the active slide; pause, visibility and reduced-motion behavior is preserved.
- Screenshot evidence: `screenshots/pezvo-visible-garment-desktop.jpg`, `screenshots/pezvo-visible-garment-mobile.jpg`, `screenshots/pezvo-visible-shoe-desktop.jpg` and `screenshots/pezvo-visible-shoe-mobile.jpg`.

## Visual pricing catalogue — 2026-10-31

- Replaced the text-only table with item photography, names, rates and pickup buttons; all 40 existing rates and the per-piece / square-foot / seat units remain supplied by `rateRows`.
- Added a PEZVO editorial photo header, visual desktop service selector, mobile service dropdown, search, result count and empty-state recovery. Filters preserve the selected service in the URL; existing service links remain supported.
- Reused the existing product imagery under `public/pricing/` (provenance in its `CREDITS.md`); no new image generation or external images required. Images illustrate garment types.
- Browser checks: seven service filters plus All returned 13 / 6 / 1 / 1 / 3 / 2 / 40 after the initial 14-item Dry Clean view. All-service saree search returned nine variants. Empty search recovered via View all services. Shoe pickup opened the existing callback modal with Shoe Cleaning selected; no request was submitted.
- Checked at 1440, 390 and 320 pixel widths: no horizontal overflow, long names wrap, and mobile item pickup targets are at least 46px high. Specialist services use a larger card; standard categories use a responsive grid.
- Production build and existing mocked test suites passed. Preview remains on port 3100.

## Droplet identity and logo motion — 2026-10-31

- Kept the supplied full-logo PNG/WebP unchanged. The CSS isolation region contains gold pixels only, with no teal lettering; duplicate decorative artwork is hidden from accessibility APIs.
- Added a single arrival lift/ripple and a hover/keyboard-focus replay. Browser inspection confirmed the arrival animation has one iteration, settles at zero translation, and keyboard focus switches to the replay animation. Reduced-motion CSS disables both the emblem and ripple animations; OS preference emulation was not performed.
- Replaced old star accents in active page components, the atelier wall sign, delivery bag/uniform and both favicon/Apple icon outputs. All active source references use versioned droplet image paths; old artwork is retained only as unused source history.
- Production build (including type checks), five existing mocked suites and smoke checks passed: 20 public routes and 18 media/SEO resources. No real enquiry was submitted.
- Inspected desktop at 1440px and mobile at 390px and 320px. No horizontal overflow; header logo widths are 178px desktop / 137px mobile, footer 200px desktop. Updated atelier/delivery images and footer logo loaded successfully. Keyboard focus remains visible.
- Screenshots: `screenshots/pezvo-droplet-desktop.jpg` and `screenshots/pezvo-droplet-mobile.jpg`.

## Bulk and commercial enquiries — 2026-11-01

- Added a shared PEZVO-styled enquiry form to Contact and Business. Contact retains direct phone, WhatsApp, location and the existing personal-pickup callback; Business preselects Commercial care.
- Captures enquiry type, name, Indian mobile number, organisation (required for commercial care), optional email, service, location and requirements/quantity/frequency. Values are preserved when editing the review.
- Uses the existing PEZVO WhatsApp destination. The form validates and prepares a review; only the customer's Continue to WhatsApp link opens the draft, and the customer must send it there. No inbox/API is configured for this form and it never claims an enquiry was sent. No form values are saved in browser storage.
- Checked empty-field errors, accessible labels, first-error focus, commercial organisation requirement, +91 phone normalization, review details, editing and encoded punctuation/rupee symbols. Synthetic test data only; no WhatsApp link was opened and no message was sent.
- Inspected layouts at 1440px, 1204px, 390px and 320px. No horizontal overflow in inspected form/review states. Phone inputs use 16px text; the narrow radio targets remain at least 49px tall. Review heading focus is visible below the fixed header.
- Production build/type checks passed. Existing tests plus the new validation/complete-draft suite passed; local production smoke checks passed for 20 public routes and 18 media/SEO resources.
- Screenshots: `screenshots/pezvo-commercial-desktop.jpg` and `screenshots/pezvo-commercial-mobile.jpg`.

## Contact layout follow-up — 2026-11-01

- Restored the original contact introduction, phone/WhatsApp/address layout and “One less thing on your list” callback panel. The bulk/commercial form now follows the complete contact section in a separate, centred container, before service coverage.
- Checked at 1440px, 768px, 390px and 320px: the form follows the contact section at every width, with no horizontal overflow. Phone fields use one column and the section has a 58px gap below the callback panel.
- Confirmed the restored callback button opens the existing pickup dialog. No request or WhatsApp message was sent.
- Production build, including type checks, passed. Screenshot: `screenshots/pezvo-contact-stacked-mobile.jpg`.
