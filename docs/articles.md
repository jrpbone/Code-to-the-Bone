# Articles, tags, and images

Edit `src/data/articles.ts`. Each article has a unique URL-friendly `slug`, title,
category, excerpt, full `content` paragraphs, and a `tags` list. Use `sample: false`
for actual posts. The existing article text is preserved; its trailing hashtags
have been moved into tags.

```ts
tags: ["programming", "webdevelopment", "mobiledevelopment"],
content: [
  "The first paragraph of your full post.",
  "The next paragraph."
],
```

Tags accept words with or without `#`; display and filtering normalize case and
remove duplicates. Click a tag to browse that topic. Archive search checks title,
category, excerpt, full content, and tags. A search and an exact topic filter can
be combined; their URL can be bookmarked or shared.

## Add portrait images

A folder is ready for the latest article:

`public/images/articles/start-with-web-unless-you-need-native-features/`

1. Copy your original JPG, PNG, WebP, or AVIF images into that folder.
2. Replace that article's empty `images: []` with entries like these (use your actual filenames):

```ts
images: [
  {
    src: "/images/articles/start-with-web-unless-you-need-native-features/01.webp",
    alt: "Describe the content of your first image",
    caption: "An optional caption beneath the image"
  },
  {
    src: "/images/articles/start-with-web-unless-you-need-native-features/02.webp",
    alt: "Describe the content of your second image"
  }
],
```

The path starts with `/images/`, not `/public/images/`. Create a folder matching
each new article's slug. Images are optional; omit `images` or use an empty list
for a text-only article. Nothing is displayed until real image paths are supplied.

The first image is the article-card cover. The array order is the gallery order.
Portrait and landscape artwork is contained, never cropped. On wide screens the
gallery sits beside the text; on phones it sits above the body. Thumbnails select
an image. Enlarge opens a larger view with previous/next controls, arrow keys,
Escape to close, and restored keyboard focus. Captions are optional; alt text
should explain the image. Keep full text in `content` even when an image contains
words so the article remains readable and searchable.

## Dates and Facebook links

Add an ISO date such as `publishedAt: "2026-09-07"` to order real posts newest
first. Undated entries appear last. Add the specific public Facebook post URL in
`facebookUrl`; the article then shows **Discuss on Facebook**. Without that URL,
the button accurately says **Visit Facebook page**. Do not invent dates or links.

The homepage shows at most nine articles in a responsive three-column desktop
grid. `/articles` holds the entire collection; `/articles/<slug>` shows a full post.

## Hosting and checks

### Downloadable code

Place your ZIP file in `public/downloads/`. In its article entry, add:

```ts
hasCode: true,
codeZip: "/downloads/python-file-automation.zip",
```

This displays a **Download code ZIP** button below the image gallery (or after the text when there are no images) only when
`hasCode` is true and `codeZip` is provided. Set `hasCode: false` or omit it to
hide the download. Code articles without a ZIP can use `hasCode: true` alone.
Use the exact filename, with no `public` in the URL. Add the file before enabling
the property. The site serves your prepared ZIP; it does not generate one.

Add `codeChecksumFile: "organize_files.py"` and `codeSha256: "<64-character hash>"`
to show verification instructions after the download is clicked. The checksum
verifies the extracted Python file, not the ZIP or README. Generate it with:

```powershell
(Get-FileHash -LiteralPath "public/downloads/III/organize_files.py" -Algorithm SHA256).Hash.ToLowerInvariant()
```

Update `codeSha256` and rebuild the ZIP whenever the Python file changes.
Readers extract the ZIP and run `Get-FileHash .\organize_files.py -Algorithm SHA256`
in the extracted folder, then compare against the website. No checksum file is needed.

Vite dev and preview servers handle direct article routes, including through
cloudflared. When deploying `dist`, configure the host to serve `index.html` for
application routes while preserving normal static asset handling.

Run `npm run typecheck`, `npm run build`,
`node --experimental-strip-types --test tests/articles.test.ts` (Node 22.15+),
and `node tests/routes.mjs`.
Browser QA should include search and tag filters, portrait/landscape image sizing,
thumbnail selection, dialog keyboard navigation and focus restoration, missing
images, and direct route refreshes.
