# 05 Log

Every task appends here. Every session reads it first. See PLAYBOOK.md.

**Reconstruction note.** This build ran before the procedure existed. The
decisions below are recovered from the git history, the two surviving handover
notes and the build session transcripts, on 18 September 2026. The open items
are every unresolved thing found while reconstructing it, including the ones
nobody was tracking.

## Decisions

| date | task | decision | by | supersedes | reason |
|---|---|---|---|---|---|
| 11 Sep 2026 | T01 | Build tiling Perth, not Cabinet Makers Adelaide | Brad | | Only top candidate local to Perth, and the link phases need physical presence |
| 11 Sep 2026 | T01 | Skip the written shortlist artefact | Brad | the playbook's Phase 0 artefact | "I know we did it". The consequence is that this file is the only record of why, and the detail of the other five candidates is gone |
| 11 Sep 2026 | T08 | Brand Perth Tiling Specialists, domain perthtilingspecialists.com.au | Brad | tilingperth.com.au, raised twice | Dispute risk against Tiling of Perth Pty Ltd, active since 2015 |
| 11 Sep 2026 | T07 | There is no portfolio rule against the word "specialist" | Code, accepted by Brad | a remembered rule | Searched both playbooks and the compliance flags file. It does not exist |
| 11 Sep 2026 | T11 | The form backend is the Supabase ingest function, not Formspree | Brad | a memory file | The playbook beats any memory file discrepancy |
| 11 Sep 2026 | T05 | The site is installation-led on the head term | Code, accepted by Brad | the repair and remedial thesis the Phase 1 gate closed on | The remedial SERPs are owned by dedicated specialists at 131 to 319 referring domains, and the high CPC is plumbers and leak detection. The first thesis rested on CPC alone |
| 12 Sep 2026 | T17 | Five content pages. Contact folds into About, bathroom waterproofing folds into bathroom tiling | Brad | the six-page and nine-page lists | Thin after the standards work, and the remedial SERP is specialist territory |
| 12 Sep 2026 | T16 | Unfreeze the Level 2 "no named individual" constant | Code, accepted by Brad | the Phase 2 constants freeze | A named individual is a stronger and more honest answer, and matches Canberra and Limestone |
| 12 Sep 2026 | T20 | Cost figures use published figures attributed by publisher type | Code, accepted by Brad | Option C, unsourced indicative ranges, approved earlier the same day | The disagreement between publishers is the content, and every figure stays traceable |
| 12 Sep 2026 | T20 | Competitor published figures are legitimate source data | Code, accepted by Brad | the Phase 2 rule prohibiting them | The two rules were in direct conflict once the method above was adopted |
| 12 Sep 2026 | T17 | Build Home first | Code, accepted by Brad | floor tiling first, decided the same session | The floor tiling link bar is 60 to 182 against 4 to 74 on the head term |
| 13 Sep 2026 | T21 | Enquiry-flow wording stays in the present tense | Brad | | Raised with four options including signing a trial renter first. Decision was to leave the pages as written |
| 13 Sep 2026 | T18 | Port Canberra's engine changes: extensionless routes, block-rendered Home, About and Privacy, job picker from contact.jobTypes | Code, accepted by Brad | the stock template engine | The drafts need a five-item nav, extensionless routes and long-form pages the template does not render. Logged in README, not yet backported |
| 15 Sep 2026 | T16 | Publish the same sole trader ABN as Canberra Tile Layers | Brad | the [ABN] and [SURNAME] placeholders, live since 13 Sep | |
| 16 Sep 2026 | T16 | The Turnstile site key is 0x4AAAAAAEHD1tLftcrbDXIx, six A's | Code, accepted by Brad | the seven-A key recorded in the Phase 2 handover and live since 13 Sep | The seven-A key threw error 400020, invalid sitekey, on the live page. The form could not take a lead for three days |
| 16 Sep 2026 | T21 | Rewrite the privacy page on the settled portfolio structure | Brad | the Australian Privacy Principles draft that shipped on 13 Sep | The drafting session re-derived the settled position from a one-line summary in a handover and reached a different answer |
| 18 Sep 2026 | T21 | Present-tense enquiry wording is settled portfolio-wide | Brad | the playbook rule requiring conditional wording until a renter is signed | The collection notice the privacy position depends on has to say it at the point of collection. Both rules could not hold. Now PLAYBOOK.md Appendix A, R11 |
| 18 Sep 2026 | T31 | config.js is the record of this build's copy | Code, accepted by Brad | the six page drafts | The drafts were delivered in a zip, extracted to a session scratchpad, and never committed. Both are gone. build/04-copy holds each page's head, decisions and operator notes, not its blocks |
| 5 Oct 2026 | T22 | Approve the live cost guide meta description | Brad | the meta approved in the page plan, which implied the figures were ours | The live meta attributes the figures to published Perth prices, which is what the page does |
| 5 Oct 2026 | T22 | Approve the live privacy title and meta description | Brad | | Never in the page plan. Approved as live |
| 5 Oct 2026 | T14 | The voicemail greeting follows the portfolio pattern: enquiries go to a tiler who can quote. It does not say the tiler pays, and will not be re-recorded | Brad | the 18 Sep open item reading R4 as requiring the payment statement on the phone channel, and R11's line that the greeting says the same as the form notice | Same format as the other sites, and the wording R4 itself gives as the pattern. The payment statement is carried by the form notice, About and the privacy page |
| 5 Oct 2026 | T21 | Renovation enquiries go to the tiler like any other. About still says renovations are usually builder-led, but no longer promises to turn the enquiry away | Brad | Canberra's "we will say so rather than take the enquiry", carried into About unconfirmed | The promise described handling Perth never committed to. The tiler decides what is in scope |
| 8 Oct 2026 | T21 | Cost guide lead answers the per m2 tiler cost first; bathroom renovation spread moves to the next paragraph. New floor-cost FAQ. Draft v3 | Code, awaiting Brad's approval | the approved v2 lead | Search Console: 242 of the page's 291 impressions were national tiler and floor cost queries the old lead did not answer. No figure added |
| 8 Oct 2026 | T21 | Floor page gains "Removing old tiles or tiling over them" and a three-question FAQ. Bathroom page gains "Signs your shower waterproofing has failed" and a three-question FAQ. Draft v2 of each | Code, awaiting Brad's approval | the approved v1 of each | Competitor teardown, 8 Oct 2026 (01-market.md). Both pages had no FAQPage schema. Leaking shower stays a section, as the T05 thesis requires |
| 8 Oct 2026 | T17 | No splashback page. The Splashbacks section moves verbatim from the bathroom page to the floor page, and home links it | Brad | the splashback page proposed the same day | tile splashback perth is 10 a month, a sixth nav item needs an engine change, and the home TODO already placed kitchens and laundries on the floor page |
| 10 Oct 2026 | T27 | Engine change to js/main.js: GA4 reports only from the live hostname, and a generate_lead event fires on an accepted form submission | Brad | the template's unguarded GA4 load and its untracked form | The GA4 read of 10 Oct 2026 (Index log) showed preview traffic counted as visitors and no way to count a form lead. Logged in README under Divergence |
| 10 Oct 2026 | none | Keep the template default brand theme: green, bold, diagonal | Brad | the open item to pick a theme | Accepted as is |
| 10 Oct 2026 | T20 | Evidence set to CLEAR: claim rows 8 and 10 dropped (not on any page), rows 9 and 11 sourced | Code | Evidence OPEN since 15 Sep 2026 | Brad asked for the preflight problems fixed. Each row checked against config.js, the served HTML or the primary source on 10 Oct 2026 |

## Open items

Everything unresolved, including items nobody was tracking. `blocks` names the
task it blocks, or `launch`, or `none`. `closes when` names the check that will
close it. `closing evidence` is that check's output, and is empty until it has
been run.

| item | blocks | surface | opened | closes when | closed | closing evidence |
|---|---|---|---|---|---|---|
| The voicemail greeting does not say the tiler pays for the enquiry, so the phone channel carries only half the collection notice R4 requires | launch | Me, then Code | 18 Sep 2026 | Re-record, set both columns, and hear it on a real call | 5 Oct 2026 | Withdrawn by decision. See Decisions, 5 Oct 2026, T14 |
| The greeting has never been heard on a real call to the live number | launch | Me | 18 Sep 2026 | A call, with the call_events row beside it | 5 Oct 2026 | Brad called (08) 9516 1688 on 5 Oct 2026 and heard the greeting. call_events row at 05:27:36 UTC (13:27 AWST), site perth-tiling-specialists, to_number +61895161688, event_type call_status, call_status ringing |
| The only call ever logged for this site is a single ringing event. No completed status and no recording row followed it, read 90 seconds later; Canberra logs completed about 12 seconds after ringing. Before that call, call_events held no rows for this site or number at all | launch | Me, then Code | 5 Oct 2026 | A test call that leaves a voicemail produces completed and recording rows against this site. Progress: Partly proved 10 Oct 2026: Brad's test call CA0ff1850f6275049e83021ec770e8c2a0 at 07:30 AWST logged ringing, then a recording row 21 s later (4 s, recording_path set), and a voicemail lead. Brad then deleted the audio from storage. Still no completed row. Not this site: across the portfolio, perth-brickwork, perth-limestone-group and this site log ringing and recording but never completed, while canberra-tile-layers logs ringing and completed (17 each) but never recording. Likely the Twilio numbers' callback configuration, so call duration is never captured on the Perth sites. Left open until a completed row appears | |  |
| Whether the stored greeting_text matches migration 018 was never read | T14 | Code | 18 Sep 2026 | Read the row | 5 Oct 2026 | Read 5 Oct 2026. It does not match. Stored: "... We will pass enquiries to a tiler who can quote the job." Migration 018: "We pass enquiries ...". greeting_audio_url is set. Follow-up below |
| Stored greeting_text says "We will pass", not the present-tense "We pass" in migration 018 and R11. Which wording the MP3 says is not known | none | Me, then Code | 5 Oct 2026 | Confirm the MP3 wording, then make greeting_text match it | 10 Oct 2026 | Brad, 10 Oct 2026: the MP3 says "We will pass". greeting_text read 10 Oct 2026 and says the same. Both columns now match each other; 02-constants.md and migration 018's "We pass" are what was out of step |
| The Supabase site_id UUID is not recorded anywhere in this repo | T14 | Code | 18 Sep 2026 | Read the row and write it into 02-constants.md | 5 Oct 2026 | f13c6b04-d9b8-4664-9d09-475dcfcd1967, read from sites where slug = perth-tiling-specialists, now in 02-constants.md |
| Migrations 017 and 018 are uncommitted in rank-and-rent-backend and were never applied through the CLI. The site row was created some other way | T14 | Code | 18 Sep 2026 | Commit them and show them applied in supabase migration list | |  |
| inbound_email and its Cloudflare routing rule were reported set but never read from the row | T14 | Code | 18 Sep 2026 | Read the row, send a test email | 10 Oct 2026 | Read 10 Oct 2026: inbound_email = hello@perthtilingspecialists.com.au. Routing proved by two email-channel leads on 16 Sep 2026 (17:24 and 17:44 AWST) |
| forward_from_email was reported set after Resend verification but never read from the row | T14 | Code | 18 Sep 2026 | Read the row | 10 Oct 2026 | Read 10 Oct 2026: forward_from_email = hello@perthtilingspecialists.com.au. forwarding_enabled is false, so nothing is forwarded until a renter is attached |
| gsc_site_url is not set on the site row, and the service account has no access, so the dashboard has no search data | T29 | Me, then Code | 17 Sep 2026 | Read the row | 10 Oct 2026 | Read 10 Oct 2026: gsc_site_url = sc-domain:perthtilingspecialists.com.au. Service account access reported done by Brad, not checkable from Code |
| The Supabase and Cloudflare storage regions are unknown, and the privacy page says only that data may go overseas | T21 | Me | 13 Sep 2026 | Name the regions, then name them on the page | 5 Oct 2026 | Brad: Tokyo. supabase projects list shows Rank&Rent (bnfgnglzswtrvzfqkgjh) in ap-northeast-1, Tokyo. Cloudflare holds nothing at rest: the email Worker's wrangler.toml has no KV, R2 or D1 bindings and forwards to Gmail and the Supabase ingest function. Privacy page names Supabase in Tokyo under Service providers and Where it is stored, lastUpdated 5 October 2026 |
| The cost guide meta is live and was never approved. The approved one implied the figures were ours | T22 | Me | 13 Sep 2026 | Approve the live meta or replace it | 5 Oct 2026 | Approved by Brad, 5 Oct 2026. Live text unchanged in tiling-cost-perth.html |
| The privacy title and meta were never in the page plan and are live without approval | T22 | Me | 13 Sep 2026 | Approve or replace | 5 Oct 2026 | Approved by Brad, 5 Oct 2026. Live text unchanged in privacy.html |
| AS 4586 has never been verified as the current slip resistance edition | T20 | Code | 12 Sep 2026 | Check Standards Australia | 10 Oct 2026 | Dropped: no page names AS 4586. Claim register row 8 |
| No NCC edition is named on the bathroom page. The figures are NCC 2022; WA adopted NCC 2025 on 1 May 2026 | T20 | Code | 13 Sep 2026 | Check NCC 2025 Part 10.2 and name an edition or keep it edition-free deliberately | 10 Oct 2026 | Every figure matches NCC 2025 Housing Provisions Part 10.2, checked 10 Oct 2026. Edition-free on purpose until the WA transition ends 30 Apr 2027. Claim register row 9 |
| "Labour is roughly half the job" on the cost guide is a Canberra line with no Perth source | T20 | Code | 13 Sep 2026 | Source it or cut it | 10 Oct 2026 | Dropped: the line is in no served page. Claim register row 10 |
| The cost guide says "the relevant WA regulator" rather than naming the regulator | T20 | Code | 13 Sep 2026 | Name it | 10 Oct 2026 | Named: the Building Commissioner, through Building and Energy, per wa.gov.au (updated 25 Jun 2026). Cost guide draft v4. Claim register row 11 |
| The linkable asset has no named outreach targets, so it is a conversion asset in practice | T29 | Code | 13 Sep 2026 | Six named targets in 03-plan.md | |  |
| cost-guide-perth-figures.md, which every figure on the cost guide traces to, was never committed. It exists only in Downloads | T20 | Code | 18 Sep 2026 | Commit it under build/ | |  |
| The SERP was never read for bathroom tiler perth or tiling cost perth, both of which have pages | T03 | Code | 18 Sep 2026 | Two rows in 01-market.md SERP ownership | 10 Oct 2026 | Both rows written 10 Oct 2026 from a browser read of google.com.au in Perth. Referring domain counts not pulled: DataForSEO credentials were not set |
| The keyword volume pull for the 26-term list was pasted into a chat and never written to a file | T02 | Code | 18 Sep 2026 | Re-run and commit the CSV, or accept the loss | |  |
| Canberra backport: it attributes the 1:80 fall to a paywalled standard. NCC Housing Provisions 10.2.12 states it, is free to verify, and gives the 1:50 maximum Canberra omits | none | Code | 12 Sep 2026 | A commit in the Canberra repo | |  |
| The R11 greeting exception added to PLAYBOOK.md on 5 Oct 2026 is not in the template's copy | T30 | Code | 5 Oct 2026 | A commit in the template repo | |  |
| The engine changes in this build are not backported to the template | T30 | Code | 13 Sep 2026 | Template commits, or a written reason each cannot be | |  |
| The About renovation paragraph follows Canberra's position. No Perth draft states it | T21 | Brad | 13 Sep 2026 | Confirm it is how enquiries are handled, or cut it | 5 Oct 2026 | Reworded by decision, see Decisions 5 Oct 2026, T21. about.html now ends the paragraph "If you send the enquiry anyway, we pass it to the tiler, and they will tell you if it is outside what they do." |
| The privacy page and the home page both refer to sending a photo, but the web form cannot take a file. A photo can only arrive by email, and that routing was never confirmed | T21 | Code | 13 Sep 2026 | Confirm the email routing, or drop the photo sentences | |  |
| step1Label, successMessage and errorMessage are still template copy rather than draft copy | T21 | Code | 13 Sep 2026 | Rewrite or accept deliberately | |  |
| The brand theme is still the template default: green, bold, diagonal | none | Brad | 12 Sep 2026 | Pick a theme, or accept the default deliberately | 10 Oct 2026 | Accepted as is by Brad, 10 Oct 2026. See Decisions |
| The Search Console verification date is not known | none | Code | 18 Sep 2026 | The property's own record | |  |
| Pre-index QA was never run as a set. Four rows below are proved after the fact; the rest were never done | T29 | Code and Me | 18 Sep 2026 | A full QA pass with evidence | |  |
| Three copy drafts from 8 Oct 2026 (floor v2, bathroom v2, cost guide v3) are baked into the HTML but not approved. Not pushed | T22 | Me | 8 Oct 2026 | Each file's Status set to APPROVED, then push | 8 Oct 2026 | Brad approved all three in session on 8 Oct 2026; Status lines set to APPROVED and G5 clean in node bake.js --check |
| Splashback page proposed 8 Oct 2026 and held. tile splashback perth is 10 a month; a sixth nav item needs an engine change to the 1024px header; the home page TODO says kitchens and laundries belong as a section | none | Brad | 8 Oct 2026 | A decision row: build it (then T03 SERP read, plan rows, H1 sign-off, engine change) or drop it | 8 Oct 2026 | Dropped. See Decisions, 8 Oct 2026, T17 |
| click_to_call and generate_lead are not marked as key events in GA4, so Key events reads 0 | none | Me | 10 Oct 2026 | Both marked as key events in GA4 Admin, Events. Progress: Brad reports both marked, 10 Oct 2026. Not checkable from Code. Closes when a GA4 export shows Key events above 0 | |  |
| Brad's own visits are counted in GA4. No internal traffic filter is defined | none | Me | 10 Oct 2026 | An internal traffic rule for Brad's IP, and the data filter set to Active. Progress: Brad reports the filter set, 10 Oct 2026. Not checkable from Code | |  |
| generate_lead has never been seen on the live site. It was proved on localhost with gtag and fetch stubbed | none | Me, then Code | 10 Oct 2026 | One real test submission on the live site, then the event in GA4 Realtime or the next Events export. Progress: Live main.js carries the event (deployed 2c63326, 10 Oct 2026). Brad's test submission landed as a form lead at 07:31:58 AWST, 10 Oct 2026, spam_status clean. The GA4 side is not checkable from Code; closes on the next Events export | |  |
| The cost guide site the cost guide quotes at "$37 to $94, averaged at $58" now publishes $42 to $94 with $63 typical (its page dated 1 Oct 2026, seen in the 10 Oct SERP read). The cost guide lead, labour table and FAQ still carry the 12 Sep figures | none | Code, then Brad | 10 Oct 2026 | Re-collect that publisher's figures and update every place they appear, or keep the 12 Sep figures with their collection date shown | |  |
| Cost guide draft v4 (regulator named) is baked but not approved | T22 | Me | 10 Oct 2026 | Status set to APPROVED in build/04-copy/tiling-cost-perth.md | 10 Oct 2026 | Approved by Brad in session, 10 Oct 2026. Status set to APPROVED |

## QA

Status: FAIL | 18 September 2026

Reconstructed. This build was deployed on 13 September and indexed on 17
September without a QA pass, while preflight was failing on 19 items. The rows
below record what can be proved now, not what was done at the time.

| check | result | evidence | date |
|---|---|---|---|
| no-js crawl | pass | Served HTML, scripts stripped: 4,932 / 5,334 / 5,623 / 7,858 / 4,659 / 4,795 words for home, floor, bathroom, cost guide, about, privacy | 18 Sep 2026 |
| console errors | not done | | |
| layout | partial | Checked at 375px during the no-JS nav fix on 13 Sep. Never checked as a set at three widths | 13 Sep 2026 |
| pagespeed | stale | Mobile 80 with LCP 5.2s on 17 Sep. Responsive heroes and deferred gtag landed in 43319f1 and the score has not been re-run since | 17 Sep 2026 |
| internal links | not done | | |
| sitemap | pass | node bake.js --check reports no sitemap or disk drift; six URLs, all extensionless | 18 Sep 2026 |
| notice above form | pass | The collection notice renders once on each of home, floor, bathroom and about, above the form | 18 Sep 2026 |
| preflight on deployed commit | fail | node bake.js --check now reports the build guard debt recorded in this file. It was clean of content markers at fcf1ea7 | 18 Sep 2026 |
| form end to end | pass | A test lead landed against the perth-tiling-specialists row | 16 Sep 2026 |
| call routes and logs | partial | Test call 10 Oct 2026, 07:30 AWST: ringing and recording rows plus a voicemail lead against this site. No completed status row, see open items | 10 Oct 2026 |
| greeting_audio_url | partial | Reported set. Never heard on a real call, and the wording does not carry the whole notice | 17 Sep 2026 |
| greeting_text | pass | Read 10 Oct 2026. Says "We will pass enquiries to a tiler who can quote the job", which Brad confirms is what the MP3 says | 10 Oct 2026 |
| ga4 realtime | partial | Not checked in Realtime. The Events export for 12 Sep to 9 Oct 2026 records 77 page_view and 1 click_to_call (Brad's test call, 5 Oct), so both are reaching the property. generate_lead added 10 Oct 2026 and not yet seen live | 10 Oct 2026 |
| single indexable hostname | pass | brad-dack.github.io/perthtilingspecialists/ returns 301 to the apex; www returns 301 to the apex | 18 Sep 2026 |
| operator files not served | pass | After the 18 Sep deploy: PLAYBOOK.md, CODE-SESSION-START.md, build/05-log.md, build/02-constants.md, README.md and bake.js all return 404, while the six pages return 200 | 18 Sep 2026 |

## Index log

| field | value |
|---|---|
| sitemap submitted | 17 September 2026 |
| sitemap last read | Not confirmed. Search Console showed "Couldn't fetch", then "Temporary processing error", both normal on a new property. Serving was verified as Googlebot: 200, application/xml, valid |
| pages requested | All five content pages were already indexed with their extensionless canonicals chosen by Google before the sitemap was read. Re-indexing was advised for all five because Google's crawl of About predated the 15 and 16 September rewrites |
| review dates set | Cost guide figures, 12 September 2027 |
| link inventory | The cost guide is the only nominated asset. The drummy tile diagram and the shower waterproofing extent diagram are the only other original assets on the site |
| outreach targets and status | None named. See open items |

### Search Console snapshot, 3 October 2026

Baseline from the Coverage and Performance exports downloaded on 3 October
2026. Performance covers 15 to 29 September 2026, web search. Coverage runs to
21 September, because the indexing report lags the performance report. Compare
the next review against these numbers.

**Coverage.** 5 indexed, 2 not indexed.

| reason | pages | read |
|---|---|---|
| Page with redirect | 1 | Expected. The www and github.io hostnames 301 to the apex |
| Discovered - currently not indexed | 1 | Probably /privacy, the only sitemap URL with no impressions. The export does not name URLs; confirm in the interface |

**Performance.** 244 impressions, 0 clicks, average position 60 to 78 day to
day with no direction.

| page | impressions | avg position |
|---|---|---|
| /tiling-cost-perth | 146 | 71.2 |
| /bathroom-tiling-perth | 56 | 69.0 |
| / | 33 | 63.8 |
| /about | 10 | 63.3 |
| /floor-tiling-perth | 1 | 96.0 |

| device | impressions | avg position |
|---|---|---|
| Desktop | 144 | 66.1 |
| Mobile | 99 | 73.9 |
| Tablet | 1 | 90.0 |

Australia 229 impressions at 72.8. Ten impressions from nine other countries
are noise.

Top queries by impressions: how much does a tiler cost (22, 82.3), tiling a
floor cost (21, 76.1), tiling specialists perth (16, 69.6), bathroom tiling
perth (15, 74.7), perth bathroom tiling (14, 74.2), cost to tile floor (13,
78.2), tiler cost (11, 69.7), tiling specialists (9, 43.0).

Reading:

- The cost guide earns 60% of impressions, mostly on national cost queries
  with no Perth modifier. One query was for Glen Waverley, in Melbourne.
- The home page head term barely registers: tilers perth and perth tilers
  have 1 impression each, at 66 and 74.
- The floor page is invisible, as the 60 to 182 link bar predicted.
- Nothing ranks inside the top 40. With no inbound links and no named
  outreach targets, that is a links problem, not a content problem.
- Sitemap last read is still unconfirmed. These exports do not show it.

### Search Console snapshot, 8 October 2026

From the Performance and Coverage exports downloaded on 8 October 2026: last
28 days against the previous 28, web search. The previous window ends before
launch on 13 September, so every query is new and no drop can be measured
against it. Compare against the 3 October snapshot above instead, bearing in
mind the two windows overlap.

**Coverage.** Still 5 indexed and 2 not indexed (page with redirect, and
discovered but not indexed, probably /privacy). Daily impressions averaged
about 14 from 18 to 30 September and about 34 from 1 to 4 October.

**Performance.** 455 impressions, 0 clicks. Australia 437 at 72.1.

| page | impressions | avg position | 3 Oct snapshot |
|---|---|---|---|
| /tiling-cost-perth | 291 | 73.0 | 146 at 71.2 |
| /bathroom-tiling-perth | 106 | 68.7 | 56 at 69.0 |
| / | 43 | 59.0 | 33 at 63.8 |
| /about | 13 | 60.2 | 10 at 63.3 |
| /floor-tiling-perth | 2 | 53.5 | 1 at 96.0 |

| query cluster | queries | impressions | weighted position | page |
|---|---|---|---|---|
| cost queries with no Perth modifier | 42 | 242 | 76.0 | cost guide |
| bathroom tiling, Perth | 6 | 97 | 73.6 | bathroom |
| head and brand | 5 | 40 | 56.9 | home |
| outside the service area (Magill, Edwardstown, Glen Waverley) | 4 | 8 | 81.9 | none, ignore |

Reading:

- No query sits at 8 to 20 in Australia. The best are tiling specialists at
  36.5 (12 impressions, was 43.0) and tiler cost at 57.1 (27, was 69.7).
- No drops of more than 3 positions. CTR is 0 everywhere, but at positions 57
  to 94 that is a ranking problem, not a title problem.
- No Perth suburb or in-area service query has appeared, so there is no gap
  query to build for yet.
- The cost guide's lead answered bathroom renovation cost while its traffic
  asked tiler and floor cost. Changed in draft v3, see Decisions.

### GA4 read, 10 October 2026

Five GA4 exports, 12 September to 9 October 2026 against the 28 days before
launch, which are all zero.

- **No search visitors.** 0 organic clicks. All 46 sessions are Direct. The
  Search Console data linked into GA4 shows 480 impressions, in line with the
  8 October snapshot above.
- **Most users are not people.** 37 users: 10 in Perth, the rest in data
  centre cities (Ashburn, Boardman, San Jose, Flint Hill, Singapore and
  others), which is crawler and speed-test traffic.
- **The timing is launch and testing.** 15 new users on 13 September, close to
  nothing after day 10, then 5 on 8 October, the day of a local preview session
  and the checks after that day's push.
- **The test events are there.** 5 form_start from 4 users and 1
  click_to_call match Brad's test form (16 Sep) and test call (5 Oct).
- **One landing on /floor-tiling-perth.html.** The canonical is the
  extensionless route, so it is harmless.
- **Measurement gaps found.** No event fired on a sent form, key events were
  not configured, and preview and owner traffic were counted. The first and
  third are fixed in js/main.js (Decisions, 10 Oct 2026). Key events and the
  internal traffic filter are open items for Brad.

## Backport

| divergence | template commit | or reason it stays here |
|---|---|---|
| Perth Tiling Specialists (13 September 2026) | none yet | Not backported. Sixteen engine changes are logged in README.md, including the two GA4 changes of 10 October 2026, which every template site needs: extensionless routes, block-rendered Home, About and Privacy, the five-item nav, form blocks with the notice above each form, the job picker from contact.jobTypes, the textarea field type, the 1024px nav breakpoint, the noscript nav CSS, and the removal of "free quote" from engine text. Extensionless routes, block-rendered pages, jobTypes and the em dash cleanup are shared with Canberra and are the strongest template candidates. Tracked as an open item against T30 |
