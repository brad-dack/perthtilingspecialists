# Cost guide: /tiling-cost-perth

Status: DRAFT v5 | 10 October 2026, awaiting Brad's approval. v4 APPROVED by Brad, 10 October 2026

## Head

| field | value |
|---|---|
| file | tiling-cost-perth.html |
| title | Tiling Cost Perth \| Price per m2 and What Drives It |
| meta | What does tiling cost in Perth? We collected published Perth prices for tiling per m2, bathroom retiles and regrouting, and explain why they disagree. |
| h1 | Tiling Costs in Perth: What Drives the Price |

## Blocks

**The draft for this page no longer exists**, for the reason in
`build/04-copy/index.md`. `config.js` `services[2].blocks` is the record.

Structure as shipped: what this page is and is not, published Perth rates side
by side with their publisher types, why whole-renovation figures diverge while
tiling-only figures converge, scope decomposition, budgeting sensibly, how to
get a quote you can rely on, contract rights and the deposit cap, FAQs, and a
CTA band. No form on this page: its quote links point at `/about#quote`.

## Draft v3, 8 October 2026

The `lead` block changed. No figure was added or changed. The blocks are in
`config.js` `services[2].blocks`.

- **Lead rewritten.** Search Console for the 28 days to the 8 October 2026 export put
  242 of this page's 291 impressions on national cost queries ("how much does a
  tiler cost", "tiling a floor cost", "cost to tile floor"). The old lead
  answered bathroom renovation cost instead. The new lead gives the floor
  labour rows already in the labour table, with the same publisher types, in
  its first sentence, and says what is priced on top in its second. The old
  lead is now the first paragraph, prefixed "Whole bathroom renovations spread
  much further."
- **New FAQ** "What does it cost to tile a floor in Perth, including the
  tiles?" Every figure in it is already on the page: Perth supplier labour and
  tile range, Perth tiler supply and install, national guide removal. Links the
  floor page.
- **Two sentences appended** with internal links: Removal and disposal now
  links the floor page; For repairs, expect a diagnosis now links the bathroom
  page.

## Draft v5, 10 October 2026

The cost guide site's figures were re-collected on 10 October 2026 (Brad's
instruction) and every place the page quotes that publisher was updated. The
record is `build/cost-guide-perth-figures.md` section 8.

- Lead, labour table, "Two things stand out" and the per m2 FAQ: standard
  floor $37 to $94 (avg $58) becomes $42 to $94 (typically $63). "Roughly a
  third below" becomes "roughly a quarter below" (42 against 55).
- Labour table: feature $63 to $125 becomes $84 to $180; hourly $126 becomes
  $52 to $105, typically $74.
- The hourly outlier paragraph is rewritten, because the outlier is gone:
  "Hourly rates agree far better. The same cost guide site puts them at $52 to
  $105, typically $74, and two Perth sources put them at $50 to $90 and around
  $60."
- "Some cost pages are not built from jobs at all": its last sentence used the
  $126 as the example. It now reads "They can also move between one month and
  the next: between our September and October 2026 checks, the cost guide site
  quoted on this page moved its standard floor rate from $37 to $42 per square
  metre and its hourly rate from $126 to $52 to $105."
- Tile table and the tile paragraph: porcelain $52 to $125, premium stone $105
  to $260.
- Bathroom renovation table: the cost guide site row now gives basic,
  mid-range (typically $28,350) and premium bands; the mid-range comparison
  sentence says around $28,350 instead of $27,300; the scope table row
  describes its tiers.
- Bathroom tiling table: the $630 to $1,675 labour row becomes $1,575 to
  $4,725 (labour only, floor and walls), and a new row gives the same
  publisher's $2,950 to $7,900 supply and install figure. The paragraphs
  under the table are adjusted to match.

## Draft v4, 10 October 2026

One list item in "Your rights on a WA tiling contract" changed, to name the
regulator (claim register row 11, sourced 10 October 2026 against wa.gov.au,
Building dispute resolution, updated 25 June 2026):

- was: "Complaints can be made to the relevant WA regulator for up to three
  years."
- now: "Complaints can be made to the Building Commissioner, through Building
  and Energy, generally within three years of the contract or of the cause of
  the dispute."

## Changes from plan

**The meta is live without approval.** The approved meta said "Indicative
ranges for price per m2", which implies the figures are ours. Under the method
this page actually uses they are not: they are other publishers' figures, put
side by side and attributed by type. The meta was rewritten during drafting to
describe collection and comparison, and re-approval is still open.

The page was also restructured on 15 September, after it was live: numbered
headings, "Section N" cross-references and sourcing asides removed,
sub-headings, a budgeting section, FAQs and a CTA band added. No figures were
added or changed.

The cost figure method changed three times before drafting: unsourced
indicative ranges, then the Canberra method, then the Canberra method with the
acknowledgement that it rests on no external evidence. The shipped page uses
published figures attributed by publisher type.

## Markers outstanding

None in the copy. Every `[VERIFY]` token was checked on 13 September against
`cost-guide-perth-figures.md` and removed only where the figure, the publisher
type and the scope all matched. Each resolution is a comment beside the block
it covered.

Claim register rows 10 and 11 are open, which is why Evidence is OPEN.

## Operator notes

Live as `/* TODO (Brad) */` comments in `config.js`:

- Re-approve the meta, above.
- A Perth itemised rate card was searched for and confirmed absent on 13
  September 2026. The section was left out rather than filled with national
  figures. Revisit once a renter can supply real quote data.

## Decisions locked on this page

- This page owns every cost figure on the site, including regrouting.
- Individual trade businesses are never named in reader copy. Publisher type
  only. Peak bodies, HIA and Master Builders WA, may be named.
- Nothing older than 2024 enters the tables.
- Review the figures by 12 September 2027.
