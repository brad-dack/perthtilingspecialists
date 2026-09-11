/* =============================================================================
   SITE CONFIG — the ONLY file you edit when swapping niche/city.
   Every page on the site reads from this object at load time.
   Placeholder content below is for a generic "home services" example.
   =============================================================================
   QUICK-SWAP CHECKLIST (see README.md for details):
   1. business: name, city, state, serviceArea. phone/email/hours ship EMPTY
      on purpose — see "Unset config degrades to absent" in README. Add them
      when you have a real number/inbox/hours to publish.
   2. domain — bake.js regenerates CNAME, robots.txt, and sitemap.xml from it
   3. brand colors + theme (style/pattern — makes each site look different)
   4. ga4Id — REQUIRED before launch: analytics + call tracking stay OFF
      while the X placeholder is in place
   5. ingestUrl / ingestSecret — REQUIRED before launch: the form cannot
      deliver leads until these are real values. turnstileSiteKey alongside
      them, or the form ships with no spam protection.
   6. schema.type — stays "Organization" until a renter's real premises/
      hours exist. See "Schema: Organization until a renter exists" in
      README before ever changing this.
   7. services (3–5) — each is an ordered array of content BLOCKS (see the
      block-type reference in README), plus its own page filename — make it
      a keyword URL, not a numbered stub.
   8. areas (0+) — optional suburb/area pages, ships empty. See README:
      only add these once the core pages are live and genuinely different
      content exists per area.
   9. about.faqs, howItWorks, about.paragraphs, page titles/descriptions,
      contact.fields
   Then run:  node bake.js          (regenerates pages + CNAME/robots/
                                     sitemap/404/favicon)
              node bake.js --check  (preflight: fails loudly on leftover
                                     placeholders, unresolved { marker }
                                     blocks, and broken references)
============================================================================= */

window.SITE_CONFIG = {

  /* --- Core business identity ---------------------------------------------
     phone / phoneDisplay / email / hours ship EMPTY. This is deliberate,
     not an oversight: with no renter attached yet, a fake phone number
     would be worse than no phone number — it looks live but reaches no
     one. Every consumer of these fields (header, hero, footer, about,
     404 page, schema, the form's error fallback) omits the corresponding
     UI element while the field is empty, rather than rendering something
     broken. Fill them in only once there's a real line to answer. */
  business: {
    name: "Perth Tiling Specialists",
    phone: "+61895161688",       // Twilio tracking number, frozen in phase 2
    phoneDisplay: "(08) 9516 1688",
    email: "",         // leave "" until a real inbox exists
    city: "Perth",
    state: "WA",
    serviceArea: "Perth and surrounding suburbs across the metropolitan area",
    hours: ""          // e.g. "Mon–Sat, 7am–7pm" — only once a renter has real hours
  },

  /* Used for canonical URLs, schema, and OG tags. No trailing slash.
     bake.js derives CNAME, robots.txt, and sitemap.xml from this — you
     never edit those files by hand. */
  domain: "https://perthtilingspecialists.com.au",

  /* --- Brand ----------------------------------------------------------- */
  brand: {
    color: "#0b6e4f",         // primary accent (buttons, links, highlights)
    colorDark: "#08523b",     // hover/darker shade of the accent
    colorContrast: "#ffffff", // text color used ON the accent color

    /* Visual theme — pick a different combination per deployment so every
       site built from this template looks different. All tints, glows, and
       the footer color are derived automatically from `color` above.

       style   — the overall design personality:
         "classic" — clean and trustworthy; soft gradient hero
         "bold"    — full-color gradient hero, pill buttons, diagonal edge
         "soft"    — rounded everything, pale tinted sections, blob imagery
         "sharp"   — squared corners, offset shadows, uppercase headings
         "elegant" — serif display headings, thin rules, quiet and premium

       pattern — a subtle background texture on the hero and CTA band:
         "none" | "dots" | "grid" | "diagonal" | "crosshatch"              */
    style: "bold",
    pattern: "diagonal"
  },

  /* --- Tracking / integrations ----------------------------------------- */
  /* GA4 measurement ID. The snippet is only injected when this doesn't
     contain "XXXX", so the placeholder below keeps tracking OFF. */
  ga4Id: "G-WVV41F95JK",

  /* Form leads POST straight to our own ingest endpoint, not to a third-party
     form service — see rank-and-rent-backend's docs/DASHBOARD_PLAN.md, Phase 2
     Stage B. ingestUrl is the endpoint, ingestSecret is the shared secret it
     checks (light abuse resistance + the site's identity), and
     turnstileSiteKey is the Cloudflare Turnstile key used for spam filtering.
     Whichever services host the endpoint receive enquiry data, so name them in
     the privacy policy copy (see privacyContentHtml in bake.js). */
  ingestUrl: "YOUR_INGEST_URL",
  ingestSecret: "YOUR_INGEST_SECRET",
  turnstileSiteKey: "0x4AAAAAAAEHD1tLftcrbDXIx",

  /* --- Structured data ---------------------------------------------------
     Organization, sitewide, until a renter's real premises/hours exist —
     see "Schema: Organization until a renter exists" in README. No
     LocalBusiness subtype, no AggregateRating, no Review, no priceRange:
     a rank-and-rent site with nobody attached yet has no premises, no
     opening hours, no service counter, and no reviews, so those properties
     would all be invented. node bake.js --check greps the baked HTML for
     these terms and fails if they reappear while schema.type is
     "Organization". Upgrade schema.type to a real LocalBusiness subtype
     (e.g. "Plumber", "HomeAndConstructionBusiness" — see
     schema.org/LocalBusiness) only once a renter's real address, hours,
     and reviews are on the site. */
  schema: {
    type: "Organization",
    priceRange: "$$", // only used once schema.type is a LocalBusiness subtype
    /* Who actually researched and wrote the site's copy. Two uses: the
       `credit` byline on long-form pages, and a --check guard — the author's
       own name inside a `note` block is almost always them auditing their
       sourcing ("X knows this area firsthand") rather than something a reader
       needs. Leave empty to switch that guard off. */
    founder: ""
  },

  /* --- Homepage ---------------------------------------------------------- */
  pages: {
    home: {
      /* Message-match: mirror the head keyword people search for. */
      metaTitle: "Home Services in Springfield, IL | Springfield Home Services",
      metaDescription: "Local home repair and maintenance services in Springfield, IL. Free quotes, clear pricing, response within 24 hours.",
      headline: "Home Services in Springfield, IL",
      subheadline: "Repairs, installs, and maintenance for Springfield homeowners. Tell us what you need and get a free, no-obligation quote.",
      ctaText: "Get My Free Quote",
      /* Hero image. Swap niches by dropping a new file into /images and
         updating src + alt here — no code changes. Use an optimized JPG or
         WebP (~1200x800, under ~150KB). width/height prevent layout shift.
         The shipped .svg files are neutral placeholder illustrations. */
      image: {
        src: "images/hero.svg",
        alt: "Line illustration of a house, representing home services in Springfield",
        width: 1200,
        height: 800
      }
    },
    about: {
      metaTitle: "About & Contact | Springfield Home Services",
      metaDescription: "Contact Springfield Home Services for a free quote. Serving Springfield, IL and surrounding areas.",
      headline: "About & Contact"
    },
    privacy: {
      metaTitle: "Privacy Policy | Springfield Home Services",
      metaDescription: "How Springfield Home Services collects and uses the information you submit through this website.",
      headline: "Privacy Policy",
      lastUpdated: "July 12, 2026"
    }
  },

  /* Short, honest value points shown under the hero on every page.
     Keep these to claims you can actually stand behind. */
  valueProps: [
    "Free, no-obligation quotes",
    "Response within 24 hours",
    "Serving Springfield & nearby"
  ],

  /* --- How it works (shown on homepage + compact version on service pages)
     "icon" picks an inline SVG from the built-in set in bake.js:
     phone | chat | clipboard | check | calendar | wrench | bolt | home     */
  howItWorks: [
    {
      icon: "chat",
      title: "Tell us what you need",
      text: "Send a quick request — just your name, phone number, and the service you're after. It takes under a minute."
    },
    {
      icon: "clipboard",
      title: "Get a clear quote",
      text: "You'll hear back within 24 hours with questions or a straightforward quote. No pressure, no obligation."
    },
    {
      icon: "check",
      title: "Get it done",
      text: "Once you approve the quote, the work is scheduled at a time that suits you and completed as agreed."
    }
  ],

  /* --- Services (3–5 entries) --------------------------------------------
     Each entry is an ordered array of typed content BLOCKS rather than a
     fixed card layout, so real copy — headings, tables, callouts, inline
     citations — fits without fighting the template. Block types:

       h2, h3      { type: "h2", text }              section headings
       p           { type: "p", text }                paragraph
       lead        { type: "lead", text }              larger intro paragraph
       ul, ol      { type: "ul", items: [...] }        list
       table       { type: "table", caption?, headers: [...], rows: [[...]] }
       note        { type: "note", text }              sourced callout/aside
       credit      { type: "credit", text }            small citation line
       marker      { type: "marker", text }             LOUD unfinished box —
                     node bake.js --check FAILS while any remain. Fill it
                     from a real source, or delete the claim it guards.
                     Never just delete the marker itself.
       faqs        { type: "faqs", items: [{q,a}] }    FAQPage schema for
                     this page is built from exactly the faqs blocks
                     present on it — never a separate global list.
       form        { type: "form", heading?, presetService?, extraField?,
                     placeholders? }                    embeds the quote
                     form inline on this page
       image       { type: "image", src, alt, width, height, caption? }
                     illustrative images carry NO caption (a caption
                     implies authorship of real work — see README)

     `text` supports **bold**, [label](url), and newlines — escaped first,
     so config copy can never inject HTML.

     Each entry maps to its own page via "page" — make this a keyword URL
     (e.g. "plumbing-repairs.html"), not a numbered stub. */
  services: [
    {
      page: "plumbing-repairs.html",
      name: "Plumbing Repairs",
      shortDescription: "Leaks, running toilets, dripping taps, and pipe repairs — diagnosed and fixed properly.",
      metaTitle: "Plumbing Repair in Springfield, IL | Springfield Home Services",
      metaDescription: "Plumbing repair in Springfield, IL: leaks, toilets, taps, and pipes. Free quotes before any work starts.",
      headline: "Plumbing Repair in Springfield, IL",
      subheadline: "Leaking pipes, running toilets, dripping taps — get it diagnosed and fixed with a clear quote up front.",
      ctaText: "Get My Free Plumbing Quote",
      image: {
        src: "images/plumbing.svg",
        alt: "Line illustration of a water droplet, representing plumbing repair",
        width: 1200,
        height: 800
      },
      blocks: [
        { type: "lead", text: "A small leak rarely stays small. Whether it's a dripping tap that's driving you mad or a pipe that's started weeping under the sink, getting it looked at early is almost always cheaper than waiting." },
        { type: "p", text: "Describe the problem, and you'll get a straight answer about what it's likely to involve — before anyone starts work." },
        { type: "h2", text: "What's covered" },
        { type: "ul", items: [
          "Leak detection and pipe repair",
          "Toilet, tap, and fixture repairs",
          "Sink, drain, and trap issues",
          "Water pressure problems",
          "Shut-off valve replacement"
        ] },
        { type: "h2", text: "Pricing" },
        { type: "note", text: "Every quote is written and priced before any work begins, so there are no surprises on the final bill." },
        {
          type: "faqs",
          items: [
            {
              q: "How fast can someone look at a leak?",
              a: "Requests are answered within 24 hours, and urgent leaks are prioritized. If water is actively flowing, shut off the supply at the fixture or the main valve first, then get in touch."
            },
            {
              q: "Do I pay for the quote?",
              a: "No. Quotes are free and carry no obligation. You'll know the full cost before any work starts."
            },
            {
              q: "What if the problem turns out to be bigger than quoted?",
              a: "If something unexpected is found once work begins, work pauses and you get a revised quote to approve first. You'll never be surprised by the final bill."
            }
          ]
        }
      ]
    },
    {
      page: "electrical-repairs.html",
      name: "Electrical Repairs",
      shortDescription: "Outlets, switches, lighting, and fault-finding for common household electrical problems.",
      metaTitle: "Electrical Repair in Springfield, IL | Springfield Home Services",
      metaDescription: "Electrical repair in Springfield, IL: outlets, switches, lighting, and fault-finding. Free quotes before any work starts.",
      headline: "Electrical Repair in Springfield, IL",
      subheadline: "Dead outlets, flickering lights, tripping breakers — find the fault and fix it safely.",
      ctaText: "Get My Free Electrical Quote",
      image: {
        src: "images/electrical.svg",
        alt: "Line illustration of a lightning bolt, representing electrical repair",
        width: 1200,
        height: 800
      },
      blocks: [
        { type: "lead", text: "Electrical problems are one of the few household issues you shouldn't put off or DIY. A breaker that keeps tripping or an outlet that's stopped working is your home telling you something." },
        { type: "p", text: "Describe the symptoms and where they happen, and you'll get an honest read on what it's likely to be." },
        { type: "h2", text: "What's covered" },
        { type: "ul", items: [
          "Outlet and switch repair or replacement",
          "Light fixture repair and installation",
          "Tripping breaker fault-finding",
          "Ceiling fan installation",
          "Smoke detector replacement"
        ] },
        { type: "note", text: "A breaker that trips repeatedly is doing its job — protecting you from a fault. Stop using that circuit for high-load appliances and get it inspected soon." },
        {
          type: "faqs",
          items: [
            {
              q: "Can you install a fixture I bought myself?",
              a: "Yes. Supply-your-own fixtures are fine — the quote covers the labor and any wiring parts needed."
            },
            {
              q: "Do small jobs like one outlet cost extra?",
              a: "Small jobs are priced fairly with a minimum call-out that's included in your quote up front, so you can decide before booking."
            }
          ]
        }
      ]
    },
    {
      page: "hvac-repair.html",
      name: "Heating & Cooling",
      shortDescription: "Furnace and AC servicing, repairs, and seasonal tune-ups to keep your home comfortable.",
      metaTitle: "HVAC Repair in Springfield, IL | Springfield Home Services",
      metaDescription: "Furnace and AC repair in Springfield, IL. Servicing, repairs, and tune-ups with free quotes.",
      headline: "HVAC Repair in Springfield, IL",
      subheadline: "Furnace not keeping up? AC blowing warm? Get it diagnosed and repaired before the weather makes it urgent.",
      ctaText: "Get My Free HVAC Quote",
      image: {
        src: "images/hvac.svg",
        alt: "Line illustration of a thermometer, representing heating and cooling service",
        width: 1200,
        height: 800
      },
      blocks: [
        { type: "lead", text: "Heating and cooling failures always seem to happen at the worst time. The good news: most breakdowns give warning signs first — weak airflow, odd noises, rooms that never reach temperature." },
        { type: "h2", text: "What's covered" },
        { type: "ul", items: [
          "Furnace repair and servicing",
          "Air conditioner repair and recharge checks",
          "Thermostat replacement and setup",
          "Seasonal tune-ups and filter service",
          "Airflow and duct issue diagnosis"
        ] },
        { type: "h3", text: "How often should a system be serviced?" },
        { type: "p", text: "Once a year for each — furnace before winter, AC before summer. Regular servicing catches most failures before they leave you without heating or cooling." },
        {
          type: "faqs",
          items: [
            {
              q: "My system runs but the house never reaches temperature. Is that a repair or a replacement?",
              a: "Usually a repair — common causes are dirty filters, low refrigerant, or a failing component. A diagnosis visit will tell you which, and you'll get honest advice if replacement genuinely makes more sense."
            }
          ]
        }
      ]
    },
    {
      page: "appliance-repair.html",
      name: "Appliance Repair",
      shortDescription: "Washers, dryers, dishwashers, ovens, and refrigerators — repaired at your home.",
      metaTitle: "Appliance Repair in Springfield, IL | Springfield Home Services",
      metaDescription: "In-home appliance repair in Springfield, IL: washers, dryers, dishwashers, ovens, fridges. Free quotes before any work starts.",
      headline: "Appliance Repair in Springfield, IL",
      subheadline: "Washer, dryer, dishwasher, oven, or fridge acting up? Get it repaired at home for a fraction of replacement cost.",
      ctaText: "Get My Free Repair Quote",
      image: {
        src: "images/appliance.svg",
        alt: "Line illustration of a washing machine, representing appliance repair",
        width: 1200,
        height: 800
      },
      blocks: [
        { type: "lead", text: "Most appliance failures come down to one worn part — a pump, a belt, a heating element, a seal. Repairing that part typically costs far less than replacing the whole machine." },
        { type: "h2", text: "What's covered" },
        { type: "ul", items: [
          "Washing machine and dryer repair",
          "Dishwasher repair",
          "Oven, stove, and range repair",
          "Refrigerator and freezer repair",
          "Honest repair-vs-replace advice"
        ] },
        {
          type: "faqs",
          items: [
            {
              q: "Is it worth repairing, or should I just buy new?",
              a: "A good rule of thumb: if the repair costs less than half the price of a comparable new unit and the appliance is under 8–10 years old, repair usually wins. You'll get a straight recommendation with your quote."
            },
            {
              q: "Do I need to know the model number?",
              a: "It helps a lot — it's usually on a sticker inside the door or on the back. If you can include it with your request, quotes are faster and more accurate."
            }
          ]
        },
        { type: "form", heading: "Get a Repair Quote", presetService: "Appliance Repair" }
      ]
    },
    {
      page: "handyman-services.html",
      name: "Handyman Services",
      shortDescription: "The to-do list jobs: mounting, assembly, repairs, caulking, doors, and general fixes.",
      metaTitle: "Handyman Services in Springfield, IL | Springfield Home Services",
      metaDescription: "Handyman services in Springfield, IL: TV mounting, furniture assembly, door repairs, caulking, and odd jobs.",
      headline: "Handyman Services in Springfield, IL",
      subheadline: "That list of small jobs you've been putting off — knocked out in one visit, quoted up front.",
      ctaText: "Get My Free Handyman Quote",
      image: {
        src: "images/handyman.svg",
        alt: "Line illustration of a mallet and screwdriver, representing handyman services",
        width: 1200,
        height: 800
      },
      blocks: [
        { type: "lead", text: "Every home collects a list: the door that sticks, the shelf that never went up, the caulking that's seen better days. Individually they're too small to book; together they're a solid visit's work." },
        { type: "p", text: "Send the whole list. Bundling small jobs into one visit is the cheapest way to get them done, and you'll get one clear quote for the lot." },
        { type: "table",
          caption: "Common bundled jobs",
          headers: ["Job", "Typical time"],
          rows: [
            ["TV mounting", "30–45 min"],
            ["Furniture assembly (per item)", "30–60 min"],
            ["Door adjustment", "20–30 min"],
            ["Caulking (per room)", "30–45 min"]
          ]
        },
        { type: "credit", text: "Time estimates are general guidance, not a quote — your actual visit is scoped and priced from your specific list." },
        {
          type: "faqs",
          items: [
            {
              q: "Is there a minimum job size?",
              a: "There's a minimum call-out, which is why bundling jobs works so well — the second and third small jobs in a visit cost much less than booking them separately."
            },
            {
              q: "Can you do jobs not on your list?",
              a: "Probably — the list above is just the most common requests. Describe the job when you ask for a quote and you'll get a yes or no straight away."
            }
          ]
        }
      ]
    }
  ],

  /* --- Service-area pages (0 or more) ---------------------------------------
     One page per surrounding suburb/town, targeting "service + suburb"
     searches. SHIPS EMPTY on purpose: six thin suburb pages with lightly
     reworded copy is the scaled-content pattern search engines filter out.
     Only add area pages once the core pages are live AND you have genuinely
     differentiated content per area (see README).

     Each entry:
       slug        — becomes the filename "<slug>.html". Make it the keyword
                     URL you want, e.g. "epoxy-flooring-joondalup". Must not
                     collide with an existing page (bake.js enforces this).
       name        — display name of the area, e.g. "Joondalup"
       headline    — message-matched H1, e.g. "Epoxy Flooring in Joondalup"
       metaTitle / metaDescription — unique per area (--check enforces this)
       intro       — array of paragraphs. Write genuinely about serving that
                     area; do NOT clone another area's text with the suburb
                     name swapped — thin duplicate pages get filtered out.
       localDetail — OPTIONAL string or array of strings: extra paragraphs
                     of genuinely local detail (housing stock, travel time,
                     common local job types).
       subheadline — OPTIONAL hero sub-line (defaults to none)
       ctaText     — OPTIONAL CTA copy (falls back to the homepage's)
       services    — OPTIONAL array of service page filenames to feature on
                     this area page (defaults to all services)
       faqs        — OPTIONAL per-area FAQ block: [{ q: "...", a: "..." }]
  */
  areas: [],

  /* --- About / Contact page -----------------------------------------------
     FAQs live here, not on a standalone faq.html — these are questions
     about the quoting process, payment, and service area, i.e. exactly
     what this page answers. Per-service questions belong in that service's
     own `blocks` (a `faqs` block) instead. The FAQPage schema for this page
     is built from exactly this array. */
  about: {
    paragraphs: [
      "Springfield Home Services connects Springfield homeowners with dependable local trade services — plumbing, electrical, heating and cooling, appliance repair, and general handyman work.",
      "The promise is simple: a fast response, a clear written quote before any work starts, and pricing with no surprises at the end.",
      "Have a job that doesn't fit neatly into one of the service categories? Ask anyway — describe it in a quote request and you'll get a straight answer about whether it can be done."
    ],
    faqs: [
      {
        q: "How do I get a quote?",
        a: "Use the quote form on this page — pick the service, add your name and phone number, and you're done. Every request gets a response within 24 hours."
      },
      {
        q: "Are quotes really free?",
        a: "Yes. Quotes are free and carry no obligation. You'll get the full price in writing before any work is booked, and you're free to say no."
      },
      {
        q: "How quickly can work be scheduled?",
        a: "Most jobs are scheduled within a few days of quote approval, and urgent problems are prioritized. You'll get a realistic timeframe with your quote — not a promise that can't be kept."
      },
      {
        q: "What areas do you cover?",
        a: "Springfield and surrounding areas within about 25 miles. If you're just outside that area, ask anyway — it often still works depending on the job."
      },
      {
        q: "How is pricing worked out?",
        a: "Your quote reflects the exact price for your specific job, based on the work involved, parts, and access — there's no call-out fee just to get a number."
      },
      {
        q: "What payment methods are accepted?",
        a: "Card, bank transfer, and cash are all fine. Payment is due when the work is completed to your satisfaction — no deposits are required for standard jobs."
      },
      {
        q: "What happens after I submit the quote form?",
        /* Same collection-notice constraint as contact.reassurance above:
           this answer describes where the details go, so it has to describe
           the real data flow. It previously said information was "only used
           to respond to your request", which is not what happens. */
        a: "Your details go to a local contractor who covers your area and does that type of work, so they can quote the job — the contractor pays for the enquiry, you do not. They contact you directly to confirm details, and sometimes a photo of the problem is all that's needed to firm up the price. Your job is not distributed to multiple businesses. See the privacy policy for the full position."
      },
      {
        q: "What if I'm not happy with the work?",
        a: "Say so before payment. The job isn't finished until it's done as quoted, and any issue with the workmanship will be made right."
      }
    ]
  },

  /* First N of about.faqs previewed on the homepage, linking to about.html#faqs. */
  faqPreviewCount: 4,

  /* --- Contact form ---------------------------------------------------------
     `fields` is the base field list for every quote form on the site
     (the general one on about.html, and any inline `form` block on a
     service page). Add/remove/reorder fields freely — the form and its
     submit payload follow this array. A `form` block can add one
     `extraField` and override `placeholders` for its own page. */
  contact: {
    formHeadline: "Get Your Free Quote",
    /* COLLECTION NOTICE - this is not just reassurance copy, so read before
       editing. The site relies on the Privacy Act small business exemption,
       and the "trading in personal information" carve-out (OAIC: disclosing
       personal information for a benefit, service or advantage) only bites
       where the individual has NOT consented. Consent can be implied, but
       OAIC requires it to be informed - the person has to understand what
       happens to their details. That means this line must say, at the point
       of collection, that the details go to a contractor and that the
       contractor pays. The stock wording said details were "only used to
       reply to this request", which described the wrong data flow and worked
       against the consent the exemption depends on. Keep it accurate and keep
       the privacy policy link. Name the actual trade when populating a build
       ("a tiling contractor", "a bricklayer") - it reads as more specific and
       more honest than "a local contractor".
       See LAUNCH_PLAYBOOK.md, phase 2, for the full position. The other half
       of it is the voicemail greeting: sites.greeting_audio_url AND
       sites.greeting_text must carry the same notice. */
    reassurance: "No spam and no obligation. Your details go to a local tiler so they can quote your job - the contractor pays for the enquiry, you do not. We never sell your details or add you to a marketing list. [How we handle your information](privacy.html).",
    fields: [
      { name: "name", label: "Name", type: "text", autocomplete: "name" },
      { name: "phone", label: "Phone", type: "tel", autocomplete: "tel" }
    ],
    step1Label: "What do you need help with?",
    step2Label: "Where should we send your quote?",
    otherServiceLabel: "Something else",
    submitText: "Get My Free Quote",
    successMessage: "Thanks — your request is in. Expect a call or text within 24 hours.",
    errorMessage: "Something went wrong sending your request. Please try again, or reach out directly:"
  },

  /* --- Testimonials / photos (REAL EVIDENCE ONLY) ---------------------------
     Leave these arrays EMPTY until a real business supplies real, verifiable
     testimonials and photos. The sections stay hidden while empty.
     Do NOT invent names, star ratings, or review counts.
     testimonial format: { quote: "...", name: "...", detail: "e.g. job type / area" }
     photo format:       { src: "images/...", alt: "...", caption: "...",
                           width: <px>, height: <px> } */
  testimonials: [],
  photos: []
};
