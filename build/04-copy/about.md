# About: /about

Status: APPROVED | v2, Brad, 10 October 2026. v1 approved 15 September 2026, commit b12f05c

## Head

| field | value |
|---|---|
| file | about.html |
| title | About Perth Tiling Specialists \| How This Site Works |
| meta | What Perth Tiling Specialists is, the area we cover, what happens when you enquire, how the service is paid for, and how to get in touch. |
| h1 | About Perth Tiling Specialists |

## Blocks

**The draft for this page no longer exists**, for the reason in
`build/04-copy/index.md`. `config.js` `pages.about.blocks` is the record.

Structure as shipped: who runs this, what the business does, what we cover and
what we do not, what happens after you enquire, your details, how the service
is paid for, where we cover, contact, and the enquiry form at `#quote`.

Contact is a section on this page, not a page of its own.

## Edit, 10 October 2026

Brad removed the second paragraph under "Who runs this" ("What I do is
research..."), which described his research work, his main business in
regulatory compliance advice, and linked the cost guide, bathroom and floor
pages. Removed at his instruction. "Who runs this" is now one paragraph.

## Changes from plan

The page was restructured on 15 September, after it was live, to follow
Canberra's section order, and the long first-version passages were cut. The
ABN and the published name were added in the same commit, resolving the
`[SURNAME]` and `[ABN]` placeholders that had been live since 13 September.

Two Canberra lines were deliberately not carried across: that the quote is
free, and Canberra's conditional pre-renter wording.

## Markers outstanding

None. `[SURNAME]` and `[ABN]` were resolved on 15 September to "Brad, trading
as Perth Tiling Specialists. ABN 78 538 005 810."

## Operator notes

Live as `/* TODO (Brad) */` comments in `config.js`:

- Every sentence in "Who runs this" must be true of Brad specifically. If any
  of it is not, cut it rather than softening it. Nothing about years, volumes
  or numbers of clients.
- The renovation paragraph says renovations are usually builder-led, and that
  a renovation enquiry still goes to the tiler, who says if it is out of scope.
  It does not promise to turn the enquiry away, unlike Canberra. Decided by
  Brad, 5 October 2026.
- "Your details" is kept in step with the privacy page's "Why we collect it"
  and "Nobody else". The privacy page is the fuller disclosure, so this follows
  it. If either changes, change both.

## Decisions locked on this page

- Enquiry-flow wording stays in the present tense. Brad, 13 September 2026,
  reaffirmed 18 September 2026. See PLAYBOOK.md Appendix A, R11. It was raised
  at drafting time with four options including signing a trial renter first,
  and the decision was to leave the pages as written. Do not relitigate.
- The named individual is deliberate. The Level 2 "no named individual"
  constant was unfrozen on 12 September 2026 to match the rest of the
  portfolio.
- No "free quote" anywhere: this site does not quote.
