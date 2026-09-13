# Template summary (for opportunity discussions)

Quick-reference for `C:\Users\bjdac\Template` — the master template Brad
deploys repeatedly for rank-and-rent local-service lead-gen sites. Paste
into a project's files so Claude has the shape of the system without
re-reading the whole repo.

## What it is

A config-driven static site template for local-service lead generation
(plumbing, HVAC, handyman, etc.), one niche + city per deployment, hosted on
GitHub Pages with a custom domain. Plain HTML/CSS/JS — **no build step, no
framework, no external fonts, no CMS.** Competing in organic search against
professionally designed competitor sites, so baked SEO quality is the whole
game.

## How it works

- **`config.js`** is the only file a person hand-edits — business identity,
  domain, brand colors/theme, GA4 ID, lead-ingest endpoint + Turnstile key,
  page copy, and a `services[]` array where each service is an **ordered
  array of typed content blocks** (`h2`/`h3`, `p`, `lead`, `ul`/`ol`,
  `table`, `note`, `credit`, `marker`, `faqs`) rather than a fixed card
  layout — real long-form copy fits without fighting the template.
- **`bake.js`** reads `window.SITE_CONFIG` and is **the only renderer** —
  it writes every page's finished HTML (title, meta description, canonical,
  OG tags, JSON-LD, H1, `<noscript>` fallback), plus regenerates `CNAME`,
  `robots.txt`, `sitemap.xml`, `404.html`, and `favicon.svg`. Run
  `node bake.js` after any config change.
- **`js/main.js`** is interactivity only (form handling, nav toggle, GA4,
  scroll effects, lazy Turnstile, mobile contact bar) — it builds nothing.
  Editing it never changes what a page looks like.
- **`node bake.js --check`** is the mandatory preflight before launch. It
  fails loudly (exit 1) on: unfinished `[VERIFY: ...]` / `{type: "marker"}`
  placeholders, template leftovers (`yourdomain`, `Springfield`, 555-numbers,
  lorem ipsum, TODO/FIXME), unset `ga4Id`/`ingestUrl`/`ingestSecret`/
  `turnstileSiteKey`, broken/orphaned page files, sitemap/disk drift, domain
  mismatches, missing image dimensions, duplicate meta tags, and banned
  `LocalBusiness`-only schema terms while `schema.type` is `Organization`.
  It also runs an **author-voice guard** flagging operator notes
  accidentally left in public-facing copy.

## Standing constraints (don't violate these when proposing changes)

- Never compromise baked SEO output.
- No external requests, no external fonts, no build pipeline — stays plain
  static files deployable to GitHub Pages.
- `config.js` is the only hand-edited file; everything else is regenerated.
- `phone`/`email`/`hours`/`testimonials`/`photos` ship **empty** until a
  real business supplies real, verifiable content — never invented.
- `schema.type` stays `"Organization"` (not `LocalBusiness`) until a
  renter's real premises/hours exist.
- **`bake.js` is the single source of truth for rendering** — a rendering
  fix belongs in `bake.js`, not `main.js`, and not only patched on a live
  site (the template is upstream of every future deployment: fixes flow
  template → new sites, never the reverse).

## Theme system (why every deployment can look different)

`brand.style` (`classic` / `bold` / `soft` / `sharp` / `elegant`) ×
`brand.pattern` (`none` / `dots` / `grid` / `diagonal` / `crosshatch`) ×
accent `color` — tints, glows, and footer color derive automatically from
the accent. Extend this system for new looks rather than hard-coding
one-off styles.

## Spinning up a new deployment

`New site prompt.txt` in the repo root is the ready-to-send brief template
for populating a new niche/city (services, FAQs, images, brand color, GA4/
ingest/Turnstile keys). Engine changes (`bake.js`/`main.js`/`styles.css`)
are allowed only when real copy genuinely doesn't fit, and must be logged
in that site's own README under "Divergence from the template."

## Repo layout

```
config.js          – hand-edited site config (the only input)
bake.js             – renderer + preflight (--check)
js/main.js          – client-side interactivity only
css/styles.css       – single stylesheet
index.html, about.html, privacy.html, <service>.html  – generated output
404.html, robots.txt, sitemap.xml, favicon.svg, CNAME – generated output
images/              – hero + per-service SVGs/photos
README.md            – full authoring reference (block types, preflight
                        rules, content-sourcing rules)
New site prompt.txt  – brief template for a new deployment
```
