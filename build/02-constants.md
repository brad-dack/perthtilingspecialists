# 02 Constants

Status: FROZEN | reconstructed 18 September 2026 from the live site and config.js

Written by T07 to T16. Read by T12, T16, T21, T25 and T27. See PLAYBOOK.md.

**Reconstruction note.** This build ran before the procedure existed. Nothing
here is a plan: every row records what is actually live, checked against
`config.js`, DNS and the deployed site on 18 September 2026. Three rows record
provenance instead of a value because the Supabase row could not be read in the
session that wrote this file. Each of those has an open item in
`build/05-log.md` naming the check that closes it.

## Identity

| field | value |
|---|---|
| brand | Perth Tiling Specialists |
| domain | https://perthtilingspecialists.com.au |
| entity | Sole trader. Brad, trading as Perth Tiling Specialists |
| abn | 78 538 005 810 |
| published name | Brad, first name only, on About and Privacy |
| email | hello@perthtilingspecialists.com.au |
| phone e164 | +61895161688 |
| phone display | (08) 9516 1688 |

## Naming history

Reconstructed from the phase 2 session. Kept so no rejected name is
re-litigated: `tilingperth.com.au` was raised twice in one session and rejected
twice.

| name | domain | ASIC | ABN Lookup | registrar | auDA eligibility | verdict and reason |
|---|---|---|---|---|---|---|
| Tiling Perth | tilingperth.com.au | not available | Tiling of Perth Pty Ltd, ABN 61 606 937 991, active since 2015, GST registered | available | not relied on | Rejected. Dispute risk against an active trading entity with a near-identical name |
| Perth Tile Layers | perthtilelayers.com.au | clean | clean | available | ok | Rejected. "Tile layers" does not match search behaviour. The second reason given at the time, that it skews toward installation, rested on a thesis the next session reversed |
| Perth Tiling Specialists | perthtilingspecialists.com.au | clean | clean | available | ok | **Chosen.** Clean on both checks, matches the head term |

A remembered rule against the word "specialist" was searched for in both
playbooks and the compliance flags file. It does not exist for this portfolio.
Do not raise it again.

## Infrastructure

| field | value |
|---|---|
| registrar | GoDaddy |
| hosting | GitHub Pages, from brad-dack/perthtilingspecialists, branch main |
| dns provider | Cloudflare |
| proxy status | DNS-only |
| workers_dev | n/a, this is a GitHub Pages build |
| dns verified | 18 September 2026. NS damon.ns.cloudflare.com and gemma.ns.cloudflare.com; apex A 185.199.110.153; www 301s to the apex |
| ga4 measurement id | G-WVV41F95JK |
| ga4 property id | 553777970 |
| turnstile site key | 0x4AAAAAAEHD1tLftcrbDXIx |
| turnstile hostname added | Y. Proved by a successful test submission on 16 September 2026, which a missing hostname would have rejected |
| supabase site_id | Row exists, slug perth-tiling-specialists, project bnfgnglzswtrvzfqkgjh. UUID not read in this session, see open items |
| ingest url | https://bnfgnglzswtrvzfqkgjh.functions.supabase.co/ingest-form |
| ingest secret location | sites.ingest_secret on the perth-tiling-specialists row. The same value sits in config.js by design: the function matches it to a site and Turnstile is the spam gate |
| inbound email | hello@perthtilingspecialists.com.au, Cloudflare Email Routing to the rank-and-rent-email-ingest Worker. Reported set, not read from the row, see open items |
| forward from email | Reported set after Resend domain verification, not read from the row, see open items |
| storage regions | Not determined. The privacy page names Supabase, Cloudflare, Twilio, Resend, GitHub Pages and Google as processors and says each may store data outside Australia, without naming a region. See open items |
| retention rule | prune-storage runs monthly and deletes voicemail audio and email attachments older than 12 months. The leads and call_events rows are deliberately kept, because they are the invoicing evidence |

## Positioning

| field | value |
|---|---|
| level | 2 |
| voice rule | "We" for the business throughout. First person singular for Brad's own section on About. Naming the individual is allowed: the Level 2 "no named individual" constant was unfrozen on 12 September 2026 to match Canberra Tile Layers and Perth Limestone Group |
| renter signed | N |

Claim restriction list, in full:

- No claim that we do the work. The site takes enquiries and passes them on.
- No invented reviews, star ratings, photos of work, licence numbers, years in
  business or job counts.
- No response-time promise. "Expect a call within 24 hours" was template copy
  and was removed, because nothing backs it with no tiler attached.
- No pricing presented as ours. Published figures from named publisher types
  only, with the publisher type in reader copy and the business name kept to
  `build/03-plan.md`.
- No "free quote". This site does not quote, and no draft says the tiler's
  quote is free.
- Commercial disclosure on About: the tiler pays, we do not take a cut.
- `schema.type` stays `Organization`. No premises, no hours, no reviews.

## Privacy position

Standing portfolio position: **PLAYBOOK.md Appendix A, R3.** Not reopened.

Do not summarise R3 into this file. On this build a drafting session worked
from a one-line summary in a handover, re-derived the position from scratch,
and shipped a privacy page written to a different standard. It was rewritten on
the settled structure three days later, in commit 7e5911b.

## Collection notices

T12. Both channels carry the same notice. See PLAYBOOK.md rule R4.

**Form notice** (`contact.reassurance`, rendered above every form on the site):

No spam and no obligation. Your details go to a local tiler so they can quote your job - the contractor pays for the enquiry, you do not. We never sell your details or add you to a marketing list. [How we handle your information](privacy.html).

**Voicemail greeting** (`sites.greeting_text`, and the MP3 at
`sites.greeting_audio_url`). The wording below is what migration 018 inserts:

Hi, thanks for calling Perth Tiling Specialists. Leave your name, suburb and job details after the tone. We pass enquiries to a tiler who can quote the job.

**This greeting does not carry the whole notice.** It says enquiries are passed
to a tiler, but not that the tiler pays for the enquiry, which R4 requires on
both channels, and not that the message is recorded, which the privacy page
would otherwise state. The phone channel is therefore half implemented. Open
item, `build/05-log.md`.

| field | value |
|---|---|
| mp3 recorded | Y |
| greeting_audio_url set | Y |
| greeting_text set | Y. The column is NOT NULL, so any row has one. Whether the stored wording matches the text above was not read in this session |
| greeting heard on a real call | Not done. See open items |

## Search Console

| field | value |
|---|---|
| property verified | Y |
| method | DNS TXT. google-site-verification=eKQSjST5WVjBXDk5oIFiogqITVKCGZ-VOppnax_Eic4, confirmed present 18 September 2026 |
| date | Not determined. The property was described as newly verified on 17 September 2026, and Google had already crawled About on 15 September |
| gsc_site_url set on the site row | N. Reported empty on 17 September 2026. See open items |
