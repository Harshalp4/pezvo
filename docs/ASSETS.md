# PEZVO asset mapping

## Used assets

| Website asset | Source | Use |
|---|---|---|
| `public/brand/pezvo-logo.webp` / `.png` | Existing `logo/pezvo-wave-2026-10-31/pezvo-wave-primary.png` | Exact matching raster wordmark, header/footer/social image |
| `public/brand/pezvo-icon.webp` / `.png` | Existing wave icon | Compact icon, favicon/Apple icon |
| `public/photos/hero-press.mp4` / `.jpg` | Existing source site; cottonbro studio / Pexels 5901661 | Scene 1, 12-second muted MP4, 1.78 MB, matching poster |
| `public/media/shirt-steaming-portrait.mp4` / `.webp` | Ron Lach / [Pexels 10558368](https://www.pexels.com/video/a-person-using-a-steamer-on-a-white-t-shirt-10558368/) | Scene 2, 10-second muted portrait steaming video, 1.15 MB, matching poster |
| `public/media/blazer-care.webp` | User image 5 | Dry cleaning |
| `public/media/doorstep-care.webp` | User image 6 | Scene 3 collection |
| `public/media/pezvo-delivery.webp` | Built-in imagegen edit of user image 7 | Scene 4, packaging and closing section |
| `public/media/pezvo-atelier.webp` | Built-in imagegen edit of user image 3 | Introduction, story and gallery |
| `public/media/precision-press.webp` | User image 4 | Steam ironing and care process |

The supplied “Laundra” webpage was a layout reference, not a deployed asset. PRESTIGE and Loander branding was replaced in the two edited photographs. No other-brand reference photo is displayed. The copied media PNG originals are retained in `docs/source-assets`; web delivery uses optimized WebP files. Logo artwork remains raster, not an editable vector.

The source video credit is retained in `public/photos/hero-press-source.txt`. Frames at 0/3/6/9 seconds were reviewed; no legacy brand mark is visible. It is illustrative stock footage, not footage of the business’s staff or premises. Final publishing should reconfirm usage rights for supplied reference imagery.

The second film shows a white T-shirt being steamed on a hanger, with the adult operator cropped to their hands and torso. Downloaded 31 October 2026 under the [Pexels license](https://www.pexels.com/license/), which permits website use and editing. Source credit and encoding details are retained in `public/media/shirt-steaming-portrait-source.txt`. The 49 MB original was trimmed to 00:23–00:33 and encoded to 720×1366 H.264, 25 fps, yuv420p with fast-start metadata and no audio. The portrait shot replaces the former extreme close-up (`white-shirt-steaming.*`, retained as an earlier iteration). A separate, unshaded video panel preserves the shirt neckline, hanger and steamer; the text sits on solid PEZVO teal. Mobile layout keeps the video beside the heading and the description/buttons underneath. It is illustrative stock footage, not PEZVO operations. No paid generation was used.

## Image generation — built-in tool

Boutique prompt: “Image 1 is the edit target, a premium garment-care boutique. Image 2 is the exact PEZVO logo reference. Replace all PRESTIGE DRY CLEANERS branding on the wall sign and staff apron with PEZVO branding. Use the exact teal/aqua PEZVO wordmark from image 2 on the wall, with a small ‘Freshness, Delivered.’ tagline. Apron may show simple small PEZVO text. Preserve the room, white clothes, rail, staff person, pose, architectural lighting, camera angle and photographic style. No other brand names or added labels. Deliver the edited square photograph, not a comparison.”

Delivery prompt: “Image 1 is the edit target, doorstep laundry delivery. Image 2 is the PEZVO brand reference. Replace the recycling symbol and Loander lettering on the laundry bag with the PEZVO teal/aqua wordmark and small ‘Freshness, Delivered.’ tagline from image 2, naturally printed on the textile with folds and perspective. Add a small discreet PEZVO mark on the executive’s white polo. Preserve people, faces, hands, pose, laundry, room, lighting and wide 16:9 photographic composition. Remove all other brand names. No collage, no labels, no added text elsewhere. Deliver the single edited wide photo.”

## Pending genuine video assets

The hero now has two videos and two photos. Collection and delivery remain photographic scenes. The carousel supports the missing clips without another UI redesign: add an optional `video` path to the corresponding object in `src/lib/hero-scenes.ts` after approving the media. No credit spend was started.

1. `public/media/picked-up-with-care.mp4` — “8-second cinematic 16:9 laundry collection at an elegant modern apartment. A professional executive in deep teal receives a cream PEZVO laundry bag from an adult customer. A natural handover, friendly restrained expressions, accurate hands, subtle camera drift and warm daylight. The bag uses the approved PEZVO wordmark; no other logos or captions. Leave the left third visually quiet for site copy. Muted web hero, stable beginning and ending.”
2. `public/media/freshness-delivered.mp4` — “8-second cinematic 16:9 delivery scene based on the approved PEZVO delivery concept. An adult customer receives a PEZVO bag of neatly finished garments. Natural interaction, accurate hands, realistic cloth and bag folds, soft bright home lighting, gentle camera movement. Keep the PEZVO logo stable and legible; no other branding, captions or watermarks. Muted web hero, no exaggerated gestures.”

For each clip: encode H.264 MP4, remove audio, enable `+faststart`, target 1280–1440px width and roughly 1–3 MB, inspect all frames for distorted branding/hands, and export a matching WebP poster. Add WebM only if it materially reduces file size. The implementation only mounts a video for the active scene and never downloads four clips together. Reduced-motion viewers see the poster. A separate mobile crop is optional after reviewing the actual footage.
