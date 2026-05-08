
# Session Notes — 2026-05-09

## What shipped this session

| Commit | Change |
|---|---|
| 489bccb | fix: stats counters (rootMargin loosened) |
| f5fc2eb | fix: project card links (Deep Dive badges + GitHub URLs) |
| 37e7264 | content: remove AI-tell phrases (hero, About, Contact) |
| d649e5c | content: Anthropic certs added, GCP cert linked |
| 2fe967e | feat: Research section added above Experience |
| 85b2d98 | feat: contact form replaced with direct links |
| aa6357a | fix: POPPER + SalesWhiz case-study pages + CSS variable fixes |
| 1be40bf | feat: MRA case-study page |

## BACKLOG status

All P0s and P1s closed. All P2s closed. P3-12 closed (skipped — not relevant).
One P3 remaining: P3-11 (Lighthouse performance + a11y).

## Next session — start here

### Step 1: P3-11 Brief 1 — Accessibility contrast fix
Paste into Claude Code:

    Task: P3-11 partial — fix contrast ratio failure from Lighthouse.
    Apply portfolio-edit skill. Scope: style.css only.
    Find --text-secondary in the :root block.
    Change its value from #94a3b8 to #a8b8cc.
    One line change. Show diff.
    Commit as: fix: increase text-secondary contrast ratio to pass WCAG AA (#P3-11)

### Step 2: P3-11 Brief 2 — Font Awesome async load
Paste into Claude Code after Brief 1 is committed:

    Task: P3-11 partial — eliminate render-blocking Font Awesome.
    Apply portfolio-edit skill.
    Find the Font Awesome <link> tag in index.html <head>.
    Replace with async-load pattern:
      <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossorigin>
      <link rel="stylesheet" href="[COPY EXISTING FA URL EXACTLY]"
            media="print" onload="this.media='all'">
      <noscript><link rel="stylesheet" href="[COPY EXISTING FA URL EXACTLY]"></noscript>
    Apply identical change to projects/popper.html, projects/saleswhiz.html, projects/mra.html.
    Show diff of all four files.
    Commit as: perf: async-load Font Awesome to eliminate render-blocking (#P3-11)

### Step 3: Verify
Run Lighthouse in Chrome incognito on https://tanayanand12.github.io/
Target: Performance 85+, Accessibility 100.
Then: Close-Issue P3-11

## Known CSS variable names (confirmed correct)
- --accent-blue, --accent-purple
- --bg-color: #0a0a0a
- --bg-surface: #171717
- --border-color: rgba(255,255,255,0.1)
- --text-secondary: #94a3b8 (will become #a8b8cc after P3-11 Brief 1)
- Dark mode is :root default. Light mode via [data-theme="light"] on <html>.

## Case-study pages status
- projects/popper.html — live, verified rendering
- projects/saleswhiz.html — live, CSS variables fixed, full visual QA pending
- projects/mra.html — live, CSS variables fixed, full visual QA pending

## Longer horizon (not in BACKLOG yet)
- Add ATLAS, Seapeak, TUCCI case-study pages (Template A, same brief pattern as POPPER)
- Fill TODO placeholders in case-study pages once .docx files are located
- MRA paper planning (targeting EMNLP / AAAI / AMIA)
- BioMistral fine-tune on COMAP dataset
