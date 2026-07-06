# needed_asset.md — MG Portfolio Asset Manifest

Every `<MediaSlot code="..." />` in the build renders a tinted placeholder until a
real asset is supplied via its `src` prop. This file catalogues every placeholder
code so assets can be sourced and wired in last (per PRODUCT.md: "Assets plug in
last"). Each row maps one code to its consuming file, variant, and the intended
asset. Codes are stable identifiers; do not rename without updating both the
component and this manifest.

Aspect ratio, where fixed by the layout, is noted so the supplied asset can be
cropped to fit without distortion.

## Fixed asset codes (22)

| Code | Used in | Variant | Intended asset |
|---|---|---|---|
| `PORTRAIT_ABOUT` | `src/components/sections/About.tsx:27` | image | Primary portrait of Manoj Kumar Gautam for the About section. Dignified, warm, eye-level. |
| `GAL_01` | `src/pages/Gallery.tsx` (events) | image | Gallery photo, category events. Aspect 4/5 (portrait). |
| `GAL_02` | `src/pages/Gallery.tsx` (public) | image | Gallery photo, category public engagement. Aspect 1/1 (square). |
| `GAL_03` | `src/pages/Gallery.tsx` (party) | image | Gallery photo, category party/organisation. Aspect 3/4 (portrait). |
| `GAL_04` | `src/pages/Gallery.tsx` (service) | image | Gallery photo, category service/seva. Aspect 4/3 (landscape). |
| `GAL_05` | `src/pages/Gallery.tsx` (events) | image | Gallery photo, category events. Aspect 1/1 (square). |
| `GAL_06` | `src/pages/Gallery.tsx` (public) | image | Gallery photo, category public engagement. Aspect 3/4 (portrait). |
| `GAL_07` | `src/pages/Gallery.tsx` (service) | image | Gallery photo, category service/seva. Aspect 4/5 (portrait). |
| `GAL_08` | `src/pages/Gallery.tsx` (party) | image | Gallery photo, category party/organisation. Aspect 4/3 (landscape). |
| `GAL_09` | `src/pages/Gallery.tsx` (events) | image | Gallery photo, category events. Aspect 3/4 (portrait). |
| `GAL_10` | `src/pages/Gallery.tsx` (public) | image | Gallery photo, category public engagement. Aspect 4/5 (portrait). |
| `GAL_11` | `src/pages/Gallery.tsx` (service) | image | Gallery photo, category service/seva. Aspect 1/1 (square). |
| `GAL_12` | `src/pages/Gallery.tsx` (party) | image | Gallery photo, category party/organisation. Aspect 3/4 (portrait). |
| `EXPLORE_GALLERY` | `src/components/sections/Explore.tsx:126` | image | Teaser image for the Gallery route card on the home page. Representative crowd/event still. |
| `EXPLORE_VIDEOS` | `src/components/sections/Explore.tsx:127` | video | Teaser loop/still for the Videos route card on the home page. |
| `EXPLORE_MEDIA` | `src/components/sections/Explore.tsx:131` | image | Teaser image for the Media/Press route card (wide panel) on the home page. |
| `VIDEO_FEATURED` | `src/pages/Videos.tsx:31` | video | Featured campaign video, top of the Videos page. Aspect 16/9. |
| `VIDEO_02` | `src/pages/Videos.tsx:52` | video | Videos grid thumbnail 2. Aspect 16/9. |
| `VIDEO_03` | `src/pages/Videos.tsx:52` | video | Videos grid thumbnail 3. Aspect 16/9. |
| `VIDEO_04` | `src/pages/Videos.tsx:52` | video | Videos grid thumbnail 4. Aspect 16/9. |
| `VIDEO_05` | `src/pages/Videos.tsx:52` | video | Videos grid thumbnail 5. Aspect 16/9. |
| `VIDEO_06` | `src/pages/Videos.tsx:52` | video | Videos grid thumbnail 6. Aspect 16/9. |

## Dynamic slot (not a fixed asset)

| Code | Used in | Variant | Note |
|---|---|---|---|
| `{active}` | `src/pages/Gallery.tsx:120` | image | Empty-state placeholder; `code` is the active filter category name, shown when a filter yields no photos. Renders no fixed asset; needs no sourcing. |

## Wiring notes

- `EXPLORE_VIDEOS` and the `VIDEO_*` codes use `variant="video"` (PlayCircle icon).
  All others are `variant="image"` (ImageSquare icon).
- `VIDEO_02` through `VIDEO_06` are generated from the `videosPage.items` array
  (indices 1 to 5; index 0 is `VIDEO_FEATURED`). Adding or removing items in
  `src/i18n/translations.ts` shifts this range; keep this manifest in sync.
- To supply a real asset, pass `src` (and optionally `alt`) to the `MediaSlot`.
  The placeholder branch is replaced by a lazy-loaded `<img>`.
