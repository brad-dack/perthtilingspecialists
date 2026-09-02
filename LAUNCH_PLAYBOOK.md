# New Site Launch Playbook

The order of work from "I've picked a topic" to "submitted in Search Console",
and the gates that stop a phase from starting before its inputs are real.

This file is the canonical copy. It ships with the template, so every new build
starts with it in the repo.

---

## Why the last three builds felt scattered

Not a discipline problem. A sequencing problem, and it has one root cause:

> **Decisions that appear on every page were being made after the copy for
> every page already existed.**

That turns one decision into thirteen edits, and it puts the riskiest work —
regulatory claims, privacy position, keyword placement — into a late scramble
where it competes with launch pressure.

The Canberra Tiling history shows it plainly. Ten commits after the content was
pivoted in:

| Commit | What it really was |
|---|---|
| `49fa393` Resolve brand, ABN, domain and privacy-page markers | Brand and domain settled **after** copy naming the brand was written across 13 pages. The build package itself said "resolve before writing code, not during." |
| `272960b` Add Twilio tracking number | The CTA phone number, present on 7 pages, arrived after those CTAs were drafted. |
| `802dd72` → `d952010` Wrangler config, then disable workers.dev | Hosting chosen mid-build, and its duplicate-indexable-copy side effect found later. |
| `4026a86` Correct superseded AS 3958.1 citations to AS 3958:2023 | A standards citation shipped wrong because verification ran after drafting, not before. |
| `caaaeb2`, `b898288` Resolve markers / clear final preflight markers | 77 markers cleared in end-of-build batches. |
| `8dc8a0f`, `b603e72`, `b898288` Privacy trio | The privacy and consent position — flagged in the build package as needing legal advice and as portfolio-wide — resolved reactively at the end. |
| `ab6715c` Enable GA4 analytics | No measurement on the site until the last few commits. |
| `5a839ad` Remove named businesses and em-dashes | Voice and third-party-naming rules applied as a cleanup pass instead of as drafting constraints. |
| `ad0ea26` Keyword placement fixes: local term in tile repair H1, tiler on home | **The final commit.** Which keyword each page targets, and where it sits in the H1, is a page-plan decision. It was still being adjusted at the end. |

Every one of those is a late-arriving input, not a mistake in the work itself.

### The rule this playbook enforces

**Nothing that appears on more than one page gets written until its value is
real.** Brand, domain, entity, phone number, analytics ID, ingest endpoint,
privacy position, positioning level, and the keyword→page→H1 map are all
page-wide constants. They get frozen in one phase, before drafting.

Second rule, smaller but it caused the AS 3958 correction:

**Verify a risky claim before you write the sentence around it**, not after.

---

## Phase 0 — Niche selection

**Do:** Run the shortlist through the opportunity workbook (`dfseo/`). Score it.

**Also score, because it is currently missing:** whether the link-acquisition
phases can actually be executed from Perth. Supplier relationships, sponsorships,
local PR and renter relationships are all in the build plan and none of them work
remotely as designed. Canberra was the most remote market in the portfolio and
this was never captured. Add it as an explicit line, or accept the ceiling
knowingly.

**Produces:** A ranked shortlist with the remote-execution penalty applied.

---

## Phase 1 — Market read

Two investigations, one decision.

1. **Competitor scan.** Top 10 for the head term. For each: what their homepage
   opens with, whether they publish real figures, their trust signals, and what
   they are not covering. The gap you find here is the site's angle — for
   Canberra it was the routing block and the cost aggregation.
2. **Keyword research.** DataForSEO, national and local scope. Cluster the
   terms. Note CPC, not just volume — repair intent ran ~3x installation intent
   in Canberra and that decided the site's centre of gravity.

Record which terms return **null**. Those decide what does *not* get a page: all
34 Canberra area keywords were null, so suburb pages were dropped, and seven
service terms were null, so they became homepage paragraphs instead of thin
pages.

⚠️ Trend columns (`avg_last_3mo` / `avg_prior_yr_3mo` from `kwvol.py`) are
unusable until the ordering of the DataForSEO `monthly_searches` array is
confirmed. If it is oldest-first, every trend reads backwards. Resolve this once
before relying on a trend to justify a build.

**GATE — Go / No-go.** One page: head term and volume, CPC profile, the
competitive gap being exploited, the renter pool, and the remote-execution
verdict. If it does not survive being written down, it does not survive a build.

---

## Phase 2 — Freeze the constants ⛔

**This is the phase that was missing. Nothing below starts until this is done.**

Every item here appears on multiple pages or is an input to copy.

| Constant | Why it is a blocker | Watch out |
|---|---|---|
| Entity + ABN | Appears in privacy, disclaimer, about | Needed *before* a `.com.au` — auDA eligibility depends on it |
| Business / brand name | Appears on every page | Register before the domain |
| Domain | Canonical URLs, schema, OG, `CNAME`, `robots.txt`, `sitemap.xml` | Exact-match if the head term supports it |
| Twilio tracking number | Every CTA on every page | No number = no lead evidence = no sales tool |
| GA4 measurement ID | `ga4Id`; without it there is no `click_to_call` proof | Property created *and* wired, not just created |
| Ingest URL + secret | `ingestUrl` / `ingestSecret`; web leads are silently lost without them | Whoever hosts the endpoint receives enquiry data — **they must be named in the privacy copy**, which is why this precedes drafting |
| Turnstile site key | Spam filtering | |
| Hosting + DNS | GitHub Pages or Cloudflare Workers | If Workers: set `"workers_dev": false` in `wrangler.jsonc` **now**. The default publishes a second fully crawlable copy of the whole site, and toggling it in the dashboard does not stick across deploys |
| Positioning level | Level 1 / 2 / 3, plus the claim restriction list | Determines what may be said about contractors, reviews, licences, warranties |
| Collection notices | The privacy position depends on them (see below) | **Settled portfolio-wide — not a per-build decision any more.** What *is* per-build: writing the form notice and recording the voicemail greeting. Both, before launch |

**On the contractor representation problem:** pre-renter, no page may state in the
present tense that enquiries are passed to a contractor, because no contractor
exists. Under Australian Consumer Law that is the same category of problem as a
fabricated review. Use conditional wording until a contractor is signed. The live
Perth Limestone Group about page still carries this defect.

### The privacy position — settled 31 August 2026

Recorded in full as a comment at the top of the privacy page config in Canberra
Tiling. Summarised here because it is now a standing portfolio position and every
new build inherits it. **Do not re-derive it. Do not re-open it per build.**

**The position:** rely on the small business operator exemption under the Privacy
Act 1988, and preserve it by obtaining informed implied consent at the point of
collection.

**The reasoning, in three steps:**

1. OAIC lists "trading in personal information" — disclosing personal information
   for a benefit, service or advantage — as a situation where a small business is
   covered *regardless* of turnover. A rank-and-rent site passing homeowner
   details to a contractor who pays for the referral is squarely in frame.
2. That carve-out bites only where the disclosure is made **without the consent of
   the individual**. Consent may be express or implied, so obtaining consent
   preserves the exemption.
3. Implied consent is available because none of what is collected is *sensitive
   information* under the Act. Express consent is only mandatory for sensitive
   information, so no tick-box is required.

**What the position rests on, and therefore what every build must ship.** Implied
consent must still be **informed** (OAIC's four elements: informed, voluntary,
current and specific, capacity). The person has to understand, at the point of
collection, that their details go to a contractor. That makes the collection
notice on **both** channels load-bearing — it is not reassurance copy and must
never be softened into generic trust language:

- **Web form** — `contact.reassurance`, rendered directly above the form. It must
  say the details go to a contractor and that the contractor pays for the enquiry.
- **Phone** — the voicemail greeting, the only chance to give notice before a
  caller speaks. Held in the backend as `sites.greeting_audio_url` (the MP3) and
  `sites.greeting_text` (the text-to-speech fallback). **Both must carry the
  notice and both must say the same thing.**

A build with one channel done and the other not has only half-implemented the
position.

**Status and limits.** Self-assessed by Brad against OAIC guidance and OAIC's
privacy checklist for small business. **Not reviewed by a solicitor.**

**Two things would change the answer — watch for both:**

- **A move to per-lead pricing** rather than flat monthly rent. Payment then maps
  directly onto each individual disclosure, which reads far more like the
  carve-out. Re-examine the position before changing the commercial model.
- **Removal of the small business exemption itself**, flagged for a future reform
  tranche. If it goes, all thirteen APPs apply and APP 8 (cross-border disclosure)
  is the heavy one — Supabase, Cloudflare, Twilio, Google and Resend are all
  overseas.

**⚠️ Portfolio remediation.** The position does not hold for a site whose
collection notices are not in line. As at 2 September 2026:

| Site | Web form notice | Voicemail greeting |
|---|---|---|
| Canberra Tile Layers | ✅ Done | ✅ **Live** — recorded 2 September 2026 |
| Perth Limestone Group | ✅ **Backported** 2 September 2026 | ✅ **Live** — recorded 2 September 2026 |
| Perth Brickwork | ✅ **Backported** 2 September 2026 | ✅ **Live** — recorded 2 September 2026 |

**Both channels now closed portfolio-wide, as at 2 September 2026.**

Greetings recorded and live on all three sites. The Canberra wording, as the
pattern for future builds:

> "Hi, thanks for calling Canberra Tile Layers. Leave your name, suburb and job
> details after the tone. We pass enquiries to a tiler who can quote the job."

Recording the MP3 only closes half of it. `sites.greeting_text` — the
text-to-speech fallback — must carry the same notice, or a caller who hits the
fallback path gets no notice at all. Confirm both columns are set on every site.

**Form notices backported 2 September 2026.** Each site's notice names its own
trade rather than "a local contractor", and states that the contractor pays for
the enquiry:

| Site | Key | Renderers changed | Placement |
|---|---|---|---|
| Template | `contact.reassurance` | `bake.js` `esc` → `richText` | Above the form |
| Perth Limestone | `contact.reassurance` | `bake.js` + `js/main.js`, `esc` → `inline` | Above the form; privacy link stays in `formNote` below it |
| Perth Brickwork | `form.underButton` + new `form.privacyLinkText` | `bake.js` + `js/main.js`, anchor appended in the form only | Below the submit button — see divergence note |

**Divergence, Perth Brickwork.** That build has no inline-markdown helper and its
notice lives *below* the submit button rather than above the form, so the privacy
anchor is assembled in `formHtml` rather than written as markdown in config, and
`form.underButton` is also reused by the CTA band (which deliberately gets no
link). If that page shell is ever rebuilt, move the notice above the form to match
the other two.

**Template default — fixed 2 September 2026.** `config.js` previously shipped
`reassurance: "We'll respond within 24 hours. No spam, no obligation — your
details are only used to reply to this request."` That last clause was **not true
for this business model** — the details are disclosed to a paying contractor — and
it was the string every new build started from. The same wrong claim was also
sitting in `about.faqs` ("Your information is only used to respond to your
request"); both now describe the real data flow. When populating a build, name the
actual trade in place of "a local contractor".

**GATE:** `New site prompt.txt` filled in with zero `[NEEDS INPUT]` against any
row in the table above, and both collection notices drafted.

---

## Phase 3 — Page plan

The artefact that would have prevented the last commit on Canberra.

**Produces, before a word of prose:**

1. **Page inventory table** — file name (keyword-URL, not a stub), route,
   priority, primary keyword, secondary keywords, title tag with character
   count, meta description with character count, and **the literal H1 including
   its local term.** Approve the H1s here. They are not a polish item.
2. **Cannibalisation map** — for each page, what it *owns* and what it *must not
   expand into*. Every cost figure lives on the cost page; other pages get a
   sentence and a link. When editing later, brief mentions will feel thin and you
   will want to expand them. That instinct is the cannibalisation risk — the map
   is what you argue with.
3. **Internal link graph** — nominate the inbound hub (the cost guide) and the
   outbound hub (the homepage). No orphans.
4. **Image direction per page** — what each image must show, and whether it needs
   to be a diagram rather than a photo.
5. **High-risk claim register** — every safety, regulatory or standards claim,
   with the named primary source required for each. Safe Work Australia, the
   state work-safety regulator, Standards Australia, the licensing authority.
   Never a trade blog, a competitor page, or a tool manufacturer.

**GATE:** keyword→page→H1 map signed off, cannibalisation map written.

---

## Phase 4 — Evidence pass ⛔

**Clear the high-risk claim register before drafting.** For each claim: primary
source, the exact version or edition, and the date checked.

Standards get cited in versioned form and the version is used consistently
sitewide. `AS 3958.1` was corrected to `AS 3958:2023` after publication on
Canberra — a five-minute check at this phase, an audit and a commit afterwards.

**If a claim cannot be sourced confidently, keep the practical advice and drop
the regulatory specific.** Approximating is worse than omitting. A wrong safety
claim on a page a homeowner acts on is the worst failure mode in the build.

**GATE:** every register row is sourced, dropped, or explicitly deferred with the
claim it guards deleted alongside it.

---

## Phase 5 — Draft copy

Now, and only now, write. Use the build-package format: one document, one `## Build
notes` section per page carrying schema spec, link map, image direction and claim
restrictions.

**Drafting constraints, applied while writing rather than as a cleanup pass:**

- No em-dashes.
- No named third-party businesses in reader-facing copy. Cite a source by name in
  a `note` block if a figure genuinely came from them; do not name competitors in
  prose.
- Operator notes — decision logs, priority notes, research status, references to
  markers or `config.js` — go in a `/* TODO (Brad): ... */` code comment, never in
  a `note`/`p`/`lead`/FAQ/meta string. `bake.js --check` runs an author-voice
  guard and will fail the build.
- Anything unsourced gets a `{ type: "marker" }` block or a `[VERIFY: ...]` /
  `[NEEDS INPUT: ...]` token. Never delete a marker to make the count go down.
- No pricing presented as ours. No invented reviews, photos, licence numbers,
  years in business, or job counts.

**Marker discipline:** resolve markers per page as you finish the page. The
end-of-build batch of 77 is what makes the last week feel like triage.

---

## Phase 6 — Images

Synthetic illustrative only. Alt text describes **what is illustrated** and never
implies completed work by us. No captions on stock or synthetic imagery — a
caption implies authorship. No before-and-after, no project galleries.

Where an image would make a factual or diagnostic claim ("this is what a
structural crack looks like"), draw an inline SVG instead. A near-miss photo
actively misleads.

Optimise before committing: ~1200×800, under ~150KB, JPG or WebP, accurate
`width`/`height`. Add `widths: [400, 560, 720, 960]` plus a `sizes` string and the
matching resized files for a `srcset` — worth ~130KB per image on mobile.

---

## Phase 7 — Build

1. `git init` and create the GitHub repo **first**, then copy the template in as
   the initial commit. Keeps the template baseline visible in history, which is
   what makes divergence auditable later.
2. Populate `config.js`. It is the only file edited by hand.
3. `node bake.js` — regenerates every page plus `CNAME`, `robots.txt`,
   `sitemap.xml`, `404.html`, `favicon.svg`.
4. `node bake.js --check` until it passes clean: zero unfinished-content items,
   zero preflight problems.
5. Commit the regenerated files.

`schema.type` stays `Organization`. Not a LocalBusiness subtype, no `priceRange`,
no `AggregateRating`, no `Review`. `--check` enforces this against the baked HTML.

**Engine changes** (`bake.js`, `js/main.js`, `css/styles.css`, page-shell
structure) are allowed only when real copy genuinely does not fit — and must be
logged in this site's README under "Divergence from the template." See Phase 11.

---

## Phase 8 — Deploy

- Push to the default branch; Pages source `/ (root)`, or `wrangler deploy` with
  `"workers_dev": false` already set.
- DNS: apex `A` records `185.199.108.153` / `.109.153` / `.110.153` / `.111.153`,
  `www` `CNAME` → `<username>.github.io`. Cloudflare for DNS and email routing.
- Enforce HTTPS once the certificate issues.
- **Confirm exactly one indexable copy of the site exists.** Check the
  `*.workers.dev` and `*.github.io` hostnames directly. This is the `d952010`
  defect and it is invisible unless you go looking.

---

## Phase 9 — Pre-index QA ⛔

Everything here happens **before** Search Console, because indexing a broken
version costs more to undo than to prevent.

- [ ] **No-JS crawl.** Fetch each page with JavaScript disabled and count words.
      Nav and footer links must be in the served HTML. Perth Brickworks' two long
      service pages returned **39 and 49 words** to a no-JS crawl against ~6–10k
      rendered. This is the single highest-cost defect in the portfolio's history.
- [ ] Zero console errors on every page.
- [ ] Layout correct at mobile, tablet and desktop.
- [ ] PageSpeed on the two heaviest pages.
- [ ] **Form end to end** — submit a real test lead and confirm the row lands in
      Supabase against the correct `site_id`.
- [ ] **Call the Twilio number** and confirm it routes and logs — and that the
      greeting you actually hear carries the collection notice. Check
      `sites.greeting_audio_url` **and** `sites.greeting_text`; the TTS fallback
      is the one that gets forgotten. The privacy position fails without this.
- [ ] **Collection notice renders above the form**, naming the contractor and the
      fact they pay for the enquiry.
- [ ] **GA4 realtime** shows a pageview and a `click_to_call` event.
- [ ] Internal links resolve; no orphans; sitemap matches disk.
- [ ] `node bake.js --check` clean on the deployed commit.

---

## Phase 10 — Index and monitor

- Verify the property in Search Console, submit `sitemap.xml`.
- Request indexing on the homepage and the inbound hub page.
- Set a review date for anything dated. Every cost figure goes stale; a cost guide
  with visibly current figures is the version that keeps its links. 12 months.
- Log the link-acquisition inventory — for Canberra it was three assets: the
  ungated quote checklist, the tap-test diagnostic, and the silica section. That
  is the entire pre-renter link inventory and it should be written down as such,
  not rediscovered.

---

## Phase 11 — Backport ⛔

**The template is the source of truth. Fixes flow template → sites, never sites →
template.**

On 2026-08-25 the template was found two weeks and ~20 commits behind both
launched sites, each having independently fixed SEO and PageSpeed problems that
never flowed back. Drift here is a defect multiplied across every future build.

Before closing the build out:

- [ ] Any engine change made in Phase 7 is either backported to the template or
      logged under "Divergence from the template" in this site's README with the
      reason it could not be.
- [ ] Any new failure mode found in Phases 9–10 becomes a new `bake.js --check`
      guard **in the template**.
- [ ] Anything learned that changes this playbook is edited into the template's
      copy of it.

---

## Gate summary

| # | Phase | Gate |
|---|---|---|
| 0 | Niche selection | Shortlist scored, remote-execution penalty applied |
| 1 | Market read | Written go/no-go |
| 2 | **Constants freeze** ⛔ | Zero `[NEEDS INPUT]` on any page-wide constant; both collection notices drafted |
| 3 | Page plan | H1/keyword map signed off, cannibalisation map written |
| 4 | **Evidence pass** ⛔ | Every high-risk claim sourced or dropped |
| 5 | Draft copy | Markers resolved per page, not batched |
| 6 | Images | No caption, no implied authorship, optimised |
| 7 | Build | `node bake.js --check` clean |
| 8 | Deploy | Exactly one indexable hostname |
| 9 | **Pre-index QA** ⛔ | No-JS crawl passes; form, call and GA4 proven live; both collection notices verified |
| 10 | Index and monitor | Sitemap submitted, review dates set |
| 11 | **Backport** ⛔ | Template updated or divergence logged |

---

## Changes from the original draft order

| Your step | Change |
|---|---|
| 4. Buy domain / register business name | Moved up and widened into the **constants freeze**, and it now also carries the Twilio number, GA4 ID, ingest keys, Turnstile key, hosting choice, privacy position and positioning level. Entity/ABN goes before the domain — `.com.au` eligibility depends on it |
| 10. Set up back end (Cloudflare, DNS, GA) | Split. Provisioning moves to Phase 2 because the phone number and the named data processors are copy inputs; only DNS and deployment stay at Phase 8 |
| — | **New Phase 3, page plan.** Keyword→page→H1 map plus cannibalisation map, approved before drafting. This is what the final Canberra commit was retrofitting |
| — | **New Phase 4, evidence pass.** Risky claims sourced before the prose is written |
| 5. Draft page content | Unchanged in position, but now runs under explicit voice and third-party-naming constraints rather than a cleanup pass afterwards |
| 6. Gemini images | Unchanged in position; constraints made explicit |
| 7 + 8. Repo, then GitHub repo | Reversed. Create the repo first and land the template as the initial commit |
| 9. Go through verify markers | Not a step. It is a **continuous discipline** in Phase 5 and a gate in Phase 7. `bake.js --check` already fails on `[VERIFY:`, `[NEEDS INPUT:`, `[BUILD GATE:` and marker blocks |
| 11. Final review before GSC | Expanded into Phase 9, with the no-JS crawl and live proof of form, call and analytics as hard requirements |
| — | **New Phase 11, backport.** The step that has been skipped every time |
