# Privacy: /privacy

Status: APPROVED | 16 September 2026, commit 7e5911b

## Head

| field | value |
|---|---|
| file | privacy.html |
| title | Privacy Policy \| Perth Tiling Specialists |
| meta | What Perth Tiling Specialists collects when you make an enquiry or call, who your details go to, how long they are kept, and how to have them removed. |
| h1 | Privacy Policy |

## Blocks

**The draft for this page no longer exists**, for the reason in
`build/04-copy/index.md`. `config.js` `pages.privacy.blocks` is the record.

Structure as shipped, following the settled portfolio structure: who this
covers, what we collect, why, who we share it with, how long, where it is
stored, cookies, access and deletion, complaints, changes. Dated 15 September
2026.

## Changes from plan

**The title and meta were never in the page plan.** They were written during
drafting and are live without approval. Open item.

**This page shipped twice.** The first version, live from 13 September, was
written to Australian Privacy Principles standard rather than to the settled
portfolio position, because the drafting session worked from a one-line
summary of the position in a handover instead of the position itself, and
re-derived it. It carried seven new operator TODOs. On 16 September it was
rewritten on the settled structure, on Brad's instruction.

That is the failure PLAYBOOK.md Appendix A exists to prevent: rules are stated
once, in full, and referenced by ID. Never summarised into an artefact.

Where Canberra's wording did not match Perth's actual setup, the Perth fact
won:

- the form has no email field, so email is not listed as collected;
- Perth has one tracking number and the status webhook logs caller number,
  time and duration only, so "which page you called from" is not claimed;
- the greeting is not claimed to tell callers the message is recorded, because
  this site's greeting could not be checked;
- Resend, GitHub Pages and Google Analytics are named as processors.

## Markers outstanding

None in the copy. `[DATE]` was resolved to 15 September 2026 on 16 September.

## Operator notes

Live as `/* TODO (Brad) */` comments in `config.js`:

- The greeting should tell callers the message is recorded and passed to a
  tiler, before the tone. Once it does, a sentence can be added here.
- Confirm which regions the Supabase project and the Cloudflare account
  actually store data in, and name them. Vague is worse than specific.
- "Your job is not sent to multiple businesses" is a commitment about how the
  model runs. If the model ever becomes multi-renter with shared leads, this
  line has to change before the practice does.

## Decisions locked on this page

- The privacy position is settled portfolio-wide. PLAYBOOK.md Appendix A, R3.
  Do not re-derive it, and do not reopen it because another file summarises
  it.
- Calls are not answered live. They go to voicemail, the number and time are
  logged either way, the message is recorded and stored, nothing is
  transcribed, and recordings are deleted after 12 months. Keep this paragraph
  in step with what the backend actually does, not with what a draft assumed.
- Retention describes what the pruning job actually deletes: the audio files
  and email attachments, not the lead and call rows.
