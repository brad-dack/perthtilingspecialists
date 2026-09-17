/* =============================================================================
   SITE CONFIG — the ONLY file you edit when swapping niche/city.
   Every page on the site reads from this object at load time.
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
   7. services — each is an ordered array of content BLOCKS (see the
      block-type reference in README), plus its own page filename — make it
      a keyword URL, not a numbered stub.
   8. areas (0+) — optional suburb/area pages, ships empty.
   9. pages.home / pages.about / pages.privacy blocks, contact.fields
   Then run:  node bake.js          (regenerates pages + CNAME/robots/
                                     sitemap/404/favicon)
              node bake.js --check  (preflight: fails loudly on leftover
                                     placeholders, unresolved { marker }
                                     blocks, and broken references)

   PERTH TILING SPECIALISTS - built from the phase 5 drafts (home, floor
   tiling, bathroom tiling, cost guide, about, privacy) and
   cost-guide-perth-figures.md, 13 September 2026. Schema follows the
   Canberra Tiling build: home/about/privacy render from pages.X.blocks, the
   cost guide is a services[] entry, and page links in copy are written as
   filenames ("bathroom-tiling-perth.html") so they stay greppable against
   disk. The engine changes this needs (ported from Canberra, plus the
   five-item nav and per-page #quote forms) are logged in README.md under
   "Divergence from the template".
============================================================================= */

window.SITE_CONFIG = {

  /* --- Core business identity ---------------------------------------------
     phone / phoneDisplay / city / state / serviceArea frozen in phase 2
     (053a6db). email is the phase 3 constant from the handover. hours stays
     empty: no hours exist and the drafts deliberately carry none. */
  business: {
    name: "Perth Tiling Specialists",
    phone: "+61895161688",       // Twilio tracking number, frozen in phase 2
    phoneDisplay: "(08) 9516 1688",
    email: "hello@perthtilingspecialists.com.au",
    city: "Perth",
    state: "WA",
    serviceArea: "Perth and surrounding suburbs across the metropolitan area",
    hours: ""
  },

  /* Used for canonical URLs, schema, and OG tags. No trailing slash. */
  domain: "https://perthtilingspecialists.com.au",

  /* --- Brand -----------------------------------------------------------
     TODO (Brad): still the template default (green, bold, diagonal). Not
     specified in the handover or the drafts. */
  brand: {
    color: "#0b6e4f",
    colorDark: "#08523b",
    colorContrast: "#ffffff",
    style: "bold",
    pattern: "diagonal"
  },

  /* --- Tracking / integrations ----------------------------------------- */
  ga4Id: "G-WVV41F95JK",

  /* Form ingest, set 15 Sep 2026 (rank-and-rent-backend runbook "Add a new
     site", step 5). ingestUrl is the one shared ingest-form function, same as
     Canberra. ingestSecret must match sites.ingest_secret on the
     'perth-tiling-specialists' row, or every submission is rejected. It is
     meant to sit in public config: the function matches it to a site, and
     Turnstile is the spam gate.
     turnstileSiteKey corrected from "0x4AAAAAAAEHD1..." (seven A's), which
     threw Turnstile error 400020 (invalid sitekey) on the live Perth page, to
     Canberra's "0x4AAAAAAEHD1..." (six A's), which renders without error.
     TODO (Brad): confirm perthtilingspecialists.com.au is in the shared
     "Rank and Rent forms" widget's hostname list if a test submission fails. */
  ingestUrl: "https://bnfgnglzswtrvzfqkgjh.functions.supabase.co/ingest-form",
  ingestSecret: "a125add13eb843b65a1ddcfd4f7175de",
  turnstileSiteKey: "0x4AAAAAAEHD1tLftcrbDXIx",

  /* --- Structured data ---------------------------------------------------
     Organization, sitewide, per the handover constants. No LocalBusiness
     subtype, no AggregateRating, no Review, no priceRange. */
  schema: {
    type: "Organization",
    priceRange: "$$", // only used once schema.type is a LocalBusiness subtype
    founder: ""
  },

  pages: {

    /* ---------------------------------------------------------------------
       HOME - home-draft.md v1. Owns the head term and routing only. No cost
       figures, no regulatory claims, no standards citations (cannibalisation
       map). Re-check against that map at every revision. */
    home: {
      metaTitle: "Tiler Perth | Tiling Quotes | Perth Tiling Specialists",
      metaDescription: "Looking for a tiler in Perth? Tell us about your floor, wall or bathroom tiling job and we will pass it to a Perth tiler who can quote it.",
      headline: "Find a Tiler in Perth for Floors, Walls and Bathrooms",
      subheadline: "Tell us about your job and we will pass it to a Perth tiler who can quote it. New floors, wall tiling, bathroom retiles, regrouting and tile repairs.",
      ctaText: "Get a tiling quote",
      /* Photo-style, synthetic (Gemini, cropped to 1200x800). No faces, no
         branded vans, no uniforms. */
      image: {
        src: "images/home-hero-tiled-interior.jpg",
        alt: "Tiled floor and wall surfaces in a modern home interior.",
        width: 1200,
        height: 800,
        widths: [400, 560, 720, 960],
        sizes: "(min-width: 900px) 450px, min(520px, calc(100vw - 40px))"
      },
      blocks: [
        /* Routing block, replacing the draft's "How it works" steps (Brad,
           15 Sep 2026: read too much like a lead service). Follows Canberra's
           "Start with what you actually need": sort the visitor into repair,
           new work or budget, and send each to the page that answers it. The
           commercial disclosure lives on About and in the collection notice
           above every form, so it is not repeated here.
           No cost figures in the budget paragraph, per the cannibalisation
           map: the cost guide owns every price on the site. Canberra quotes a
           range here; Perth deliberately does not. */
        { type: "h2", text: "Start with what you actually need" },
        { type: "p", text: "Most people looking for a tiler in Perth are in one of three situations, and they are different jobs with different costs. Working out which one you are in is the most useful thing you can do before anyone quotes." },

        { type: "h3", text: "Something is cracked, loose or leaking" },
        { type: "p", text: "Tiles that have cracked, lifted or sound hollow when you tap them. Grout that is crumbling. A shower that is letting water through. The first question is always whether the problem is at the surface or underneath it, because that decides whether you need a small repair or the tiles have to come off." },
        { type: "p", text: "[Cracked, loose and drummy tiles](floor-tiling-perth.html) · [Regrouting and leaking showers](bathroom-tiling-perth.html)" },

        { type: "h3", text: "You are tiling something new" },
        { type: "p", text: "A floor, a bathroom, a splashback. New work is more predictable than repair work, and what it costs is driven mostly by the tile you choose, the layout, and the condition of the floor or wall underneath." },
        { type: "p", text: "[Floor tiling](floor-tiling-perth.html) · [Bathroom tiling and waterproofing](bathroom-tiling-perth.html)" },

        { type: "h3", text: "You are still working out a budget" },
        { type: "p", text: "Published Perth prices for the same job disagree with each other, sometimes by a factor of two, and bathroom renovation figures disagree by far more. Our cost guide puts them side by side and explains why." },
        { type: "p", text: "[What tiling costs in Perth](tiling-cost-perth.html)" },

        { type: "h2", text: "What we can get quoted" },
        { type: "p", text: "**Floor tiling.** New floors, replacing old floors, and repairs to cracked or drummy tiles. Also wall tiling outside wet areas. More on [floor tiling in Perth](floor-tiling-perth.html)." },
        { type: "p", text: "**Bathroom tiling.** Full bathroom retiles, shower and splashback work, and regrouting where the tiles themselves are sound. Waterproofing sits inside this work and is covered on the [bathroom tiling](bathroom-tiling-perth.html) page." },
        { type: "p", text: "**Kitchens and laundries.** Splashbacks, floors and wall tiling. Same trade, smaller jobs, and often quoted hourly rather than by the square metre." },
        { type: "p", text: "**Repairs and small jobs.** A few cracked tiles, a lifting floor, a shower that needs regrouting. Small jobs are harder to get quoted than large ones, so it helps to be specific about what you need." },
        /* TODO (Brad): kitchens and laundries have no page and no target
           keyword. Kept to two sentences so it does not become a fifth page by
           accident. If it ever grows, it belongs as a section on floor tiling,
           not a page. */

        { type: "h2", text: "Where we cover" },
        { type: "p", text: "The Perth metropolitan area, north and south of the river, and out to the eastern suburbs. If you are outside the metro area, tell us where you are and we will say straight away whether we can find someone rather than leaving you waiting." },
        /* TODO (Brad): deliberately no suburb list and no area pages. Area
           pages at Level 2 with no renter attached would be thin and would
           invite the same misrepresentation problem as citations. Revisit at
           Level 3. */

        { type: "h2", text: "What to include when you enquire" },
        { type: "p", text: "The more specific you are, the more useful the quote. Worth including:" },
        { type: "ul", items: [
          "The room and roughly how many square metres",
          "Whether it is new tiling, a retile, or a repair",
          "Whether old tiles need to come up",
          "Whether you have chosen tiles, and what kind",
          "Anything unusual about access, timing or the condition of the floor"
        ] },
        { type: "p", text: "You will not know all of it, and that is fine. Nobody can price a tiling job properly without seeing the substrate anyway, which is why the tiler will want to visit." },

        /* Questions about the job, not about the service (Brad, 15 Sep 2026:
           the draft's "Do you charge me anything?" set read as rank and rent).
           Canberra pattern. Every answer restates something the floor or
           bathroom page already says, and links there. Still no cost figures
           and no standards citations on this page. How the service is paid
           for, and who does the work, is on About. */
        { type: "h2", text: "Common questions" },
        { type: "faqs", items: [
          {
            q: "My shower is leaking. Will regrouting fix it?",
            a: "Not if water is getting past the grout into the wall or floor. Grout is not a waterproofing layer. The membrane behind the tiles is, and new grout will not fix a membrane that has failed. A leaking shower needs an assessment before anyone quotes a repair. See [regrouting and leaking showers](bathroom-tiling-perth.html)."
          },
          {
            q: "Why does one of my tiles sound hollow?",
            a: "It is drummy, which means the adhesive is no longer holding it to the floor across some or all of its area. It may not be loose yet, but it is on its way. The hollow area is often bigger than the visible damage, so it is worth tapping across the whole floor before a repair is quoted. See [cracked, loose and drummy tiles](floor-tiling-perth.html)."
          },
          {
            q: "Why do tiling quotes for the same job vary so much?",
            a: "Usually because they are not pricing the same job. One includes taking up the old floor, one assumes the substrate is flat, one leaves out waterproofing. Give every tiler the same brief and ask for the scope in writing, line by line. Our [cost guide](tiling-cost-perth.html) explains where the published figures come from."
          },
          {
            q: "How long does a bathroom take to tile?",
            a: "Laying the tiles is rarely what sets the timetable. Removal, substrate preparation and membrane curing do, and a membrane cannot be tiled over early. Ask how long the bathroom will be out of use, including curing time."
          },
          {
            q: "Should I keep spare tiles?",
            a: "Yes. If a tile cracks later, replacing it depends on having a match, and matching a tile from a different production batch is unreliable because the colour can shift between batches. If you have spares from the original job, mention them when you enquire about a repair."
          }
        ] },

        { type: "h2", text: "Get a tiling quote" },
        { type: "p", text: "Tell us the room, roughly the area, and what you want done. We will pass it to a Perth tiler who can quote it." },
        { type: "form" }
      ]
    },

    /* ---------------------------------------------------------------------
       ABOUT - about-draft.md v1. The E-E-A-T anchor and the commercial
       disclosure. Contact is a section here, not a page. "We" throughout,
       first person singular in Who runs this only.
       If a photo of a person ever appears on this page it must be an actual
       photo of Brad. A synthetic portrait presented as the named individual is
       the one place on the site where synthetic imagery is not acceptable. */
    about: {
      metaTitle: "About Perth Tiling Specialists | How This Site Works",
      metaDescription: "What Perth Tiling Specialists is, the area we cover, what happens when you enquire, how the service is paid for, and how to get in touch.",
      headline: "About Perth Tiling Specialists",
      /* Restructured 15 Sep 2026 on Brad's instruction to follow Canberra's
         About (canberratilelayers.com.au/about): short sections in the order
         who runs this, what the business does, what it covers, what happens
         after you enquire, how it is paid for, where, contact. The v1 draft's
         longer passages were cut rather than reworded, and no new claims
         added. Two Canberra lines deliberately NOT carried across: "the quote
         is free" (this build dropped "free quote" everywhere, since no draft
         says the tiler's quote is free) and Canberra's conditional pre-renter
         wording (handover section 11: Brad kept present tense for Perth). */
      blocks: [
        { type: "h2", text: "Who runs this" },
        /* TODO (Brad): every sentence here must be true of you specifically.
           If any of it is not, cut it rather than softening it. Do not add
           anything about years, volumes, or numbers of clients. */
        { type: "p", text: "Perth Tiling Specialists is run by Brad. I am not a tiler. I have never laid a tile and do not claim to. For how a specific job actually gets done, the tiler doing the work is the one to ask." },
        { type: "p", text: "What I do is research. The [cost guide](tiling-cost-perth.html) on this site puts published Perth figures from builders, suppliers, a peak body, tradie marketplaces and cost guide sites side by side, and explains why they disagree. The [bathroom tiling](bathroom-tiling-perth.html) page sets out what the waterproofing requirements actually say, and the [floor tiling](floor-tiling-perth.html) page explains when a cracked or drummy tile can be repaired and when the floor has a bigger problem. My main business is regulatory compliance advice, which is largely the work of establishing what a rule actually says before anyone acts on it." },

        { type: "h2", text: "What this business does" },
        { type: "p", text: "We take enquiries from Perth homeowners about tiling and tile repairs, and pass each one to a Perth tiler who works in that area and does that kind of work." },
        { type: "p", text: "We do not lay tile, quote work, set prices, supply materials, employ tilers or supervise jobs. There is no crew and no equipment. Every physical part of a job is done by the tiler, and once your enquiry reaches them, your arrangement is with them." },

        { type: "h2", text: "What we cover, and what we don't" },
        { type: "p", text: "We stick to tiling: floors, walls, bathrooms and showers, kitchen and laundry splashbacks, regrouting, and repairs to cracked, loose or drummy tiles." },
        /* TODO (Brad): the renovation line follows Canberra's position. No
           Perth draft states it. Confirm it is how Perth enquiries are handled,
           or cut the paragraph. */
        { type: "p", text: "Full bathroom renovations are a different job. A renovation involves plumbing, electrical, carpentry and plastering alongside the tiling, and it is generally run by a builder rather than a tiler. If you are stripping a bathroom back and starting again, a renovation builder is who you want, and we will say so rather than take the enquiry." },
        { type: "p", text: "Plumbing, electrical work, stone benchtops and structural work are all separate trades we do not handle. In Western Australia, plumbing work has to be done by a licensed plumber." },

        { type: "h2", text: "What happens after you enquire" },
        /* TODO (Brad): this describes a process that needs a renter to be
           real. Handover section 11: Brad has considered this and decided to
           leave present tense. Logged, not to be re-raised. */
        { type: "p", text: "We read your enquiry, come back to you if something important is missing, and pass it to one Perth tiler who covers your area and does that kind of job. They contact you to look at the job and quote it, and from there you deal with them directly. If we cannot find someone, we will tell you rather than leave you waiting." },
        /* Kept in step with the privacy page's "Why we collect it" and "Nobody
           else" (corrected 13 Sep 2026). Privacy is the fuller disclosure, so
           this follows it. If either changes, change both. */
        { type: "p", text: "Your details go to that tiler so they can quote the job. We also use enquiries in aggregate, without names or contact details, to see what kinds of jobs people are asking about. Your details are not sold and not added to a marketing list. The full position is in the [privacy policy](privacy.html)." },

        { type: "h2", text: "How the service is paid for" },
        { type: "p", text: "The tiler pays for the enquiry. You do not." },
        { type: "p", text: "We are not paid more if your job is bigger, we do not take a cut of the quote, and we add nothing to what you pay the tiler. The price you are quoted is the tiler's own. You are free to get other quotes, and for a job of any size you should." },

        { type: "h2", text: "Where we cover" },
        { type: "p", text: "The Perth metropolitan area, north and south of the river, and out to the eastern suburbs. If you are outside it, send the enquiry anyway and we will tell you straight away whether we can help." },

        { type: "h2", text: "Contact" },
        /* Name follows Canberra's "Brad, trading as ...", which resolved the
           old [SURNAME] placeholder. ABN is Brad's sole trader ABN, the same
           one Canberra publishes (confirmed by Brad, 15 Sep 2026). Keep it in
           step with the privacy page's "Who this covers" and Contact. */
        { type: "p", text: "Brad, trading as Perth Tiling Specialists. ABN 78 538 005 810." },
        { type: "p", text: "Phone: (08) 9516 1688\nEmail: hello@perthtilingspecialists.com.au" },
        { type: "p", text: "[Send an enquiry](#quote)" }
      ]
    },

    /* ---------------------------------------------------------------------
       PRIVACY - restructured 16 Sep 2026 on Brad's instruction to follow
       Canberra's privacy policy (canberratilelayers.com.au/privacy): who this
       covers, what we collect, why, who we share it with, how long, where it
       is stored, cookies, access and deletion, complaints, changes.
       Not legal advice, not reviewed by a solicitor. Everything here describes
       Brad's own setup, so accuracy is a matter of checking the real system,
       not a source. Where Canberra's wording did not match Perth's setup, the
       Perth fact wins:
         - The form has no email field (contact.fields: name, phone, suburb,
           optional job description, plus the job type). Canberra lists email.
         - Canberra says call records include "which page of the site you
           called from". Perth has one tracking number and twilio-status logs
           caller number, time and CallDuration only, so that is not claimed.
         - Canberra says "The greeting tells you this before the tone". Not
           claimed: Perth's greeting MP3 could not be checked, and its
           greeting_text does not say the message is recorded.
           TODO (Brad): once the greeting says so, a sentence can be added.
         - Resend is named: forward-lead emails leads (with voicemail audio
           attached) to the renter through Resend. Canberra omits it.
         - GitHub Pages is named as the host (handover constants).
         - Google Analytics is in use here (ga4Id is set), so "uses", not
           "may use".
       Retention, checked against the backend: prune-storage (monthly,
       RETENTION_MONTHS = 12) deletes voicemail audio and attachment FILES
       after 12 months and deliberately keeps leads and call_events rows as
       invoicing evidence. The v1 page said "Enquiries are kept for 12 months
       and then deleted", which nothing enforced; Canberra's "as long as
       needed ... for a reasonable period afterwards" is the accurate
       description, with removal on request.
       Kept from Perth v1 because they are true and useful: voicemails are not
       transcribed (twilio-voice Record transcribe="false"); aggregate use of
       enquiries without names, which About's "What happens after you enquire"
       summarises (keep the two in step); and the note that a tiler's copy has
       to be requested from the tiler. */
    privacy: {
      metaTitle: "Privacy Policy | Perth Tiling Specialists",
      metaDescription: "What Perth Tiling Specialists collects when you make an enquiry or call, who your details go to, how long they are kept, and how to have them removed.",
      headline: "Privacy Policy",
      lastUpdated: "16 September 2026",
      blocks: [
        { type: "h2", text: "Who this covers" },
        { type: "p", text: "This policy applies to Perth Tiling Specialists (ABN 78 538 005 810), run by Brad as a sole trader, and to information collected through this website and its phone number." },

        { type: "h2", text: "What we collect" },
        { type: "p", text: "When you send an enquiry through the form, we collect:" },
        { type: "ul", items: [
          "Your name",
          "Your phone number",
          "Your suburb",
          "The type of job",
          "Anything you tell us about the job"
        ] },
        { type: "p", text: "When you email us, we collect your email address and whatever you send, including any photos of the job." },
        { type: "p", text: "When you call the number on this site, we collect your phone number and the time and length of the call. Calls are not answered live. They go to voicemail, and if you leave a message it is recorded and stored so that it can be passed on and acted on. Voicemails are not transcribed. Recordings are kept for up to twelve months and then deleted, though a record that the call happened is kept for our own accounting." },
        { type: "p", text: "When you visit the site, standard analytics data is collected, including pages visited, approximate location derived from your IP address, device type and how you arrived at the site." },

        { type: "h2", text: "Why we collect it" },
        { type: "p", text: "To pass your enquiry to a tiler who can quote the job, and to respond to you about that enquiry." },
        { type: "p", text: "Enquiries are also used in aggregate, without names or contact details, to understand what kinds of jobs people are asking about, so the site can be improved." },

        { type: "h2", text: "Who we share it with" },
        { type: "p", text: "**The tiler.** Where we have a tiler covering that type of work in your area, your enquiry details go to them so they can contact you about the job. Your job is not sent to multiple businesses. Where we do not have a tiler for your area, we will tell you rather than pass your details anywhere. Once a tiler has your details, how they handle them is their responsibility." },
        /* TODO (Brad): "Your job is not sent to multiple businesses" is a
           commitment about how the model runs. If leads are ever shared
           between renters, this line has to change before the practice does. */
        { type: "p", text: "**Service providers.** The site uses third party services that process data on our behalf. The enquiry form submits directly to our own system rather than to a third party form service. That system is hosted on Supabase, so your details pass through their servers to reach us. A Cloudflare Turnstile check runs in your browser first to filter out automated spam. Calls and voicemails are handled by Twilio. Enquiries are sent on to the tiler by email through Resend. Cloudflare handles this site's DNS and email routing, the site itself is hosted on GitHub Pages, and Google Analytics is used to understand how the site is used. Each of these is a large international provider, each may store or process data outside Australia, and each publishes its own privacy policy describing how it handles data." },
        /* TODO (Brad): confirm the Supabase project region and name it here if
           it is outside Australia. Specific is better than "may". */
        { type: "p", text: "**What we do not do.** We do not sell your information. We do not add you to a marketing list. We do not share your details with advertisers, data brokers, or any business other than the tiler handling your enquiry." },

        { type: "h2", text: "How long we keep it" },
        { type: "p", text: "Enquiry details, call records and analytics data are kept only as long as needed to handle the enquiry and to run the site, and for a reasonable period afterwards for our own records. Voicemail recordings are deleted after twelve months. If you would like your details removed sooner, contact us and we will remove them." },

        { type: "h2", text: "Where it is stored" },
        { type: "p", text: "See \"Service providers\" above. Each of those companies may store or process data outside Australia, and each publishes its own privacy policy describing how." },

        { type: "h2", text: "Cookies and analytics" },
        { type: "p", text: "This site uses Google Analytics to understand how visitors find and use it, for example which pages are viewed. Google Analytics uses cookies and collects usage data such as general location and device type. It does not see anything typed into the enquiry form. You can block cookies in your browser settings and the site still works." },
        { type: "p", text: "Cloudflare Turnstile may set a token while you are using the enquiry form. It is there to keep spam out." },

        { type: "h2", text: "Accessing or deleting your information" },
        { type: "p", text: "You can ask us what information we hold about you, ask for it to be corrected, or ask for it to be deleted. Contact us at hello@perthtilingspecialists.com.au." },
        { type: "p", text: "If your enquiry has already gone to a tiler, we can delete our copy, but you would need to ask the tiler about theirs. We will tell you who they are so you can." },

        { type: "h2", text: "Complaints" },
        { type: "p", text: "If you are unhappy with how we have handled your information, contact us first at hello@perthtilingspecialists.com.au." },
        { type: "p", text: "If you are not satisfied with our response, you can contact the Office of the Australian Information Commissioner at [oaic.gov.au](https://www.oaic.gov.au)." },

        { type: "h2", text: "Changes" },
        { type: "p", text: "We may update this policy. The current version is always the one on this page, with the date it was last updated at the top." },

        { type: "h2", text: "Contact" },
        /* Keep in step with About's Contact section. No hours line. */
        { type: "p", text: "Perth Tiling Specialists\nPhone: (08) 9516 1688\nEmail: hello@perthtilingspecialists.com.au" }
      ]
    }
  },

  /* No value props in any draft. The template's defaults ("Response within
     24 hours", a Springfield service area) were false for this build and are
     removed rather than rewritten. */
  valueProps: [],

  /* The home draft carries its own How it works section in pages.home.blocks,
     so the template's icon component is unused (Canberra pattern). */
  howItWorks: [],

  /* --- Services -----------------------------------------------------------
     Three pages, in nav order. services[] is a list of PAGES on this build:
     the cost guide is a content page, not a service, and sits here the way
     Canberra's does. Enquiry categories come from contact.jobTypes instead.
     Cannibalisation: the cost guide owns every price on the site, including
     regrouting, plus contract rights and the deposit cap. Bathroom owns
     waterproofing and wet area standards. Floor owns substrate, setting out,
     dry wall tiling, and cracked, loose or drummy tile repairs. */
  services: [
    /* ---------------------------------------------------------------------
       FLOOR TILING - floor-tiling-draft.md v1. Priority 1 on volume. No cost
       figures, no waterproofing detail beyond one pointer to bathroom. */
    {
      page: "floor-tiling-perth.html",
      name: "Floor Tiling",
      shortDescription: "",
      metaTitle: "Floor Tiling Perth | Tile Laying and Tile Repairs",
      metaDescription: "Floor tiling in Perth: new floors, wall tiling and cracked or drummy tile repairs. Learn what the job involves and get a quote from a Perth tiler.",
      headline: "Floor Tiling in Perth: Laying, Replacing and Repairing Tiles",
      ctaText: "Get your floor tiling job quoted",
      /* Photo-style, synthetic (Gemini, cropped to 1200x800). */
      image: {
        src: "images/floor-tiling-perth.jpg",
        alt: "Large format floor tiles being laid with spacers between them.",
        width: 1200,
        height: 800,
        widths: [400, 560, 720, 960],
        sizes: "(min-width: 900px) 450px, min(520px, calc(100vw - 40px))"
      },
      blocks: [
        { type: "lead", text: "Most of what determines whether a tiled floor lasts happens before the first tile goes down. The substrate underneath it, how flat and sound and dry it is, decides more than the tile you choose or the price you pay." },
        { type: "p", text: "This page covers laying a new floor, replacing an old one, tiling walls outside wet areas, and what to do about tiles that have cracked, lifted or gone drummy. Tell us about the job and we will pass it to a Perth tiler who can quote it." },
        { type: "p", text: "[Get your floor tiling job quoted](#quote)" },

        { type: "h2", text: "What a floor tiling job involves" },
        { type: "ol", items: [
          "**Removal, if there is an existing floor.** Tiles, adhesive and whatever bed they were laid on. This is dirty, heavy work and it produces a surprising volume of waste.",
          "**Assessing the substrate.** What is actually under there, and what it needs before it can be tiled.",
          "**Preparation.** Grinding back old adhesive, patching, and levelling where the floor is out.",
          "**Setting out.** Deciding where the full tiles land and where the cuts fall.",
          "**Laying.** Adhesive, tiles, spacers, and the cuts around door frames, cabinetry and fixtures.",
          "**Grout and sealant.** Grout in the joints, flexible sealant where the floor meets walls and other materials."
        ] },
        /* VERIFIED 15 Sep 2026 (claim register row 12): Intertek Inform lists
           AS 3958:2023 "Installation of ceramic and stone tiles" as Current,
           published 1 Dec 2023, "Reissued incorporating Amendment No 1 (June
           2024)", superseding AS 3958.1-2007 and AS 3958.2-1992. */
        { type: "p", text: "Tile installation is covered by **AS 3958:2023, incorporating Amendment No. 1 (2024)**. It is the standard a tiler is working to whether or not it is mentioned in the quote." },
        { type: "credit", text: "AS 3958:2023 Installation of ceramic and stone tiles, reissued incorporating Amendment No. 1 (June 2024), Standards Australia." },

        { type: "h2", text: "The substrate is where the money hides" },
        { type: "p", text: "Two floors that look identical can cost very different amounts to tile, and the difference is almost always underneath." },
        { type: "p", text: "A flat, sound, dry substrate is cheap to tile. One that needs grinding, patching or self-levelling compound is not. A floor that moves, or that is still holding moisture, is a problem to solve before tiling rather than a cost to absorb during it." },
        { type: "p", text: "The catch is that nobody can see it until the old floor comes up. A tiler quoting your job is estimating what they expect to find. This is why quotes for retiling carry variation clauses, and why a quote with no variation clause is not more generous, it is just less honest about the same risk." },
        { type: "p", text: "If you are replacing an existing floor, ask what happens if the substrate is worse than expected, and how that gets approved before the extra work starts." },

        { type: "h2", text: "Tile format, layout and setting out" },
        { type: "p", text: "**Format.** Large format tiles need a flatter substrate than small ones, because any dip in the floor shows up as lippage at the edges. Getting a floor flat enough for a 600 by 600 or larger tile is often the real work in the job." },
        { type: "p", text: "**Layout.** A straight lay is the baseline. Diagonal, herringbone and brick bond patterns take longer, produce more cuts and more wastage, and demand a more accurate set out. The pattern is a labour decision as much as an aesthetic one." },
        { type: "p", text: "**Setting out.** Where the first full tile goes decides where the cut tiles end up. Done well, the cuts fall where nobody looks. Done badly, you get a sliver of tile along the most visible wall in the room. It is worth asking how the floor will be set out before it starts." },
        { type: "p", text: "**Wastage.** Order more tile than the measured area. Cuts, breakages and pattern lays all consume more than you would expect, and matching a tile from a different production batch later is unreliable because the colour can shift between batches." },

        { type: "h2", text: "Wall tiling" },
        { type: "p", text: "Outside wet areas, wall tiling is the same trade and much of the same thinking. The substrate has to be sound and flat, the set out decides where the cuts land, and the detail work around windows, edges and power points is where the time goes." },
        { type: "p", text: "Wall tiling in a bathroom, shower or other wet area is a different job, because it sits on top of a waterproofing membrane and carries requirements that dry wall tiling does not. That is covered on the [bathroom floor and wall tiling](bathroom-tiling-perth.html) page, along with splashbacks." },

        { type: "h2", text: "Cracked, loose and drummy tiles" },
        { type: "p", text: "A tiled floor usually tells you it has a problem before it fails completely." },
        { type: "p", text: "**Cracked tiles.** A single cracked tile is often impact damage and nothing more. Cracks that run in a line across several tiles, or that keep reappearing after a repair, usually mean something is moving underneath. Replacing the tile without addressing that will produce the same crack again." },
        { type: "p", text: "**Loose or lifting tiles.** Tiles that rock, or that have lifted at an edge or a corner, have lost their bond with the substrate." },
        { type: "p", text: "**Drummy tiles.** Tap a tiled floor and a well bonded tile sounds solid. One that sounds hollow is drummy, which means the adhesive is no longer holding it to the floor across some or all of its area. A drummy tile is not necessarily loose yet, but it is on its way. Tapping across a floor is how a tiler finds out how far the problem extends, and it is worth doing before anyone quotes a repair, because the visible damage is often smaller than the actual area." },
        { type: "p", text: "**When repair beats replacement.** If the drummy area is contained and the rest of the floor is sound, replacing the affected tiles is reasonable. If the problem is spread across the floor, or if it keeps coming back, patching it is throwing money at a symptom." },
        { type: "p", text: "**The tile matching problem.** Replacing individual tiles depends on having matching tiles. If you kept spares from the original job, say so when you enquire, because it changes the job significantly. If you did not, an exact match is often impossible, and the practical options are taking tiles from an inconspicuous area to patch the visible one, or accepting a deliberate contrast." },
        /* Diagram: cross-section, one fully bonded tile against one with a
           hollow void beneath it. No caption (illustrative).
           TODO (Brad): keep the diagram general. No adhesive coverage
           percentages, no bond strength figures, nothing that would need a
           source. Two tiles, one bonded, one with a void. */
        { type: "image", src: "images/drummy-tile-cross-section.svg", alt: "Cross-section diagram comparing a fully bonded floor tile with a drummy tile that has a hollow void beneath it.", width: 1200, height: 800 },

        { type: "h2", text: "Older Perth floors" },
        /* VERIFIED 15 Sep 2026 (claim register row 10). Two corrections to the
           draft at verification:
           - "before the late 1980s" is now "before 1990", which is HealthyWA's
             wording ("If your home was built before 1990 then it likely
             contains asbestos in some building products").
           - "old floor coverings, tile beds and backing materials" is now the
             products HealthyWA actually lists: vinyl floor tiles, linoleum
             floor backing, and backing for wall tiles and splashbacks. Tile
             beds are not on its list.
           WorkSafe WA, Asbestos removal notifications: "Licensed asbestos
           removal work involves the removal of any quantity of friable
           asbestos, or more than 10 square metres of non-friable asbestos" and
           "You must notify us at least 5 days before starting licensed asbestos
           removal work." Keep the bathroom page and cost guide in step. */
        { type: "p", text: "In homes built before 1990, old vinyl floor tiles, linoleum backing and the sheeting behind wall tiles can contain asbestos. WorkSafe WA treats removing any quantity of friable asbestos, or more than 10 square metres of non-friable asbestos, as licensed asbestos removal work, and WorkSafe has to be notified at least five days before that work starts." },
        { type: "credit", text: "HealthyWA, Asbestos in and around the home; WorkSafe WA, Asbestos removal notifications." },
        { type: "p", text: "This matters more on floors than most people realise, because removing an old floor means cutting, grinding and breaking up exactly the materials most likely to contain it. If there is any doubt, it gets tested before anything is disturbed." },

        { type: "h2", text: "Before you get a quote" },
        { type: "p", text: "Useful to know, and useful to tell whoever is quoting:" },
        { type: "ul", items: [
          "The room and roughly how many square metres",
          "Whether it is a new floor, a replacement, or a repair",
          "What is on the floor now, and what is underneath it if you know",
          "Whether you have chosen tiles, and the format and material if so",
          "Whether you have spares, for a repair",
          "Anything you have noticed: movement, moisture, hollow sounding areas, cracks that keep returning"
        ] },
        { type: "p", text: "Give every tiler the same brief, because two quotes for different scopes cannot be compared. What tiling costs in Perth, and why published figures for the same job disagree so widely, is covered on our [tiling cost per m2](tiling-cost-perth.html) page." },

        { type: "h2", text: "Get your floor tiling job quoted" },
        { type: "p", text: "Tell us the room, roughly the area and what you want done. We will pass it to a Perth tiler who can quote it. We do not do the tiling ourselves, and the tiler who quotes you sets their own price." },
        { type: "form", presetService: "Floor tiling" }
      ]
    },

    /* ---------------------------------------------------------------------
       BATHROOM TILING - bathroom-tiling-draft.md v1. Highest-risk page on
       the site for implied capability: every requirement is stated as what
       the work must meet, never as what we do. No cost figures, no contract
       rights, no deposit cap, no registered builder threshold.
       No WA waterproofing licence claim anywhere, in any form (claim register
       row 8: WA has no waterproofing-specific trade licence; the claim traces
       to training-provider marketing). */
    {
      page: "bathroom-tiling-perth.html",
      name: "Bathroom Tiling",
      shortDescription: "",
      metaTitle: "Bathroom Tiling Perth | Bathroom Tiler and Regrouting",
      metaDescription: "Bathroom tiling in Perth, from full retiles to regrouting. See what a bathroom tiling job involves and get your job quoted by a Perth bathroom tiler.",
      headline: "Bathroom Tiling in Perth",
      ctaText: "Get your bathroom tiling quoted",
      /* Finished modern bathroom, floor to ceiling tiles. Photo-style,
         synthetic (Gemini, cropped to 1200x800). */
      image: {
        src: "images/bathroom-tiling-perth.jpg",
        alt: "Modern bathroom with floor to ceiling wall tiles and a tiled shower recess.",
        width: 1200,
        height: 800,
        widths: [400, 560, 720, 960],
        sizes: "(min-width: 900px) 450px, min(520px, calc(100vw - 40px))"
      },
      blocks: [
        { type: "lead", text: "A bathroom is the hardest room in the house to tile. It is mostly edges, it has to be waterproof before a single tile goes down, and the parts that matter most are the parts you will never see again once the job is finished." },
        { type: "p", text: "This page explains what a bathroom tiling job involves in Perth, what the waterproofing rules actually require, and what to ask before you accept a quote. When you are ready, tell us about the job and we will pass it to a Perth tiler who can quote it." },
        { type: "p", text: "[Get your bathroom tiling quoted](#quote)" },

        { type: "h2", text: "Waterproofing: what has to happen before the tiles go down" },
        { type: "p", text: "This section sits first because it is the part of the job you cannot inspect later and the part that costs the most to get wrong." },
        { type: "p", text: "Waterproofing in a domestic wet area is covered by **AS 3740:2021**, the current edition, which supersedes the 2010 version. Tile installation itself is covered by **AS 3958:2023, incorporating Amendment No. 1 (2024)**. The National Construction Code sets the requirements that apply to the work." },
        /* VERIFIED 15 Sep 2026 (claim register rows 1, 12, 2a). Intertek
           Inform: AS 3740:2021 "Waterproofing of domestic wet areas" is
           Current, published 23 Jul 2021, supersedes AS 3740-2010 and its
           Amendment 1, no amendments listed. AS 3958:2023 as on the floor
           page. Row 2a is satisfied by naming no NCC edition (see TODO below). */
        { type: "credit", text: "AS 3740:2021 Waterproofing of domestic wet areas; AS 3958:2023 Installation of ceramic and stone tiles, reissued incorporating Amendment No. 1 (June 2024). Standards Australia." },
        /* TODO (Brad): no NCC edition is named anywhere on this page, per claim
           register row 2a. WA is mid-transition and permits may be assessed
           under either edition until 30 April 2027. Do not let an edition
           number creep in at review. */

        { type: "h3", text: "What the requirements actually say" },
        { type: "p", text: "These are the numbers a homeowner can check, and they are the reason a bathroom costs more per square metre than a hallway." },
        { type: "ul", items: [
          "**Shower walls** must be waterproofed to not less than **1800 mm** above the floor substrate.",
          "**The floor must fall to the waste**, continuously, at not less than **1:80** and not more than **1:50**. Too flat and it holds water. Too steep and it is uncomfortable to stand on.",
          "**Wall junctions and joints inside the shower** must be waterproof, as must wall to floor junctions and any penetrations.",
          "**Outside the shower**, where a flashing is used at the wall to floor junction, the horizontal leg must be not less than **40 mm**.",
          "**Perimeter flashing** at wall to floor junctions must have a vertical leg extending at least **25 mm** above the finished floor level, and a horizontal leg at least **50 mm** wide.",
          "**The stepdown** at the shower must be at least **25 mm** below the finished floor level outside it.",
          "**In an unenclosed shower**, the waterstop sits at least **1500 mm** horizontally from the shower rose.",
          "**Hobs must not be built from timber**, and where there is a hob the membrane carries over it and terminates not less than **50 mm** onto the floor.",
          "**Bond breakers** are required at wall to wall, wall to floor and hob to wall junctions, and at movement joints where the membrane is bonded to the substrate.",
          "**The membrane itself** must comply with **AS/NZS 4858**."
        ] },
        /* VERIFIED 13 September 2026 against NCC 2025 ABCB Housing Provisions
           Part 10.2. Clause references: 10.2.2, 10.2.3, 10.2.12, 10.2.15,
           10.2.16, 10.2.18, 10.2.24, 10.2.27, 10.2.28, 10.2.8.
           Publication gate cleared 13 Sep 2026. One correction made at the
           gate: the 40 mm figure is the horizontal flashing leg OUTSIDE the
           shower (10.2.3(3)(b), and 10.2.5(2)(b) for laundries and WCs), not
           a shower wall junction dimension. TODO (Brad): correct the claim
           register row and check whether Canberra carries the same error.
           TODO (Brad): clause 10.2.2 sets the 1800 mm shower wall height
           above the floor SUBSTRATE. Clause 10.2.25 sets the membrane
           application height at 1800 mm above the finished TILE level.
           Different datums, roughly a tile thickness apart. The page uses the
           substrate version, which is the conservative reading for a homeowner
           checking work. Do not let the two get merged at review.
           SA variations (10.2.1, 10.2.33) confirmed present and avoided.
           Schedule 11 for WA contains no Part 10.2 entry. */

        { type: "h3", text: "The line most people do not know" },
        { type: "p", text: "Whether your bathroom needs a building permit depends on the scope of the work, not what it costs. Schedule 4 of the Building Regulations 2012 lists the work that is exempt." },
        /* VERIFIED 15 Sep 2026 (claim register row 5), against the Building
           Act 2011 on legislation.wa.gov.au. s37(2): "Each owner of a building
           or an incidental structure in respect of which building work is done
           without a building permit being in effect for the building work must
           ensure that the building or incidental structure complies, when
           completed, with each building standard that applies". The draft said
           "work has to meet" the standards; reworded to name the owner, since
           s37(2) puts the obligation on the owner. Building Regulations 2012,
           Schedule 4 is headed "Building work that does not require building
           permit" (r. 41(3)). */
        { type: "p", text: "But under **section 37(2) of the Building Act 2011, where building work is done without a building permit, the owner must ensure the finished work complies with every building standard that applies to it.** A small job is not an exempt job. Nobody signs off a compliant bathroom because it was cheap." },
        { type: "credit", text: "Building Act 2011 (WA), section 37; Building Regulations 2012 (WA), Schedule 4." },

        { type: "h3", text: "What to ask about waterproofing" },
        { type: "ul", items: [
          "Which membrane product is being used, and is it compliant with AS/NZS 4858",
          "Where the membrane goes, specifically how far up the shower walls and how it is treated at the junctions",
          "What the fall to the waste will be, and how it is being set",
          "Who is doing the waterproofing, if it is not the tiler",
          "How long it cures before tiling starts, and whether the schedule allows for it"
        ] },
        { type: "p", text: "If the answer to any of these is vague, that is the moment to ask for it in writing, not after the tiles are on." },
        /* Diagram: shower waterproofing extent. Membrane up the wall, wall to
           floor junction, hob or stepdown, fall to waste. Labels: 1800 mm wall
           height, 25 mm stepdown, fall to the waste. No caption (illustrative).
           An original drawing, not traced from an NCC figure. Its labels
           match the requirements list above as verified at the gate on
           13 Sep 2026, with 1800 mm measured from the floor substrate. If
           any of those figures change, change the SVG's labels too. */
        { type: "image", src: "images/shower-waterproofing-extent.svg", alt: "Diagram showing waterproofing membrane extent in a shower, including wall height, stepdown and fall to the floor waste.", width: 1200, height: 800 },

        { type: "h2", text: "What a bathroom tiling job involves" },
        { type: "p", text: "In rough order, and the order matters because most of the delays come from doing these out of sequence." },
        { type: "ol", items: [
          "**Removal.** Old tiles come up, along with whatever is under them. Nobody knows the condition of the substrate until this is done.",
          "**Substrate preparation.** Making the surface flat, sound and dry enough to take a membrane. This is where unexpected work shows up.",
          "**Waterproofing.** The membrane goes on, then it cures. It cannot be rushed and it cannot be tiled over early.",
          "**Setting out.** Where the full tiles land and where the cuts fall. On a small floor this decides how the finished room looks.",
          "**Tiling.** Floor and walls, then the detail work around the waste, the niche, the vanity and the door.",
          "**Grout and silicone.** Grout in the field, flexible sealant at the junctions and corners where movement happens."
        ] },
        { type: "p", text: "If your job also involves moving the shower, the vanity or the floor waste, that is plumbing work before it is tiling work, and in Western Australia plumbing work has to be done by a licensed plumber. A handful of basic tasks at your own home are exempt, such as replacing a shower head or clearing a blocked fixture or waste pipe with a plunger." },
        /* VERIFIED 15 Sep 2026 (claim register row 9): Building and Energy,
           "Plumbing work in your home", wa.gov.au, last updated 1 Jul 2026.
           Exempt at your own home, unpaid if someone else does it: shower head,
           tap (not a thermostatic mixing tap), cistern washer, water filter
           cartridge, clearing a blocked fixture or waste pipe with a plunger.
           "Other than the above tasks all water supply, sanitary and drainage
           plumbing work must be carried out by a licensed plumber or
           permit-holder." The draft's "clearing a blocked pipe" was broader
           than the exemption; narrowed to the plunger wording. */
        { type: "credit", text: "Building and Energy, Plumbing work in your home." },
        { type: "p", text: "Moving plumbing is also the single largest thing you can do to a bathroom budget. That is covered on the [bathroom tiling and regrouting costs](tiling-cost-perth.html) page." },

        { type: "h2", text: "Choosing tiles for a wet area" },
        { type: "p", text: "Three things matter more than the look." },
        /* Claim register row 13, resolved 15 Sep 2026 under content-sourcing
           rule 5: reworded as a question to ask, so it states no requirement
           and no rating that would need a source. The draft's "should be
           rated" read as a rule. */
        { type: "p", text: "**Slip resistance.** Ask for the floor tile's slip resistance rating, and whether it suits a wet shower floor rather than a dry one." },
        /* TODO (Brad): AS 4586 is unverified as the current edition. No
           classification code (R ratings, P ratings, HB 198) appears here on
           purpose. Do not add one unless the standard is properly verified. */
        { type: "p", text: "**Format.** Large format tiles need a flatter substrate and are less forgiving of a floor that falls to a waste. Mosaics sit into a fall more easily, which is why shower floors often use them, but they are far slower to lay and there is much more grout to maintain." },
        { type: "p", text: "**Material.** Porcelain is denser and harder to cut than ceramic. Natural stone usually needs sealing and is less tolerant of the chemicals people clean bathrooms with." },

        { type: "h2", text: "Regrouting: when the tiles are fine and the grout is not" },
        { type: "p", text: "Regrouting removes the old grout from the joints and replaces it. It is a legitimate option when the tiles themselves are sound and well stuck down, and the grout has stained, cracked or fallen out." },
        { type: "p", text: "It is not a repair for a wet area problem. If water is getting past the grout and into the wall or the floor, the grout is a symptom. Grout is not a waterproofing layer. The membrane behind the tiles is, and no amount of new grout will fix a membrane that has failed." },
        { type: "p", text: "Signs the job may be more than regrouting: tiles that sound hollow when tapped, tiles that move, swelling at the base of a wall, or a smell that does not go away." },
        { type: "p", text: "If a shower is leaking, that needs a specialist assessment before anyone quotes a repair." },
        /* TODO (Brad): the link graph says to vary the second cost guide anchor
           on this page. The draft uses "bathroom tiling and regrouting costs"
           both times. Left as drafted rather than reworded. */
        { type: "p", text: "Costs for regrouting and where they vary are on the [bathroom tiling and regrouting costs](tiling-cost-perth.html) page. Tiles that are cracked, loose or drummy are a different job, covered under [cracked or drummy tiles](floor-tiling-perth.html)." },
        /* Regrouting close-up, old grout line against fresh. Photo-style,
           synthetic (Gemini, cropped to 1200x800), illustrative only, so no
           caption. */
        { type: "image", src: "images/regrouting-close-up.jpg", alt: "Close-up of a tiled wall showing a discoloured grout line beside a freshly grouted one.", width: 1200, height: 800, widths: [400, 560, 720, 960], sizes: "min(720px, calc(100vw - 40px))" },

        { type: "h2", text: "Splashbacks" },
        { type: "p", text: "Kitchen and laundry splashbacks are the same trade and a much smaller job. They are usually priced hourly rather than by the square metre, and the labour is in the setting out and the cuts around power points rather than the area." },

        { type: "h2", text: "Older Perth bathrooms" },
        /* VERIFIED 15 Sep 2026 (claim register row 10). Same sources and the
           same two corrections as the floor page: "before 1990" per HealthyWA,
           and HealthyWA's own product list (backing for wall tiles and
           splashbacks, wall panels in bathrooms, vinyl floor tiles) in place of
           the draft's "tile beds". */
        { type: "p", text: "In homes built before 1990, the sheeting behind wall tiles, bathroom wall panels and old vinyl floor tiles can contain asbestos. WorkSafe WA treats removing any quantity of friable asbestos, or more than 10 square metres of non-friable asbestos, as licensed asbestos removal work, and WorkSafe has to be notified at least five days before that work starts." },
        { type: "credit", text: "HealthyWA, Asbestos in and around the home; WorkSafe WA, Asbestos removal notifications." },
        { type: "p", text: "If anything is suspected, the work stops and it gets tested before anything is cut, drilled or sanded. This is not a step to negotiate around, and no reputable tiler will." },
        { type: "p", text: "Older bathrooms also tend to produce more surprises at the removal stage: previous repairs, movement, a substrate that will not take a new floor, or a membrane that was never there in the first place." },

        { type: "h2", text: "What to ask before you accept a quote" },
        { type: "ul", items: [
          "What is included, line by line: removal, disposal, preparation, waterproofing, tiling, grout and sealant, making good",
          "What is excluded, particularly tile supply, plumbing, electrical and asbestos testing",
          "What happens if the substrate is worse than expected, and how variations get approved",
          "Who is buying the tiles, who counts them, and who wears the wastage",
          "How long the bathroom will be out of use, including membrane curing time",
          "What documentation you will get for the waterproofing"
        ] },
        { type: "p", text: "Give every tiler the same brief. If one prices a full retile and another prices tiling over the existing floor, the difference between the two quotes tells you nothing useful." },

        { type: "h2", text: "Get your bathroom tiling quoted" },
        { type: "p", text: "Tell us about the room, roughly the area and what you want done. We will pass it to a Perth tiler who can quote it. We do not do the tiling ourselves, and the tiler who quotes you sets their own price." },
        { type: "form", presetService: "Bathroom tiling" }
      ]
    },

    /* ---------------------------------------------------------------------
       COST GUIDE - cost-guide-draft.md v2, eleven sections. A content page,
       not a service. Every figure belongs to a named publisher type; none is
       ours. Businesses are never named (peak bodies HIA and Master Builders
       WA excepted). Nothing older than 2024 enters the tables.
       [VERIFY] resolution: every token in the draft was checked on 13 Sep 2026
       against cost-guide-perth-figures.md (updated 13 Sep 2026) and removed
       only where the figure, the publisher type and the scope all match. Each
       resolution is recorded in a comment beside the block it covered.
       TODO (Brad): meta changed from the approved version. The approved meta
       said "Indicative ranges for price per m2", which implies the figures are
       ours. Under the Canberra method they are not. New meta describes
       collection and comparison instead. Re-approve before bake.
       Rate card: Perth itemised rate card searched for and confirmed absent,
       13 Sep 2026. Replaced by the scope table under Bathroom renovation,
       not filled with national figures. Revisit under Option A once a renter
       is attached. */
    {
      page: "tiling-cost-perth.html",
      name: "Cost Guide",
      shortDescription: "",
      metaTitle: "Tiling Cost Perth | Price per m2 and What Drives It",
      metaDescription: "What does tiling cost in Perth? We collected published Perth prices for tiling per m2, bathroom retiles and regrouting, and explain why they disagree.",
      headline: "Tiling Costs in Perth: What Drives the Price",
      ctaText: "Get a quote for your job",
      ctaHeading: "Working out a budget for a Perth tiling job",
      ctaBody: "Tell us the room, roughly the area, and what is there now. We will pass it to a Perth tiler who can quote it, and the tiler sets their own price.",
      /* Reformatted 15 Sep 2026 on Brad's instruction to follow Canberra's
         cost guide (canberratilelayers.com.au/tiling-cost-guide-canberra):
         the v2 draft's numbered section headings, "Section 3 below" cross
         references and sourcing asides ("the best sourced of the Perth
         adjustments here") read as notes to the author. Headings are now
         unnumbered, table columns say "Published by", the method note box is
         folded into the opening, and the page ends with Budgeting sensibly
         and FAQs, then the CTA band. The in-body "11. Get your job quoted"
         section is replaced by ctaHeading/ctaBody. No figure was added or
         changed: the FAQ answers and budgeting points restate figures already
         on this page. */
      blocks: [
        /* [VERIFY] resolved: $3,000 to $65,000+, all 2026, figures file
           Section 1 "The spread". */
        { type: "lead", text: "Search for what a bathroom renovation costs in Perth and you will find published figures from about $3,000 at the cosmetic end to $65,000 and beyond at the top. All of them were published in 2026, and all of them describe work in Perth." },
        { type: "p", text: "That is not because anyone is lying. It is because a builder, a tile supplier, a peak body, a tradie marketplace and a cost guide site all answer the same question from different positions, and use the same words for different jobs." },
        { type: "p", text: "This guide gives you the published numbers, tells you what kind of business published each one, and explains why they differ. Then it covers the costs that turn up after work starts, and the questions that make quotes comparable. None of these figures are our prices, and none of them were quoted for your job." },

        { type: "h2", text: "The headline numbers" },
        { type: "h3", text: "Tiling labour, per square metre" },
        /* [VERIFY] resolved: all nine rows match figures file Section 2
           (Perth supplier, Perth supplier bathroom, cost guide site, Perth tile
           supplier, Perth builder, Perth tiler, tradie marketplace reclassified
           in the second pass, national guide, calculator site). */
        { type: "table", headers: ["Published by", "Floor, standard lay", "Wall", "Feature or wet area", "Hourly"], rows: [
          ["Perth supplier", "$55 to $75", "", "$90 to $150", "$50 to $90"],
          ["Perth supplier, bathroom work", "$75 to $120", "", "", "$60+"],
          ["Cost guide site", "$37 to $94, averaged at $58", "$42 to $105", "$63 to $125", "$126"],
          ["Perth tile supplier", "$40 to $150 supply and install", "", "", "around $60"],
          ["Perth builder", "$45 to $150 install", "", "", ""],
          ["Perth tiler", "$30 to $100 supply and install", "", "", "$50 to $90"],
          ["Tradie marketplace", "$45 to $150", "", "", "$40 to $120"],
          ["National guide", "$40 to $180", "$10 to $30 above floor", "", ""],
          ["Calculator site", "$82 to $148 supply and install. Bathroom $120 to $220", "", "", ""]
        ] },
        /* [VERIFY] resolved: $37 to $94 avg $58 (cost guide site) against $55
           to $75 and $75 to $120 (Perth supplier), Section 2. "Roughly a third"
           checks: 37 is 33% below 55. */
        { type: "p", text: "Two things stand out. A cost guide site puts standard floor tiling labour in Perth at $37 to $94 per square metre and averages it at $58. A Perth supplier puts the same work at $55 to $75, and bathroom work at $75 to $120. The bottom of the first range sits roughly a third below the bottom of the second. Both were published this year and both say Perth." },
        /* [VERIFY] resolved: $126 cost guide site; $50 to $90 Perth supplier,
           around $60 Perth tile supplier, Section 2. (A Perth tiler also gives
           $50 to $90, so "two Perth sources" understates rather than
           overstates.) */
        { type: "p", text: "The same cost guide site quotes an hourly rate of $126. Two Perth sources put hourly rates at $50 to $90 and around $60. Treat the $126 as an outlier rather than a Perth rate." },

        { type: "h3", text: "Tiles themselves" },
        /* [VERIFY] resolved: all four rows, figures file Section 3. */
        { type: "table", headers: ["Published by", "Material", "Supply price per m2"], rows: [
          ["Perth supplier", "Budget ceramic", "from $20"],
          ["Perth supplier", "General range", "$20 to $65"],
          ["Cost guide site", "Mid-range porcelain", "$50 to $120"],
          ["Cost guide site", "Premium stone", "$100 to $250+"]
        ] },
        { type: "p", text: "Tile choice is the part of the quote you control most directly, and the gap between the bottom and the top of that table is larger than most people expect." },

        { type: "h3", text: "Preparation, removal and repairs" },
        /* [VERIFY] resolved: all nine rows, figures file Section 3. "Replacing
           individual tiles" is the file's "Tile replacement, $25 to $50 per m2,
           Perth builder". */
        { type: "table", headers: ["Item", "Published figure", "Published by"], rows: [
          ["Self-levelling compound", "$25 to $40 per m2", "National guide"],
          ["Waterproofing, per m2", "$37 to $84 per m2", "Cost guide site"],
          ["Waterproofing, per m2", "$40 to $70 per m2 plus certificate", "National guide"],
          ["Waterproofing, per project", "adds $500 to $1,500", "Perth builder"],
          ["Tile removal and demolition", "$30 to $60 per m2", "National guide"],
          ["Replacing individual tiles", "$25 to $50 per m2", "Perth builder"],
          ["Minor tile repair call-out", "$150 to $250", "Perth builder"],
          ["Pattern or diagonal lay premium", "20 to 40% on labour", "National guide"],
          ["Wastage allowance", "10 to 15%, higher for diagonal and herringbone", "Multiple"]
        ] },
        /* [VERIFY] resolved: Section 3 and its note on the two waterproofing
           figures (different units, not a range). */
        { type: "p", text: "Waterproofing is quoted two different ways. A cost guide site prices it per square metre at $37 to $84 in Perth, close to the national $40 to $70. A Perth builder prices it per project at $500 to $1,500. Those are not a range, they are two different units, and a quote that gives you one is not comparable to a quote that gives you the other. Ask which you are being given." },

        { type: "h3", text: "Whole jobs" },
        /* [VERIFY] resolved: $7,500 to $18,500 Perth supplier (Section 3);
           around $6,000 for 100m2 Perth specialist (Section 2b). */
        { type: "table", headers: ["Job", "Published figure", "Published by"], rows: [
          ["Around 100m2 of house flooring, supply and install", "$7,500 to $18,500", "Perth supplier"],
          ["Around 100m2 of house flooring", "around $6,000", "Perth specialist"]
        ] },
        { type: "p", text: "Figures for tiling a whole bathroom are further down, next to the renovation totals, where the comparison tells you more." },

        { type: "h3", text: "Regrouting and shower work" },
        /* [VERIFY] resolved: all four rows, figures file Section 3. */
        { type: "table", headers: ["Published figure", "Published by"], rows: [
          ["Shower base regrout, from $350", "Perth grout specialist"],
          ["Full shower regrout, from $550", "Perth grout specialist"],
          ["Shower regrout, from $250", "Perth shower repair specialist"],
          ["Shower regrout, $600 to $2,500, averaging around $1,500", "National guide"]
        ] },
        { type: "p", text: "Two Perth specialists advertise from $250 and from $550 for what sounds like the same job. A national guide puts the average at around $1,500. The word doing the work in the Perth figures is \"from\". A starting price is a way of getting a phone call, not a quote. What the job actually costs depends on the size of the shower, the grout type, how much of the old grout has to come out, and whether the membrane behind it is still intact. If it is not, regrouting is the wrong repair and the tiles are coming off. That is a diagnosis, and it happens on site." },
        { type: "p", text: "Regrouting sits inside a bathroom tiling job. The job itself is described on our [bathroom tiling](bathroom-tiling-perth.html) page." },

        { type: "h2", text: "Bathroom renovation in Perth, side by side" },
        { type: "p", text: "Tiling is one trade inside a bathroom renovation, so the total is the number most people search for first. Here is what Perth and WA sources published in 2026." },
        /* [VERIFY] resolved: all ten rows, figures file Section 1. The Perth
           builder's second figure set is deliberately not used. */
        { type: "table", headers: ["Published by", "Published figure"], rows: [
          ["Peak body (HIA)", "WA average around $26,000"],
          ["Tradie marketplace", "Perth average around $15,667"],
          ["Cost guide site", "$27,300 for a mid-range bathroom. Basic $10,500. Cosmetic refresh $3,000 to $8,000"],
          ["Perth builder", "Basic $10,500 to $21,000. Mid-range $21,000 to $36,750. Premium $36,750 to $57,750"],
          ["Perth supplier", "$8,000 to $30,000+, with most landing $15,000 to $28,000"],
          ["Cost guide site", "Budget $9,000 to $16,000. Mid $20,000 to $35,000. Luxury $38,000 to $65,000+"],
          ["Perth renovator", "$15,000 to $35,000 standard, $50,000+ in the western suburbs"],
          ["Perth renovation company", "$25,000 to $50,000+"],
          ["Tradie marketplace", "Basic $5,000 to $10,000. Average $10,000 to $15,000. Full overhaul $15,000 to $25,000"],
          ["National guide", "WA $15,000 to $27,000. Regional WA $13,000 to $23,000"]
        ] },
        /* [VERIFY] resolved: the four mid-range figures, figures file Section 1
           "Three mid-range figures to put side by side". */
        { type: "p", text: "Narrow that to one description, a mid-range bathroom, and four sources still give four answers: around $15,667 from a tradie marketplace, around $26,000 from a peak body, $27,300 from a cost guide site, and $21,000 to $36,750 from a Perth builder. Same room, same year, same city." },

        { type: "h3", text: "What each figure actually covers" },
        { type: "p", text: "Most of the gap in that table comes down to whether each source says what its figure includes." },
        /* [VERIFY] resolved: all nine rows, figures file Section 1 scope
           disclosure table. */
        { type: "table", headers: ["Published by", "Does it state the scope?", "What it says"], rows: [
          ["Peak body (HIA)", "No", "A WA average, no inclusions listed"],
          ["Tradie marketplace", "No", "A Perth average of jobs booked through the platform"],
          ["Tradie marketplace", "Partly", "Tiers labelled basic, average and full overhaul"],
          ["Cost guide site", "Partly", "Separates a cosmetic refresh from a basic job from a mid-range one"],
          ["Cost guide site", "Partly", "Budget, mid and luxury tiers, described by fixture grade"],
          ["Perth builder", "Yes", "Tiers set by fixture and finish grade"],
          ["Perth supplier", "Yes", "Notes that a layout change or premium finishes push past $30,000"],
          ["Perth renovator", "Partly", "Separates standard work from western suburbs work"],
          ["Perth renovation company", "No", "A single range, no inclusions listed"]
        ] },
        /* Counts match the table above and the figures file: two "Yes" rows
           (Perth builder, Perth supplier), three "No" rows (HIA, the hipages
           marketplace row, the renovation company). The v2 draft had the two
           counts swapped; corrected on Brad's instruction, 13 Sep 2026. */
        { type: "p", text: "Two of nine state their scope plainly. Three state nothing at all. When a figure does not say whether it includes demolition, plumbing changes, fixtures, tiling or making good, comparing it to another figure is guesswork, and the $15,667 against $36,750 gap is mostly that guesswork made visible." },

        { type: "h3", text: "Tiling on its own tells a different story" },
        { type: "p", text: "Ask the narrower question, what does it cost to tile a bathroom rather than renovate one, and the published figures stop disagreeing." },
        /* [VERIFY] resolved: all four rows, figures file Section 2b. */
        { type: "table", headers: ["Published by", "Published figure", "Scope stated"], rows: [
          ["Perth supplier", "$2,000 to $7,000. For 25 to 30m2 of tiled surface, $4,500 to $6,500", "Complete tiling job, supply and install"],
          ["Perth tile supplier", "$3,000 to $6,000", "Standard 28m2 bathroom, material and labour"],
          ["Perth specialist", "$3,000 to $6,000", "Not detailed"],
          ["Cost guide site", "$630 to $1,675", "Labour only, around 10m2"]
        ] },
        { type: "p", text: "Three Perth sources of three different types land on roughly $3,000 to $6,500 for tiling a standard bathroom. The renovation figures for the same room ranged from $15,667 to $36,750." },
        { type: "p", text: "The fourth row is not a contradiction either, once you read the scope. It is labour only across about 10 square metres of floor. The first row is supply and install across 25 to 30 square metres of floor and walls. Different job, stated plainly, different number." },
        { type: "p", text: "That is the whole lesson of this page in one table. Figures converge when the scope is defined and scatter when it is not. Tiling is a defined scope. Renovation is not." },

        { type: "h2", text: "Why the numbers disagree so much" },
        { type: "p", text: "Understanding this is worth more than any single figure. The bathroom tiling figures agree with each other and the renovation figures do not, and these are the reasons, roughly in order of how much of the gap each one explains." },
        { type: "p", text: "**Different scopes wearing the same label.** This is most of it. \"Mid-range bathroom renovation\" is not a defined scope. For one publisher it means new tiles, new vanity, same layout and same plumbing. For another it includes moving the shower, replacing the bath and rewiring. The words are identical and the jobs are not. \"Tiling a bathroom\" leaves far less room to differ, which is why those figures land within a few thousand dollars of each other." },
        { type: "p", text: "**Who is writing, and about whose customers.** A tradie marketplace reports what the jobs booked through it cost, and small jobs book more easily online than large ones, so its average sits low. A renovation company quoting full turnkey projects reports the customers who reach it, and its floor sits above the marketplace's ceiling. Neither is wrong about its own book." },
        /* [VERIFY] resolved: $126 cost guide site; $50 to $90 from the Perth
           supplier and the Perth tiler, Section 2. */
        { type: "p", text: "**Some cost pages are not built from jobs at all.** Programmatic cost guide sites publish a figure for every city and every trade. The Perth number and the Adelaide number are often generated by the same process, adjusted by a factor. That is why a cost guide site can publish an hourly rate of $126 in a market where two Perth sources say $50 to $90." },
        { type: "p", text: "**Fixtures move the total more than tiling does.** A change of tapware, a frameless screen, a stone top or a freestanding bath can move a bathroom total by thousands without changing the tiling scope by a square metre. Two quotes for the same tiling work can be $10,000 apart on fixtures alone." },
        { type: "p", text: "**Averages hide the shape of the distribution.** A single average across budget refreshes and western suburbs rebuilds describes almost nobody's actual bathroom." },
        { type: "p", text: "**What to do with that.** Stop looking for the right number for a bathroom renovation, because there is not one. Break your job into defined scopes, price each one, and add them up. The bathroom tiling figures above show that a defined scope produces a usable number even from unrelated sources. It is also exactly what you should ask a tiler to give you in writing, as set out under how to get a quote you can rely on, below." },
        /* TODO (Brad): "labour is roughly half the job" is a Canberra line. No
           Perth published source for it in the figures file. Dropped from this
           section rather than carried across unsourced. */

        { type: "h2", text: "Why cost per square metre is misleading" },
        { type: "p", text: "Per square metre is the figure everyone wants, and it is the least reliable one on this page." },
        /* [VERIFY] resolved: $55 to $75 standard, $75 to $120 bathroom, Perth
           supplier, Section 2. */
        { type: "p", text: "A small bathroom floor is mostly edges. Cuts around the waste, the vanity, the door frame and the shower hob take the time, and a small floor is nearly all edge. The open middle of a living room floor is the fast part, and a big floor has proportionally more of it. So the per square metre rate for a 4m2 bathroom floor is higher than for a 40m2 living area, not lower, and the ranges above reflect that. One Perth supplier prices standard floors at $55 to $75 and bathroom work at $75 to $120 for exactly that reason." },
        { type: "p", text: "Fixed costs make it worse. Setting up, protecting the rest of the house, mixing, cutting, cleaning up and disposal do not shrink with the room. Spread across a small area, they dominate the rate." },
        { type: "p", text: "Use per square metre to sanity-check a quote against the ranges on this page. Do not use it to price your job." },

        { type: "h2", text: "What actually drives the cost" },
        { type: "h3", text: "The tile itself" },
        /* [VERIFY] resolved: from $20 budget ceramic (Perth supplier), $100 to
           $250+ premium stone (cost guide site), Section 3. */
        { type: "p", text: "Large format tiles need a flatter substrate and more careful setting. Mosaics are slow. Natural stone needs sealing and is less forgiving. Budget ceramic starts around $20 per square metre to supply and premium stone reaches $250 and above, according to a Perth supplier and a cost guide site respectively." },
        { type: "h3", text: "The layout" },
        /* [VERIFY] resolved: 20 to 40% labour, national guide, Section 3. */
        { type: "p", text: "A straight lay is the baseline. Diagonal, herringbone and brick bond patterns add cutting and wastage, and a national guide puts the extra labour at 20 to 40 per cent." },
        { type: "h3", text: "The substrate, which is where the money hides" },
        { type: "p", text: "A flat, sound, dry substrate is cheap to tile. One that needs grinding, patching or self-levelling is not, and nobody knows which one you have until the old floor comes up." },
        { type: "h3", text: "Wet areas" },
        { type: "p", text: "A bathroom carries waterproofing, falls to the waste and junction detailing that a hallway does not. The requirements are set by the National Construction Code and AS 3740:2021, not by the tiler, and they are described on our [bathroom tiling](bathroom-tiling-perth.html) page." },
        { type: "h3", text: "Access and sequencing" },
        { type: "p", text: "Second storey, tight parking, a single bathroom in an occupied house, or a job that has to wait on a plumber and an electrician. All of it costs time." },

        { type: "h3", text: "What makes Perth different" },
        { type: "p", text: "These are the things that make Perth figures different from national ones." },
        { type: "p", text: "**Whether your floor is a slab.** Check this before you plan a new layout, because it changes the cost of every decision that follows." },
        /* [VERIFY] resolved: $2,000 to $6,000 per plumbing point, Perth
           supplier, Section 4. The comparative premise (Perth builds more on
           slab than eastern cities) is unsourced and deliberately absent: the
           subsection is written conditionally. Do not reinstate the comparative
           framing without a source. */
        { type: "p", text: "If the bathroom sits on a concrete slab, moving a shower, a vanity or a floor waste means cutting the slab first. A Perth supplier puts that at $2,000 to $6,000 per plumbing point. It is a concrete job before it is a plumbing job, and it happens before any tiling starts." },
        { type: "p", text: "If the floor is suspended timber, the same change is a different job and usually a cheaper one, because the pipework is reached from below rather than cut out of the structure." },
        { type: "p", text: "Either way, this is the strongest argument for keeping the existing layout. A bathroom that keeps its plumbing where it is can absorb a much better tile budget for the same total." },
        /* [VERIFY] resolved: Master Builders WA, 8 to 15%, figures file
           Section 1 (budgets vs eastern states) and Section 4 (materials).
           Note the file records it as reached via a secondary site. */
        { type: "p", text: "**Freight.** Master Builders WA puts the freight component at 8 to 15 per cent on WA renovation budgets compared with the eastern states." },
        /* [VERIFY] resolved: 10 to 20% above Melbourne, cost guide site,
           Section 4. */
        { type: "p", text: "**Labour.** A cost guide site puts Perth labour 10 to 20 per cent above Melbourne, attributing it to mining and FIFO competition for trades. That is one publisher's claim rather than a settled number." },
        /* [VERIFY] resolved: western suburbs 20 to 30% (cost guide site,
           Section 4); $50,000+ against $15,000 to $35,000 (Perth renovator,
           Section 1). */
        { type: "p", text: "**Suburb.** A cost guide site puts western suburbs work 20 to 30 per cent above the outer suburbs, and a Perth renovator quotes $50,000 and up for western suburbs bathrooms against $15,000 to $35,000 as a standard range." },
        /* [VERIFY] resolved: coastal salt zone, cost guide site, Section 4. */
        { type: "p", text: "**Coastal corrosion.** A cost guide site notes that coastal suburbs push buyers toward stainless and corrosion-resistant hardware. It affects fixtures rather than tiling, but it lands in the same total." },

        { type: "h2", text: "The costs people do not budget for" },
        /* [VERIFY] resolved: wastage 10 to 15%, Section 3. */
        { type: "p", text: "**Wastage.** Order 10 to 15 per cent over the measured area, and more for diagonal or herringbone. Running out mid-job and finding a different dye lot is worse than over-ordering." },
        /* [VERIFY] resolved: $30 to $60 per m2, national guide, Section 3. */
        { type: "p", text: "**Removal and disposal.** Tile removal is published at $30 to $60 per square metre by a national guide, and tip fees sit on top. Tile and mortar waste is heavy, and skip pricing follows weight." },
        { type: "p", text: "**What demolition reveals.** Rot, movement, failed old waterproofing or a substrate that will not take a new floor. None of it is visible when the quote is written, which is why quotes carry variation clauses." },
        /* [VERIFY] resolved for the price: $2,000 to $8,000 per room, Perth
           renovation company, Section 4 ("pair with the WorkSafe WA rule").
           The WorkSafe WA rule itself is not in the figures file. It is the
           same claim the bathroom and floor pages carry under claim register
           row 10, verified there on 15 Sep 2026 (HealthyWA and WorkSafe WA),
           with "before 1990" and HealthyWA's product list in place of the
           draft's "late 1980s" and "tile beds". Keep all three in step. */
        { type: "p", text: "**Asbestos in older Perth homes.** In homes built before 1990, the sheeting behind wall tiles, bathroom wall panels and old vinyl floor tiles can contain asbestos. WorkSafe WA treats removing any quantity of friable asbestos, or more than 10 square metres of non-friable asbestos, as licensed asbestos removal work, and WorkSafe has to be notified at least five days before it starts. A Perth renovation company puts licensed removal at $2,000 to $8,000 per room. If anything is suspected, work stops and it gets tested before it gets cut." },
        /* [VERIFY] resolved: $3,000 to $7,000, Perth renovation company,
           Section 4. */
        { type: "p", text: "**Old pipework.** A Perth renovation company puts replacing galvanised steel pipe in a bathroom zone at $3,000 to $7,000. It is not tiling work, but it is discovered during tiling work." },
        { type: "p", text: "**Trims, edging and sealing.** Tile trims, silicone to junctions, and sealing for stone and some grouts. Small individually, and usually left out of a verbal estimate." },
        { type: "p", text: "**Other trades.** Plumbing work in WA has to be done by a licensed plumber, with narrow exceptions at your own home such as replacing a shower head or clearing a blocked fixture or waste pipe with a plunger. If your job moves water, that is a second trade and a second invoice." },
        { type: "p", text: "**Making good.** Paint, cornice, door adjustment and the skirting that did not survive the demolition." },
        { type: "p", text: "**Margin and GST.** A quote that looks 10 per cent cheaper than the others is sometimes a quote excluding GST." },

        { type: "h2", text: "How to get a quote you can rely on" },
        { type: "p", text: "The goal is not the lowest number. It is quotes that describe the same job." },
        { type: "h3", text: "Give every quoter the same brief" },
        { type: "p", text: "Same room, same measurements, same tile, same scope. If one tiler prices a full retile and another prices tiling over the existing floor, the difference between the quotes tells you nothing." },
        { type: "h3", text: "Ask what is included, line by line" },
        { type: "ul", items: [
          "Removal and disposal",
          "Substrate preparation",
          "Waterproofing",
          "Tiling",
          "Grout and silicone",
          "Trims",
          "Making good"
        ] },
        { type: "p", text: "A single total with no breakdown cannot be compared to anything." },
        { type: "h3", text: "Ask what is excluded" },
        { type: "p", text: "Tile supply, plumbing, electrical, asbestos testing and rubbish removal are the usual exclusions." },
        { type: "h3", text: "Ask how variations are handled" },
        { type: "p", text: "Specifically, what happens if the substrate is worse than expected. An hourly rate and a written approval step is a reasonable answer. Silence is not." },
        { type: "h3", text: "Settle the tile order" },
        { type: "p", text: "Who buys, who counts, who wears the wastage, where the tiles are stored and how long the lead time is." },
        { type: "h3", text: "For repairs, expect a diagnosis before a price" },
        { type: "p", text: "A cracked tile, a drummy floor and a leaking shower can look identical and have three different causes. Quotes given over the phone for repairs are guesses. Cracked and drummy tiles are covered on our [floor tiling](floor-tiling-perth.html) page." },

        { type: "h2", text: "Your rights on a WA tiling contract" },
        /* Act and regulation names are italic in the draft. The block renderer
           supports bold only, so they render roman. Words unchanged. */
        { type: "p", text: "This part is not a matter of opinion, and most homeowners do not know it." },
        { type: "p", text: "The Home Building Contracts Act 1991 (WA) covers fixed-price home building contracts between $7,500 and $500,000, and it names tiling explicitly as home building work. It applies whether or not the contractor is a registered builder." },
        { type: "p", text: "Where it applies:" },
        /* TODO (Brad): "the relevant WA regulator" is deliberately vague. The
           claim register says complaints to LGIRS within 3 years. Confirm the
           current body name and its current title before bake, since Building
           and Energy has been restructured. */
        { type: "ul", items: [
          "The contract must be in writing and signed by both parties.",
          "The deposit is capped at 6.5 per cent of the contract price.",
          "Progress payments can only be claimed for work actually carried out.",
          "Complaints can be made to the relevant WA regulator for up to three years."
        ] },
        { type: "p", text: "Separately, building work valued at $20,000 or more that requires a building permit must be carried out by a registered builder, and home indemnity insurance is required for permit-requiring work over $20,000. Whether a permit is needed depends on the scope of the work, not its cost. Schedule 4 of the Building Regulations 2012 lists the exempt work." },
        { type: "p", text: "And the line worth remembering regardless: under section 37(2) of the Building Act 2011, where building work is done without a building permit, the owner must ensure the finished work complies with every building standard that applies to it. A small job is not an exempt job." },

        /* Canberra pattern. Advice only, no new figures: the one price below
           is the slab figure already given under What makes Perth different. */
        { type: "h2", text: "Budgeting sensibly" },
        { type: "p", text: "**Hold a contingency.** Something almost always turns up when the old tiles come up. A contingency is the difference between a variation being an inconvenience and being a crisis." },
        { type: "p", text: "**Understand what the cheapest quote is cheaper at.** Sometimes lower overhead. More often a narrower scope, less preparation, an assumption that becomes a variation later, or a price that excludes GST." },
        { type: "p", text: "**Spend where failure is expensive.** Waterproofing and substrate preparation are hidden once the tiles go down, and putting either right means taking the finished surface off. Tile is visible and replaceable. If the budget has to give, give on the tile." },
        { type: "p", text: "**Keep the plumbing where it is.** On a slab, moving a shower, vanity or floor waste means cutting the slab before anything else happens, at $2,000 to $6,000 per plumbing point according to a Perth supplier. Keeping the layout frees that money for everything else." },

        { type: "h2", text: "Nothing on this page replaces an on-site quote" },
        { type: "p", text: "Every figure here was published by someone describing a job that is not yours. Prices change and publishers revise their pages. The substrate under your existing floor is the largest single variable in a tiling quote, and it is not knowable until the tiles come up. Use this page to recognise a number that is out of range. Use a tiler standing in the room to get a real one." },

        /* Every answer restates figures and statements already on this page,
           with the same attribution. Builds this page's FAQPage schema. */
        { type: "h2", text: "Common questions" },
        { type: "faqs", items: [
          { q: "How much does a tiler charge per square metre in Perth?", a: "Published Perth figures vary widely. A Perth supplier puts standard floor tiling at $55 to $75 per square metre and bathroom work at $75 to $120, while a cost guide site puts standard floor labour at $37 to $94. A small room costs more per square metre than a large one, because a small floor is mostly cuts and edges." },
          { q: "Why are my tiling quotes so different?", a: "Almost always because they cover different scopes. Removal, disposal, substrate preparation, waterproofing and trims are the usual differences. Give each tiler the same written brief, ask for a line by line breakdown, and most of the gap becomes visible." },
          { q: "What does it cost to tile a bathroom, as opposed to renovating one?", a: "Three Perth sources of different types land on roughly $3,000 to $6,500 for tiling a standard bathroom. Published renovation figures for the same room run from $15,667 to $36,750, because they include plumbing, fixtures and other trades, and most of them do not say which." },
          { q: "What does it cost to regrout a shower in Perth?", a: "Two Perth specialists advertise from $250 and from $550, and a national guide puts the average at around $1,500. A \"from\" price is a starting point, not a quote. If the membrane behind the grout has failed, regrouting is the wrong repair. See [bathroom tiling](bathroom-tiling-perth.html)." },
          { q: "Does moving the plumbing add much to a bathroom?", a: "Yes, particularly on a slab. Moving a shower, vanity or floor waste on a concrete slab means cutting the slab first, and a Perth supplier puts that at $2,000 to $6,000 per plumbing point, before any tiling starts." },
          { q: "How much deposit can a tiler ask for in WA?", a: "Where the Home Building Contracts Act 1991 (WA) applies, which is fixed-price home building contracts between $7,500 and $500,000, the deposit is capped at 6.5 per cent of the contract price. The Act names tiling as home building work, and the contract must be in writing and signed by both parties." }
        ] }
      ]
    }
  ],

  /* Deliberately empty. No suburb list and no area pages at Level 2 (home
     draft TODO). */
  areas: [],

  /* No FAQs at the about-page level: home's own faqs block covers general
     questions (Canberra pattern). */
  about: {
    faqs: []
  },

  faqPreviewCount: 0,

  /* --- Contact form ---------------------------------------------------------
     FIELDS vs PRIVACY, fixed 13 Sep 2026. The privacy page says an enquiry
     collects your name, the contact details you give, the suburb or area the
     job is in, and whatever you tell us about the job. The form previously
     took name and phone only, so suburb and a job description field are
     added here rather than cutting the privacy copy: every draft's quote
     section already asks for "the room, roughly the area and what you want
     done", which had nowhere to go. The job description is optional, per the
     home draft ("You will not know all of it, and that is fine"). Its
     placeholder is the home draft's How it works step 1. ingest-form stores
     every non-meta field in leads.fields, so no backend change is needed.
     TODO (Brad): photos. The privacy page says "If you attach a photo of the
     work, we collect that too" and the home draft says "A photo helps if you
     have one", but the web form cannot take a file: ingest-form does not
     handle multipart ("file uploads on a Stage B form aren't supported yet;
     keep attachments to the email leg"). A photo can only arrive by email,
     and whether hello@perthtilingspecialists.com.au is routed into
     ingest-email for this site could not be checked from the repo. Confirm
     that routing, or drop the photo sentences.
     TODO (Brad): step1Label, successMessage and errorMessage are template
     copy, not draft copy.
     submitText and step2Label were the template's "Get My Free Quote" and
     "Where should we send your quote?" until 13 Sep 2026. Both said we
     quote, which About says we do not. submitText is now the About draft's
     anchor text for this form ("Send an enquiry"); step2Label is the About
     draft's own heading for this subject ("Your details"), and suits a step
     that now asks for name, phone, suburb and the job.
     successMessage no longer promises "a call or text within 24 hours"
     (removed 13 Sep 2026 on Brad's instruction): it contradicted the home
     FAQ "How soon will I hear back?", nothing backs it with no tiler
     attached, and response-time promises are banned at Level 2. Do not add
     a timeframe back.
     formHeadline heads the quote section on About. Form blocks elsewhere
     carry no heading, since each draft supplies its own h2 above the form.
     It was the template's "Get Your Free Quote" until 13 Sep 2026: Title
     Case against the drafts' sentence case, and it said we quote, which
     About says we do not. Now the About draft's own anchor text for this
     form, from its Contact section: "[Send an enquiry](#quote)". */
  contact: {
    formHeadline: "Send an enquiry",
    /* COLLECTION NOTICE - this is not just reassurance copy, so read before
       editing. The site relies on the Privacy Act small business exemption,
       and the "trading in personal information" carve-out (OAIC: disclosing
       personal information for a benefit, service or advantage) only bites
       where the individual has NOT consented. Consent can be implied, but
       OAIC requires it to be informed - the person has to understand what
       happens to their details. That means this line must say, at the point
       of collection, that the details go to a contractor and that the
       contractor pays. Keep it accurate and keep the privacy policy link.
       See PLAYBOOK.md Appendix A, rules R3 and R4, for the position in full
       (read the rule, not a summary of it). The other half
       of it is the voicemail greeting: sites.greeting_audio_url AND
       sites.greeting_text must carry the same notice. */
    reassurance: "No spam and no obligation. Your details go to a local tiler so they can quote your job - the contractor pays for the enquiry, you do not. We never sell your details or add you to a marketing list. [How we handle your information](privacy.html).",
    /* Enquiry categories, taken from the four headings of the home draft's
       "What we can get quoted" section. services[] is a list of pages and
       includes the cost guide, which is not a job. */
    jobTypes: [
      "Floor tiling", "Bathroom tiling", "Kitchens and laundries", "Repairs and small jobs"
    ],
    fields: [
      { name: "name", label: "Name", type: "text", autocomplete: "name" },
      { name: "phone", label: "Phone", type: "tel", autocomplete: "tel" },
      { name: "suburb", label: "Suburb", type: "text", autocomplete: "address-level2" },
      { name: "message", label: "Tell us about the job", type: "textarea", rows: 4, required: false,
        placeholder: "The room, roughly how big it is, and what you want done." }
    ],
    step1Label: "What do you need help with?",
    step2Label: "Your details",
    otherServiceLabel: "Something else",
    submitText: "Send an enquiry",
    successMessage: "Thanks, your request is in.",
    errorMessage: "Something went wrong sending your request. Please try again, or reach out directly:"
  },

  /* --- Testimonials / photos (REAL EVIDENCE ONLY) ---------------------------
     Ship empty. None exist (handover constants). */
  testimonials: [],
  photos: []
};
