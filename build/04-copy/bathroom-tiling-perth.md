# Bathroom tiling: /bathroom-tiling-perth

Status: APPROVED | v3, Brad, 8 October 2026. v2 approved by Brad the same day; v3 is the Splashbacks move he decided, below

## Head

| field | value |
|---|---|
| file | bathroom-tiling-perth.html |
| title | Bathroom Tiling Perth \| Bathroom Tiler and Regrouting |
| meta | Bathroom tiling in Perth, from full retiles to regrouting. See what a bathroom tiling job involves and get your job quoted by a Perth bathroom tiler. |
| h1 | Bathroom Tiling in Perth |

## Blocks

**The draft for this page no longer exists**, for the reason in
`build/04-copy/index.md`. `config.js` `services[1].blocks` is the record.

Structure as shipped: lead, what a bathroom tiling job involves, waterproofing
and what the rules actually require with the waterproofing extent diagram,
falls and junction detailing, what to ask before accepting a quote,
regrouting, splashbacks, and the enquiry form at `#quote`.

This is the highest-risk page on the site for implied capability. Every
sentence in the waterproofing section describes what the contractor should do
and what the homeowner should check, never what we do.

## Draft v2, 8 October 2026

Additions only, plus one sentence appended. The blocks are in `config.js`
`services[1].blocks`, each with a comment saying why it is there.

- **New H2 "Signs your shower waterproofing has failed"**, after the regrouting
  section. Targets leaking shower perth as a section, which is all the
  `01-market.md` thesis allows (the SERP belongs to shower repair specialists).
  Home already routes "leaking showers" here and the page said one sentence
  about it. Opens with the direct answer (damp outside the shower, then signs
  inside it), says none of the signs proves membrane failure on its own, lists
  what to look for, why covering it up fails, the licensed plumber rule
  (restating verified claim register row, same wording as the page already
  carries), and pre-1990 asbestos (points at Older Perth bathrooms). Ends with
  a link to the form. No diagnosis is promised.
- **New H2 "Common questions"** with three FAQs, before the quote section, so
  the page gets FAQPage schema. Questions: tile over existing bathroom tiles,
  retile only the shower, different tiles in the shower and the floor. No slip
  resistance standard or rating is named, because claim register row 8 is
  still open.
- **Appended** to "Give every tiler the same brief": a link to the floor page's
  tile-over section.
- **Inbound links added** from the floor page (new section, Wet areas are
  different) and the cost guide (For repairs, expect a diagnosis).

## Draft v3, 8 October 2026

**Splashbacks section removed**, moved verbatim to the floor page. Decided by
Brad, 8 October 2026; see `floor-tiling-perth.md`.

## Changes from plan

None to the head. Bathroom waterproofing was folded into this page as a
section rather than getting its own page, and this page carries
`bathroom waterproofing perth` (50) as a secondary target.

## Markers outstanding

None in the copy. Two claims on this page are still unresolved in the claim
register, rows 8 and 9 of `build/03-plan.md`, which is why Evidence is OPEN.

## Operator notes

Live as `/* TODO (Brad) */` comments in `config.js`:

- No NCC edition is named anywhere on this page. The figures came from NCC
  2022. Western Australia adopted NCC 2025 on 1 May 2026, with NCC 2022
  Amendment 2 assessable until 30 April 2027. Name an edition or keep the
  prose edition-free on purpose.
- The 40 mm figure belongs to clause 10.2.3(3)(b), flashing outside the
  shower, not to shower wall junctions. Clause 10.2.2 sets the 1800 mm shower
  wall height, measured to substrate rather than to finished tile.
- AS 4586 is unverified as the current edition. Slip resistance classification
  codes stay out until it is.
- The link graph says to vary the second cost guide anchor on this page.

## Decisions locked on this page

- No cost figures, including regrouting prices. The cost guide owns every
  price on the site.
- Contract rights and the deposit cap live on the cost guide and are not
  repeated here.
- Canberra's asbestos wording does not transfer to Western Australia. See
  `build/03-plan.md` Traps found.
