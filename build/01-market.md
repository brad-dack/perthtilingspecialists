# 01 Market read

Status: GO | gate closed 11 September 2026, reconstructed here 18 September 2026

Written by T01 to T06. Read by T07 and T17. See PLAYBOOK.md.

**Reconstruction note.** This build's market read happened in a chat session
and was never committed. What follows is recovered from the phase 2 and phase 4
handover notes and from the CSV pulls, which are now in `build/data/`. Where a
row was never actually read, it says so, and there is an open item rather than
a guess. G2 will report the gaps until they are filled: that is the file
telling the truth about what was never done.

## Candidates considered

Re-filtered from the workbook's "3 Verdict" tab: dropped built rows, anything
under 40 renters, anything under 250 searches, and low-ticket niches.

| niche | city | renters | volume | competitor strength | remote penalty | verdict |
|---|---|---|---|---|---|---|
| Tiling | Perth | 211+ | 1,300 national bucket | 2.63 | none, Perth is local | **Chosen** |
| Cabinet makers | Adelaide | not recorded | not recorded | not recorded | remote, link phases need presence | Runner-up |
| Five others on the shortlist | various | not recorded | not recorded | not recorded | not recorded | Dropped, detail lost with the chat |

## Chosen

Tiling, Perth. It beat Cabinet Makers Adelaide because it was the only top
candidate local to Perth, and link phases 3, 5 and 6 (supplier links,
sponsorships, local PR) need physical presence.

Workbook file and tab used: the "3 Verdict" tab of the opportunity workbook in
`dfseo/`, as at 11 September 2026. The exact file name was not recorded.

## Keyword table

Grouped duplicates are recorded as grouped. The head term is 590 to 720
combined, not the 1,400 the first reading of the workbook implied.

| term | volume | cpc | scope | null? | intended page, section on X, or no page |
|---|---|---|---|---|---|
| tiler perth / tiling perth (grouped) | 590 to 720 | not recorded | national pull | no | index.html |
| floor tiling perth | 210 to 320 | not recorded | national pull | no | floor-tiling-perth.html |
| bathroom tiler perth / bathroom tiling perth (grouped) | 40 to 50 | not recorded | national pull | no | bathroom-tiling-perth.html |
| bathroom waterproofing perth | 50 | not recorded | national pull | no | section on bathroom-tiling-perth.html |
| tiling cost perth | 20 | not recorded | national pull | no | tiling-cost-perth.html |
| Perth cost terms (grouped) | ~100 combined | not recorded | national pull | no | tiling-cost-perth.html |
| tile regrouting perth | 50 | 16.30 | national pull | no | section on bathroom-tiling-perth.html |
| leaking shower perth | 90 | 34.02 | national pull | no | no page, see Future niche log |
| waterproofing perth | 140 | 9.43 | national pull | no | no page, wrong trade |
| pool tiling perth | 140 | 3.57 | national pull | no | no page, pool renovators |
| outdoor tiling perth | null | n/a | national pull | **yes** | no page |
| wall tiling perth | 50 | 0.88 | Perth pull | no | section on floor-tiling-perth.html |
| tile repairs perth | 40 | 7.65 | Perth pull | no | section on floor-tiling-perth.html |
| tile splashback perth | 10 | 1.48 | Perth pull | no | section on floor-tiling-perth.html, moved from bathroom 8 Oct 2026. A page was proposed and dropped; see Competitor gaps |
| tiling installation terms | not recorded | 0.88 to 1.96 | national pull | no | covered by the service pages |

**Partly recovered, 8 October 2026.** `build/data/volume-perth-2026-09-11.csv`
is a 12-term Perth-location pull found in `dfseo/` (written 11 September 2026,
12:49). It fills the volumes above that were "not recorded", and gives the
single-location figures behind the grouped ranges: tiler perth and tiling
perth 590 each at $7.84, floor tiling perth 210 at $1.89, bathroom tiler perth
and bathroom tiling perth 40 each at $5.03. The other 14 terms of the 26-term
list are still lost.

## SERP ownership

One row per intended page is the requirement. **Two rows are missing**, and
both pages shipped without their SERP ever being read. Open items.

| query | ads (count, who) | local pack | AIO | top 3 domains | top 3 ref domains | segment owner | winnable? |
|---|---|---|---|---|---|---|---|
| tiling perth | present, count not recorded | not recorded | not recorded | hipages and Airtasker present, positions 1 to 3 held by tilers | 4 to 74 | the trade itself, with directories above | yes, positions 1 to 3 judged open |
| floor tiling perth | 1 sponsored map listing, a flooring company rather than a tiler | yes | no | guntiling.com.au, moderntrendtiling.com.au, abctilingandstone.com.au | 74, 100, 60. Ezy Tiling at #5 has 182 | the trade itself | yes, but the link bar is higher than the head term |
| bathroom tiler perth | not read | not read | not read | not read | not read | not read | **never read** |
| tiling cost perth | not read | not read | not read | not read | not read | not read | **never read** |
| tile regrouting perth | 1, The Grout Guy | not recorded | not recorded | no general tilers on page 1 | not recorded | specialists | no, section only |
| leaking shower perth | not recorded | not recorded | not recorded | dedicated shower repair and sealing specialists | 131 to 319 | specialists | no |
| waterproofing perth | not recorded | not recorded | not recorded | waterproofing and leak detection firms | not recorded | another trade | no |
| pool tiling perth | not recorded | not recorded | not recorded | pool renovators | not recorded | another trade | no |

## Competitor gaps

None of the top three publish figures or explain what drives a tiling price.
Four incumbent homepages were torn down at the time; the notes were not kept
beyond that conclusion, which is what the cost guide was built to exploit.

### Teardown, 8 October 2026

Fifteen sites fetched as raw HTML with their sitemaps expanded. Three are in
Perth; the other twelve (three each in Brisbane, Sydney, Melbourne and
Adelaide) were read for ideas only, and nothing city-specific from them
transfers: QBCC and NSW licensing, Melbourne postcode pages and the like.

| site | H1 | homepage words | page types | schema | trust signals |
|---|---|---|---|---|---|
| guntiling.com.au | Premium Tiler in Perth | 1,334 | 9 service pages (floor, bathroom, waterproofing, tile removal, polished porcelain, tile supply, renovations, tile art), gallery, careers, 8 blog posts including two Perth cost posts | LocalBusiness, AggregateRating, Review, Product; FAQPage on each service page; Article on posts | review schema, testimonials, projects, AS 3740 named on the waterproofing page |
| abctilingandstone.com.au | Perth's Tiling And Stone Experts | 1,707 | about 20 service pages (wall and floor, waterproofing and caulking, splashbacks, alfresco, balcony, stairs, pavers, feature wall, stone sealing, commercial, residential), projects, testimonials, review page, team, about 52 blog posts | plugin default only (WebPage, Organization) | Google reviews, insured, years, team page |
| trademarktiling.com.au | several H1s, led by Kitchen Splashbacks | 764 | splashback hub with kitchen and laundry children, bathroom repairs (leaking shower, shower waterproofing), tilers perth, kitchen tiling, testimonials, partners, 8 blog posts from 2018 to 2019 | plugin default only | testimonials, family owned |

Our pages run 4,600 to 7,900 words against their 1,100 to 2,500. What they
have that this site does not, ranked by likely ranking impact: referring
domains (74 and 60, see `build/data`); a page per service, especially
splashbacks (all three) and waterproofing and tile removal; FAQs with FAQPage
schema on service pages (Gun Tiling); real reviews and review schema;
LocalBusiness schema with an address; galleries of real work; blogs. Reviews,
LocalBusiness, galleries and credentials are blocked by R10 until a renter
exists. Acted on 8 October 2026: FAQs on the floor and bathroom pages, a
tile-over or removal section on floor, and a failed-shower section on bathroom.

Splashbacks: every Perth competitor has a page, but `tile splashback perth`
is 10 searches a month in the recovered pull, and the home page carries a
standing note that kitchens and laundries belong as a section, not a page. A
page was proposed and dropped by Brad on 8 October 2026; the section moved
from the bathroom page to the floor page instead.

## Commercial thesis

The site is installation-led on the head term. It targets `tiling perth` and
`floor tiling perth`, where the trade itself owns the SERP and the link bar
sits between 4 and 182 referring domains, and it treats repair intent as
sections rather than pages.

**This reverses the thesis the gate first closed on.** That thesis said the
commercial centre of gravity was repair and remedial work, and it rested on CPC
alone: regrouting at $16.30 and waterproofing at $9.43 against $0.88 to $1.96
for installation. When the remedial SERPs were finally read, they were owned by
dedicated shower repair and sealing specialists rather than tilers, the $34 CPC
on leaking shower turned out to be plumbers and leak detection, and the remedial
top three carried 131 to 319 referring domains against a tiling bar of 4 to 74.
Roughly half a session went on unwinding it, and one brand rejection reason is
still recorded backwards because of it.

## Renter evidence

Paid advertisers on the head term, plus hipages and Airtasker ranking on page
one, which means lead buyers exist in this market. The named advertisers were
not recorded beyond The Grout Guy on the regrouting query.

## Remote-execution verdict

No penalty. Perth is local, so the link phases that need physical presence can
be executed.

## Data files

Recovered from `dfseo/` and committed here on 18 September 2026. The commands
are as they were run at the time, from `C:\Users\bjdac\dfseo\` with DataForSEO
credentials in the shell environment.

| file | command that produced it | date |
|---|---|---|
| build/data/refdomains_floor_tiling.csv | python refdomains_adhoc.py --domains domains_floor_tiling.txt --output refdomains_floor_tiling.csv | 12 September 2026 |
| build/data/refdomains_remedial.csv | python refdomains_adhoc.py --domains domains_remedial.txt --output refdomains_remedial.csv | 11 September 2026 |
| build/data/domains_remedial.txt | written by hand, the input list for the remedial pull | 11 September 2026 |
| build/data/volume-perth-2026-09-11.csv | python volume_adhoc.py with the Perth location, keywords from dfseo/keywords.txt (recovered from dfseo/perth.csv; the exact command was not recorded) | 11 September 2026 |
| build/data/cost_national.csv | python volume_adhoc.py --keywords <cost terms> --locations Australia | 11 September 2026 |

The keyword volume pull for the main 26-term list was pasted into a chat as
console output and never written to a file. It is gone.

## Future niche log

- **Leaking shower repair, Perth.** Real volume at 90 and a high CPC, but the
  SERP belongs to dedicated shower repair specialists with 131 to 319 referring
  domains. A separate site, not a page on this one.
- **Bathroom waterproofing, Perth.** 50 searches. Wrong trade for the head
  term; kept as a section.
- **Pool tiling, Perth.** Pool renovators own it.
