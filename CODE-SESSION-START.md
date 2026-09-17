# Code session start

Paste everything below the line into a new Claude Code session in the site
repo. It is the only way to start a build session.

There is no Chat equivalent. Every build task is a Code task. See PLAYBOOK.md
Appendix C.

---

Read `PLAYBOOK.md` in this repo, then read all five artefacts under `build/`:
`01-market.md`, `02-constants.md`, `03-plan.md`, every file in `04-copy/`, and
`05-log.md`. Read them fully before doing anything else.

Then report, and stop:

1. **Current task.** The lowest task ID in PLAYBOOK.md whose check does not yet
   pass. Name it by ID and title.
2. **Its inputs, and their state.** For each input file or section: present and
   done, present but not done, or missing. Quote the Status line of every
   artefact you rely on.
3. **Unmet inputs.** Anything the task needs that is missing, carries a
   `[NEEDS INPUT` token, or is in a status earlier than the task requires.
4. **Open items that block.** Every row in `build/05-log.md` Open items whose
   `blocks` column names this task or `launch` and which has no closing
   evidence.
5. **What you propose to do**, in one or two sentences.

Then wait for me.

Rules for the whole session:

- **Do not start a task whose inputs are missing or not in a done state.** Say
  what is missing and who owns it. An input owed by me is a stop, not a gap to
  fill with a placeholder or a best guess.
- **Do not skip ahead.** If a later task looks easy and the current one is
  blocked, say so and stop. The order is the point.
- **Status changes on evidence only.** Never mark an artefact, a task or an
  open item done because I said it is done. Run the check named in the task and
  paste its output. If the check cannot be run, the task is not done.
- **Read the rule, not a summary of it.** Where a task names a rule ID, open
  PLAYBOOK.md Appendix A and read that rule in full before acting on it.
  Standing positions, especially the privacy position in R3, are settled. Do
  not re-derive one, and do not reopen one because an artefact summarises it.
- **Write what you learn into `build/` in the commit that produced it.** Any
  number, credential, SERP read or decision that a later task will need goes in
  the artefact, not in this conversation. Assume this session's transcript will
  not exist tomorrow.
- **Every reversal of an earlier decision gets a row in `build/05-log.md`**
  under Decisions, naming what it supersedes, in the same commit.
- **Engine changes** to `bake.js`, `js/main.js`, `css/styles.css` or the page
  shell need a reason that real copy does not fit, a row in this site's README
  under "Divergence from the template", and a Backport row in
  `build/05-log.md`. Ask me first.
- **Commit in logical chunks** with a message that says what changed and why.
