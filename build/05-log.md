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

## Open items

Everything unresolved, including items nobody was tracking. `blocks` names the
task it blocks, or `launch`, or `none`. `closes when` names the check that will
close it. `closing evidence` is that check's output, and is empty until it has
been run.

| item | blocks | surface | opened | closes when | closed | closing evidence |
|---|---|---|---|---|---|---|
| The voicemail greeting does not say the tiler pays for the enquiry, so the phone channel carries only half the collection notice R4 requires | launch | Me, then Code | 18 Sep 2026 | Re-record, set both columns, and hear it on a real call | |  |
| The greeting has never been heard on a real call to the live number | launch | Me | 18 Sep 2026 | A call, with the call_events row beside it | |  |
| Whether the stored greeting_text matches migration 018 was never read | T14 | Code | 18 Sep 2026 | Read the row | |  |
| The Supabase site_id UUID is not recorded anywhere in this repo | T14 | Code | 18 Sep 2026 | Read the row and write it into 02-constants.md | |  |
| Migrations 017 and 018 are uncommitted in rank-and-rent-backend and were never applied through the CLI. The site row was created some other way | T14 | Code | 18 Sep 2026 | Commit them and show them applied in supabase migration list | |  |
| inbound_email and its Cloudflare routing rule were reported set but never read from the row | T14 | Code | 18 Sep 2026 | Read the row, send a test email | |  |
| forward_from_email was reported set after Resend verification but never read from the row | T14 | Code | 18 Sep 2026 | Read the row | |  |
| gsc_site_url is not set on the site row, and the service account has no access, so the dashboard has no search data | T29 | Me, then Code | 17 Sep 2026 | Read the row | |  |
| The Supabase and Cloudflare storage regions are unknown, and the privacy page says only that data may go overseas | T21 | Me | 13 Sep 2026 | Name the regions, then name them on the page | |  |
| The cost guide meta is live and was never approved. The approved one implied the figures were ours | T22 | Me | 13 Sep 2026 | Approve the live meta or replace it | |  |
| The privacy title and meta were never in the page plan and are live without approval | T22 | Me | 13 Sep 2026 | Approve or replace | |  |
| AS 4586 has never been verified as the current slip resistance edition | T20 | Code | 12 Sep 2026 | Check Standards Australia | |  |
| No NCC edition is named on the bathroom page. The figures are NCC 2022; WA adopted NCC 2025 on 1 May 2026 | T20 | Code | 13 Sep 2026 | Check NCC 2025 Part 10.2 and name an edition or keep it edition-free deliberately | |  |
| "Labour is roughly half the job" on the cost guide is a Canberra line with no Perth source | T20 | Code | 13 Sep 2026 | Source it or cut it | |  |
| The cost guide says "the relevant WA regulator" rather than naming the regulator | T20 | Code | 13 Sep 2026 | Name it | |  |
| The linkable asset has no named outreach targets, so it is a conversion asset in practice | T29 | Code | 13 Sep 2026 | Six named targets in 03-plan.md | |  |
| cost-guide-perth-figures.md, which every figure on the cost guide traces to, was never committed. It exists only in Downloads | T20 | Code | 18 Sep 2026 | Commit it under build/ | |  |
| The SERP was never read for bathroom tiler perth or tiling cost perth, both of which have pages | T03 | Code | 18 Sep 2026 | Two rows in 01-market.md SERP ownership | |  |
| The keyword volume pull for the 26-term list was pasted into a chat and never written to a file | T02 | Code | 18 Sep 2026 | Re-run and commit the CSV, or accept the loss | |  |
| Canberra backport: it attributes the 1:80 fall to a paywalled standard. NCC Housing Provisions 10.2.12 states it, is free to verify, and gives the 1:50 maximum Canberra omits | none | Code | 12 Sep 2026 | A commit in the Canberra repo | |  |
| The engine changes in this build are not backported to the template | T30 | Code | 13 Sep 2026 | Template commits, or a written reason each cannot be | |  |
| The About renovation paragraph follows Canberra's position. No Perth draft states it | T21 | Brad | 13 Sep 2026 | Confirm it is how enquiries are handled, or cut it | |  |
| The privacy page and the home page both refer to sending a photo, but the web form cannot take a file. A photo can only arrive by email, and that routing was never confirmed | T21 | Code | 13 Sep 2026 | Confirm the email routing, or drop the photo sentences | |  |
| step1Label, successMessage and errorMessage are still template copy rather than draft copy | T21 | Code | 13 Sep 2026 | Rewrite or accept deliberately | |  |
| The brand theme is still the template default: green, bold, diagonal | none | Brad | 12 Sep 2026 | Pick a theme, or accept the default deliberately | |  |
| The Search Console verification date is not known | none | Code | 18 Sep 2026 | The property's own record | |  |
| Pre-index QA was never run as a set. Four rows below are proved after the fact; the rest were never done | T29 | Code and Me | 18 Sep 2026 | A full QA pass with evidence | |  |

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
| call routes and logs | not done | | |
| greeting_audio_url | partial | Reported set. Never heard on a real call, and the wording does not carry the whole notice | 17 Sep 2026 |
| greeting_text | partial | The column is NOT NULL so a value exists. The stored wording was never read | 18 Sep 2026 |
| ga4 realtime | not done | A pageview and a click_to_call event have never been confirmed | |
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

## Backport

| divergence | template commit | or reason it stays here |
|---|---|---|
| Perth Tiling Specialists (13 September 2026) | none yet | Not backported. Fourteen engine changes are logged in README.md: extensionless routes, block-rendered Home, About and Privacy, the five-item nav, form blocks with the notice above each form, the job picker from contact.jobTypes, the textarea field type, the 1024px nav breakpoint, the noscript nav CSS, and the removal of "free quote" from engine text. Extensionless routes, block-rendered pages, jobTypes and the em dash cleanup are shared with Canberra and are the strongest template candidates. Tracked as an open item against T30 |
