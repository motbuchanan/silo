# SILO — What We Learned, and How to Apply It

Written Sep 19 2026. A research + reflection pass on the SILO build, aimed at two things: the transferable lessons for the project, and how they feed back into how Mot builds and learns.

---

## Part 1 · The seven lessons SILO actually taught

### 1. The user's real capability is the spec. Not the imagined user's.
The single biggest lesson. SILO was built for months as a layered ARG: sealed annex, withdrawn dossiers, two-code gate, a decoy console. The real player couldn't operate a bottom sheet, kept uninstalling the app, and asked "what is this even supposed to be?" Every hour of story architecture assumed a user who doesn't exist. The v0.39–0.40 pivot to a face-value crop-circle app was the correction, and it worked on the first try because it was finally built for the actual Joe.

This generalizes to every build in your portfolio where the user is a specific real person: Garrett, your 96-year-old grandma's game, coworker tools, the aunt's civic app. The spec is not "what would be cool," it's "what can this exact person do without you standing next to them." That is measurable, and you now have proof it's the thing that decides success.

### 2. Instrument first. Believe the log over your own narration.
The Firestore discovery log was the truth serum on this project, repeatedly:
- "Joe only taps things that look tappable" — the log showed it, which is why v0.37 turned dotted-underline text links into big buttons, which is what finally got him into the dossiers eight days later.
- "The device marked Joe is actually Mot's own phone" — the log caught a misattribution that had Claude confidently narrating the wrong person's activity.
- The face-value pivot's success is visible in the log (`gallery_open`, `act_photos`) rather than guessed.

Research backs the instinct: production PWA guidance treats real-usage telemetry as the thing that catches the failures your mental model hides. For your builds, a tiny event log (even localStorage-only, or Firestore when it's already wired) turns "I think they'll get it" into "here's what they did." Cheap to add, and it has changed a decision on this project more than once.

### 3. In debugging, find the one signal that splits the hypotheses. Then stop guessing.
The Firebase auth saga burned five-plus turns on theories (authorized domains, stale tokens, persistence settings), each one a plausible-sounding patch. The signal that actually discriminated was sitting there early: *incognito behaves differently from the normal browser* → local state, not config. Once auth was the real problem it got removed wholesale rather than fought.

The reusable move: before writing a fix, ask "what single observation would prove this theory wrong?" If you can't name one, you're guessing, and guessing on a phone you can't see is slow. This is the most expensive habit to break and the highest-value one.

### 4. Automate the checks that catch silent failures.
Two bugs cost real time and both were invisible to the eye: a version string that didn't get bumped (sending you on cache-clear chases for a non-cache problem), and JavaScript accidentally inserted inside a `<style>` block (which silently killed all later CSS). Neither shows up by looking. Both are caught in one second by a scripted gate. The build now runs: `node --check`, zero Jekyll tokens, no JS-in-style, all three version strings equal, headless smoke test. That checklist is worth more than any single feature.

### 5. Match the tech to the device in the user's hand.
Joe's old Android Chrome doesn't support the `inset:` shorthand or flex `gap:`. Modern CSS that works everywhere in a demo fell apart on the one phone that mattered, once dropping the field manual into the page as an unclosable block. The constraint isn't "write old code," it's "know your one user's actual runtime and test against it."

### 6. Simplify by subtraction, not addition.
The durable fix for auth was deleting it, not configuring it better. The durable fix for the interface was removing the ARG framing, not adding more explanation. When something fights you, the strongest option is often to remove it rather than add a layer to manage it.

### 7. Distribution is part of the product.
A working app almost failed because the user kept losing the link. Nothing about the features fixed that; the home-screen icon did. For a low-digital-literacy user, "how do they get back in tomorrow" is a feature with the same weight as anything on the screen. Age-friendly design research says the same thing: re-entry, persistence, and not-getting-lost matter more than capability for these users. Design the door, not just the room.

---

## Part 2 · How this applies to how you learn and develop

You've said your wide-frame thinking shows you every possibility at once and that you steer AI the way you steer a camera. SILO is a clean case study in both the strength and the cost of that, and it points at a specific adjustment.

**The strength:** the wide frame is why SILO has depth most people couldn't invent: retro-filed archive numbering, a decoy console, a surveillance tab that shows the player their own activity, breadcrumbs that survive dormancy. Given a direction, you find a hundred ways to it. That's real and it's rare.

**The cost, seen plainly here:** the wide frame ran for months before the narrow question got asked. "What can Joe actually do?" is a narrowing question, and it should have gated the build at the start, not arrived as a rescue at week eight. Your own stated method already has the fix built in: you have AI ask you questions first to narrow the frame. SILO's lesson is to point that same questions-first move at the *user*, not just the concept.

**The adjustment — a two-question gate at the front of every build:**
1. *Who is the one real person this is for, and what can they do unassisted?* (Capability, not enthusiasm.)
2. *How will I know if it's working — what will I watch?* (Instrumentation or a test, decided before building.)

That's not a brake on the wide frame. It's a lane for it. You keep inventing a hundred paths; these two questions just make sure they run toward the person who'll actually use it. It's the same discipline that makes your discovery-tool pattern work, turned on yourself at the moment you start, which is exactly where your process currently skips it.

**On iteration speed as a superpower:** eight weeks of coding produced dozens of working SILO versions. That velocity is a genuine edge. It only pays off when it's aimed. Blind iteration (guess a fix, ship, see) is fast-feeling and slow-actually, as the auth saga showed. Instrumented iteration (watch behavior, change one thing, watch again) is how the same speed compounds. The log-first habit from Lesson 2 is what converts your speed from motion into progress.

**On the real-recipient thing:** you've said you need a real person on the other end to finish work. SILO shows the other half of that: a real recipient doesn't just motivate you, they *tell you the truth* if you watch them. Joe never articulated a bug report; the log and his two-line texts said everything. Use the recipient as the test, not only the reason.

---

## Part 3 · Reusable rules worth promoting to your standards

These came out of SILO but apply across all your single-file builds. The version-bump gate is already in your vibe-code standards. Candidates to add:

- **JS-in-`<style>` check** as a hard gate (grep the style block for `getElementById`/`addEventListener` after any patch). Caused a silent full-CSS break here.
- **Believe the log** as a design principle for any app with a recipient: add a minimal event log and let observed behavior overrule assumptions before redesigning.
- **Front-of-build capability gate** (the two questions in Part 2) as the first step of any build-for-a-person project.
- **Smoke-test note:** serve the real library (e.g. Leaflet from npm) in headless tests, not a hand-written stub — a thin stub missed `map.attributionControl` and gave a false failure.

Say the word and I'll fold the first two into your vibe-code-standards skill so they run automatically on future builds.

---

## Sources

- [Handling Service Worker updates — Progressier](https://progressier.com/handling-service-worker-updates)
- [Progressive Web Apps in 2025: service workers, caching, install experience — DEV](https://dev.to/emongmarcc/progressive-web-apps-in-2025-a-production-focused-guide-to-service-workers-caching-and-the-4n0i)
- [Stuff I wish I'd known sooner about service workers — Rich Harris](https://gist.github.com/Rich-Harris/fd6c3c73e6e707e312d7c5d7d0f3b2f9)
- [Optimizing mobile app design for older adults: systematic review — Springer, Aging Clinical and Experimental Research (2025)](https://link.springer.com/article/10.1007/s40520-025-03157-7)
- [Design Guidelines of Mobile Apps for Older Adults: Systematic Review — ScienceDirect](https://www.sciencedirect.com/org/science/article/pii/S2291522223000864)
- [A Guide to Interface Design for Older Adults — Toptal](https://www.toptal.com/designers/ui/ui-design-for-older-adults)
