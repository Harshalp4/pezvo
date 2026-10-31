# PEZVO asset mapping

## Used assets

| Website asset | Source | Use |
|---|---|---|
| `public/brand/pezvo-logo-droplet.webp` / `.png` | User attachment `codex-clipboard-005d4f1c-b68a-435d-b8e4-4b776b578d76.png` | Exact attached logo with gold droplet/ripples, header/footer/social image and organization metadata |
| `public/brand/pezvo-icon.webp` / `.png` | Existing wave icon | Compact icon, favicon/Apple icon |
| `public/photos/hero-press.mp4` / `.jpg` | Existing source site; cottonbro studio / Pexels 5901661 | Scene 1, 12-second muted MP4, 1.78 MB, matching poster |
| `public/media/shirt-steaming-wide.mp4` / `.webp` | Ron Lach / [Pexels 10558374](https://www.pexels.com/video/close-up-shot-of-a-man-steaming-a-white-t-shirt-10558374/) | Scene 2, 12-second muted landscape steaming video, 1.12 MB, matching poster |
| `public/media/shoe-cleaning.mp4` / `.webp` | SHVETS production / [Pexels 9058244](https://www.pexels.com/video/a-person-cleaning-a-shoe-9058244/) | Scene 3, 10-second muted leather-shoe cleaning video, 1.11 MB, matching poster |
| `public/media/blazer-care.webp` | User image 5 | Dry cleaning |
| `public/media/doorstep-care.webp` | User image 6 | Scene 4 collection |
| `public/media/pezvo-delivery.webp` | Built-in imagegen edit of user image 7 | Scene 5, packaging and closing section |
| `public/media/pezvo-atelier.webp` | Built-in imagegen edit of user image 3 | Introduction, story and gallery |
| `public/media/precision-press.webp` | User image 4 | Steam ironing and care process |

The supplied “Laundra” webpage was a layout reference, not a deployed asset. PRESTIGE and Loander branding was replaced in the two edited photographs. No other-brand reference photo is displayed. The copied media PNG originals are retained in `docs/source-assets`; web delivery uses optimized WebP files. Logo artwork remains raster, not an editable vector.

The source video credit is retained in `public/photos/hero-press-source.txt`. Frames at 0/3/6/9 seconds were reviewed; no legacy brand mark is visible. It is illustrative stock footage, not footage of the business’s staff or premises. Final publishing should reconfirm usage rights for supplied reference imagery.

The second film shows a white T-shirt being steamed on a hanger in a landscape composition. Downloaded 31 October 2026 under the [Pexels license](https://www.pexels.com/license/). Source credit and encoding details are retained in `public/media/shirt-steaming-wide-source.txt`. The clip is trimmed to 00:00.5–00:12.5, mirrored horizontally to place the garment to the right of the copy, and encoded to 1440×760 H.264, 25 fps, yuv420p with fast-start metadata and no audio. Its full-background presentation uses the same overlay, typography, spacing, controls and responsive layout as scene 1. The wider shot retains the hanger, shirt and steaming action. Earlier portrait and close-up clips remain available as source iterations but are no longer used by the hero. The supplied dark blazer asset is a still photograph used in the services section. This is illustrative stock footage, not PEZVO operations. No paid generation was used.

The gold-droplet logo PNG is a byte-for-byte copy of the attached file (SHA-256 `bca949395ab66f771ced89c52b533ce421f7cb73b98c866b4836ec4a711b7dee`). Its WebP is lossless: visible RGB and alpha values match the PNG exactly. The artwork was not redrawn. Versioned filenames prevent the old header/footer logo from persisting in image caches. The compact favicon remains the existing PEZVO wave mark.

The shoe-care clip shows a leather shoe being wiped and polished by hand. The 10-second edit is horizontally mirrored to place the shoe toward the right of the hero copy, resized to 1440×810, and encoded as H.264/yuv420p at 25 fps with no audio and fast-start metadata. It uses the same full-background treatment as the other films. Source and licensing details are retained in `public/media/shoe-cleaning-source.txt`.

## Image generation — built-in tool

Boutique prompt: “Image 1 is the edit target, a premium garment-care boutique. Image 2 is the exact PEZVO logo reference. Replace all PRESTIGE DRY CLEANERS branding on the wall sign and staff apron with PEZVO branding. Use the exact teal/aqua PEZVO wordmark from image 2 on the wall, with a small ‘Freshness, Delivered.’ tagline. Apron may show simple small PEZVO text. Preserve the room, white clothes, rail, staff person, pose, architectural lighting, camera angle and photographic style. No other brand names or added labels. Deliver the edited square photograph, not a comparison.”

Delivery prompt: “Image 1 is the edit target, doorstep laundry delivery. Image 2 is the PEZVO brand reference. Replace the recycling symbol and Loander lettering on the laundry bag with the PEZVO teal/aqua wordmark and small ‘Freshness, Delivered.’ tagline from image 2, naturally printed on the textile with folds and perspective. Add a small discreet PEZVO mark on the executive’s white polo. Preserve people, faces, hands, pose, laundry, room, lighting and wide 16:9 photographic composition. Remove all other brand names. No collage, no labels, no added text elsewhere. Deliver the single edited wide photo.”

## Pending genuine video assets

The hero now has three videos and two photos. Collection and delivery remain photographic scenes. The carousel supports the missing clips without another UI redesign: add an optional `video` path to the corresponding object in `src/lib/hero-scenes.ts` after approving the media. No credit spend was started.

1. `public/media/picked-up-with-care.mp4` — “8-second cinematic 16:9 laundry collection at an elegant modern apartment. A professional executive in deep teal receives a cream PEZVO laundry bag from an adult customer. A natural handover, friendly restrained expressions, accurate hands, subtle camera drift and warm daylight. The bag uses the approved PEZVO wordmark; no other logos or captions. Leave the left third visually quiet for site copy. Muted web hero, stable beginning and ending.”
2. `public/media/freshness-delivered.mp4` — “8-second cinematic 16:9 delivery scene based on the approved PEZVO delivery concept. An adult customer receives a PEZVO bag of neatly finished garments. Natural interaction, accurate hands, realistic cloth and bag folds, soft bright home lighting, gentle camera movement. Keep the PEZVO logo stable and legible; no other branding, captions or watermarks. Muted web hero, no exaggerated gestures.”

For each clip: encode H.264 MP4, remove audio, enable `+faststart`, target 1280–1440px width and roughly 1–3 MB, inspect all frames for distorted branding/hands, and export a matching WebP poster. Add WebM only if it materially reduces file size. The implementation only mounts a video for the active scene and does not download all clips together. Reduced-motion viewers see the poster. A separate mobile crop is optional after reviewing the actual footage.
