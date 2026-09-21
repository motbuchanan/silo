# SILO — Beat Bank (open-ended play)

**Made:** Sep 20 2026 · Mode: **OPEN-ENDED.** No finale. Joe pulls threads indefinitely; you feed him when you feel like it.

Companion to SILO-HANDOFF.md and SILO-LESSONS-AND-METHOD.md. This is a menu, not a plan. When you want to give Joe something, open this, grab one beat, ship it.

---

## How to run an open-ended game

- **Feed the thread he's already on.** Check the LOG tab first. Whatever he opened last is the thread. A beat that extends it lands; a beat off to the side gets ignored.
- **Let him pull, never push meaning.** The app updates. You stay the puzzled fellow-traveler who also uses it. You never explain a beat to him.
- **One beat every 2–3 weeks. Never stack.** Dead time is the mechanism. Silence makes the next update feel alive.
- **Two ship channels:**
  - **PUSH** (ops console ALERT tab): sighting / system notice / file card. Instant, no upload. Use for timely one-offs.
  - **JSON** (edit sightings.json, upload): records or notices that stay permanently. Use for anything that should still be there next month.
- **Believe the log.** If `copy_coords` or `act_dir` shows up, he's thinking about driving somewhere. That's your cue for a physical beat.

---

## The Report-a-Sighting loop — SHIPPED v0.42 · Sep 21

This is what makes "keep him happy over time" nearly free. The game no longer only moves when you push. The `＋ REPORT A SIGHTING` button (below the stream in Joe's app) does this:

1. Joe submits a sighting from his app (what, where, when, details).
2. It lands in the ops console **INTAKE tab** as a submission.
3. A week later you tap **PROMOTE → ALERT**, add coordinates + a REF, and push it back. It reappears in his registry as a logged intake.

Now Joe is a contributor, the system "answered" him, and your maintenance shrinks to reacting instead of inventing. **How to run it:** watch the INTAKE tab (and the log for `report_submit`). When Joe submits, let it sit a few days, then promote it. Don't promote instantly, the delay is what makes it feel like a real review queue. DISMISS anything you won't use.

---

## Beat bank

### Feed-reactivity (one PUSH, trivial) — the "it noticed me" hits
- **Pattern analysis notice.** A few days after he searches the AI/crop-circle angle again, a SYSTEM NOTICE about "automated cross-check" surfaces. You didn't connect it; the feed just caught up to his head. Highest bang for a single push.
- **Access delay.** A notice that survey access to the Ohio grid is "flagged for review / held." Free tension, implies something withheld.
- **Quiet record update.** Append one line or flip a status on a record he already opened, so revisiting is rewarded. Small JSON edit.

### New records that extend his thread (JSON or PUSH)
- **Another earthwork-adjacent intake.** He chose the Ohio cluster himself; give it one more node. Keeps his own thread warm.
- **A sighting near somewhere Joe knows.** Localize one to his hometown, a place he's traveled, anywhere with personal pull. You know his map better than I do; this slot is yours to fill.
- **A retraction.** Mark an old sighting reclassified or hoaxed. Paradoxically makes the un-retracted ones feel more real. Cheap JSON edit.

### Give him something to DO (code, medium lift)
- **REPORT A SIGHTING** — the keystone above.
- **"I WAS HERE."** A field-visit button on a record; logs the visit. Turns driving out to coordinates into a recorded action. Pairs with the local Wadsworth record.
- **WATCH / FOLLOW a record.** He follows one, gets pinged when it updates. Gives you a built-in reason to update records he's chosen.

### Physical / CHAFF (real-world, when the log says he's ready)
- **Object at the Wadsworth coordinates (VAD-0119).** Minutes from his house. First time the fiction touches the real world. Low stakes, big feeling.
- **A QR card where Joe already goes.** CHAFF places it; it opens a "recovered" record tied to whatever he's reading.
- **Something at the Octagon.** Only if he ever bites the Nov 25 thread. Optional, not required.

### Ambient world (he's not the only one in here)
- **Other-terminal traces.** A notice noting "3 other terminals viewed this record," or faint extra device activity. Cheap, and the good kind of unsettling. Easy to overdo; use once.
- **A second voice in the annex.** If he ever returns to AX-K, someone besides C. leaves a line. Reserve for later.

---

## Slow-burn threads (arcs to drip across many beats)

These aren't single beats; they're wells you draw from. Any beat above can serve one of these.

- **The Ohio cluster** — active, he's on it. Your safest well.
- **The relay node (VAD-0117)** — who put a collection node near Wadsworth, and why now. Personal-to-Joe angle sits here.
- **The Nov 25 Octagon window** — real astronomy, real public event. Live and optional. If he bites, it becomes a road trip. If he doesn't, it just passes.
- **The AI-analysis angle** — matches his own googling and your whole world. Slow, careful, never winking.
- **The withheld paperwork** — "who files at six in the morning." The bureaucratic-menace thread from the annex.

---

## Rails (do not trip these)

- **Face-value surface.** No cryptic cards, no puzzle-on-the-card, no ARG framing. It's a research app that occasionally updates.
- **Never wink.** No beat ever acknowledges it was authored. You're a user too.
- **Em dashes are fine in the in-fiction registry voice** (diegetic, exempt from your normal ban). Not in anything Joe would read as you.
- **Old-Android CSS on any code beat:** no `inset:` shorthand, no flex `gap:`. Run the full gate set from the handoff before shipping code.
- **Bump all three version strings** (index, gpi, sw) together on any code change, real current date.
