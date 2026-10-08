# Floor tiling: /floor-tiling-perth

Status: APPROVED | v3, Brad, 8 October 2026. v2 approved by Brad the same day; v3 is the Splashbacks move he decided, below

## Head

| field | value |
|---|---|
| file | floor-tiling-perth.html |
| title | Floor Tiling Perth \| Tile Laying and Tile Repairs |
| meta | Floor tiling in Perth: new floors, wall tiling and cracked or drummy tile repairs. Learn what the job involves and get a quote from a Perth tiler. |
| h1 | Floor Tiling in Perth: Laying, Replacing and Repairing Tiles |

## Blocks

**The draft for this page no longer exists**, for the reason in
`build/04-copy/index.md`. `config.js` `services[0].blocks` is the record.

Structure as shipped: lead, what the page covers, substrate and why it drives
the cost, setting out, AS 3958:2023, wall tiling outside wet areas, cracked,
loose and drummy tiles with the drummy tile diagram, asbestos in older homes,
and the enquiry form at `#quote`.

## Draft v2, 8 October 2026

Additions only. Nothing in v1 was reworded or removed. The blocks are in
`config.js` `services[0].blocks`, each with a comment saying why it is there.

- **New H2 "Removing old tiles or tiling over them"**, after "The substrate is
  where the money hides". Targets tile removal perth and tiling over existing
  tiles. All three Perth competitors read on 8 October 2026 cover it (see
  `01-market.md` Competitor gaps). Opens with the direct answer: a tile-over
  only works when every tile is bonded, the floor is flat and the height
  works. Covers the gamble, height, wet areas (links bathroom), removal (links
  the cost guide for price, per R12), and pre-1990 asbestos (points at Older
  Perth floors rather than restating it). Ends with a link to the form.
- **New H2 "Common questions"** with three FAQs, before the quote section. This
  page had no FAQ, so it had no FAQPage schema; Gun Tiling has one on every
  service page. Questions: tile over old floor tiles, how long a floor takes,
  replacing a few cracked tiles. No figures, no standards.
- **Inbound links added** from the cost guide (Removal and disposal paragraph,
  and the new floor-cost FAQ) and the bathroom page (What to ask before you
  accept a quote).

No new claim needing the register: the only regulatory content is the
existing pre-1990 asbestos line, referenced, not restated.

## Draft v3, 8 October 2026

**Splashbacks moved here from the bathroom page**, verbatim, as a section
after Wall tiling. Decided by Brad, 8 October 2026: a splashback is a kitchen
or laundry job, `tile splashback perth` is 10 searches a month, and the home
page TODO already placed kitchens and laundries on this page. The Wall tiling
paragraph loses its trailing "along with splashbacks". The home page's
Kitchens and laundries line now links here.

## Changes from plan

None to the head. The title, meta and H1 are as approved in the page plan.

## Markers outstanding

None. Seven `[VERIFY]` tokens shipped live in the baked HTML on 13 September
and were resolved on 15 September against primary sources. Four were narrowed
to what the source actually says rather than confirmed:

- asbestos: "before 1990" and the HealthyWA product list, not "late 1980s" and
  "tile beds";
- Building Act 2011 (WA) s37(2): the obligation sits with the owner;
- plumbing: the exemption is clearing a blocked fixture or waste pipe with a
  plunger, at your own home;
- slip resistance: a question to ask, not a stated rule.

## Operator notes

- Keep the drummy tile diagram general. No adhesive coverage figures on it.

## Decisions locked on this page

- No cost figures on this page. Every price on the site lives on the cost
  guide. See `build/03-plan.md` cannibalisation map.
- No waterproofing detail beyond one pointer to the bathroom page.
