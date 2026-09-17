# 03 Page plan

Status: SIGNED-OFF | H1s approved 12 September 2026, reconstructed 18 September 2026
Evidence: OPEN | see the claim register below

Written by T17 to T20. Read by T21, T24 and T25. See PLAYBOOK.md.

**Reconstruction note.** The page plan for this build lived in a file that
never reached the repo, so the copy was transcribed against a summary of it.
The tables below are generated from the live `config.js`, which is what
actually shipped, and marked where the shipped value was never in the approved
plan. The status is SIGNED-OFF because both H1s were approved in the phase 3
session and the site has been live on them since 13 September 2026, not because
this reconstruction was signed off.

Evidence is OPEN, not CLEAR: four claims still carry operator TODOs in
`config.js`. They are rows 8 to 11 below.

## Inventory

| file | route | config key | priority | primary keyword | secondary keywords | template fit |
|---|---|---|---|---|---|---|
| index.html | / | pages.home | 1, built first | tiler perth / tiling perth | perth tilers, tilers perth | engine change: renders from pages.home.blocks, not the stock services grid |
| floor-tiling-perth.html | /floor-tiling-perth | services[0] | 1 on volume | floor tiling perth | wall tiling perth, tile repairs perth, cracked tiles, drummy tiles | fits |
| bathroom-tiling-perth.html | /bathroom-tiling-perth | services[1] | 2 | bathroom tiler perth | bathroom waterproofing perth, shower waterproofing, regrouting, splashback | fits |
| tiling-cost-perth.html | /tiling-cost-perth | services[2] | 1, link asset | tiling cost perth | tiling cost per m2 perth, tiler cost perth, tiler rates per hour | engine change: it is a services[] page but not a job, so the form's job picker reads contact.jobTypes instead of services[].name |
| about.html | /about | pages.about | 3 | n/a | tiling quote perth | engine change: renders from pages.about.blocks, and the auto-generated contact lines are dropped |
| privacy.html | /privacy | pages.privacy | 3 | n/a | n/a | engine change: renders from pages.privacy.blocks; the stock privacy text described a different form and data flow |

Contact is not a page. It is a section inside About, with the enquiry form
rendered on Home, Floor tiling, Bathroom tiling and About. Whether a separate
contact page was even possible was never checked against the engine at the
time; the page was dropped instead. T18 exists so that question gets answered
rather than avoided.

## Head

Generated from `config.js` on 18 September 2026. Character counts include
spaces.

| file | title | chars | meta | chars | h1 |
|---|---|---|---|---|---|
| index.html | Tiler Perth \| Tiling Quotes \| Perth Tiling Specialists | 54 | Looking for a tiler in Perth? Tell us about your floor, wall or bathroom tiling job and we will pass it to a Perth tiler who can quote it. | 138 | Find a Tiler in Perth for Floors, Walls and Bathrooms |
| floor-tiling-perth.html | Floor Tiling Perth \| Tile Laying and Tile Repairs | 49 | Floor tiling in Perth: new floors, wall tiling and cracked or drummy tile repairs. Learn what the job involves and get a quote from a Perth tiler. | 146 | Floor Tiling in Perth: Laying, Replacing and Repairing Tiles |
| bathroom-tiling-perth.html | Bathroom Tiling Perth \| Bathroom Tiler and Regrouting | 53 | Bathroom tiling in Perth, from full retiles to regrouting. See what a bathroom tiling job involves and get your job quoted by a Perth bathroom tiler. | 149 | Bathroom Tiling in Perth |
| tiling-cost-perth.html | Tiling Cost Perth \| Price per m2 and What Drives It | 51 | What does tiling cost in Perth? We collected published Perth prices for tiling per m2, bathroom retiles and regrouting, and explain why they disagree. | 150 | Tiling Costs in Perth: What Drives the Price |
| about.html | About Perth Tiling Specialists \| How This Site Works | 52 | What Perth Tiling Specialists is, the area we cover, what happens when you enquire, how the service is paid for, and how to get in touch. | 137 | About Perth Tiling Specialists |
| privacy.html | Privacy Policy \| Perth Tiling Specialists | 41 | What Perth Tiling Specialists collects when you make an enquiry or call, who your details go to, how long they are kept, and how to have them removed. | 150 | Privacy Policy |

Two of these were never in the approved plan and are live without approval:
the cost guide meta, which was rewritten during drafting, and the privacy title
and meta, which the plan never specified. Both are open items.

## Nav

Home, Floor Tiling, Bathroom Tiling, Cost Guide, About. No Services item and no
dropdown. Privacy is footer only. The footer mirrors the nav plus Privacy.

The header collapses below 1024px rather than the stock 800px: five links plus
the call button need about 1010px in one row.

## Cannibalisation map

| page | owns | must not expand into | sends readers to |
|---|---|---|---|
| index.html | routing the reader to the right page, how the site works, commercial disclosure in brief | any cost figure, any standards detail | all four other pages |
| floor-tiling-perth.html | substrate, setting out, wall tiling outside wet areas, cracked, loose and drummy tile repair | waterproofing detail, any price | bathroom tiling for wet areas, cost guide for price |
| bathroom-tiling-perth.html | waterproofing, falls, shower detailing, regrouting, splashbacks | any price, including regrouting prices | cost guide for price, floor tiling for substrate |
| tiling-cost-perth.html | **every cost figure on the site**, contract rights, the deposit cap | how-to detail that belongs on a service page | both service pages |
| about.html | who runs this, what the business does and does not do, how it is paid for, contact | service detail, prices | all pages |
| privacy.html | collection, disclosure, retention, access | commercial explanation beyond what disclosure needs | about |

## Internal link graph

Inbound hub: the cost guide, which is the nominated linkable asset. Outbound
hub: Home. No orphans: every page is in the nav except Privacy, which is in the
footer on every page.

## Image direction

Measured from `config.js` on 18 September 2026. No captions anywhere. The two
diagnostic images are drawn SVGs rather than photos, because a near-miss photo
of a drummy tile or a waterproofing extent would mislead.

| file | image | shows | photo or diagram | alt text | width | height | KB | widths |
|---|---|---|---|---|---|---|---|---|
| index.html | images/home-hero-tiled-interior.jpg | a tiled interior | photo, illustrative | in config.js | 1200 | 800 | 125 | 400, 560, 720, 960 |
| floor-tiling-perth.html | images/floor-tiling-perth.jpg | floor tiling work | photo, illustrative | in config.js | 1200 | 800 | 137 | 400, 560, 720, 960 |
| floor-tiling-perth.html | images/drummy-tile-cross-section.svg | why a drummy tile sounds hollow | diagram | in config.js | 1200 | 800 | 2 | none |
| bathroom-tiling-perth.html | images/bathroom-tiling-perth.jpg | a tiled bathroom | photo, illustrative | in config.js | 1200 | 800 | 94 | 400, 560, 720, 960 |
| bathroom-tiling-perth.html | images/shower-waterproofing-extent.svg | how far waterproofing has to extend | diagram | in config.js | 1200 | 800 | 3 | none |
| bathroom-tiling-perth.html | images/regrouting-close-up.jpg | regrouting | photo, illustrative | in config.js | 1200 | 800 | 43 | 400, 560, 720, 960 |

All six were referenced by the baked HTML from 13 September and committed on 15
September, so the live site served a 404 for each one for two days. G9 exists
because of that.

## Linkable asset

The cost guide, `/tiling-cost-perth`.

**No outreach targets were ever named.** The requirement to name six plausible
targets was raised at drafting time and left open. Until they are named, this
is a conversion asset rather than a link asset. Open item.

## Claim register

Rows 1 to 7 were cleared against primary sources on 15 September 2026 in commit
7551d26, which narrowed four of them to what the source actually says. Rows 8
to 11 are still open and are why Evidence is not CLEAR.

| # | claim as it will appear | page | primary source required | status | source | edition | url | date checked |
|---|---|---|---|---|---|---|---|---|
| 1 | Asbestos is a real possibility in homes built before 1990 | floor, cost guide | state health or work safety regulator | sourced | HealthyWA product list | current at check | see config.js credit line | 15 September 2026 |
| 2 | The owner carries the obligation that work meets the standards even where no permit is required | floor, cost guide | the Act itself | sourced | Building Act 2011 (WA) s37(2) | as in force | see config.js credit line | 15 September 2026 |
| 3 | Clearing a blocked fixture with a plunger at your own home is exempt from plumbing licensing | floor, cost guide | plumbing licensing authority | sourced | WA plumbing licensing | current at check | see config.js credit line | 15 September 2026 |
| 4 | Slip resistance is a question to ask, not a stated rule | bathroom | Standards Australia | sourced | narrowed to a question rather than a cited rule | n/a | n/a | 15 September 2026 |
| 5 | Tile installation is covered by AS 3958:2023 incorporating Amendment No. 1 (2024) | floor | Standards Australia | sourced | AS 3958 | 2023 with Amdt 1, 2024 | n/a | 12 September 2026 |
| 6 | Waterproofing is covered by AS 3740:2021, which supersedes AS 3740-2010 | bathroom | Standards Australia | sourced | AS 3740 | 2021 | n/a | 12 September 2026 |
| 7 | Home Building Contracts Act 1991 (WA) covers fixed-price contracts between $7,500 and $500,000 and caps the deposit at 6.5 per cent, and names tiling | cost guide | the Act itself | sourced | Home Building Contracts Act 1991 (WA) | as in force | n/a | 12 September 2026 |
| 8 | AS 4586 is the current slip resistance standard | bathroom | Standards Australia | **open** | edition never verified | unknown | n/a | not checked |
| 9 | No NCC edition is named anywhere on the bathroom page | bathroom | ABCB | **open** | figures were taken from NCC 2022; WA adopted NCC 2025 on 1 May 2026 with NCC 2022 Amdt 2 assessable until 30 April 2027 | unresolved | n/a | not checked |
| 10 | Labour is roughly half the job | cost guide | a published Perth figure | **open** | carried over from a Canberra line, no Perth source | n/a | n/a | not checked |
| 11 | "The relevant WA regulator" is deliberately vague on the cost guide | cost guide | the regulator's own name | **open** | the regulator was never named | n/a | n/a | not checked |

## Dropped claims

| claim | reason |
|---|---|
| Western Australia requires a waterproofing licence | **False.** Every source asserting it traced back to training provider marketing. The licence belongs to Queensland, where QBCC issues it. Deleted, not softened |
| Silica dust detail | Added nothing a homeowner would act on |
| Slip resistance classification codes | Kept out unless AS 4586 is verified, see row 8 |

## Traps found

- The Western Australian waterproofing licence, above. The trap is that search
  results agree with each other because they share one marketing source.
- The ABCB page carries South Australian variations marked `NCC State: SA`
  which replace or insert clauses for South Australia only. The base provisions
  apply in Western Australia. Do not read the SA text as national.
- Canberra's asbestos wording does not transfer. The ACT has no small quantity
  do-it-yourself exemption; WorkSafe WA licenses friable asbestos and more than
  10 square metres of non-friable.
- A 40 mm figure belongs to flashing outside the shower, NCC 10.2.3(3)(b), not
  to shower wall junctions. Caught in a draft before it shipped.

## Cost figures

Collected 12 September 2026. Reader-facing copy uses the publisher type, never
the business name. Peak bodies may be named. The full source table, with the
real publisher names kept for traceability, is
`cost-guide-perth-figures.md`, which was never committed and now exists only in
Downloads. Open item.

Method, as it appears on the page: published Perth figures from several
publishers are put side by side, attributed by publisher type, and the
disagreement between them is explained rather than averaged away.

| item | low | high | publisher type | source name | url | date |
|---|---|---|---|---|---|---|
| standard floor tiling per m2 | $55 | $75 | Perth supplier | in the uncommitted figures file | n/a | 12 September 2026 |
| bathroom tiling per m2 | $75 | $120 | Perth supplier | in the uncommitted figures file | n/a | 12 September 2026 |
| standard floor labour per m2 | $37 | $94 | cost guide site | in the uncommitted figures file | n/a | 12 September 2026 |
| tiler supply and install per m2 | $30 | $100 | Perth tiler | in the uncommitted figures file | n/a | 12 September 2026 |
| bathroom renovation total, WA | $3,000 | $65,000+ | thirteen publishers | in the uncommitted figures file | n/a | 12 September 2026 |

Convergence and disagreement: tiling-only bathroom figures converge around
$3,000 to $6,500, while whole-renovation figures diverge wildly, because a
renovation is not one defined scope. That divergence is the page's argument.

Gaps: no Perth itemised rate card was found. Canberra's line-by-line rate card
section has no Perth equivalent, so the section was left out rather than filled.

Review date: 12 September 2027.

## Sign-off

H1s approved by Brad in the phase 3 session, 12 September 2026:
"Find a Tiler in Perth for Floors, Walls and Bathrooms" and "Floor Tiling in
Perth: Laying, Replacing and Repairing Tiles". Nav approved in the same
session. The remaining four H1s shipped without a recorded approval.
