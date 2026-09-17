# PLAYBOOK

Niche selection to Search Console, as a numbered task list. One task at a
time, in order. Every task names its surface, its input files, its output
file, and the check that proves it is done.

Ships with the template, so every new build starts with it in the repo.

## How to use this file

- **Start a session by pasting `CODE-SESSION-START.md`.** It makes the session
  read `build/`, report the current task, and refuse a task whose inputs are
  missing or not in a done state.
- **Read one task, not the file.** The task carries what you need. The
  appendices are reference, not reading.
- **Surfaces.** `Code` is a Claude Code session in the site repo, and is the
  default for everything. `Me` is Brad, and only for accounts and payments,
  physical actions, and sign-off. Appendix C gives the reason for every `Me`.
- **Status changes on evidence only.** A task is done when its check passes,
  never because someone says so. A check is a command you can re-run.
- **Standing rules live in Appendix A and are referenced by ID.** Read the
  rule itself, never a summary of it. A session working from a summary will
  re-derive the rule and reach a different answer.
- **Any decision that reverses an earlier one goes in `build/05-log.md`** under
  Decisions, naming what it supersedes, in the same commit as the change.

## The five artefacts

All under `build/` in the site repo, committed as they are produced.

| File | Written by | Read by |
|---|---|---|
| `build/01-market.md` | T01 to T06 | T07, T17 |
| `build/02-constants.md` | T07 to T16 | T12, T16, T21, T25, T27 |
| `build/03-plan.md` | T17 to T20 | T21, T24, T25 |
| `build/04-copy/<route>.md` | T21, T22 | T25 |
| `build/05-log.md` | every task appends | every session reads first |

`build/data/` holds raw CSV pulls, referenced from `01-market.md`.

## Gates

A gate stops every later task until its check passes.

| Task | Gate | Enforced by |
|---|---|---|
| T06 | Written go or no-go | G2 |
| T16 | Constants frozen, zero `[NEEDS INPUT` | G1, blocks `node bake.js` |
| T19 | H1 map signed off, cannibalisation map written | G3, blocks `node bake.js` |
| T20 | Every claim sourced or dropped | G4 |
| T22 | Every page has approved copy | G5 |
| T25 | `node bake.js --check` clean | the command itself |
| T26 | One indexable hostname, operator files not served | G10 |
| T28 | Pre-index QA passes, both notices verified live | G7, G8 |
| T30 | Template updated or divergence logged | G6 |

---

# Tasks

## T00 Create the repo

- **Surface:** Code
- **In:** the template repo
- **Out:** new GitHub repo; `build/` copied in from the template
- **Done:** the repo's first commit is the unmodified template, including
  `build/`, `PLAYBOOK.md` and `CODE-SESSION-START.md`.
- **Check:** `git log --oneline` shows one commit, and `ls build/` lists
  `01-market.md`, `02-constants.md`, `03-plan.md`, `04-copy/`, `05-log.md`.
- **Gate:** blocks everything.
- **Rules:** R7.

## T01 Shortlist

- **Surface:** Code
- **In:** `dfseo/Workbook*.xlsx`, tab `3 Verdict`
- **Out:** `build/01-market.md`, sections Candidates and Chosen
- **Done:** every candidate considered is a row, with the remote-execution
  column filled for each. Chosen names the runner-up and the one reason it
  lost.
- **Check:** no `[NEEDS INPUT` remains in those sections, and Chosen names a
  runner-up.
- **Rules:** R13.

## T02 Keyword volumes and CPC

- **Surface:** Code
- **In:** `build/01-market.md`, the term list under Keyword table
- **Out:** `build/data/volume-<date>.csv`; `build/01-market.md` Keyword table
- **Done:** every term has volume, CPC, scope and a `null?` flag, plus an
  intended page, a named section, or `no page`. Grouped duplicates are
  recorded as grouped, never summed.
- **Check:** the CSV exists at the path named under Data files, with the
  command that produced it written beside it. G2 fails if the file is missing.
- **Rules:** R13.

## T03 SERP ownership

- **Surface:** Code, using DataForSEO at the target location. `Me` only if the
  pull is unavailable, in which case Brad pastes the read and Code records it.
- **In:** `build/01-market.md` Keyword table
- **Out:** `build/01-market.md` SERP ownership
- **Done:** **one row for every intended page**, not just the head term. Each
  row carries ads, local pack, AIO, the top three domains, and who owns the
  segment: the trade itself, specialists, directories, or another trade.
- **Check:** G2 fails while any page in `build/03-plan.md` has no SERP
  ownership row.
- **Gate:** blocks T05 and T06.
- **Rules:** R13.

## T04 Referring domains

- **Surface:** Code
- **In:** `build/01-market.md` SERP ownership
- **Out:** `build/data/refdomains-<date>.csv`; counts in the SERP ownership
  table
- **Done:** every top-three domain in T03 has a count, with one known control
  in the pull. Directory-scale domains are labelled and excluded from the bar.
- **Check:** the CSV exists and every SERP ownership row has a count.

## T05 Competitor teardown and thesis

- **Surface:** Code, by web fetch
- **In:** `build/01-market.md` SERP ownership
- **Out:** `build/01-market.md` Competitor gaps, Commercial thesis, Renter
  evidence
- **Done:** the thesis cites rows from the SERP ownership table. A thesis
  resting on CPC alone is not done.
- **Check:** the Commercial thesis names at least two queries from the SERP
  ownership table.
- **Rules:** R2.

## T06 Go or no-go

- **Surface:** Me
- **In:** `build/01-market.md`
- **Out:** `build/01-market.md` Status line
- **Done:** Status reads `GO` or `NO-GO` with Brad's date.
- **Check:** G2.
- **Gate:** blocks T07 and later.

## T07 Brand and domain candidates

- **Surface:** Code
- **In:** `build/01-market.md`
- **Out:** `build/02-constants.md` Naming history
- **Done:** each candidate has an ASIC business name check, an ABN Lookup
  check for a conflicting active entity, a registrar availability check, and
  the auDA eligibility position. Every rejected name carries its one-line
  reason, so it is never re-litigated.
- **Check:** every candidate row has a verdict and a reason.

## T08 Choose brand and domain

- **Surface:** Me
- **In:** `build/02-constants.md` Naming history
- **Out:** `build/02-constants.md` Identity
- **Done:** the brand and domain rows carry real values.
- **Gate:** blocks T09 and every copy task.
- **Rules:** R1.

## T09 Register the domain and DNS zone

- **Surface:** Me
- **In:** `build/02-constants.md` Identity
- **Out:** `build/02-constants.md` Infrastructure, registrar and DNS rows
- **Done:** domain registered, Cloudflare zone created, nameservers moved.
- **Check:** T10.

## T10 DNS records live

- **Surface:** Me sets them, Code verifies
- **In:** `build/02-constants.md` Infrastructure
- **Out:** the same rows, with the lookup output recorded beside them
- **Done:** apex A records resolve to the host, `www` resolves, and proxy
  status is as recorded.
- **Check:** `nslookup -type=NS <domain>` and `nslookup -type=A <domain>`,
  output recorded in the file and dated. Brad reporting it done is not the
  check.
- **Rules:** R5.

## T11 Provision the integrations

- **Surface:** Me
- **In:** `build/02-constants.md` Identity
- **Out:** `build/02-constants.md` Infrastructure values
- **Done:** Twilio number bought; GA4 property created, with both its
  measurement ID and its numeric property ID recorded; the domain added to the
  shared Turnstile widget hostname list; Resend domain verified; the inbound
  email address routed to the ingest Worker.
- **Check:** each value is copied from the dashboard that issued it, not from
  a note. A key transcribed from a note is how a live form ran for three days
  on an invalid Turnstile key. T14 and T28 prove them end to end.
- **Rules:** R1, R13.

## T12 Draft both collection notices

- **Surface:** Code
- **In:** `build/02-constants.md` Identity; Appendix A, R3 and R4
- **Out:** `build/02-constants.md` Collection notices
- **Done:** the form notice and the greeting text both name the actual trade,
  say the details go to that trade, and say the trade pays for the enquiry.
  Both say the same thing.
- **Check:** G8.
- **Rules:** R3, R4, R11. Read R3 in full. Do not work from a summary of it,
  and do not reopen it.

## T13 Record the greeting

- **Surface:** Me
- **In:** `build/02-constants.md` Collection notices
- **Out:** the MP3, path recorded in the same section
- **Done:** the recording says the words in the Collection notices section.
- **Check:** T28 hears it on a real call.
- **Rules:** R4.

## T14 Backend site row

- **Surface:** Code
- **In:** `build/02-constants.md`; the greeting MP3
- **Out:** a numbered migration in `rank-and-rent-backend`, committed and
  applied; `build/02-constants.md` site_id and ingest rows
- **Done:** the row exists with `greeting_text` and `greeting_audio_url` both
  set and both carrying the notice, `ingest_secret` generated and set, and
  `inbound_email`, `forward_from_email` and `ga4_property_id` set.
- **Check:** `supabase migration list --linked` shows the migration applied on
  the remote, and the migration file is committed. A row created by hand in
  the SQL editor is not done, because it leaves no record.
- **Gate:** blocks T16.
- **Rules:** R4, R13.

## T15 Search Console property

- **Surface:** Me verifies, Code checks
- **In:** `build/02-constants.md` Identity
- **Out:** `build/02-constants.md` Search Console
- **Done:** the property is verified by DNS TXT, before the site is built.
  Verifying here rather than at T29 is what stops it slipping.
- **Check:** `nslookup -type=TXT <domain>` shows the verification record, and
  the date is recorded.

## T16 Freeze the constants

- **Surface:** Code
- **In:** `build/02-constants.md`
- **Out:** `config.js`, constants only; Status `FROZEN`
- **Done:** every Identity and Infrastructure value is in `config.js`, and the
  artefact has zero `[NEEDS INPUT` tokens. A freeze commit that leaves
  placeholders in `config.js` has frozen nothing.
- **Check:** `node bake.js` refuses to run while this is untrue (G1).
- **Gate:** blocks every page from baking.
- **Rules:** R1.

## T17 Page plan

- **Surface:** Code
- **In:** `build/01-market.md`; `build/02-constants.md`
- **Out:** `build/03-plan.md`, Status `DRAFT`
- **Done:** inventory, head table with character counts, nav, cannibalisation
  map, internal link graph, image direction, the linkable asset with six named
  outreach targets or the words `conversion asset only`, and the high-risk
  claim register naming the primary source required for each row.
- **Check:** every inventory row has a file, route, config key, primary
  keyword, title, meta and literal H1.
- **Rules:** R12.

## T18 Template fit check

- **Surface:** Code
- **In:** `build/03-plan.md`; `bake.js`; `config.js`
- **Out:** `build/03-plan.md` Template fit
- **Done:** every inventory row is marked `fits`, `engine change` with the
  reason, or `dropped`. This task answers whether a page can exist before its
  copy is written, rather than after.
- **Check:** no inventory row has an empty Template fit cell.
- **Gate:** blocks T21.
- **Rules:** R7.

## T19 Sign off the plan

- **Surface:** Me
- **In:** `build/03-plan.md`
- **Out:** Status `SIGNED-OFF` with Brad's date
- **Done:** the H1 map and nav are approved in the file, not in a message.
- **Check:** `node bake.js` refuses to run while page copy exists and this is
  untrue (G3).
- **Gate:** blocks T21 and the bake.

## T20 Evidence pass

- **Surface:** Code, by web search against primary sources
- **In:** `build/03-plan.md` Claim register
- **Out:** `build/03-plan.md` Evidence and Cost figures; Evidence status
  `CLEAR`
- **Done:** every register row is `sourced`, with its source, edition and date
  checked, or `dropped` with the claim it guarded deleted alongside it. Traps
  get their own section. No deferral: a claim deferred past this task is a
  claim found wrong inside already drafted prose.
- **Check:** G4.
- **Gate:** blocks T21.
- **Rules:** R2.

## T21 Draft the copy

- **Surface:** Code
- **In:** `build/03-plan.md`; `build/02-constants.md`
- **Out:** `build/04-copy/<route>.md`, one per page, Status `DRAFT v1`
- **Done:** each file carries its head table, its ordered blocks labelled with
  their config block type, changes from plan, markers outstanding, operator
  notes, and decisions locked on that page. Markers are resolved per page as
  the page is finished, never batched.
- **Check:** each head table matches `build/03-plan.md`, or the difference is
  listed under Changes from plan.
- **Rules:** R8, R9, R10, R11, R12.

## T22 Approve the copy

- **Surface:** Me
- **In:** `build/04-copy/*.md`
- **Out:** each file's Status set to `APPROVED` with Brad's date
- **Done:** every page is approved in its own file.
- **Check:** G5.
- **Gate:** blocks T25. Copy restructured after this point is a new draft
  version plus a Decisions row, not a quiet edit.

## T23 Generate the images

- **Surface:** Me
- **In:** `build/03-plan.md` Image direction
- **Out:** source image files in `images/`
- **Done:** one image per page as the direction specifies, and a drawn diagram
  rather than a photo wherever the image would make a factual claim.
- **Rules:** R10.

## T24 Optimise and wire the images

- **Surface:** Code
- **In:** `images/`; `build/03-plan.md` Image direction
- **Out:** optimised files plus `srcset` variants; `config.js` image entries;
  final sizes written back into the plan's image table
- **Done:** roughly 1200x800, under about 150KB, accurate width and height,
  `widths` plus a `sizes` string with the matching files on disk, literal alt
  text, no captions.
- **Check:** `node bake.js --check` is clean of image warnings, and G9 shows
  every referenced file is tracked by git. A file present on disk but never
  committed is a 404 on the live site.
- **Rules:** R10.

## T25 Transcribe, bake, preflight

- **Surface:** Code
- **In:** `build/04-copy/*.md`; `build/02-constants.md`; `build/03-plan.md`
- **Out:** `config.js`; every baked page
- **Done:** copy transcribed verbatim with no rewording, operator notes as
  `/* TODO (Brad) */` comments, every `[VERIFY]` resolved against
  `build/03-plan.md` Evidence, and preflight clean. Template default copy is
  replaced, not inherited: the stock strings make claims this model bans.
- **Check:** `node bake.js --check` exits 0, with zero unfinished items and
  zero preflight problems.
- **Gate:** blocks T26. Nothing deploys while preflight fails.
- **Rules:** R8, R9, R10.

## T26 Deploy

- **Surface:** Code
- **In:** the repo at T25
- **Out:** the live site; `build/05-log.md` QA rows for hostname and exposure
- **Done:** pushed, Pages source set with the custom domain or `wrangler
  deploy` with `workers_dev` already false, HTTPS enforced, and operator files
  excluded from what is served.
- **Check:** `curl -sI https://<username>.github.io/<repo>/` returns a 301 to
  the domain, or the `*.workers.dev` hostname does not resolve; and
  `curl -sI https://<domain>/PLAYBOOK.md` returns 404.
- **Gate:** blocks T29.
- **Rules:** R5.

## T27 Pre-index QA, mechanical

- **Surface:** Code
- **In:** the live site
- **Out:** `build/05-log.md` QA rows
- **Done:** no-JS word count per page, zero console errors, layout at three
  widths, PageSpeed on the two heaviest pages, internal links resolve with no
  orphans, sitemap matches disk, the collection notice renders above every
  form, and `node bake.js --check` clean on the deployed commit.
- **Check:** every row carries its command output as evidence.
- **Rules:** R6.

## T28 Pre-index QA, live proof

- **Surface:** Me performs, Code verifies
- **In:** `build/05-log.md` QA
- **Out:** the same rows, Status `PASS`
- **Done:** a real form submission lands as a row against the right `site_id`;
  a real call routes, logs, and the greeting heard carries the notice, with
  `greeting_audio_url` and `greeting_text` both checked; GA4 realtime shows a
  pageview and a `click_to_call`.
- **Check:** G7 fails while Status is `PASS` with any required row missing its
  evidence.
- **Gate:** blocks T29.
- **Rules:** R4, R6.

## T29 Index and monitor

- **Surface:** Me in the Search Console interface, Code records
- **In:** `build/05-log.md` QA at `PASS`
- **Out:** `build/05-log.md` Index log
- **Done:** sitemap submitted, indexing requested on the home page and the
  inbound hub, `gsc_site_url` set on the site row with the service account
  granted access, review dates set for everything dated, and the pre-renter
  link inventory written down.
- **Check:** Search Console shows a Last read date on the sitemap, and the
  review dates are in the file.

## T30 Backport

- **Surface:** Code
- **In:** the site `README.md` Divergence section; `build/05-log.md`
- **Out:** commits in the template repo; `build/05-log.md` Backport rows
- **Done:** every engine change is either in the template or carries a logged
  reason it could not be; every new failure mode found in T26 to T29 is a new
  `--check` guard in the template; anything learned that changes this file is
  edited into the template's copy.
- **Check:** G6 fails while a Divergence heading in `README.md` has no
  matching Backport row.
- **Gate:** closes the build.
- **Rules:** R7.

## T31 Session start

- **Surface:** Code, every session
- **In:** `build/`
- **Out:** a report, nothing written
- **Done:** the session has read all five artefacts, named the current task
  and its unmet inputs, and refused any task whose inputs are missing or not
  in a done state.
- **Check:** `CODE-SESSION-START.md` is the prompt that produces this.
- **Rules:** R13.

---

# Appendix A: standing rules

These are the rules the portfolio paid for. Each is stated here in full and
referenced by ID from the task it governs. **Never summarise one into an
artefact.** A session that reads a summary re-derives the rule and reaches a
different answer, which is how the privacy position was reopened mid-build on
Perth Tiling Specialists and shipped in a form that had to be rewritten three
days later.

## R1 Constants freeze

Nothing that appears on more than one page gets written until its value is
real. Brand, domain, entity and ABN, phone number, analytics ID, ingest
endpoint and secret, Turnstile key, hosting, positioning level, privacy
position, and the keyword to page to H1 map are all page-wide constants.
Settling one late turns one decision into thirteen edits, and it puts the
riskiest work into a late scramble against launch pressure.

A freeze is a state of `config.js`, not a commit message. A commit that says
"freeze the constants" while `ingestUrl`, `ingestSecret` and `email` are still
placeholders has frozen nothing, and every later task inherits the gap.

## R2 Verify before you write the sentence around it

A risky claim gets its primary source before the prose around it exists, not
after. `AS 3958.1` was corrected to `AS 3958:2023` after publication on
Canberra: a five minute check at T20, an audit and a commit afterwards.

If a claim cannot be sourced confidently, keep the practical advice and drop
the regulatory specific. Approximating is worse than omitting. A wrong safety
claim on a page a homeowner acts on is the worst failure mode in the build.

Primary sources only: the national construction authority, the state work
safety regulator, Standards Australia, the licensing authority, the
legislation itself. Never a trade blog, a competitor page, or a tool
manufacturer. Search results that all assert the same thing can all trace back
to one piece of training provider marketing, which is how a Western Australian
waterproofing licence that does not exist nearly reached a live page.

## R3 The privacy position, settled 31 August 2026

**This is a standing portfolio position, not a per-build question. Do not
re-derive it and do not reopen it per build.** The original decision record,
with its full reasoning, is the comment at the top of the privacy page config
in the Canberra Tile Layers repo. This is the canonical operating copy.

**The position:** rely on the small business operator exemption under the
Privacy Act 1988, and preserve it by obtaining informed implied consent at the
point of collection.

**The reasoning, in three steps:**

1. The OAIC lists "trading in personal information", meaning disclosing
   personal information for a benefit, service or advantage, as a situation
   where a small business is covered regardless of turnover. A rank and rent
   site passing homeowner details to a contractor who pays for the referral is
   squarely in frame for that carve-out.
2. The carve-out bites only where the disclosure is made **without the consent
   of the individual**. Consent may be express or implied, so obtaining
   consent preserves the exemption.
3. Implied consent is available because none of what is collected is
   *sensitive information* under the Act. Express consent is mandatory only
   for sensitive information, so no tick box is required.

**What the position rests on:** implied consent must still be **informed**,
against the OAIC's four elements of informed, voluntary, current and specific,
and capacity. The person has to understand at the point of collection that
their details go to a contractor. That is why R4 is load bearing.

**Status and limits.** Self-assessed by Brad against OAIC guidance and the
OAIC privacy checklist for small business. **Not reviewed by a solicitor.**

**Two things would change the answer, and both are worth watching:**

- **A move to per-lead pricing** rather than flat monthly rent. Payment then
  maps directly onto each individual disclosure, which reads far more like the
  carve-out. Re-examine the position before changing the commercial model.
- **Removal of the small business exemption itself**, flagged for a future
  reform tranche. If it goes, all thirteen Australian Privacy Principles
  apply, and APP 8 on cross-border disclosure is the heavy one, since
  Supabase, Cloudflare, Twilio, Google and Resend are all overseas.

## R4 Collection notices on both channels

The position in R3 depends entirely on the notice the person sees or hears
before they hand anything over. It is not reassurance copy and must never be
softened into generic trust language.

- **Web form:** `contact.reassurance`, rendered directly above every form on
  the site. It must name the actual trade, say the details go to that trade,
  say the trade pays for the enquiry, and link the privacy policy.
- **Phone:** the voicemail greeting, the only chance to give notice before a
  caller speaks. Held in the backend as `sites.greeting_audio_url`, the MP3,
  and `sites.greeting_text`, the text-to-speech fallback. **Both columns must
  carry the notice and both must say the same thing.** Recording the MP3
  closes half of it; a caller who hits the fallback path with an unset
  `greeting_text` gets no notice at all.

A build with one channel done and the other not has half implemented the
position. The Canberra wording is the pattern:

> "Hi, thanks for calling Canberra Tile Layers. Leave your name, suburb and
> job details after the tone. We pass enquiries to a tiler who can quote the
> job."

## R5 Exactly one indexable hostname

Confirm it by fetching the platform hostname directly, not by assuming.
Cloudflare Workers publishes a second fully crawlable copy of the entire site
at `*.workers.dev` unless `"workers_dev": false` is set in `wrangler.jsonc`
before the first deploy, and toggling it in the dashboard does not stick
across deploys. GitHub Pages serves the same site at `<username>.github.io`
until the custom domain is set.

The same check covers operator files. GitHub Pages publishes every file in the
repo unless `_config.yml` excludes it, which put this playbook, the README and
the build tooling on a live domain, describing the site as rank and rent.

## R6 The no-JS crawl

Fetch every page with JavaScript disabled and count the words. Nav and footer
links must be in the served HTML. Two Perth Brickworks service pages returned
39 and 49 words to a no-JS crawler against roughly 6,000 to 10,000 rendered.
This is the highest-cost defect in the portfolio's history and it is invisible
unless you go looking.

## R7 The template is the source of truth

Fixes flow template to sites, never sites to template. On 25 August 2026 the
template was found two weeks and roughly 20 commits behind both launched
sites, each having independently fixed SEO and PageSpeed problems that never
flowed back. Drift here is a defect multiplied across every future build.

Engine changes to `bake.js`, `js/main.js`, `css/styles.css` or the page shell
are allowed when real copy genuinely does not fit, and only when logged in the
site's own README under "Divergence from the template" with the reason. Every
divergence is either backported at T30 or carries a written reason it cannot
be.

## R8 Marker discipline

Anything unsourced gets a `{ type: "marker" }` block or a `[VERIFY: ...]` or
`[NEEDS INPUT: ...]` token. **Never delete a marker to make the count go
down.** Either fill it from a real source or delete the claim it guards.
Resolve markers per page as each page is finished. The end-of-build batch of
77 is what makes the last week feel like triage.

## R9 Drafting constraints, applied while writing

Not as a cleanup pass afterwards.

- No em dashes.
- No named third-party businesses in reader-facing copy. Attribute by
  publisher type instead: "a Perth builder", "a Perth supplier", "a cost guide
  site". Peak bodies may be named.
- Operator notes, meaning decision logs, priority notes, research status, and
  references to `config.js` or markers, go in a `/* TODO (Brad): ... */` code
  comment. Never in a `note`, `p`, `lead`, FAQ or meta string. Every string
  value in `config.js` renders to the public site; there is no private field.
  `bake.js --check` runs an author-voice guard that fails the build on these.

## R10 Real evidence only

No invented reviews, photos, star ratings, licence numbers, years in business
or job counts. `testimonials` and `photos` stay empty until a real business
supplies real, verifiable content. `phone`, `email` and `hours` ship empty
until they are real.

`schema.type` stays `Organization` until a renter's real premises and hours
exist. No `priceRange`, no `AggregateRating`, no `Review`.

No pricing presented as ours. Published figures from named publisher types,
tabulated with their disagreement explained, are source data and are allowed.
A national or competitor number stated as if it were our price is not.

Images are illustrative: no captions, since a caption implies authorship, and
alt text describes what is illustrated rather than implying work we did.

## R11 Enquiry-flow wording, settled 18 September 2026

Reader-facing copy states the real data flow in the present tense: enquiries
are passed to a contractor in the trade, and the contractor pays for the
enquiry. The form notice, the voicemail greeting, the About page and the
privacy page all say the same thing.

**This supersedes** the earlier rule requiring conditional wording until a
renter was signed. That rule was in direct conflict with R3 and R4, which
require the present-tense statement at the point of collection, and both could
not hold. Decided by Brad, 18 September 2026. Recorded here so it is not
re-litigated per build.

## R12 One page owns each figure

The cannibalisation map names, for every page, what it owns and what it must
not expand into. Every cost figure lives on the cost page; other pages get one
sentence and a link. When editing later, brief mentions feel thin and you will
want to expand them. That instinct is the cannibalisation risk, and the map is
what you argue with.

## R13 Evidence lands in the repo

Any number, SERP read, credential or decision that a later task depends on is
written into `build/` by the task that produced it, in the commit that
produced it. **No fact reaches a later task by paste.**

This is the rule the whole procedure exists for. Across the Perth Tiling
Specialists build, five handover documents and nine working files were
produced and carried forward by upload; every session on both surfaces opened
by re-reading and re-judging the previous session's summary; the six page
drafts and the handover that drove the build now exist nowhere on disk. The
sequence was followed. The record was not kept.

---

# Appendix B: why this order

## The failure this order prevents

Decisions that appear on every page were being made after the copy for every
page already existed. That turns one decision into thirteen edits.

The Canberra Tiling history shows it end to end. `49fa393` settled brand, ABN
and domain after 13 pages named the brand. `272960b` added the Twilio number
after the CTAs referencing it were drafted. `802dd72` then `d952010` chose
hosting mid-build and found its duplicate-indexable-copy side effect later.
`4026a86` corrected a superseded standards citation after publication.
`caaaeb2` and `b898288` cleared 77 markers in end-of-build batches. `ab6715c`
turned analytics on near the end. `ad0ea26`, the final commit, was still
moving keywords into H1s.

Every one of those is a late-arriving input, not a mistake in the work.

## What the Perth Tiling Specialists build added

The sequence was followed on that build and it still felt scattered, because
sequencing was only half the problem. From the git history, ranked by cost:

1. **No committed artefact on either surface.** Every session started from a
   paste or an upload. The six page drafts and the build handover no longer
   exist anywhere. R13 and the five artefacts are the answer.
2. **Deploy and indexing ran while preflight was failing.** The site went live
   with 19 open items: a `[VERIFY]` token in served HTML, six images returning
   404 for two days, and a form with an invalid Turnstile key for three days.
   Google crawled during that window. T25 now gates T26, and T28 gates T29.
3. **Copy was drafted blind to the schema and the backend.** The privacy page
   described form fields the form did not have, and stated that calls were not
   recorded when the backend records every voicemail. Nine fix commits in one
   day. T18 checks the plan against the engine before drafting starts.
4. **A freeze commit that froze placeholders.** See R1. G1 now blocks the bake.
5. **Values transcribed by hand between surfaces.** A Turnstile site key with
   one extra character broke the live form for three days. T11 requires values
   to come from the dashboard that issued them.
6. **A settled position re-derived from a summary**, shipped, and undone three
   days later. Appendix A is the fix: rules in full, referenced by ID.
7. **Approved copy reworked after the bake**, because approval was a word in a
   chat rather than a state in a file. T22 and G5.
8. **A backport list that was two-thirds wrong.** Two of the three items
   recorded against sibling sites did not exist when checked against git. T30
   requires a check, not a memory.

## What is no longer in this file

The twelve-phase narrative version of this playbook, and the separate `New
site prompt.txt` brief, both described the same work in prose. The prose was
never the problem. `New site prompt.txt` is kept as the content brief for
populating a niche, but the gate it used to carry now lives in
`build/02-constants.md` and is enforced by G1.

---

# Appendix C: surfaces

**Code is the default.** It can search the web, fetch pages, run the
DataForSEO scripts in `dfseo/` with credentials in the environment, read and
write the repo, run the Supabase CLI, and check DNS and the live site. Every
research step Chat used to do is a Code step now. The goal is the fewest
surface crossings, not better handoffs between surfaces.

**There are no Chat tasks.** The only thing Chat can do that Code cannot is
search Brad's past Chat history, which is not a build step. There is therefore
no `CHAT-SESSION-START.md`.

**`Me` covers exactly three things**, and every one is verified by Code
afterwards rather than being taken on report:

| Reason | Tasks |
|---|---|
| Accounts and payments: registrar, Cloudflare, Twilio, GA4, Turnstile, Resend, Search Console | T09, T11, T15, T29 |
| Physical actions: recording the greeting, making a test call, submitting a test form | T13, T23, T28 |
| Sign-off: the decisions that are Brad's to make | T06, T08, T19, T22 |

If a `Me` task is reported done but its Code check has not run, the task is
not done. That distinction is what "status changes on evidence only" means.
