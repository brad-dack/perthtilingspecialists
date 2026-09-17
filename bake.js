/* =============================================================================
   bake.js — manual helper, NOT a build step.

   Two modes:

       node bake.js           Regenerates every derived file from config.js:
                              all page HTML (baked title/meta/canonical/OG/
                              JSON-LD/H1/noscript), plus CNAME, robots.txt,
                              sitemap.xml, 404.html, and favicon.svg.
                              config.js is the only file you edit by hand.

       node bake.js --check   Preflight. Writes nothing. Fails loudly (exit 1)
                              listing every leftover placeholder, broken file
                              reference, sitemap drift, domain mismatch, or
                              duplicate meta tag it finds. Run before launch.

   Run these yourself after editing config.js, then commit the regenerated
   files. Nothing runs automatically — the deployed site is plain static
   files with no pipeline. Plain Node, no dependencies.
============================================================================= */
const fs = require("fs");
const path = require("path");

global.window = {};
require(path.join(__dirname, "config.js"));
const cfg = global.window.SITE_CONFIG;

const esc = s => String(s)
  .replace(/&/g, "&amp;").replace(/</g, "&lt;")
  .replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// <-escape so "</script>" can never appear inside the JSON-LD block
const jsonLd = obj =>
  '<script type="application/ld+json">' +
  JSON.stringify(obj).replace(/</g, "\\u003c") +
  "</" + "script>";

// "https://example.com" -> "example.com"
const hostOf = url => String(url || "")
  .replace(/^https?:\/\//, "").replace(/\/.*$/, "").trim();

/* ---------- theme ---------------------------------------------------------
   Valid values for brand.style / brand.pattern in config.js. The chosen
   pair is baked onto the <html> tag; css/styles.css keys off it. */
const STYLES = ["classic", "bold", "soft", "sharp", "elegant"];
const PATTERNS = ["none", "dots", "grid", "diagonal", "crosshatch"];
const themeStyle = () => cfg.brand.style || "classic";
const themePattern = () => cfg.brand.pattern || "none";

function validateTheme() {
  const problems = [];
  for (const key of ["color", "colorDark", "colorContrast"]) {
    if (!/^#[0-9a-fA-F]{6}$/.test(cfg.brand[key] || "")) {
      problems.push("brand." + key + ' must be a 6-digit hex color (got "' +
        cfg.brand[key] + '") — derived tints can\'t be computed from it');
    }
  }
  if (!STYLES.includes(themeStyle())) {
    problems.push('brand.style "' + themeStyle() + '" is not one of: ' + STYLES.join(", "));
  }
  if (!PATTERNS.includes(themePattern())) {
    problems.push('brand.pattern "' + themePattern() + '" is not one of: ' + PATTERNS.join(", "));
  }
  return problems;
}

/* Color math for the derived palette (tints, glows, footer). */
const hexToRgb = hex => {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};
// mix(a, b, w) = w parts color a, (1-w) parts color b
const mix = (a, b, w) => {
  const ra = hexToRgb(a), rb = hexToRgb(b);
  return "#" + ra.map((v, i) =>
    Math.round(v * w + rb[i] * (1 - w)).toString(16).padStart(2, "0")).join("");
};
const rgba = (hex, alpha) => {
  const [r, g, b] = hexToRgb(hex);
  return "rgba(" + r + "," + g + "," + b + "," + alpha + ")";
};

/* css/styles.css is inlined into every page's <head> rather than linked, so
   first paint doesn't wait on a second render-blocking request (measured at
   ~470ms off the critical path on Perth Brickworks). css/styles.css stays the
   editable source on disk; bake.js is the only thing that reads it, so
   re-run bake.js after editing it. A separate cacheable file would matter
   more if GitHub Pages' cache TTL weren't fixed at 10 minutes — at that TTL
   and this page count, inlining wins. Guards against a literal "</style>" in
   the source, which would otherwise close the tag early. */
function siteCss() {
  const raw = fs.readFileSync(path.join(__dirname, "css/styles.css"), "utf8");
  return raw.replace(/<\/style>/gi, "<\\/style>");
}

/* The full brand palette as a CSS block, baked into each page's <head> so
   crawlers and first paint see final colors with no JS and no flash.
   This is the only place they are derived. */
function brandCss() {
  const c = cfg.brand.color;
  return ":root{" +
    "--brand:" + c + ";" +
    "--brand-dark:" + cfg.brand.colorDark + ";" +
    "--brand-contrast:" + cfg.brand.colorContrast + ";" +
    "--brand-soft:" + mix(c, "#ffffff", 0.10) + ";" +
    "--brand-softer:" + mix(c, "#ffffff", 0.055) + ";" +
    "--brand-border:" + mix(c, "#ffffff", 0.30) + ";" +
    "--brand-glow:" + rgba(c, 0.30) + ";" +
    "--brand-glow-soft:" + rgba(c, 0.15) + ";" +
    "--footer-bg:" + mix(c, "#10161d", 0.16) + ";" +
    "}";
}

/* Core pages that always exist; area slugs must not collide with these. */
const CORE_PAGES = ["index.html", "about.html", "privacy.html", "404.html"];

/* Pages whose content holds a quote form, so "#quote" on that page resolves
   locally. A page without one sends quote CTAs to the About page's form
   instead. Set per page by buildPages() before its HTML is rendered; bake
   is synchronous, so a module-level flag is enough. */
let pageHasForm = false;
const blocksHaveForm = blocks => (blocks || []).some(b => b.type === "form");
const quoteHref = () => pageHasForm ? "#quote" : pathFor("about.html") + "#quote";

const areaFile = area => area.slug + ".html";

/* ---------- schema builders ---------------------------------------------
   Default is Organization — deliberately NOT a LocalBusiness subtype. A
   rank-and-rent site with no renter attached has no premises, no opening
   hours, no service counter, no reviews: LocalBusiness/AggregateRating/
   Review properties would all be invented. Upgrade schema.type to a real
   LocalBusiness subtype (see schema.org/LocalBusiness) only once a renter's
   real address/hours exist — the --check banned-terms guard below stops
   this reverting silently. */

const schemaType = () => cfg.schema.type || "Organization";
const isLocalBusiness = () => schemaType() !== "Organization";

const bizSchema = () => {
  const s = {
    "@context": "https://schema.org",
    "@type": schemaType(),
    "name": cfg.business.name,
    "url": cfg.domain + "/",
    "description": cfg.pages.home.metaDescription
  };
  if (cfg.business.phone) s.telephone = cfg.business.phone;
  if (cfg.business.email) s.email = cfg.business.email;
  if (cfg.business.serviceArea) s.areaServed = cfg.business.serviceArea;
  if (isLocalBusiness()) {
    if (cfg.schema.priceRange) s.priceRange = cfg.schema.priceRange;
    s.address = {
      "@type": "PostalAddress",
      "addressLocality": cfg.business.city,
      "addressRegion": cfg.business.state
    };
    if (cfg.business.hours) s.openingHours = cfg.business.hours;
  }
  return s;
};

const faqSchema = faqs => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(f => ({
    "@type": "Question",
    "name": f.q,
    "acceptedAnswer": { "@type": "Answer", "text": f.a }
  }))
});

/* Flattens every { type: "faqs", items: [...] } block on a page into one
   list — the FAQPage schema for that page is built from exactly the FAQs
   that are actually visible on it, never a separate global list. */
const faqsFromBlocks = blocks =>
  (blocks || []).filter(b => b.type === "faqs").flatMap(b => b.items);

const serviceSchema = (svc, canonical) => {
  const s = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": svc.name,
    "serviceType": svc.name,
    "description": svc.metaDescription,
    "url": canonical,
    "provider": {
      "@type": schemaType(),
      "name": cfg.business.name,
      "url": cfg.domain + "/"
    }
  };
  if (cfg.business.serviceArea) s.areaServed = cfg.business.serviceArea;
  if (cfg.business.phone) s.provider.telephone = cfg.business.phone;
  return s;
};

const breadcrumbSchema = (name, canonical) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": cfg.domain + "/" },
    { "@type": "ListItem", "position": 2, "name": name, "item": canonical }
  ]
});

/* ---------- page templates ----------------------------------------------- */

/* Extensionless public URLs. The routes for this build are /floor-tiling-perth,
   /about and so on, not the .html form. GitHub Pages serves /about.html at
   /about with a 200 (no redirect), so declaring the extensionless path in
   every canonical, sitemap <loc>, schema url and internal href is safe here
   and matches the approved routes. Ported from Canberra Tiling (9fc8142),
   where Cloudflare Workers forced the same scheme. See README "Divergence
   from the template". */
const pathFor = file =>
  file === "index.html" ? "/" : "/" + file.replace(/\.html$/, "");

const canonicalFor = file => cfg.domain + pathFor(file);

/* Mobile nav without JavaScript. Below the 1024px collapse point the nav is
   hidden behind .nav-toggle, whose click handler lives in main.js, so with
   JavaScript off the header menu could never be opened. This shows the nav
   expanded and hides the useless toggle, and only when JavaScript is off:
   <noscript><style> in <head> is valid HTML and applies before first paint,
   so JavaScript users get no flash and no layout shift (a no-js class
   removed by the deferred main.js would flash the open menu on every phone
   load). The header also stops being sticky, or a permanently open menu
   would pin roughly 380px of links over the page while scrolling.
   The max-width must stay just under the min-width the desktop nav uses in
   css/styles.css. */
const NOSCRIPT_NAV_CSS =
  "<noscript><style>@media (max-width: 1023.98px){" +
  ".nav-toggle{display:none}" +
  ".site-nav{display:block}" +
  "#site-header{position:static}" +
  "}</style></noscript>";

function head({ title, description, file, faqs, extraSchemas }) {
  const canonical = canonicalFor(file);
  return [
    '  <meta charset="utf-8">',
    '  <meta name="viewport" content="width=device-width, initial-scale=1">',
    "  <title>" + esc(title) + "</title>",
    '  <meta name="description" content="' + esc(description) + '">',
    '  <meta name="theme-color" content="' + cfg.brand.color + '">',
    '  <link rel="canonical" href="' + canonical + '">',
    '  <link rel="icon" href="favicon.svg" type="image/svg+xml">',
    '  <meta property="og:title" content="' + esc(title) + '">',
    '  <meta property="og:description" content="' + esc(description) + '">',
    '  <meta property="og:url" content="' + canonical + '">',
    '  <meta property="og:type" content="website">',
    '  <meta property="og:image" content="' + cfg.domain + '/images/og-image.png">',
    '  <meta property="og:image:width" content="1200">',
    '  <meta property="og:image:height" content="630">',
    '  <meta name="twitter:card" content="summary_large_image">',
    "  <style>" + siteCss() + "</style>",
    "  <style>" + brandCss() + "</style>",
    "  " + NOSCRIPT_NAV_CSS,
    "  " + jsonLd(bizSchema()),
    faqs && faqs.length ? "  " + jsonLd(faqSchema(faqs)) : null,
    ...(extraSchemas || []).map(s => "  " + jsonLd(s)),
    '  <script src="config.js" defer></' + "script>",
    '  <script src="js/main.js" defer></' + "script>"
  ].filter(Boolean).join("\n");
}

/* No em dashes in rendered output anywhere on this build (handover hard
   rule), so the engine's own separators are commas and hyphens.
   "send an enquiry", not the template's "free quote": this site does not
   quote, and no draft says the tiler's quote is free.
   The template opened "This site's content needs JavaScript", written when
   main.js built the page. Since bake.js became the only renderer every page's
   content is in the HTML, so that sentence was false. What still needs
   JavaScript is the enquiry form (fetch submit and Turnstile), so this line
   names the form and offers the channels that work without it: phone and
   email, each only when set in config. */
const noscriptChannels = [
  cfg.business.phone && cfg.business.phoneDisplay
    ? 'call <a href="tel:' + cfg.business.phone + '">' + esc(cfg.business.phoneDisplay) + "</a>"
    : "",
  cfg.business.email
    ? 'email <a href="mailto:' + esc(cfg.business.email) + '">' + esc(cfg.business.email) + "</a>"
    : ""
].filter(Boolean);
const noscript =
  '<noscript><p class="noscript-warning">The enquiry form on this site needs JavaScript. ' +
  (noscriptChannels.length
    ? "To send an enquiry without it, " + noscriptChannels.join(" or ") + "."
    : "Turn JavaScript on to send an enquiry.") +
  "</p></noscript>";

/* ---------- the renderer --------------------------------------------------

   THIS IS THE ONLY RENDERER. Everything below turns config.js into the
   finished HTML — header, hero, page content, footer, the quote form's
   markup — at build time. js/main.js does not build the page; it only wires
   up behaviour on the HTML this file produced. A copy or layout change means
   editing config.js or this file and running `node bake.js`.

   It used to be the other way around: the browser built the page and this
   file baked only the <head> and the H1. That cost, from what the live sites
   measured:
     - SEO. A no-JS crawl of Perth Brickworks' two long service pages saw 39
       and 49 words, against ~6-10k words a JS-rendering crawl saw. Not every
       crawler runs JS, and the ones that do run it later and less reliably.
     - LCP. The hero image is the LCP element and can't be discovered by the
       browser's preload scanner at all while a script has to build it first.
     - CLS. #site-header is position:sticky, so filling it after first paint
       pushes the whole page down — a layout shift on every page.

   For a while both files carried a copy of this renderer, with main.js
   skipping any element marked data-baked. That worked but left two copies of
   the same recipe free to drift. The browser copy is gone: this file is the
   source of truth, and there is nothing left to keep in sync.

   The three things that genuinely can't be fixed markup, and so live in
   main.js instead:
     - the form's _id idempotency key (must be unique per real page load, so
       it is baked EMPTY and filled on load)
     - Turnstile (loaded lazily, so it doesn't compete with the hero for
       bandwidth during the LCP window)
     - the mobile contact bar (a position:fixed overlay duplicating links
       already baked into the header and footer)
--------------------------------------------------------------------------- */

/* Generic UI labels — the reader-facing text that isn't niche-specific.
   Niche-specific copy all comes from config.js. */
const UI = {
  howItWorks: "How It Works",
  services: "Our Services",
  faqPreviewTitle: "Common Questions",
  faqSeeAll: "See all questions",
  serviceDetails: "Pricing &amp; details",
  ctaBandTitle: "Ready to get started?",
  callLabel: "Call",
  orText: "or",
  testimonialsTitle: "What Customers Say",
  photosTitle: "Recent Work",
  serviceAreaLabel: "Service area",
  hoursLabel: "Hours",
  backHome: "Back to homepage",
  menuLabel: "Menu",
  areasTitle: "Areas We Serve",
  servicesInPrefix: "Services available in",
  quoteShort: "Quote",
  emailLabel: "Email",
  faqTitle: "Frequently Asked Questions",
  faqsTitle: "Frequently Asked Questions"
};

/* Inline SVG icon set for how-it-works steps (referenced by name from
   config.js). Inline = zero extra requests, colored via currentColor. */
const ICONS = {
  phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
  chat: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  clipboard: '<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/>',
  check: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
  wrench: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
  bolt: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
  home: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>'
};

function iconSvg(name) {
  if (!name || !ICONS[name]) return "";
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICONS[name] + "</svg>";
}

const hasPhone = () => !!(cfg.business.phone && cfg.business.phoneDisplay);
const hasEmail = () => !!cfg.business.email;
const hasHours = () => !!cfg.business.hours;
const telHref = () => "tel:" + cfg.business.phone;

const exists = rel => fs.existsSync(path.join(__dirname, rel));

/* Escape first, THEN re-enable a tiny
   markup subset, so config copy can never inject HTML. */
function richText(s) {
  let t = esc(String(s == null ? "" : s));
  t = t.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  /* Config copy links to pages by filename - "[cost guide](tiling-cost-perth.html)" -
     so the target stays greppable against what is on disk; the href emitted is
     the extensionless route. "#quote" resolves to this page's form, or to the
     About form on a page that has none. Anything else (tel:, mailto:,
     absolute URLs, other anchors) passes through. */
  t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (m, label, url) =>
    '<a href="' + (/^[a-z0-9-]+\.html$/.test(url) ? pathFor(url)
      : url === "#quote" ? quoteHref() : url) + '">' + label + "</a>");
  return t.replace(/\n/g, "<br>");
}

const callButtonHtml = extraClass => hasPhone()
  ? '<a class="btn btn-outline ' + (extraClass || "") + '" href="' + telHref() + '">' +
    UI.callLabel + " " + esc(cfg.business.phoneDisplay) + "</a>"
  : "";

const quoteButtonHtml = (text, extraClass) =>
  '<a class="btn btn-primary ' + (extraClass || "") + '" href="' + quoteHref() + '">' +
  esc(text) + "</a>";

/* Responsive variants. An image entry may carry `widths: [400, 560, 720, 960]`
   and a `sizes` string; each listed width needs a real file beside the
   original, named <name>-<width>.<ext>. Falls back to a plain <img> when the
   variants aren't on disk, so an image swapped in without regenerating them
   still works, just without the size win — and --check warns about it.

   The full-size image.src is deliberately NOT a srcset candidate: adding it
   makes it a normal pick under high-DPR mobile sizes math, defeating the
   whole point of the variants. It stays only in the plain src= fallback, for
   browsers that ignore srcset. (Perth Limestone shipped it as a candidate for
   two weeks and it was likely the main cause of the homepage's slow load
   relative to every other page.) */
function srcsetAttr(image) {
  if (!image.widths || !image.widths.length) return "";
  const dot = image.src.lastIndexOf(".");
  const base = image.src.slice(0, dot), ext = image.src.slice(dot);
  const set = image.widths.map(w => esc(base + "-" + w + ext) + " " + w + "w");
  return ' srcset="' + set.join(", ") + '"' +
    (image.sizes ? ' sizes="' + esc(image.sizes) + '"' : "");
}

/* `title` defaults to the alt text — an
   on-page audit flags every <img> without one — and can be overridden with an
   optional `title` field on the image entry. */
function imgTag(image, className, lazy) {
  if (!image || !image.src) return "";
  return '<img class="' + (className || "") + '" src="' + esc(image.src) + '"' +
    srcsetAttr(image) +
    ' alt="' + esc(image.alt || "") + '"' +
    ' title="' + esc(image.title || image.alt || "") + '"' +
    (image.width ? ' width="' + image.width + '"' : "") +
    (image.height ? ' height="' + image.height + '"' : "") +
    (lazy ? ' loading="lazy"' : ' fetchpriority="high"') + ">";
}

function faqItems(list) {
  return (list || []).map(f =>
    '<details class="faq-item"><summary>' + esc(f.q) + "</summary>" +
    '<div class="faq-answer"><p>' + richText(f.a) + "</p></div></details>"
  ).join("");
}

/* ---------- quote form ---------------------------------------------------
   The _id field is baked EMPTY on purpose: it's an idempotency key that has
   to be unique per real page load, so a fixed value would make every visitor
   to a given page share one. wireQuoteForm() in main.js fills it on load. */

function fieldHtml(f, placeholders) {
  const id = "qf-" + f.name;
  const ph = (placeholders && placeholders[f.name]) || f.placeholder;
  const reqAttr = f.required === false ? "" : " required";
  if (f.type === "textarea") {
    return '<div class="form-field"><label for="' + id + '">' + esc(f.label) + "</label>" +
      '<textarea id="' + id + '" name="' + esc(f.name) + '" rows="' + (f.rows || 4) + '"' +
      (ph ? ' placeholder="' + esc(ph) + '"' : "") + reqAttr + "></textarea></div>";
  }
  return '<div class="form-field"><label for="' + id + '">' + esc(f.label) + "</label>" +
    '<input id="' + id + '" name="' + esc(f.name) + '" type="' + esc(f.type || "text") + '"' +
    (f.autocomplete ? ' autocomplete="' + esc(f.autocomplete) + '"' : "") +
    (ph ? ' placeholder="' + esc(ph) + '"' : "") +
    reqAttr + "></div>";
}

function quoteFormHtml(opts) {
  opts = opts || {};
  const fields = (cfg.contact.fields || []).concat(opts.extraField ? [opts.extraField] : []);
  const fieldsHtml = fields.map(f => fieldHtml(f, opts.placeholders)).join("");

  let picker = "", presetInput = "";
  if (opts.presetService) {
    presetInput = '<input type="hidden" name="service" value="' + esc(opts.presetService) + '">';
  } else {
    /* Job-type picker options come from cfg.contact.jobTypes, NOT
       cfg.services - the services array is a list of PAGES on this build and
       includes the cost guide, which is not something a homeowner "needs
       done". Falls back to service names for a config without jobTypes. */
    const options = (cfg.contact.jobTypes || cfg.services.map(s => s.name))
      .concat([cfg.contact.otherServiceLabel]);
    const radios = options.map(name =>
      '<label class="service-option">' +
        '<input type="radio" name="service" value="' + esc(name) + '" required>' +
        "<span>" + esc(name) + "</span>" +
      "</label>"
    ).join("");
    picker = '<fieldset class="form-step" id="form-step-1">' +
      "<legend>" + esc(cfg.contact.step1Label) + "</legend>" +
      '<div class="service-options">' + radios + "</div>" +
    "</fieldset>";
  }

  return (opts.heading ? "<h2>" + esc(opts.heading) + "</h2>" : "") +
    '<form id="quote-form" novalidate>' +
      presetInput +
      picker +
      '<fieldset class="form-step" id="form-step-2"' + (picker ? " hidden" : "") + ">" +
        (picker ? "<legend>" + esc(cfg.contact.step2Label) + "</legend>" : "") +
        fieldsHtml +
        '<input type="text" id="qf-gotcha" name="_gotcha" tabindex="-1" autocomplete="off" aria-hidden="true" ' +
          'style="position:absolute;left:-9999px;top:-9999px">' +
        '<input type="hidden" id="qf-id" name="_id" value="">' +
        (cfg.turnstileSiteKey ? '<div id="turnstile-widget"></div>' : "") +
        '<button class="btn btn-primary btn-block" type="submit">' + esc(cfg.contact.submitText) + "</button>" +
      "</fieldset>" +
      '<p class="form-status" id="form-status" role="status" aria-live="polite"></p>' +
    "</form>";
}

/* ---------- content blocks ---------------------------------------------- */

function blockHtml(b) {
  switch (b.type) {
    case "h2": return "<h2>" + richText(b.text) + "</h2>";
    case "h3": return "<h3>" + richText(b.text) + "</h3>";
    case "p": return "<p>" + richText(b.text) + "</p>";
    case "lead": return '<p class="lead">' + richText(b.text) + "</p>";
    case "ul":
      return "<ul>" + b.items.map(i => "<li>" + richText(i) + "</li>").join("") + "</ul>";
    case "ol":
      return "<ol>" + b.items.map(i => "<li>" + richText(i) + "</li>").join("") + "</ol>";
    case "table":
      return '<div class="block-table-wrap"><table class="block-table">' +
        (b.caption ? "<caption>" + richText(b.caption) + "</caption>" : "") +
        "<thead><tr>" + b.headers.map(h => "<th>" + richText(h) + "</th>").join("") + "</tr></thead>" +
        "<tbody>" + b.rows.map(row =>
          "<tr>" + row.map(cell => "<td>" + richText(cell) + "</td>").join("") + "</tr>"
        ).join("") + "</tbody></table></div>";
    case "note":
      return '<aside class="block-note">' + richText(b.text) + "</aside>";
    case "credit":
      return '<p class="block-credit">' + richText(b.text) + "</p>";
    case "marker":
      return '<div class="block-marker" role="note">' +
        "<strong>Unfinished, not for publication.</strong> " + richText(b.text) + "</div>";
    case "faqs":
      return '<div class="block-faqs">' + faqItems(b.items) + "</div>";
    case "form":
      /* Wrapped in #quote so the page's own "#quote" CTAs land on it. The
         collection notice renders directly above every form, not just the
         About one: forms sit on several pages on this build, and the privacy
         position depends on the notice being at the point of collection (see
         contact.reassurance in config and LAUNCH_PLAYBOOK.md phase 2). */
      return '<div class="block-form" id="quote">' +
        (b.heading ? "<h2>" + esc(b.heading) + "</h2>" : "") +
        '<p class="reassurance">' + richText(cfg.contact.reassurance) + "</p>" +
        quoteFormHtml({
          presetService: b.presetService,
          extraField: b.extraField, placeholders: b.placeholders
        }) + "</div>";
    case "image":
      return '<figure class="block-image">' + imgTag(b, "", true) +
        (b.caption ? "<figcaption>" + richText(b.caption) + "</figcaption>" : "") + "</figure>";
    default:
      return "";
  }
}

const renderBlocks = blocks => (blocks || []).map(blockHtml).join("");

/* ---------- shared sections --------------------------------------------- */

function howItWorksSection(compact) {
  const steps = (cfg.howItWorks || []).map((s, i) => {
    const badge = s.icon && iconSvg(s.icon)
      ? '<span class="step-num" aria-hidden="true">' + iconSvg(s.icon) + "</span>" +
        '<span class="step-label">Step ' + (i + 1) + "</span>"
      : '<span class="step-num" aria-hidden="true">' + (i + 1) + "</span>";
    return '<li class="step">' + badge +
      "<h3>" + esc(s.title) + "</h3><p>" + esc(s.text) + "</p></li>";
  }).join("");
  return '<section class="section how-it-works' + (compact ? " compact" : "") + '" id="how-it-works">' +
    '<div class="container"><h2>' + UI.howItWorks + "</h2>" +
    '<ol class="steps">' + steps + "</ol></div></section>";
}

/* heading/body are OPTIONAL per-page overrides (each service/page entry can
   set ctaHeading/ctaBody) - falls back to the generic sitewide copy when a
   page doesn't specify its own. Ported from Canberra Tiling.
   The generic line says "send an enquiry online", not the template's
   "request your free quote online": this site does not quote, and no draft
   says the tiler's quote is free. */
function ctaBand(ctaText, heading, body) {
  const phoneLine = hasPhone()
    ? UI.callLabel + ' <a href="' + telHref() + '">' + esc(cfg.business.phoneDisplay) +
      "</a> " + UI.orText + " send an enquiry online."
    : "Send an enquiry online.";
  return '<section class="cta-band"><div class="container">' +
    "<h2>" + esc(heading || UI.ctaBandTitle) + "</h2><p>" + richText(body || "") + (body ? "" : phoneLine) + "</p>" +
    quoteButtonHtml(ctaText, "btn-invert") + callButtonHtml("btn-invert") + "</div></section>";
}

function testimonialsSection() {
  if (!cfg.testimonials || !cfg.testimonials.length) return "";
  const items = cfg.testimonials.map(t =>
    '<figure class="testimonial"><blockquote>' + esc(t.quote) + "</blockquote>" +
    "<figcaption>" + esc(t.name) + (t.detail ? ", " + esc(t.detail) : "") +
    "</figcaption></figure>"
  ).join("");
  return '<section class="section"><div class="container"><h2>' + UI.testimonialsTitle +
    '</h2><div class="grid-3">' + items + "</div></div></section>";
}

function photosSection() {
  if (!cfg.photos || !cfg.photos.length) return "";
  const items = cfg.photos.map(p =>
    '<figure class="photo"><img loading="lazy" src="' + esc(p.src) + '" alt="' + esc(p.alt) +
    '" title="' + esc(p.title || p.alt || "") + '">' +
    (p.caption ? "<figcaption>" + esc(p.caption) + "</figcaption>" : "") + "</figure>"
  ).join("");
  return '<section class="section"><div class="container"><h2>' + UI.photosTitle +
    '</h2><div class="grid-3">' + items + "</div></div></section>";
}

function serviceCards(services) {
  return services.map(s =>
    '<article class="card">' +
      '<h3><a href="' + esc(pathFor(s.page)) + '">' + esc(s.name) + "</a></h3>" +
      "<p>" + esc(s.shortDescription) + "</p>" +
      '<a class="card-link" href="' + esc(pathFor(s.page)) + '">' + UI.serviceDetails + " &rarr;</a>" +
    "</article>"
  ).join("");
}

function areasSection() {
  if (!cfg.areas || !cfg.areas.length) return "";
  const links = cfg.areas.map(a =>
    '<li><a href="' + esc(pathFor(areaFile(a))) + '">' + esc(a.name) + "</a></li>").join("");
  return '<section class="section" id="areas"><div class="container"><h2>' + UI.areasTitle +
    '</h2><ul class="area-links">' + links + "</ul></div></section>";
}

function faqsSection() {
  if (!cfg.about.faqs || !cfg.about.faqs.length) return "";
  return '<section class="section section-alt" id="faqs"><div class="container narrow">' +
    "<h2>" + UI.faqsTitle + "</h2>" + faqItems(cfg.about.faqs) + "</div></section>";
}

/* ---------- header / footer --------------------------------------------- */

/* #site-header is position:sticky, so filling it from JS after first paint
   pushes the whole page down — a layout shift on every page. The nav toggle's
   click handler is still wired by main.js; only the markup is baked. */
/* Nav is Home, then every services[] page in config order, then About:
   "Home / Floor Tiling / Bathroom Tiling / Cost Guide / About" on this build.
   Every link is a real page, no dropdown, no anchor links, and no /services
   route (there is no services index page). Privacy is footer only. */
function navLinks() {
  return [{ file: "index.html", label: "Home" }]
    .concat(cfg.services.map(s => ({ file: s.page, label: s.name })))
    .concat([{ file: "about.html", label: "About" }]);
}

function headerHtml(file) {
  const nav = navLinks().map(l =>
    "<li><a" + (l.file === file ? ' class="active" aria-current="page"' : "") +
    ' href="' + esc(pathFor(l.file)) + '">' + esc(l.label) + "</a></li>").join("");
  const navPhone = hasPhone()
    ? '<a class="btn btn-primary nav-phone" href="' + telHref() + '">' +
      UI.callLabel + " " + esc(cfg.business.phoneDisplay) + "</a>"
    : quoteButtonHtml(cfg.pages.home.ctaText, "nav-phone");

  return '<div class="container header-inner">' +
      '<a class="logo" href="' + pathFor("index.html") + '">' + esc(cfg.business.name) + "</a>" +
      '<button class="nav-toggle" aria-expanded="false" aria-controls="site-nav" aria-label="' + UI.menuLabel + '">' +
        "<span></span><span></span><span></span>" +
      "</button>" +
      '<nav id="site-nav" class="site-nav" aria-label="Main">' +
        "<ul>" + nav + "</ul>" + navPhone +
      "</nav>" +
    "</div>";
}

/* Baked so the footer's links to every service page are crawlable without
   JS — on a small site that internal link block is a meaningful share of the
   internal linking. */
function footerHtml() {
  /* One "Pages" column mirroring the nav, plus Privacy. The template's
     separate "Our Services" column would list the cost guide as a service. */
  const pageLinks = navLinks().concat([{ file: "privacy.html", label: "Privacy Policy" }]).map(l =>
    '<li><a href="' + esc(pathFor(l.file)) + '">' + esc(l.label) + "</a></li>").join("");

  const contactLines = [];
  if (hasPhone()) contactLines.push('<a href="' + telHref() + '">' + esc(cfg.business.phoneDisplay) + "</a>");
  if (hasEmail()) contactLines.push('<a href="mailto:' + esc(cfg.business.email) + '">' + esc(cfg.business.email) + "</a>");
  const detailLines = [];
  if (cfg.business.serviceArea) detailLines.push(UI.serviceAreaLabel + ": " + esc(cfg.business.serviceArea));
  if (hasHours()) detailLines.push(UI.hoursLabel + ": " + esc(cfg.business.hours));

  return '<div class="container footer-grid">' +
      "<div>" +
        '<p class="footer-brand">' + esc(cfg.business.name) + "</p>" +
        (contactLines.length ? "<p>" + contactLines.join("<br>") + "</p>" : "") +
        (detailLines.length ? "<p>" + detailLines.join("<br>") + "</p>" : "") +
      "</div>" +
      '<div><p class="footer-title">Pages</p><ul>' + pageLinks + "</ul></div>" +
    "</div>" +
    '<div class="container footer-bottom">' +
      "<p>&copy; " + new Date().getFullYear() + " " + esc(cfg.business.name) +
      (cfg.business.city ? ". Serving " + esc(cfg.business.city) + ", " + esc(cfg.business.state) + "." : ".") +
      "</p>" +
    "</div>";
}

/* ---------- page bodies -------------------------------------------------- */

/* Hero pages (home, services, areas): H1, sub-headline, CTAs, value props and
   the hero image all baked. The hero image is the LCP element — while a
   script had to build it, the browser's preload scanner couldn't discover it
   at all. Note there is deliberately no entrance animation on hero elements:
   main.js adds html.anim only after first paint, so a fade-in here would hide
   the headline and image and re-reveal them a moment later, and that later
   moment is what gets measured as LCP. Below-the-fold content animates via
   .reveal instead, where the cost is zero. */
function heroMain(h, image, contentHtml) {
  const media = imgTag(image, "hero-img", false);
  return `    <section class="hero${media ? " has-media" : ""}">
      <div class="container hero-grid">
        <div class="hero-copy">
          <h1>${esc(h.headline)}</h1>
          <div class="hero-dynamic">${
            (h.subheadline ? '<p class="hero-sub">' + esc(h.subheadline) + "</p>" : "") +
            '<div class="hero-actions">' +
              quoteButtonHtml(h.ctaText || cfg.pages.home.ctaText) + callButtonHtml() +
            "</div>" +
            '<ul class="value-props">' +
              (cfg.valueProps || []).map(v => "<li>" + esc(v) + "</li>").join("") +
            "</ul>"
          }</div>
        </div>${media ? '\n        <div class="hero-media">' + media + "</div>" : ""}
      </div>
    </section>
    <div id="page-content">${contentHtml}</div>`;
}

// Simple pages (about/privacy): static H1 in the page header band.
const pageHeadMain = (headline, contentHtml) => `    <section class="page-head">
      <div class="container"><h1>${esc(headline)}</h1></div>
    </section>
    <div id="page-content">${contentHtml}</div>`;

/* Home renders from cfg.pages.home.blocks - the same block system as every
   other page - rather than the template's services-grid/how-it-works/FAQ
   preview scaffolding. This build's homepage is long-form, message-matched
   copy with its own How it works, routing and FAQ sections. Ported from
   Canberra Tiling. */
function homeContentHtml() {
  const p = cfg.pages.home;
  return '<section class="section"><div class="container narrow prose">' +
      renderBlocks(p.blocks) +
    "</div></section>" +
    areasSection() + testimonialsSection() +
    ctaBand(p.ctaText, p.ctaHeading, p.ctaBody);
}

/* No extra centred CTA button and no compact How it works strip after the
   blocks: each draft ends with its own quote section. Ported from Canberra. */
function serviceContentHtml(svc) {
  return '<section class="section"><div class="container narrow prose">' +
      renderBlocks(svc.blocks) +
    "</div></section>" +
    testimonialsSection() + ctaBand(svc.ctaText, svc.ctaHeading, svc.ctaBody);
}

function areaContentHtml(area) {
  const detail = area.localDetail
    ? [].concat(area.localDetail).map(t => "<p>" + esc(t) + "</p>").join("")
    : "";
  const featured = area.services && area.services.length
    ? cfg.services.filter(s => area.services.indexOf(s.page) !== -1)
    : cfg.services;
  return '<section class="section"><div class="container narrow">' +
      area.intro.map(t => '<p class="lead">' + esc(t) + "</p>").join("") + detail +
    "</div></section>" +
    '<section class="section section-alt"><div class="container">' +
      "<h2>" + UI.servicesInPrefix + " " + esc(area.name) + "</h2>" +
      '<div class="grid-3">' + serviceCards(featured) + "</div>" +
      '<p class="center"><a class="text-link" href="' + pathFor("index.html") + '">' + UI.backHome + " &rarr;</a></p>" +
    "</div></section>" +
    howItWorksSection(true) +
    (area.faqs && area.faqs.length
      ? '<section class="section section-alt"><div class="container narrow">' +
          "<h2>" + esc(area.name) + ": " + UI.faqTitle + "</h2>" + faqItems(area.faqs) +
        "</div></section>"
      : "") +
    ctaBand(area.ctaText || cfg.pages.home.ctaText);
}

/* about/privacy render from their own cfg.pages.X.blocks array - the same
   block system as services - rather than the template's hardcoded English,
   which described a different form and a different data flow than this
   build's drafts (ported from Canberra Tiling). About keeps the template's
   quote section below the blocks: contact is a section of About on this
   build, not a page, and About's own "#quote" link targets it. The
   template's auto-generated contact lines are dropped, because the About
   draft carries its own Contact block. */
function aboutContentHtml() {
  return '<section class="section"><div class="container narrow prose">' +
      renderBlocks(cfg.pages.about.blocks) +
    "</div></section>" +
    photosSection() +
    '<section class="section section-alt" id="quote"><div class="container narrow">' +
      "<h2>" + esc(cfg.contact.formHeadline) + "</h2>" +
      /* richText, not esc: this line is the collection notice sitting directly
         above the form, and it has to be able to link to the privacy policy.
         See the consent note on contact.reassurance in config. */
      '<p class="reassurance">' + richText(cfg.contact.reassurance) + "</p>" +
      quoteFormHtml({}) +
    "</div></section>" +
    faqsSection();
}


function privacyContentHtml() {
  const p = cfg.pages.privacy;
  return '<section class="section"><div class="container narrow prose">' +
      "<p><em>Last updated: " + esc(p.lastUpdated) + "</em></p>" +
      renderBlocks(p.blocks) +
    "</div></section>";
}

const page = (dataPage, headHtml, mainInner, file) => `<!DOCTYPE html>
<html lang="en" data-style="${themeStyle()}" data-pattern="${themePattern()}">
<head>
${headHtml}
</head>
<body data-page="${dataPage}">
  <a class="skip-link" href="#main">Skip to content</a>
  ${noscript}
  <header id="site-header">${headerHtml(file)}</header>
  <main id="main">
${mainInner}
  </main>
  <footer id="site-footer">${footerHtml()}</footer>
</body>
</html>
`;

/* ---------- page list (single source of truth for pages + sitemap) ------- */

function buildPages() {
  const files = [];

  /* pageHasForm is set before each page renders, so quote CTAs on that page
     resolve to its own #quote or fall back to About's. */
  pageHasForm = blocksHaveForm(cfg.pages.home.blocks);
  files.push(["index.html", page("home",
    head({
      title: cfg.pages.home.metaTitle, description: cfg.pages.home.metaDescription, file: "index.html",
      faqs: faqsFromBlocks(cfg.pages.home.blocks)
    }),
    heroMain(cfg.pages.home, cfg.pages.home.image, homeContentHtml()),
    "index.html")]);

  for (const svc of cfg.services) {
    pageHasForm = blocksHaveForm(svc.blocks);
    files.push([svc.page, page("service",
      head({
        title: svc.metaTitle, description: svc.metaDescription, file: svc.page,
        faqs: faqsFromBlocks(svc.blocks),
        extraSchemas: [
          serviceSchema(svc, canonicalFor(svc.page)),
          breadcrumbSchema(svc.name, canonicalFor(svc.page))
        ]
      }),
      heroMain(svc, svc.image, serviceContentHtml(svc)),
      svc.page)]);
  }

  for (const area of cfg.areas || []) {
    const file = areaFile(area);
    pageHasForm = false;
    files.push([file, page("area",
      head({
        title: area.metaTitle, description: area.metaDescription, file: file, faqs: area.faqs,
        extraSchemas: [breadcrumbSchema(area.name, canonicalFor(file))]
      }),
      heroMain(area, null, areaContentHtml(area)),
      file)]);
  }

  pageHasForm = true; // About always carries the quote section
  files.push(["about.html", page("about",
    head({
      title: cfg.pages.about.metaTitle, description: cfg.pages.about.metaDescription, file: "about.html",
      faqs: faqsFromBlocks(cfg.pages.about.blocks).concat(cfg.about.faqs || []),
      extraSchemas: [breadcrumbSchema(cfg.pages.about.headline, canonicalFor("about.html"))]
    }),
    pageHeadMain(cfg.pages.about.headline, aboutContentHtml()),
    "about.html")]);

  pageHasForm = blocksHaveForm(cfg.pages.privacy.blocks);
  files.push(["privacy.html", page("privacy",
    head({
      title: cfg.pages.privacy.metaTitle, description: cfg.pages.privacy.metaDescription, file: "privacy.html",
      faqs: faqsFromBlocks(cfg.pages.privacy.blocks),
      extraSchemas: [breadcrumbSchema(cfg.pages.privacy.headline, canonicalFor("privacy.html"))]
    }),
    pageHeadMain(cfg.pages.privacy.headline, privacyContentHtml()),
    "privacy.html")]);

  return files;
}

/* The form and its wrapper carry fixed ids (#quote, #quote-form, #qf-*), so
   a page may hold at most one. About already has the quote section, so its
   blocks may hold none. */
function validateForms() {
  const count = blocks => (blocks || []).filter(b => b.type === "form").length;
  const pages = [["pages.home", cfg.pages.home.blocks, 1], ["pages.about", cfg.pages.about.blocks, 0],
    ["pages.privacy", cfg.pages.privacy.blocks, 1]]
    .concat(cfg.services.map((s, i) => ["services[" + i + "]", s.blocks, 1]));
  return pages.filter(([, blocks, max]) => count(blocks) > max).map(([label, blocks, max]) =>
    label + " has " + count(blocks) + " form blocks (max " + max + ") - duplicate #quote/#quote-form ids");
}

/* Area slugs must not overwrite core pages or service pages. */
function validateAreaSlugs() {
  const servicePages = cfg.services.map(s => s.page);
  const seen = new Set();
  const problems = [];
  for (const area of cfg.areas || []) {
    if (!area.slug || !/^[a-z0-9][a-z0-9-]*$/.test(area.slug)) {
      problems.push('area "' + (area.name || "?") + '" has an invalid slug: "' + area.slug +
        '" (lowercase letters, digits, hyphens only)');
      continue;
    }
    const file = areaFile(area);
    if (CORE_PAGES.includes(file) || servicePages.includes(file)) {
      problems.push('area slug "' + area.slug + '" collides with existing page ' + file);
    }
    if (seen.has(file)) {
      problems.push('duplicate area slug "' + area.slug + '"');
    }
    seen.add(file);
  }
  return problems;
}

/* ---------- derived static files ----------------------------------------- */

const cnameContent = () => hostOf(cfg.domain) + "\n";

const robotsContent = () => "User-agent: *\nAllow: /\n\nSitemap: " +
  cfg.domain + "/sitemap.xml\n";

const sitemapContent = pageNames =>
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  pageNames.map(f => "  <url><loc>" + canonicalFor(f) + "</loc></url>").join("\n") +
  "\n</urlset>\n";

/* Self-contained on purpose: GitHub Pages serves 404.html for ANY missing
   path (including nested ones), so it uses absolute URLs and inline styles
   and loads no JS. */
const notFoundContent = () => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Page Not Found | ${esc(cfg.business.name)}</title>
  <meta name="robots" content="noindex">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <style>
    body {
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
                   "Helvetica Neue", Arial, sans-serif;
      color: #1b2430;
      background: ${mix(cfg.brand.color, "#ffffff", 0.055)};
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 20px;
      box-sizing: border-box;
      text-align: center;
      line-height: 1.6;
    }
    .card {
      background: #ffffff;
      border: 1px solid #dfe4e9;
      border-radius: 12px;
      padding: 40px 32px;
      max-width: 460px;
    }
    h1 { font-size: 1.7rem; margin: 0 0 0.5em; }
    p { margin: 0 0 1em; color: #55606e; }
    .brand { font-weight: 800; color: #1b2430; }
    a.btn {
      display: inline-block;
      background: ${cfg.brand.color};
      color: ${cfg.brand.colorContrast};
      font-weight: 700;
      text-decoration: none;
      padding: 13px 24px;
      border-radius: 10px;
      margin-top: 6px;
    }
    a.tel { color: ${cfg.brand.color}; font-weight: 700; }
  </style>
</head>
<body>
  <div class="card">
    <h1>Page not found</h1>
    <p>That page doesn&#8217;t exist or has moved, but we&#8217;re still easy to reach.</p>
    <p><span class="brand">${esc(cfg.business.name)}</span>${cfg.business.phone ? "<br>\n       Call " +
      '<a class="tel" href="tel:' + cfg.business.phone + '">' + esc(cfg.business.phoneDisplay) + "</a>" : ""}</p>
    <a class="btn" href="/">Back to homepage</a>
  </div>
</body>
</html>
`;

/* Favicon corner radius follows the theme style so even the tab icon
   matches the site's personality. */
const FAVICON_RX = { classic: 13, bold: 18, soft: 26, sharp: 5, elegant: 10 };

const faviconContent = () => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <!-- Generated by bake.js from the brand color + style in config.js. -->
  <rect width="64" height="64" rx="${FAVICON_RX[themeStyle()] || 13}" fill="${cfg.brand.color}"/>
  <path d="M15 31 L32 17 L49 31" fill="none" stroke="${cfg.brand.colorContrast}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M21 32 V45 A3 3 0 0 0 24 48 H40 A3 3 0 0 0 43 45 V32" fill="none" stroke="${cfg.brand.colorContrast}" stroke-width="5" stroke-linecap="round"/>
</svg>
`;

/* ---------- bake (write mode) --------------------------------------------- */

function bake() {
  const problems = [...validateTheme(), ...validateAreaSlugs(), ...validateForms(), ...buildGates()];
  if (problems.length) {
    console.error("Cannot bake - fix these entries in config.js first:");
    problems.forEach(p => console.error("  ✖ " + p));
    process.exitCode = 1;
    return;
  }

  const pages = buildPages();
  for (const [name, html] of pages) {
    fs.writeFileSync(path.join(__dirname, name), html, "utf8");
    console.log("baked " + name);
  }

  const pageNames = pages.map(([name]) => name);
  const aux = [
    ["CNAME", cnameContent()],
    ["robots.txt", robotsContent()],
    ["sitemap.xml", sitemapContent(pageNames)],
    ["404.html", notFoundContent()],
    ["favicon.svg", faviconContent()]
  ];
  for (const [name, content] of aux) {
    fs.writeFileSync(path.join(__dirname, name), content, "utf8");
    console.log("baked " + name);
  }

  // Flag leftover pages (e.g. an area removed from config, or a renamed
  // service stub) — they aren't in the sitemap and should be deleted.
  const expected = new Set([...pageNames, "404.html"]);
  const stale = fs.readdirSync(__dirname)
    .filter(f => f.endsWith(".html") && !expected.has(f));
  if (stale.length) {
    console.warn("\n⚠ Stale pages on disk not generated from config (delete them?):");
    stale.forEach(f => console.warn("  - " + f));
  }

  console.log("\nDone. Commit the regenerated files.");
  console.log("Before launch, run:  node bake.js --check");
}

/* ---------- build/ artefact guards (G1 to G10) -----------------------------
   The five artefacts under build/ are the build's record: what was decided,
   what is owed, and what has been proved. PLAYBOOK.md gives each task a gate;
   these guards make the mechanical half of those gates enforceable, so a gate
   cannot be passed by saying it was passed.

   G1 (constants frozen) and G3 (page plan signed off) block `node bake.js`.
   The other eight are reported by --check.

   Every guard stays OFF while config.js is still the unpopulated template,
   because there is no build behind it to check.

   Why these exist: on Perth Tiling Specialists a commit called "freeze the
   phase 2 constants" left ingestUrl, ingestSecret and email on placeholders;
   the site deployed and was indexed while preflight was failing on 19 items,
   including a [VERIFY] token in served HTML, six images that 404ed for two
   days and a Turnstile key that was invalid for three; and the page plan the
   copy was drafted against never reached the repo at all. */

const BUILD_DIR = "build";

const normKey = s => String(s || "").toLowerCase().replace(/[^a-z0-9]+/g, "");
const cutTo = (s, n) => (String(s).length > n ? String(s).slice(0, n - 3) + "..." : String(s));
const cleanCell = s => String(s || "").trim().replace(/^`+|`+$/g, "").trim();

/* The stock config that ships with the template. No build, nothing to check. */
const isStockTemplate = () =>
  /yourdomain\.com/i.test(String(cfg.domain || "")) ||
  /\bSpringfield\b/.test(String((cfg.business && cfg.business.name) || ""));

const readRepo = rel => {
  try { return fs.readFileSync(path.join(__dirname, rel), "utf8"); }
  catch (e) { return null; }
};
const readBuild = rel => readRepo(path.join(BUILD_DIR, rel));

/* Everything under a "## <heading>" up to the next "## ". */
function sectionOf(raw, heading) {
  if (!raw) return "";
  const esc = heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const lines = raw.split(/\r?\n/);
  const start = lines.findIndex(l => new RegExp("^##\\s+" + esc + "\\s*$", "i").test(l));
  if (start === -1) return "";
  const rest = lines.slice(start + 1);
  const end = rest.findIndex(l => /^##\s/.test(l));
  return (end === -1 ? rest : rest.slice(0, end)).join("\n");
}

/* "Status: FROZEN | 12 September 2026" -> "FROZEN". Anything after the pipe
   is a human note, not the status. */
function statusWord(raw, label) {
  if (!raw) return null;
  const m = raw.match(new RegExp("^" + label + ":[ \\t]*(.+)$", "mi"));
  return m ? m[1].split("|")[0].trim().toUpperCase() : null;
}

/* Markdown table rows in a section, separator dropped. A cell may contain an
   escaped pipe (\|), which page titles routinely do. */
function tableRows(raw, heading) {
  const rows = [];
  for (const l of sectionOf(raw, heading).split(/\r?\n/)) {
    if (!/^\s*\|/.test(l)) continue;
    const cells = l.trim().replace(/^\|/, "").replace(/\|$/, "")
      .split(/(?<!\\)\|/).map(c => c.replace(/\\\|/g, "|").trim());
    if (cells.length && cells.every(c => /^:?-{2,}:?$/.test(c))) continue;
    rows.push(cells);
  }
  return rows;
}

/* Two-column "| field | value |" tables, merged across several sections. */
function fieldMap(raw, headings) {
  const out = {};
  for (const h of headings) {
    for (const r of tableRows(raw, h)) {
      if (r.length < 2) continue;
      const k = normKey(r[0]);
      if (!k || k === "field") continue;
      out[k] = cleanCell(r[1]);
    }
  }
  return out;
}

/* Rows of a headed table as objects, keyed by normalised column name. */
function tableObjects(raw, heading) {
  const rows = tableRows(raw, heading);
  if (rows.length < 2) return [];
  const head = rows[0].map((h, i) => normKey(h) || "col" + i);
  return rows.slice(1).map(r => {
    const o = {};
    head.forEach((h, i) => { o[h] = cleanCell(r[i]); });
    return o;
  });
}

const hasToken = s => /\[NEEDS INPUT/i.test(String(s || ""));

/* file -> the head config.js actually bakes for it. */
function configHeads() {
  const m = new Map();
  const p = cfg.pages || {};
  if (p.home) m.set("index.html", { title: p.home.metaTitle, meta: p.home.metaDescription, h1: p.home.headline });
  if (p.about) m.set("about.html", { title: p.about.metaTitle, meta: p.about.metaDescription, h1: p.about.headline });
  if (p.privacy) m.set("privacy.html", { title: p.privacy.metaTitle, meta: p.privacy.metaDescription, h1: p.privacy.headline });
  for (const s of cfg.services || []) {
    m.set(s.page, { title: s.metaTitle, meta: s.metaDescription, h1: s.headline });
  }
  return m;
}

/* G1. Constants frozen, and config.js agrees with them. Blocks the bake. */
function g1Constants() {
  const out = [];
  const raw = readBuild("02-constants.md");
  if (raw === null) {
    return ["G1 build/02-constants.md is missing. Copy it from the template " +
      "and fill it (PLAYBOOK.md T07 to T16)."];
  }
  const st = statusWord(raw, "Status");
  if (st !== "FROZEN") {
    out.push("G1 build/02-constants.md Status is \"" + (st || "unset") +
      "\", not FROZEN (PLAYBOOK.md T16). Fill the values, do not change the " +
      "status to unblock the bake.");
  }
  const tokens = raw.match(/\[NEEDS INPUT[^\]]*\]/gi) || [];
  if (tokens.length) {
    out.push("G1 build/02-constants.md still owes " + tokens.length +
      " value(s), first: " + cutTo(tokens[0], 70));
  }
  const f = fieldMap(raw, ["Identity", "Infrastructure"]);
  const b = cfg.business || {};
  const pairs = [
    ["brand", b.name, "business.name"],
    ["domain", cfg.domain, "domain"],
    ["phonee164", b.phone, "business.phone"],
    ["phonedisplay", b.phoneDisplay, "business.phoneDisplay"],
    ["email", b.email, "business.email"],
    ["ga4measurementid", cfg.ga4Id, "ga4Id"],
    ["turnstilesitekey", cfg.turnstileSiteKey, "turnstileSiteKey"],
    ["ingesturl", cfg.ingestUrl, "ingestUrl"]
  ];
  for (const [key, actual, where] of pairs) {
    const want = f[key];
    if (want === undefined) {
      out.push("G1 build/02-constants.md has no \"" + key + "\" row in Identity " +
        "or Infrastructure (the guard reads those labels literally)");
      continue;
    }
    if (hasToken(want)) continue;          // already counted above
    const got = String(actual == null ? "" : actual);
    const blank = /^(none|n\/a|not set|unset)$/i.test(want);
    if (blank ? got !== "" : want !== got) {
      out.push("G1 constants disagree: build/02-constants.md \"" + key + "\" is \"" +
        cutTo(want, 50) + "\" but config.js " + where + " is \"" + cutTo(got, 50) + "\"");
    }
  }
  return out;
}

/* G3. Page plan signed off, and it matches what config.js bakes. Blocks the
   bake, because transcribing copy against an unapproved plan is what made
   "which page, which H1" a question that was still open at the last commit. */
function g3Plan() {
  const out = [];
  const raw = readBuild("03-plan.md");
  if (raw === null) {
    return ["G3 build/03-plan.md is missing. Copy it from the template and " +
      "fill it (PLAYBOOK.md T17 to T19)."];
  }
  const st = statusWord(raw, "Status");
  if (st !== "SIGNED-OFF") {
    out.push("G3 build/03-plan.md Status is \"" + (st || "unset") +
      "\", not SIGNED-OFF (PLAYBOOK.md T19)");
  }
  const heads = configHeads();
  const inv = tableObjects(raw, "Inventory").filter(r => r.file && !hasToken(r.file));
  const invByFile = new Map(inv.map(r => [r.file, r]));
  const planHeads = new Map(tableObjects(raw, "Head")
    .filter(r => r.file && !hasToken(r.file)).map(r => [r.file, r]));

  for (const [file, h] of heads) {
    const row = invByFile.get(file);
    if (!row) {
      out.push("G3 config.js bakes " + file + " but build/03-plan.md Inventory has no row for it");
      continue;
    }
    if (!row.templatefit) {
      out.push("G3 build/03-plan.md Inventory row " + file + " has an empty Template fit cell (PLAYBOOK.md T18)");
    }
    const p = planHeads.get(file);
    if (!p) {
      out.push("G3 build/03-plan.md Head has no row for " + file);
      continue;
    }
    const cmp = [["title", p.title, h.title], ["meta", p.meta, h.meta], ["h1", p.h1, h.h1]];
    for (const [what, planned, baked] of cmp) {
      if (hasToken(planned)) continue;
      if (String(planned || "") !== String(baked || "")) {
        out.push("G3 " + file + " " + what + " differs: plan has \"" + cutTo(planned, 45) +
          "\", config.js has \"" + cutTo(baked, 45) + "\" (change the plan and re-sign it, " +
          "or fix config.js)");
      }
    }
  }
  for (const row of inv) {
    if (!heads.has(row.file) && !/dropped/i.test(row.templatefit || "")) {
      out.push("G3 build/03-plan.md Inventory lists " + row.file +
        " but config.js does not bake it (mark it dropped, or build it)");
    }
  }
  return out;
}

/* G2. Market read written down, its data files on disk, and every planned
   page carrying its own SERP ownership row rather than inheriting the head
   term's. */
function g2Market() {
  const out = [];
  const raw = readBuild("01-market.md");
  if (raw === null) return ["G2 build/01-market.md is missing (PLAYBOOK.md T01 to T06)"];
  const st = statusWord(raw, "Status");
  if (st !== "GO") {
    out.push("G2 build/01-market.md Status is \"" + (st || "unset") + "\", not GO (PLAYBOOK.md T06)");
  }
  for (const r of tableObjects(raw, "Data files")) {
    const f = r.file;
    if (!f || hasToken(f)) continue;
    if (!exists(f)) out.push("G2 build/01-market.md Data files lists " + f + ", which is not on disk");
  }
  const plan = readBuild("03-plan.md");
  if (plan) {
    const serp = tableObjects(raw, "SERP ownership")
      .filter(r => r.query).map(r => ({ key: normKey(r.query), row: r }));
    /* A row that exists but says "not read" is not a SERP read. */
    const unread = v => !v || /^(not read|never read|unknown|n\/a|tbd|none)$/i
      .test(String(v).replace(/\*/g, "").trim());
    for (const row of tableObjects(plan, "Inventory")) {
      const kw = row.primarykeyword;
      if (!row.file || hasToken(row.file) || !kw || hasToken(kw) || /^(n\/a|none)$/i.test(kw)) continue;
      if (/dropped/i.test(row.templatefit || "")) continue;
      /* A primary keyword may carry alternates ("tiler perth / tiling perth").
         Any one of them having its own row satisfies the rule. Matching is
         exact: a row has to name the query the page actually targets. */
      const wanted = kw.split("/").map(normKey).filter(Boolean);
      if (!wanted.length) continue;
      const hit = serp.find(s => wanted.includes(s.key));
      if (!hit) {
        out.push("G2 " + row.file + " targets \"" + cutTo(kw, 40) +
          "\" but build/01-market.md has no SERP ownership row for it (PLAYBOOK.md T03)");
      } else if (unread(hit.row.winnable) || unread(hit.row.top3domains)) {
        out.push("G2 " + row.file + " has a SERP ownership row for \"" + cutTo(kw, 32) +
          "\" but it was never read: no top 3 domains, or no verdict (PLAYBOOK.md T03)");
      }
    }
  }
  return out;
}

/* G4. Every high-risk claim sourced or dropped before drafting. */
function g4Evidence() {
  const out = [];
  const raw = readBuild("03-plan.md");
  if (raw === null) return [];        // G3 already reported the missing file
  const ev = statusWord(raw, "Evidence");
  if (ev !== "CLEAR") {
    out.push("G4 build/03-plan.md Evidence is \"" + (ev || "unset") + "\", not CLEAR (PLAYBOOK.md T20)");
  }
  for (const r of tableObjects(raw, "Claim register")) {
    const claim = r.claimasitwillappear || r.claim || "";
    if (!claim || hasToken(claim)) continue;
    const status = (r.status || "").toLowerCase();
    if (!/^(sourced|dropped)$/.test(status)) {
      out.push("G4 claim register row \"" + cutTo(claim, 45) + "\" is \"" +
        (status || "blank") + "\", not sourced or dropped");
      continue;
    }
    if (status === "sourced" && (!r.source || !r.datechecked)) {
      out.push("G4 claim register row \"" + cutTo(claim, 45) +
        "\" is sourced but has no source or no date checked");
    }
  }
  return out;
}

/* G5. Every page config.js bakes has an approved copy file whose head matches. */
function g5Copy() {
  const out = [];
  for (const [file, h] of configHeads()) {
    const route = file.replace(/\.html$/, "");
    const raw = readBuild(path.join("04-copy", route + ".md"));
    if (raw === null) {
      out.push("G5 " + file + " has no copy file at build/04-copy/" + route +
        ".md (PLAYBOOK.md T21, T22)");
      continue;
    }
    const st = statusWord(raw, "Status");
    if (st !== "APPROVED") {
      out.push("G5 build/04-copy/" + route + ".md Status is \"" + (st || "unset") +
        "\", not APPROVED (PLAYBOOK.md T22)");
    }
    const f = fieldMap(raw, ["Head"]);
    const cmp = [["title", f.title, h.title], ["meta", f.meta, h.meta], ["h1", f.h1, h.h1]];
    for (const [what, drafted, baked] of cmp) {
      if (drafted === undefined || hasToken(drafted)) continue;
      if (String(drafted) !== String(baked || "")) {
        out.push("G5 build/04-copy/" + route + ".md " + what + " differs from config.js: \"" +
          cutTo(drafted, 40) + "\" against \"" + cutTo(baked, 40) + "\"");
      }
    }
  }
  return out;
}

/* G6. Every divergence from the template is either backported or carries a
   written reason. The step skipped on every build so far. */
function g6Backport() {
  const out = [];
  const readme = readRepo("README.md");
  const log = readBuild("05-log.md");
  if (!readme || !log) return out;
  /* A README can carry more than one Divergence section, so scan rather than
     split: collect every "### " heading while inside one. */
  const headings = [];
  let inside = false;
  for (const line of readme.split(/\r?\n/)) {
    if (/^##\s/.test(line)) inside = /^##\s+Divergence from the template\s*$/i.test(line);
    else if (inside && /^###\s+/.test(line)) headings.push(line.replace(/^###\s+/, "").trim());
  }
  if (!headings.length) return out;
  const rows = tableObjects(log, "Backport")
    .map(r => normKey(r.divergence)).filter(k => k && !k.startsWith("needsinput"));
  for (const h of headings) {
    const key = normKey(h).slice(0, 20);
    if (!key) continue;
    if (!rows.some(r => r.includes(key))) {
      out.push("G6 README.md divergence \"" + cutTo(h, 50) +
        "\" has no row in build/05-log.md Backport (PLAYBOOK.md T30)");
    }
  }
  return out;
}

/* G7. Launch readiness: nothing blocking is still open, and a QA pass is a
   pass on evidence rather than on assertion. */
function g7Launch() {
  const out = [];
  const warn = [];
  const log = readBuild("05-log.md");
  if (log === null) return { errors: ["G7 build/05-log.md is missing"], warnings: warn };

  for (const r of tableObjects(log, "Open items")) {
    if (!r.item || hasToken(r.item)) continue;
    if (normKey(r.blocks) === "launch" && !r.closingevidence) {
      out.push("G7 open item \"" + cutTo(r.item, 50) +
        "\" blocks launch and has no closing evidence (build/05-log.md)");
    }
  }

  const REQUIRED_QA = [
    "no-js crawl", "console errors", "layout", "pagespeed", "internal links",
    "sitemap", "notice above form", "preflight on deployed commit",
    "form end to end", "call routes and logs", "greeting_audio_url",
    "greeting_text", "ga4 realtime", "single indexable hostname",
    "operator files not served"
  ];
  const qa = tableObjects(log, "QA");
  const byCheck = new Map(qa.map(r => [normKey(r.check), r]));
  const status = statusWord(sectionOf(log, "QA"), "Status");
  const notPassed = v => /^(not done|fail|failed|partial|stale|skipped|n\/a|tbd)$/i
    .test(String(v || "").replace(/\*/g, "").trim());
  if (status === "PASS") {
    for (const name of REQUIRED_QA) {
      const row = byCheck.get(normKey(name));
      if (!row) { out.push("G7 QA is PASS but has no \"" + name + "\" row"); continue; }
      if (!row.result || hasToken(row.result)) out.push("G7 QA row \"" + name + "\" has no result");
      else if (notPassed(row.result)) {
        out.push("G7 QA is PASS but row \"" + name + "\" reads \"" + row.result + "\"");
      } else if (!row.evidence || hasToken(row.evidence)) {
        out.push("G7 QA row \"" + name + "\" has no evidence");
      }
    }
  } else {
    warn.push("build/05-log.md QA Status is \"" + (status || "unset") +
      "\", not PASS: this build is not cleared for indexing (PLAYBOOK.md T28)");
  }
  return { errors: out, warnings: warn };
}

/* G8. The collection notice the privacy position depends on, on both
   channels, and the artefact holding the same words as the live config.
   See PLAYBOOK.md Appendix A, R3 and R4. */
function g8Notices() {
  const out = [];
  const warn = [];
  const notice = String((cfg.contact && cfg.contact.reassurance) || "");
  if (!notice) {
    out.push("G8 contact.reassurance is empty: the web form carries no collection notice (R4)");
  } else {
    if (!/pays?\s+for\s+the\s+(enquiry|lead)/i.test(notice)) {
      out.push("G8 contact.reassurance does not say the contractor pays for the enquiry (R3, R4)");
    }
    if (!/\]\([^)]*privacy[^)]*\)/i.test(notice)) {
      out.push("G8 contact.reassurance has no link to the privacy policy (R4)");
    }
  }
  const raw = readBuild("02-constants.md");
  if (raw !== null) {
    const section = sectionOf(raw, "Collection notices");
    if (notice && section.indexOf(notice) === -1) {
      out.push("G8 build/02-constants.md Collection notices does not carry the exact " +
        "contact.reassurance text that config.js ships (paste it verbatim)");
    }
    const f = fieldMap(raw, ["Collection notices"]);
    for (const key of ["greetingaudiourlset", "greetingtextset"]) {
      const v = f[key];
      /* "Y", or "Y" followed by a caveat, both count as set. */
      if (v === undefined || hasToken(v) || !/^y(es)?\b/i.test(v)) {
        warn.push("build/02-constants.md " + key + " is not Y: the phone channel carries " +
          "no collection notice until both columns are set (R4)");
      }
    }
  }
  return { errors: out, warnings: warn };
}

/* G9. An image referenced by config.js but never committed is a 404 on the
   live site. Six of them were, for two days. */
function g9Images() {
  const out = [];
  let tracked = null;
  try {
    tracked = new Set(require("child_process")
      .execFileSync("git", ["ls-files"], { cwd: __dirname, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] })
      .split(/\r?\n/).filter(Boolean).map(p => p.replace(/\\/g, "/")));
  } catch (e) {
    return [];                        // not a git repo, or no git: nothing to check against
  }
  const seen = new Set();
  (function walk(node) {
    if (Array.isArray(node)) return node.forEach(walk);
    if (!node || typeof node !== "object") return;
    if (typeof node.src === "string") {
      seen.add(node.src);
      if (Array.isArray(node.widths)) {
        const dot = node.src.lastIndexOf(".");
        if (dot > -1) {
          node.widths.forEach(w => seen.add(node.src.slice(0, dot) + "-" + w + node.src.slice(dot)));
        }
      }
    }
    Object.keys(node).forEach(k => walk(node[k]));
  })(cfg);
  for (const src of seen) {
    const rel = src.replace(/\\/g, "/");
    if (exists(rel) && !tracked.has(rel)) {
      out.push("G9 " + rel + " is on disk but not tracked by git: it will 404 on the live site");
    }
  }
  return out;
}

/* G10. One indexable copy of the site, and operator notes not served from it.
   See PLAYBOOK.md Appendix A, R5. */
function g10Exposure() {
  const out = [];
  const wrangler = readRepo("wrangler.jsonc") || readRepo("wrangler.toml");
  if (wrangler) {
    if (!/workers_dev"?\s*[:=]\s*false/.test(wrangler)) {
      out.push("G10 wrangler config does not set workers_dev to false: Cloudflare will " +
        "publish a second fully crawlable copy of the site at *.workers.dev (R5)");
    }
    return out;
  }
  const NEVER_SERVE = ["README.md", "PLAYBOOK.md", "CODE-SESSION-START.md",
    "TEMPLATE_SUMMARY.md", "New site prompt.txt", "bake.js", "build"];
  const yml = readRepo("_config.yml");
  if (yml === null) {
    out.push("G10 _config.yml is missing: GitHub Pages serves every file in the repo, " +
      "including the playbook and the build notes, from the live domain (R5)");
    return out;
  }
  for (const f of NEVER_SERVE) {
    if (!exists(f) && f !== "build") continue;
    if (yml.indexOf(f) === -1) {
      out.push("G10 _config.yml does not exclude " + f + ": it is served from the live domain (R5)");
    }
  }
  return out;
}

/* The two that block the bake. */
function buildGates() {
  if (isStockTemplate()) return [];
  return [...g1Constants(), ...g3Plan()];
}

/* Everything, for --check. */
function buildGuards() {
  if (isStockTemplate()) {
    return { errors: [], warnings: [], skipped: true };
  }
  const launch = g7Launch();
  const notices = g8Notices();
  return {
    errors: [
      ...g1Constants(), ...g2Market(), ...g3Plan(), ...g4Evidence(), ...g5Copy(),
      ...g6Backport(), ...launch.errors, ...notices.errors, ...g9Images(), ...g10Exposure()
    ],
    warnings: [...launch.warnings, ...notices.warnings],
    skipped: false
  };
}

/* ---------- preflight (--check mode) --------------------------------------
   Writes nothing. Checks config + the files on disk as they are. */

function runCheck() {
  /* Two separate classes, reported and counted separately (both fatal):
       unfinished — content that's flagged as not-yet-real: bracket tokens
         ([VERIFY: ...], [NEEDS INPUT: ...], [BUILD GATE: ...], any
         [UPPERCASE_TOKEN]) and every { type: "marker" } block, wherever it
         appears in config, whether or not its text has bracket syntax.
       preflight — everything else: template leftovers, missing IDs, broken
         file references, drift, banned schema types, etc. */
  const unfinished = [];
  const errors = [];
  const warnings = [];
  const read = f => {
    try { return fs.readFileSync(path.join(__dirname, f), "utf8"); }
    catch (e) { return null; }
  };
  const trunc = s => s.length > 60 ? s.slice(0, 57) + "..." : s;

  /* -- 1a. unfinished-content scan over every string VALUE in config ------ */
  const UNFINISHED_PATTERNS = [
    [/\[VERIFY[:\]]/i, "[VERIFY: ...] placeholder"],
    [/\[NEEDS INPUT[:\]]/i, "[NEEDS INPUT: ...] placeholder"],
    [/\[BUILD GATE[:\]]/i, "[BUILD GATE: ...] placeholder"],
    [/\[[A-Z][A-Z0-9_ ]*\]/, "[UPPERCASE_TOKEN] placeholder"]
  ];
  /* -- 1b. leftover-filler scan (preflight, Class B) ----------------------- */
  const PLACEHOLDER_PATTERNS = [
    [/yourdomain/i, "placeholder domain"],
    [/\bSpringfield\b/, "placeholder city \"Springfield\""],
    [/\(?555\)?[ .\-]?\d{3}[ .\-]?\d{4}|\+?1?555\d{7}/, "555 placeholder phone number"],
    [/YOUR_/, "\"YOUR_\" placeholder"],
    [/lorem\s+ipsum/i, "lorem-ipsum filler"],
    [/\b(?:TODO|TBD|FIXME)\b/, "TODO/TBD/FIXME filler"]
  ];
  /* -- 1c. author-voice scan (preflight, Class B) --------------------------
     Notes written to the operator rather than to a reader: decision logs,
     "not urgent", "no source found yet", internal marker jargon. Every string
     value in config is rendered to the public site, so this kind of working
     note belongs in a "TODO (Brad):" code comment instead.

     The patterns are deliberately narrow — a hit should mean real author-voice
     copy, not a pattern that needs loosening. If one ever fires on legitimate
     reader copy, reword the copy. Note there is deliberately no pattern on
     "worth doing" / "worth getting": those are ordinary reader copy ("when a
     repair is worth doing") and false-positive in practice. */
  const AUTHOR_VOICE_PATTERNS = [
    [/\bDecision \(\d/, "dated decision log"],
    [/\bnot urgent\b/i, "priority note"],
    [/\bat some point\b/i, "deferred-work note"],
    [/\bpending (?:real )?data\b/i, "outstanding-research note"],
    [/\bno (?:[A-Za-z-]+ )?source (?:has been )?found\b/i, "outstanding-research note"],
    [/\bis (?:still )?not sourced\b/i, "outstanding-research note"],
    [/\bstock or generated\b/i, "imagery-sourcing note"],
    [/\bcredibility upgrade\b/i, "editorial commentary"],
    [/\btracked separately\b/i, "internal tracking note"],
    [/\bmarker\b/i, "internal marker jargon"],
    [/\b(?:config|bake)\.js\b/, "reference to the site's own source files"],
    /* The next three are from Perth Brickworks (217b7f1). A real citation and
       a note about the author's own research process happened to share a
       sentence, so notes carrying real URLs read as legitimate at first pass
       — "(already cited above for its councils)", "a live policy-document
       link could not be found (site links returned 404 at the time of
       checking)", "This is three councils, not a survey of all thirty". None
       of that is information a reader needs. */
    [/\balready cited above\b/i, "internal cross-reference note"],
    [/\b(?:returned 404|could not be found)\b/i, "failed-research admission"],
    [/\bnot a survey of all\b/i, "scope-disclosure note"],
    /* From Perth Limestone (d94c843). A review cadence is something only the
       operator has: a reader-facing caveat says "re-check before relying on
       this row", a note to self says "re-check on a fixed schedule". */
    [/\bon a fixed schedule\b/i, "maintenance-cadence note"],
    [/\bdate is updated each time\b/i, "maintenance-cadence note"]
  ];
  /* An author name inside a `note` is almost always the author auditing their
     own sourcing ("Brad knows this area firsthand") rather than information a
     reader needs. Scoped to .note rather than global so the `credit` bylines
     ("Researched and written by …") are unaffected. Set schema.founder in
     config and this fires on that name; leave it unset and the check is off.
     From Perth Brickworks (217b7f1), generalised from a hardcoded "Brad". */
  const founder = (cfg.schema && cfg.schema.founder) || "";
  const AUTHOR_VOICE_NOTE_ONLY_PATTERNS = founder
    ? [[new RegExp("\\b" + founder.split(/\s+/)[0].replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b"),
        "author self-reference"]]
    : [];
  (function walk(node, trail, inMarker) {
    if (typeof node === "string") {
      // Marker blocks are author-facing by design and already reported above.
      if (!inMarker) {
        const checks = /\.note$/.test(trail)
          ? AUTHOR_VOICE_PATTERNS.concat(AUTHOR_VOICE_NOTE_ONLY_PATTERNS)
          : AUTHOR_VOICE_PATTERNS;
        for (const [re, label] of checks) {
          if (re.test(node)) {
            errors.push("config " + trail + ": author-voice note in reader-facing " +
              "copy (" + label + ") — move it to a code comment — \"" + trunc(node) + '"');
            break;   // one report per string, not one per pattern
          }
        }
      }
      for (const [re, label] of UNFINISHED_PATTERNS) {
        if (re.test(node)) {
          unfinished.push("config " + trail + ": " + label + ' — "' + trunc(node) + '"');
        }
      }
      for (const [re, label] of PLACEHOLDER_PATTERNS) {
        if (re.test(node)) {
          errors.push("config " + trail + ": " + label + ' — "' + trunc(node) + '"');
        }
      }
    } else if (Array.isArray(node)) {
      node.forEach((v, i) => walk(v, trail + "[" + i + "]", inMarker));
    } else if (node && typeof node === "object") {
      if (node.type === "marker") {
        unfinished.push("config " + trail + ": unfinished marker block — " +
          '"' + trunc(String(node.text || "")) + '"');
        inMarker = true;
      }
      Object.keys(node).forEach(k => walk(node[k], trail ? trail + "." + k : k, inMarker));
    }
  })(cfg, "", false);

  /* -- 2. tracking / form IDs unset --------------------------------------- */
  if (!cfg.ga4Id || /X{4,}/.test(cfg.ga4Id) || !/^G-[A-Z0-9]+$/.test(cfg.ga4Id)) {
    errors.push("ga4Id is unset or a placeholder — analytics and click_to_call tracking are OFF");
  }
  if (!cfg.ingestUrl || !cfg.ingestSecret ||
      cfg.ingestUrl.indexOf("YOUR_") === 0 || cfg.ingestSecret.indexOf("YOUR_") === 0) {
    errors.push("ingestUrl/ingestSecret is unset or a placeholder — the site CANNOT capture web form leads");
  }
  if (!cfg.turnstileSiteKey) {
    errors.push("turnstileSiteKey is unset — the form has no spam protection");
  }

  /* -- 3. service page files <-> config ------------------------------------ */
  const servicePages = cfg.services.map(s => s.page);
  for (const p of servicePages) {
    if (!exists(p)) errors.push("service page file missing from disk: " + p +
      " (run node bake.js)");
  }
  /* Any .html on disk that bake.js didn't generate is orphaned — most often a
     service or area page left behind after its config entry was renamed or
     removed. It still serves, still gets crawled, and now shows stale copy
     that no longer matches config.

     This replaces a runtime guard: js/main.js used to detect an unmapped page
     at load time and replace it with a "Page not in use" notice. Now that
     bake.js is the only renderer there is nothing to detect it in the
     browser, so the check moves here — which is better anyway, since it fires
     before the stale page is ever deployed rather than after. */
  const generated = new Set(buildPages().map(([f]) => f).concat(["404.html"]));
  for (const f of fs.readdirSync(__dirname).filter(f => f.endsWith(".html"))) {
    if (!generated.has(f)) {
      errors.push("orphaned page file with no config entry: " + f +
        " — bake.js does not generate it, so its copy is frozen at whatever " +
        "config said when it was last baked (delete it, or add the config entry back)");
    }
  }

  /* -- area slug + theme validity ------------------------------------------- */
  validateAreaSlugs().forEach(p => errors.push(p));
  validateForms().forEach(p => errors.push(p));
  validateTheme().forEach(p => errors.push(p));

  /* -- 4. sitemap <-> disk -------------------------------------------------- */
  const expectedPages = buildPages().map(([name]) => name);
  const sitemapRaw = read("sitemap.xml");
  if (sitemapRaw === null) {
    errors.push("sitemap.xml is missing (run node bake.js)");
  } else {
    const locs = [...sitemapRaw.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
    /* <loc> carries the extensionless public path, so map it back to the
       file on disk before comparing. */
    const locFiles = locs.map(u => {
      const p = u.replace(/^https?:\/\/[^/]+\/?/, "");
      return p === "" ? "index.html" : p + ".html";
    });
    for (const f of locFiles) {
      if (!exists(f)) errors.push("sitemap.xml lists a page that doesn't exist on disk: " + f);
    }
    const htmlOnDisk = fs.readdirSync(__dirname)
      .filter(f => f.endsWith(".html") && f !== "404.html");
    for (const f of htmlOnDisk) {
      if (!locFiles.includes(f)) errors.push("page on disk missing from sitemap.xml: " + f);
    }
    for (const f of expectedPages) {
      if (!locFiles.includes(f)) errors.push("config expects page " + f +
        " but it's not in sitemap.xml (run node bake.js)");
    }
  }

  /* -- 5. domain consistency across config / CNAME / sitemap / robots ------ */
  const cfgHost = hostOf(cfg.domain);
  const cname = read("CNAME");
  if (cname === null) errors.push("CNAME is missing (run node bake.js)");
  else if (cname.trim() !== cfgHost) {
    errors.push("domain mismatch: CNAME has \"" + cname.trim() + "\" but config.js domain is \"" + cfgHost + "\"");
  }
  const robots = read("robots.txt");
  if (robots === null) errors.push("robots.txt is missing (run node bake.js)");
  else {
    const m = robots.match(/Sitemap:\s*(\S+)/);
    if (!m) errors.push("robots.txt has no Sitemap line");
    else if (hostOf(m[1]) !== cfgHost) {
      errors.push("domain mismatch: robots.txt sitemap points at \"" + hostOf(m[1]) + "\" but config.js domain is \"" + cfgHost + "\"");
    }
  }
  if (sitemapRaw !== null) {
    const badLoc = [...sitemapRaw.matchAll(/<loc>([^<]+)<\/loc>/g)]
      .map(m => m[1]).find(u => hostOf(u) !== cfgHost);
    if (badLoc) errors.push("domain mismatch: sitemap.xml contains " + badLoc +
      " but config.js domain is \"" + cfgHost + "\"");
  }

  /* -- 6 + 7. image references: exist on disk, have width/height ----------- */
  (function walkImages(node, trail) {
    if (Array.isArray(node)) {
      node.forEach((v, i) => walkImages(v, trail + "[" + i + "]"));
    } else if (node && typeof node === "object") {
      if (typeof node.src === "string") {
        if (!exists(node.src)) errors.push("config " + trail + ": image file not found: " + node.src);
        if (!node.width || !node.height) {
          errors.push("config " + trail + ": image entry missing width/height (" + node.src + ")");
        }
        /* Declared responsive variants must actually be on disk, or the
           browser picks a 404 for that width. Warn rather than fail: the
           plain src= fallback still works, it's just the full-size file. */
        if (node.widths && node.widths.length) {
          const dot = node.src.lastIndexOf(".");
          const base = node.src.slice(0, dot), ext = node.src.slice(dot);
          const missing = node.widths
            .map(w => base + "-" + w + ext).filter(v => !exists(v));
          if (missing.length) {
            warnings.push("config " + trail + ": declared responsive variant(s) not on disk (" +
              missing.join(", ") + ") — those srcset candidates will 404");
          }
        }
        if (node.widths && node.widths.length && !node.sizes) {
          warnings.push("config " + trail + ": has widths but no sizes string (" + node.src +
            ") — without it the browser assumes 100vw and picks a larger file than needed");
        }
      }
      Object.keys(node).forEach(k => walkImages(node[k], trail ? trail + "." + k : k));
    }
  })(cfg, "");
  if (!exists("images/og-image.png")) errors.push("images/og-image.png is missing (referenced by every page's og:image)");
  if (!exists("favicon.svg")) errors.push("favicon.svg is missing (run node bake.js)");

  /* -- 8. duplicate metaTitle / metaDescription across pages --------------- */
  const metas = [["home", cfg.pages.home],
    ["about", cfg.pages.about], ["privacy", cfg.pages.privacy]]
    .concat(cfg.services.map(s => [s.page, s]))
    .concat((cfg.areas || []).map(a => [areaFile(a), a]));
  for (const field of ["metaTitle", "metaDescription"]) {
    const byValue = {};
    for (const [label, obj] of metas) {
      const v = obj[field];
      if (!v) { errors.push(label + " is missing " + field); continue; }
      (byValue[v] = byValue[v] || []).push(label);
    }
    for (const v of Object.keys(byValue)) {
      if (byValue[v].length > 1) {
        errors.push("duplicate " + field + " shared by " + byValue[v].join(", ") +
          ': "' + (v.length > 60 ? v.slice(0, 57) + "..." : v) + '"');
      }
    }
  }

  /* -- 8b. metaTitle length -------------------------------------------------
     Under ~30 chars reads as thin to on-page SEO tools (DataForSEO flags it);
     over ~60 gets truncated in the Google result. About and privacy are the
     usual culprits, since "About {Business Name}" is the tempting default.
     Warn rather than fail — a short title is sometimes deliberate. From Perth
     Limestone (b7d406b), where an on-page audit caught a 28-char About
     title. */
  for (const [label, obj] of metas) {
    const t = obj.metaTitle;
    if (!t) continue;
    if (t.length < 30) {
      warnings.push(label + " metaTitle is only " + t.length + ' chars ("' + t +
        '") — likely to read as thin/duplicate-prone to SEO tools; aim for ' +
        '30-60, e.g. "About {Business Name} | {Service} in {City}"');
    } else if (t.length > 60) {
      warnings.push(label + " metaTitle is " + t.length + ' chars ("' + t +
        '") — likely to get truncated in the Google search result');
    }
  }

  /* -- 9. banned LocalBusiness-only schema terms while type is Organization -
     Belt-and-braces: if config still says Organization (the pre-renter
     default — see bake.js schema builders), grep every baked page for terms
     that would only be legitimate once a real premises/hours/reviews exist,
     in case a future edit reintroduces them by hand. Once schema.type is
     deliberately upgraded to a LocalBusiness subtype, this guard steps aside. */
  if (!isLocalBusiness()) {
    const BANNED_SCHEMA_TERMS = [
      "LocalBusiness", "AggregateRating", "\"@type\":\"Review\"",
      "\"@type\": \"Review\"", "priceRange", "HomeAndConstructionBusiness"
    ];
    const htmlFiles = fs.readdirSync(__dirname).filter(f => f.endsWith(".html"));
    for (const f of htmlFiles) {
      const raw = read(f);
      if (raw === null) continue;
      for (const term of BANNED_SCHEMA_TERMS) {
        if (raw.includes(term)) {
          errors.push(f + ": contains banned schema term \"" + term +
            "\" while schema.type is Organization (no renter/premises yet) — " +
            "either remove it or deliberately upgrade schema.type to a LocalBusiness subtype");
        }
      }
    }
  }

  /* -- 9b. no way to contact (warn) ---------------------------------------- */
  if (!cfg.business.phone && !cfg.business.email) {
    warnings.push("business.phone and business.email are both empty — the only way to " +
      "receive a lead is the quote form (ingestUrl/ingestSecret)");
  }

  /* -- 10. testimonials / photos populated (warn — must be REAL content) ---- */
  if (cfg.testimonials && cfg.testimonials.length) {
    warnings.push("testimonials is non-empty (" + cfg.testimonials.length +
      " entries) — make sure these are REAL, verifiable testimonials, never invented ones");
  }
  if (cfg.photos && cfg.photos.length) {
    warnings.push("photos is non-empty (" + cfg.photos.length +
      " entries) — make sure these are REAL photos from the actual business");
  }


  /* -- 11. build/ artefact guards (G1 to G10) ----------------------------
     PLAYBOOK.md gives each task a gate; these check the mechanical half of
     them against the five artefacts under build/. Off for the unpopulated
     template. */
  const guards = buildGuards();
  guards.errors.forEach(e => errors.push(e));
  guards.warnings.forEach(w => warnings.push(w));

  /* -- report --------------------------------------------------------------- */
  if (unfinished.length) {
    console.error("UNFINISHED CONTENT — " + unfinished.length +
      " item(s) not ready to publish:\n");
    unfinished.forEach(e => console.error("  ✖ " + e));
  }
  if (errors.length) {
    console.error((unfinished.length ? "\n" : "") + "PREFLIGHT PROBLEMS — " +
      errors.length + " item(s):\n");
    errors.forEach(e => console.error("  ✖ " + e));
  }
  if (warnings.length) {
    console.warn((unfinished.length || errors.length ? "\n" : "") + "Warnings:\n");
    warnings.forEach(w => console.warn("  ⚠ " + w));
  }
  const failed = unfinished.length + errors.length;
  if (!failed) {
    console.log((warnings.length ? "\n" : "") + "Preflight passed" +
      (warnings.length ? " with " + warnings.length + " warning(s)." : " — no problems found."));
  } else {
    console.error("\n" + failed + " total problem(s). Resolve every marker/bracket token from " +
      "a real source (or delete the claim it guards — never just remove the marker), fix the " +
      "config.js issues above, run node bake.js, then re-run node bake.js --check.");
    process.exitCode = 1;
  }
}

/* ---------- entry ---------------------------------------------------------- */

if (process.argv.includes("--check")) {
  runCheck();
} else {
  bake();
}
