# SILO — Handoff / Re-entry Doc

**Version at handoff:** v0.40 · Sep 18 2026 · Written Sep 19 2026

---

## 1 · What this is

SILO is a consensual ARG (alternate reality game) Mot built for his coworker **Joe** (Wadsworth, OH). On the surface it is a crop-circle tracking and research app. Underneath is a hidden conspiracy storyline that unravels through breadcrumbs, a sealed annex, withdrawn dossiers, and a cell tower near Joe's house. Joe knows Mot built "an app" and is playing it at face value; he does **not** know about the buried story and has not caught it yet. That is by design.

- **Deployed:** flat GitHub Pages repo `motbuchanan/silo`, public, Mot's own account.
- **Joe's URL:** `motbuchanan.github.io/silo/` (index.html)
- **Authoritative files:** the deploy files ARE the source of truth. Working copy lives at `/home/claude/silo/repo/`. Mot uploads from his phone to the repo.
- **Backend:** Firebase project `silo-7d50e`, Firestore, **no auth** (open rules). Live and proven.

**As of Sep 18–19:** the project **pivoted to face value.** Joe repeatedly could not navigate the ARG interface ("what is this even supposed to be?"), so v0.39–0.40 rebuilt the front end as a straightforward crop-circle research app (photo gallery, PHOTOS/VIDEOS/READ MORE buttons, a THEORIES & RESEARCH section). The hidden story is all still in place underneath, dormant, to see if Joe ever stumbles onto it.

---

## 2 · Current state

**v0.40 · Sep 18** is the live/latest version. All three version strings synced: `index.html` (v0.40 · Sep 18), `gpi.html` (ops v0.40 · Sep 18), `sw.js` (silo-v0.40).

**Shipped in the pivot (v0.39 → v0.40):**
- Header tagline → "CROP CIRCLE TRACKER". MANUAL button → HELP with plain-English text.
- Full registry → **2-column photo gallery**, newest first, each cell a satellite tile thumbnail. Search placeholder "SEARCH BY NAME, PLACE, OR YEAR…". Gallery open by default.
- Every record's detail sheet leads with **big action buttons**: PHOTOS (Google Images), VIDEOS (YouTube), READ MORE (Wikipedia if the record has a `wiki` field, else Google), GOOGLE EARTH, DIRECTIONS, SHOW ON MAP.
- New collapsible **THEORIES & RESEARCH** section: 12 curated topic cards (Mowing-Devil 1678, Doug & Dave, ley lines/Wiltshire, Milk Hill 2001, Chilbolton reply, Crabwood 2002, plasma vortex/Meaden, BLT/Levengood, Rendlesham 1980, Hessdalen, Tully 1966, Circlemakers), each with a Wikipedia thumbnail + VIDEOS/READ MORE.
- v0.40 added a **prominent COORDINATES block** on every record (large mono numbers + full-width COPY COORDINATES button) after Joe said he couldn't find the lat/long. The planted Wadsworth record now says plainly "No photos of this one exist anywhere yet… the coordinates above are all there is."
- Card kickers reworded to "NEW CROP CIRCLE REPORTED".

**Verified (headless Playwright, routed stubs):** 59 gallery cells render with tile thumbs, PHOTOS/VIDEOS/READ MORE hrefs correct on VAD-0001 and VAD-0119, coords block + COPY works (toast "COPIED: 41.0050, -81.7350"), THEORIES toggle renders 12 cards with Wikipedia thumbnails, manual opens/closes, no horizontal scroll at 390px, zero page errors. Gates green: `node --check`, 0 Jekyll tokens, no JS-in-`<style>`, no `inset:`/flex `gap:`.

**Untested on Joe's actual device:** the v0.40 coordinates block and the "no photos exist" copy. Joe was last seen on v0.39.

**Joe's real progress (from the gpi.html LOG tab, device `SNGK9EP`):**
- First-ever dossier reads happened Sep 18: he opened VAD-0103 and VAD-0105 via the LINKED FILES buttons. Eight days in, the big buttons finally got him there.
- Has read the annex (AX-K) four times, opened the tower record (VAD-0117 RELAY NODE) and tapped PHOTOS on it.
- Texted Mot: cool pictures come up, but can't find the Wadsworth circle or its lat/long → drove v0.40.
- **Sep 18–19: Joe got the app icon onto his home screen** (PWA install). This solves the recurring lost-link problem that was actually killing the project — he kept uninstalling and losing the texted link. He now has a permanent door.
- Has NOT mentioned the annex, tower, dossiers, or CHAFF to Mot. Story still uncaught.

---

## 3 · Locked decisions (do not reopen)

- **Face-value surface is the direction.** Joe cannot handle the ARG framing. Do not re-propose mystery-forward UI, cryptic cards, or puzzle-on-the-card mechanics — they went over his head repeatedly. Story stays hidden underneath; only surfaces if Joe digs.
- **No Firebase auth.** `signInAnonymously` hung intermittently on Joe's/Mot's phones. Auth was stripped entirely in v0.20. Rules are open (`read,write: if true`) on log/alerts/tasks/suggestions/config. This is accepted for a prank app. Do not re-add auth.
- **Em dashes are kept** in the app's in-fiction institutional voice — exempt from Mot's normal em-dash ban because it's diegetic.
- **Old-Android CSS constraints are hard rules:** no `inset:` shorthand, no flex `gap:` (both break Joe's old Chrome — the manual overlay once fell into page flow as an unclosable block). Use top/left/right/bottom and margins. Avoid modern JS syntax (optional chaining etc.).
- **Search URLs, never hotlinks, for external references** — they never 404 and dodge copyright. Planted records deliberately show "NOTHING PUBLISHED YET" instead, which is the intended tell.
- **QR base URL is hardcoded** `motbuchanan.github.io/silo/` — if the repo is ever renamed, every printed QR code must be regenerated.
- **Console codes:** director `SCYTHE-19` (grants ★, ident BOSS), agent `FURROW-77` (CHAFF), decoy `WINNOW-6` (opens the 4-tab annex exhibit). These are djb2-hashed in source except in doc-6114.html (which is NOT in the current repo — see file map).
- **Device tagging:** Joe = `SNGK9EP` (pinned as `JOE_PINNED` in gpi.html). Mot's own devices are hidden from the log via the MY DEVICES list / HIDE MINE toggle. Codes in the tracker search box: `IAMBOSS`/`IGNORE` tag a device as Mot's, `IAMJOE` tags as Joe, triple-tap the version badge opens the device panel.

**Rejected/superseded, do not revive:**
- The oblique drop kit (coded-coordinate receipts, misfiled printer page) — too cryptic for Joe. QR-drops.pdf (plain "SCAN TO VIEW" card) superseded it.
- The birthday drop card — built (bday-drop.pdf) but never dropped; birthday has passed.
- Home-screen shortcut declared impossible — WRONG, Joe installed the PWA himself Sep 18. Assumption retired.

---

## 4 · Open items

No blocking item. The project is in a healthy "let it breathe" state. Ordered next steps when Mot wants to move:

1. **Sit on new code for a few days.** Joe just got stable (icon installed, using it at face value). Pushing a new *version* right now risks a version mismatch while he's finally comfortable. Let him use v0.40.
2. **Story beats go through Firestore, not code.** New sightings, notices, and FILE CARDs (annex/dossier/tower deliveries) push live from the gpi.html ALERT tab and reach Joe's installed icon over the network regardless of cache. That's the channel to use.
3. **Watch the log for `copy_coords` / `act_dir` on VAD-0119** — tells whether Joe grabbed the Wadsworth coordinates or drove out.
4. **Chapter 2 is staged but not triggered:** VAD-0103 dossier (Newark Octagon Earthworks / Nov 25 2026 lunar alignment) is readable; the DR-3 "record withdrawn" QR card (ch2-drop.pdf) is meant to be placed only after the log shows Joe found 0103 on his own. He has now read 0103, so this card is unlocked when Mot wants.
5. **Real-world to-dos still open:** pin the texted link in Joe's messages app (partly moot now that he has the icon); the reprinted DR-1 bench card is optional now.

---

## 5 · Gotchas (bugs that cost time + their root causes)

- **The "stale version" saga was mostly NOT a cache bug.** v0.12: gpi.html had been stuck showing an old version because the version-bump regex only touched index.html + sw.js, never gpi.html's string. Mot was sent on cache-clear chases for a non-cache problem. **Fix / standing gate: bump ALL THREE version strings together and verify each file prints the same version before shipping.** The version badge is Mot's load-confirmation mechanism.
- **Firebase double-init left `db` null** (v0.15): multiple `initializeApp()` calls threw "app already exists" into an empty catch, so a watcher called `db.collection` on null. Fix: guard every init with `if(!firebase.apps.length)`.
- **onSnapshot race** (v0.11): Firestore fired before `sightings.json` loaded, so only pushed test records showed. Fix: `STATIC_READY`/`PENDING_LIVE` gate; static always wins first paint.
- **`q()` name collision** (v0.11): the URL-encoder `q()` collided with the `var q` log array; hoisting broke logging + search after the first event. Fix: encoder renamed `urlq()`.
- **PULL BACK needed `_doc`** which only exists after a snapshot round-trip; locally-rendered pushes had none. Fix: delete by `(a._doc || a.id)` — and since push writes `.doc(ref).set()`, the doc id IS the ref.
- **Stale localStorage ghosts** (the "Stark"/"TEST" records that survived everything): old queued records reloaded on init. Fix: `watchAlerts()` clears `gpi_alerts` on connect so Firestore is the sole source of truth.
- **JS inserted into `<style>`** (v0.36): anchoring a patch on the comment `/* field manual */`, which exists in BOTH the CSS and the JS, put script inside the style block and silently broke all later CSS. **Standing gate: after any patch, check for `getElementById`/`addEventListener` inside the `<style>` block.**
- **Data-URI/word-collision in string replace:** a `.replace('QR', …)` once hit the literal word "QR" in a note. Anchor replacements on unique strings and assert occurrence counts before replacing (the pivot script uses `assert i.count(old)==1`).
- **Service worker is already correct** — `skipWaiting()` in install, `clients.claim()` in activate, network-first fetch. Installed devices pick up new versions on next online navigation. The residual risk is only offline or a browser that hasn't re-checked sw.js yet; network-first keeps HTML fresh regardless. Do NOT "fix" this into cache-first.

**Validation gates (run before every ship):** extract inline JS → `node --check`; assert 0 Jekyll tokens (`{{`, `{%`) and 0 unescaped `</script`; check no JS in `<style>`; no `inset:`/flex `gap:`; all three version strings bumped and equal; Playwright headless smoke with routed stubs for cdnjs (Leaflet — serve the REAL leaflet.js from npm, a thin stub breaks `map.attributionControl`), gstatic (fake firebase), arcgisonline (fake tile PNG), Wikipedia API. Chromium at `/opt/pw-browsers/chromium`.

---

## 6 · File map

Working dir: `/home/claude/silo/repo/` — deployed copies + zip go to `/mnt/user-data/outputs/`.

| File | Role |
|---|---|
| `index.html` | Joe's tracker (v0.40). Firebase config baked in. |
| `gpi.html` | Ops console (v0.40). Director/agent/decoy codes; ALERT push (sighting/notice/file card); LOG tab with device tagging, Joe pinned, HIDE MINE. |
| `sightings.json` | 59 records. VAD-0117 RELAY NODE at 41.0265,-81.7365; VAD-0119 (planted Wadsworth) at 41.005,-81.735; 13 records carry a `wiki` field. |
| `rec.html` | Withdrawn dossiers, base64-encoded (`atob`). Holds 7 incl. VAD-0103 (Township Line / Nov 25 2026 window) and VAD-0117 (relay node). `?id=VAD-XXXX`. |
| `ax-k.html` | Sealed Annex K (CHAFF messages, breadcrumbs to 0103/0105). |
| `sw.js` | Shared service worker, cache `silo-v0.40`. Network-first. |
| `silo.webmanifest` | PWA manifest. |
| `.nojekyll` | Stops GitHub Pages Jekyll processing. |

**Constants to know for patching:** `WITHDRAWN = ["VAD-0102","VAD-0103","VAD-0105","VAD-0108","VAD-0112","VAD-0114","VAD-0117"]`; `UNDOCUMENTED = ["VAD-0119","VAD-0117"]`; `HERE_ID="VAD-0119"` (anchor card); `JOE_PINNED="SNGK9EP"`. localStorage keys: `silo_sid` (device id, shared with ax-k/rec), `silo_q` (event queue with per-event sent flags), `silo_role`, `silo_hidemine`, `silo_mine_ids`.

**NOT in the current repo (off-repo deliverables in outputs / earlier):** `doc-6114.html` (agent briefing, holds codes in plaintext — was in the repo earlier; confirm whether it should be re-added or kept out), `CHAPTER-2.md`, `silo-playbook.md`, drop-kit PDFs (qr-drops.pdf, ch2-drop.pdf, bday-drop.pdf), `firestore-rules.txt`, `DROP-KIT-GUIDE.md`, `QR-DROPS-GUIDE.md`.

---

## 7 · People

- **Joe** — coworker in Wadsworth OH. The player. Takes things at face value; low patience for complex interfaces; old Android phone. Device `SNGK9EP`. Does not know about the hidden story.
- **The agent (CHAFF)** — a shared friend of Mot and Joe who lives near Joe and agreed to play an in-fiction SILO insider and handle physical drops. Accepted, happy, wants more. Callsign CHAFF, code FURROW-77.
- **Mot** — director/author. Code SCYTHE-19. Plays a puzzled fellow-traveler to Joe (the URL has Mot's name, so no pretense he didn't make it).

---

## 8 · Re-entry instructions (literal first actions for next session)

1. Fetch the live files to compare against this working copy before patching anything:
   - `https://motbuchanan.github.io/silo/index.html`
   - `https://motbuchanan.github.io/silo/gpi.html`
   - `https://motbuchanan.github.io/silo/sw.js`
   Confirm the footer/badge version. If the live version is newer than v0.40, the live copy is authoritative — reconcile, don't overwrite blind.
2. Working copy is `/home/claude/silo/repo/`. Read this doc's Locked Decisions before proposing anything.
3. To change a story beat, prefer a Firestore push from gpi.html over a code change (reaches Joe's installed icon over the network; no upload, no version risk).
4. If code must change: patch the deploy file directly, bump all three version strings to the real current date, run every validation gate in section 5, smoke-test headless, then copy changed files + a new `silo-vX.zip` to `/mnt/user-data/outputs/` and send via file cards.
5. Check Joe's activity via the gpi.html LOG tab (device `SNGK9EP`, `JOE_PINNED`). New log event types since the pivot: `gallery_open`, `act_photos`/`act_videos`/`act_read`/`act_earth`/`act_dir`, `copy_coords`, `theories_open`, `topic_video`/`topic_read`.
