# SILO — Handoff / Re-entry Doc

**Version at handoff:** v0.42 · Sep 21 2026 · Written Sep 21 2026

---

## 1 · What this is

SILO is a consensual ARG (alternate reality game) Mot built for his coworker **Joe** (Wadsworth, OH). On the surface it is a crop-circle tracking and research app. Underneath is a hidden conspiracy storyline that unravels through breadcrumbs, a sealed annex, withdrawn dossiers, and a cell tower near Joe's house. Joe knows Mot built "an app" and is playing it at face value; he does **not** know about the buried story and has not caught it yet. That is by design.

- **Deployed:** flat GitHub Pages repo `motbuchanan/silo`, public, Mot's own account.
- **Joe's URL:** `motbuchanan.github.io/silo/` (index.html)
- **Authoritative files:** the deploy files ARE the source of truth. Working copy lives at `/home/claude/silo/repo/`. Mot uploads from his phone to the repo.
- **Backend:** Firebase project `silo-7d50e`, Firestore, **no auth** (open rules). Live and proven.

**As of Sep 18–20:** the project **pivoted to face value.** Joe repeatedly could not navigate the ARG interface ("what is this even supposed to be?"), so v0.39–0.40 rebuilt the front end as a straightforward crop-circle research app (photo gallery, PHOTOS/VIDEOS/READ MORE buttons, a THEORIES & RESEARCH section). The hidden story is all still in place underneath, dormant, to see if Joe ever stumbles onto it. The pivot is working: Joe installed the app icon, uses it daily, and by Sep 20 was researching the Ohio-earthworks thread on his own (Serpent Mound photos, then googling crop-circle-AI conspiracy material) and texting Mot about it. **Story content now ships as episodic pushes/file uploads that read as "the feed updating," never as Mot.**

---

## 2 · Current state

**v0.42 · Sep 21** is the latest version (built Sep 21; may not be uploaded/live yet, verify the live badge after upload). All three version strings synced: `index.html` (v0.42 · Sep 21), `gpi.html` (ops v0.42 · Sep 21), `sw.js` (silo-v0.42). **v0.41 was confirmed byte-identical to the live `main` branch at the start of the v0.42 session** (fetched from the raw GitHub mirror; the `motbuchanan.github.io` Pages host is not reachable from the build sandbox, so the raw mirror is the reconciliation source). Joe was on v0.39 as of his last logged session.

**v0.42 · Sep 21 (the Report-a-Sighting loop, open-ended play):**
- **Joe's app:** a face-value `＋ REPORT A SIGHTING` button below the stream opens an intake form (what/where/when/details). On submit it writes a `t:"report"` event into the **existing open `log` collection** (no new Firestore rule, no upload needed), shows a confirmation with a reference number (`INTAKE-YYMMDD-XXXX`), and keeps a local `YOUR REPORTS` list (`silo_reports`) that reads `UNDER REVIEW`. Always confirms to Joe even offline (queued in `silo_q`).
- **Ops console:** new **INTAKE tab** (DROPS · LOG · INTAKE · ALERT · IDEAS) that surfaces `t:"report"` events. Each has **PROMOTE → ALERT** (prefills the push form: name, region, date, notes; leaves coords + REF blank for Mot; marks the intake `promoted:true`) and **DISMISS** (deletes the log doc). `report` events are filtered out of the discovery LOG view. `watchLog` now captures `_doc` (the Firestore doc id) so promote/dismiss can target the row.
- **The loop:** Joe submits → appears in INTAKE → Mot promotes it a week later → it reappears in Joe's registry as a logged intake ("the system answered him"). This is the low-maintenance engine for open-ended play: Joe feeds it, Mot reacts. Mode is now **open-ended, no finale** (Mot's call Sep 21): update from time to time to keep him happy; the Nov 25 Octagon thread is one live optional payoff, not a climax.
- New log event types to watch: `report` (a submission), `report_open` (opened the form), `report_submit` (submitted). All from Joe's device `SNGK9EP`.
- Verified: 21/21 headless Playwright checks (stubbed Firestore so nothing touched Joe's real log) covering submit → log write → confirmation → INTAKE render → PROMOTE prefill → promoted flag → DISMISS delete. Gates green (node --check, 0 Jekyll, balanced `</script>`, no JS-in-style, no new `inset:`/flex `gap:`, three versions equal).

**Shipped in the pivot (v0.39 → v0.41):**
- Header tagline → "CROP CIRCLE TRACKER". MANUAL button → HELP with plain-English text.
- Full registry → **2-column photo gallery**, newest first, each cell a satellite tile thumbnail. Search placeholder "SEARCH BY NAME, PLACE, OR YEAR…". Gallery open by default.
- Every record's detail sheet leads with **big action buttons**: PHOTOS (Google Images), VIDEOS (YouTube), READ MORE (Wikipedia if the record has a `wiki` field, else Google), GOOGLE EARTH, DIRECTIONS, SHOW ON MAP.
- Collapsible **THEORIES & RESEARCH** section, now **14** topic cards. v0.41 added two at the top aimed at Joe's current thread: THE OHIO EARTHWORKS (Hopewell Ceremonial Earthworks / UNESCO 2023) and THE MOON AND THE OCTAGON (Newark Octagon lunar standstill, window closing late 2026). Others: Mowing-Devil 1678, Doug & Dave, ley lines/Wiltshire, Milk Hill 2001, Chilbolton reply, Crabwood 2002, plasma vortex/Meaden, BLT/Levengood, Rendlesham 1980, Hessdalen, Tully 1966, Circlemakers.
- v0.40 added a **prominent COORDINATES block** on every record (large mono numbers + full-width COPY COORDINATES button, execCommand fallback for old Chrome, logs `copy_coords`). The planted Wadsworth record says plainly "No photos of this one exist anywhere yet… the coordinates above are all there is."
- **v0.41 story beat (the Ohio cluster), shipped as static content in `sightings.json` — no console push needed:**
  - New record **VAD-0136 "OCTAGON APPROACH"** (Licking County, Sep 19, UNVERIFIED, in `UNDOCUMENTED` so it shows "no photos exist yet"). Its notes carry tappable refs + LINKED FILES buttons to VAD-0060 (Serpent Mound), VAD-0103 (withdrawn dossier), VAD-0119 (Wadsworth).
  - New notice **`SYS-260920-0700` "PATTERN REVIEW · OHIO CLUSTER"** — reads as an automated cross-check flagging four Ohio records on earthwork sight lines; references VAD-0103.
- **Engine change (v0.41):** static records with `kind:"notice"` or `kind:"file"` now route into the notice/file streams (previously only live-pushed records did). This is why a story beat can now ship as a plain `sightings.json` edit + file upload, not only a Firestore push.
- Card kickers reworded to "NEW CROP CIRCLE REPORTED".

**Verified (headless Playwright, routed stubs):** 60 gallery cells, stream shows the two new cards in order (SYSTEM NOTICE → OCTAGON APPROACH → NEAR YOU anchor), bell shows 3 unread, VAD-0136 links resolve to 0060/0103/0119, VAD-0136 shows "no photos exist yet", 14 topic cards with thumbnails, coords COPY works, zero page errors. Gates green: `node --check`, 0 Jekyll tokens, no JS-in-`<style>`, no `inset:`/flex `gap:`, all three versions equal.

**Untested on Joe's device:** everything from v0.40 on (coords block, the Ohio cluster). Joe was last logged on v0.39.

**Joe's real progress (from the gpi.html LOG tab, device `SNGK9EP`, ~101 events):**
- **Sep 18: first-ever dossier reads** — opened VAD-0103 and VAD-0105 via the LINKED FILES buttons (eight days in; the big buttons finally got him there). Has read the annex (AX-K) four times.
- **Sep 18–19: installed the app icon** on his home screen (PWA install). Solves the lost-link problem that was actually killing the project. Permanent door now.
- **Sep 19–20: on the Ohio-earthworks thread on his own** — opened VAD-0060 Serpent Mound, tapped PHOTOS on it twice across two sessions, then (Sun ~10:55am) had a Google AI result open about an "AI detecting escalating intelligence in crop circles / DeepMind" creepypasta, which he'd searched himself (that framing is NOT from SILO). Texted Mot the debunk screenshot. This is what v0.41's Ohio cluster is built to feed.
- No `copy_coords` yet → probably still on v0.39.
- Has NOT mentioned the annex, tower, dossiers, or CHAFF to Mot. Story still uncaught (as intended).

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

No blocking item. Ordered next steps when Mot wants to move:

1. **Upload v0.41** (index.html, sightings.json, gpi.html, sw.js — or the zip). This is the one immediate to-do: the Ohio cluster is built but not yet confirmed live. After upload, verify the footer badge reads v0.41.
2. **Then watch the log for the follow-through** on the cluster: `gallery_open`/`view VAD-0136`, `link_btn VAD-0060`, and especially **`rec_open VAD-0103`** (him following the drawn line into the Chapter-2 dossier). Also `copy_coords`/`act_dir` on VAD-0119 or VAD-0136 (grabbing coordinates / driving out).
3. **Two channels for story beats now, both reach the installed icon:** (a) live Firestore push from the gpi.html ALERT tab (sighting / SYSTEM NOTICE / FILE CARD), instant, no upload; (b) a static edit to `sightings.json` (records, or `kind:"notice"`/`kind:"file"` entries) shipped as a file upload — reads as "the feed updating." v0.41's cluster used (b). Prefer (a) for one-off timely beats, (b) for permanent additions.
4. **Chapter 2 is staged and now actively seeded:** VAD-0103 dossier (Newark Octagon Earthworks / Nov 25 2026 lunar alignment) is readable and the v0.41 cluster points straight at it. The DR-3 "record withdrawn" QR card (ch2-drop.pdf) can be placed by the agent once the log shows Joe reached 0103 through the app.
5. **Pacing:** one beat every 2–3 weeks; dead time is the mechanism. Don't stack beats on top of the fresh cluster.
6. **Real-world to-dos:** the reprinted DR-1 bench card and pinning the texted link are both moot now that Joe has the icon.

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
- **`gpi.html` resets `db` to null right after a session-restore (v0.42 finding).** The session-restore IIFE runs `enter() → initData()` (which assigns `db`) *before* the `var db=null;` line executes, so `var db=null` then clobbers it. The onSnapshot listeners registered during that brief window keep firing (they hold their own collection ref), but any later access through the module `db` var is null until `ensureDb()` re-establishes it. This is why every write path (the ALERT push, and now PROMOTE/DISMISS in the INTAKE tab) must call `ensureDb()` rather than touching `db` directly. Do not "simplify" those back to raw `db`. Fresh login (via the form) does not hit this; only the restored-session path does.

**Validation gates (run before every ship):** extract inline JS → `node --check`; assert 0 Jekyll tokens (`{{`, `{%`) and 0 unescaped `</script`; check no JS in `<style>`; no `inset:`/flex `gap:`; all three version strings bumped and equal; Playwright headless smoke with routed stubs for cdnjs (Leaflet — serve the REAL leaflet.js from npm, a thin stub breaks `map.attributionControl`), gstatic (fake firebase), arcgisonline (fake tile PNG), Wikipedia API. Chromium at `/opt/pw-browsers/chromium`.

---

## 6 · File map

Working dir: `/home/claude/silo/repo/` — deployed copies + zip go to `/mnt/user-data/outputs/`.

| File | Role |
|---|---|
| `index.html` | Joe's tracker (v0.42). Firebase config baked in. Report-a-Sighting button + intake form write `t:"report"` to the log collection. |
| `gpi.html` | Ops console (v0.42). Director/agent/decoy codes; ALERT push (sighting/notice/file card); LOG tab with device tagging, Joe pinned, HIDE MINE; **INTAKE tab** (promote/dismiss submissions). |
| `sightings.json` | 61 entries = 59 formation records + 1 planted record (VAD-0136) + 1 static notice (`SYS-260920-0700`, `kind:"notice"`). VAD-0117 RELAY NODE at 41.0265,-81.7365; VAD-0119 (planted Wadsworth) at 41.005,-81.735; VAD-0136 (planted, Licking Co) at 40.061,-82.478; 13+ records carry a `wiki` field. |
| `rec.html` | Withdrawn dossiers, base64-encoded (`atob`). Holds 7 incl. VAD-0103 (Township Line / Nov 25 2026 window) and VAD-0117 (relay node). `?id=VAD-XXXX`. |
| `ax-k.html` | Sealed Annex K (CHAFF messages, breadcrumbs to 0103/0105). |
| `sw.js` | Shared service worker, cache `silo-v0.42`. Network-first. |
| `silo.webmanifest` | PWA manifest. |
| `.nojekyll` | Stops GitHub Pages Jekyll processing. |
| `SILO-HANDOFF.md`, `SILO-LESSONS-AND-METHOD.md`, `SILO-BEAT-BANK.md` | This doc + the lessons pass + the open-ended beat menu. In the working repo/zip; not deployed. |

**Constants to know for patching:** `WITHDRAWN = ["VAD-0102","VAD-0103","VAD-0105","VAD-0108","VAD-0112","VAD-0114","VAD-0117"]`; `UNDOCUMENTED = ["VAD-0119","VAD-0117","VAD-0136"]`; `HERE_ID="VAD-0119"` (anchor card); `JOE_PINNED="SNGK9EP"`. Static notice/file records are recognized by `kind:"notice"` / `kind:"file"` in `sightings.json` and routed in `rebuild()`. localStorage keys: `silo_sid` (device id, shared with ax-k/rec), `silo_q` (event queue with per-event sent flags), `silo_role`, `silo_hidemine`, `silo_mine_ids`, `silo_seen` (alert bell count).

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
   Confirm the footer/badge version. The working copy here is v0.42; if the live version is newer, the live copy is authoritative, reconcile, don't overwrite blind. (Also fetch `sightings.json` to compare record/notice state.) Note: the `motbuchanan.github.io` Pages host is not reachable from the build sandbox; use the raw GitHub mirror `https://raw.githubusercontent.com/motbuchanan/silo/main/<file>` to fetch live copies for comparison.
2. Working copy is `/home/claude/silo/repo/`. Read this doc's Locked Decisions before proposing anything.
3. To change a story beat, prefer a Firestore push from gpi.html over a code change (reaches Joe's installed icon over the network; no upload, no version risk).
4. If code must change: patch the deploy file directly, bump all three version strings to the real current date, run every validation gate in section 5, smoke-test headless, then copy changed files + a new `silo-vX.zip` to `/mnt/user-data/outputs/` and send via file cards.
5. Check Joe's activity via the gpi.html LOG tab (device `SNGK9EP`, `JOE_PINNED`). New log event types since the pivot: `gallery_open`, `act_photos`/`act_videos`/`act_read`/`act_earth`/`act_dir`, `copy_coords`, `theories_open`, `topic_video`/`topic_read`.
