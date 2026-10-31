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
