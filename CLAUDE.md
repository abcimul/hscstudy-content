# HSC Study content — handbook

Read this first in every session. This repo holds HSC Study's **brand assets and learning-content production**
(explainer videos, thumbnails, social posts). The platform code lives in `WebSolutionCare/hscstudy-platform`.

Owner: WebSolutionCare. Talk to the owner in Bangla with English technical terms.

## What HSC Study is
hscstudy.com: study, practice and exams for Bangladesh HSC (একাদশ-দ্বাদশ) students, launched through teachers.
Content follows the current NCTB textbooks. Audience: 16–18-year-olds, mostly on phones, many outside Dhaka.
Brand character: calm, trustworthy, clear, a friendly teacher. Students are addressed as "তুমি".

## Layout
- `.claude/skills/hscstudy-video-script/` — topic + textbook pages → script.txt, message.txt, thumbnail, title/description.
- `.claude/skills/hscstudy-video-production/` — SRT + MP3 + script.txt + message.txt → branded Remotion video
  (use together with the `remotion-motion-graphics` skill).
- `brand/logo/` — final logo pack (network H): SVG, PNG, favicon, app icons, usage guide (`logo-guide.png`).
- `brand/facebook/` — page cover, profile photos, intro post (with HTML sources to edit text).
- `brand/video/` — motion-brand sample frame (navy + paper scenes).
- `videos/{subject}/{chapter}/{topic-slug}/` — one folder per video: script.txt, message.txt, voiceover.srt,
  voiceover.mp3, thumbnail-*.png, thumbnail.html, title-description.txt, video-link.txt.
- `templates/` — approved Remotion template project (after the first video is approved) and the original long prompt.
- `docs/textbook-notes/` — section-by-section notes of NCTB textbooks (facts, numbering, exercise formats).
- `docs/video-ideas/` — per-chapter video idea lists (hook, book section, verified numbers, quiz answer, status).

## Workflow for one video
1. Script session: use `hscstudy-video-script` with subject, chapter, topic and the textbook pages.
2. Owner makes the voice in Google AI Studio (same voice for the whole series) and the SRT in ElevenLabs.
3. Video session: use `hscstudy-video-production` with voiceover.srt, voiceover.mp3, script.txt, message.txt
   (+ the template from `templates/` once it exists). Preview → corrections → "রেন্ডার করো".
4. Save everything in the topic's `videos/...` folder.

## Rules (do not break without the owner)
- **Facts only from the textbook pages the owner provides** (or `docs/textbook-notes/`). No invented statistics,
  no "this comes in the board exam every year" claims. Every number and calculation is checked by running code.
- Brand for video, thumbnails and social: `.claude/skills/*/references/brand.md` (navy + amber, gradients allowed only
  in that family, grid overlay, network-H logo always solid). The website/app UI follows the platform's own design
  system (solid colours, no gradients) — that rule is for the app, not for videos.
- The two skills each carry a copy of `references/brand.md` and `references/subjects.md`; change both copies together.
- Wording: everyday Bangla that students and teachers say, textbook terms unchanged, English terms in English
  (`hscstudy-video-script/references/language-and-tts.md`). Avoid AI-sounding phrases.
- No third-party logos, no NCTB textbook images/scans, no real people's likeness, no copyrighted music or footage.
- One video = one idea, 60–90 s (Reels/Shorts 30–45 s, one trick). Hook first, payoff at the end.

## Files and git
- Do not commit textbook PDFs (copyright, size) — write notes in `docs/textbook-notes/` instead.
- Do not commit MP4 renders (too big for git); put the YouTube/Facebook link in `video-link.txt`.
  MP3 voiceovers and SRT files are small and are committed.
- No `node_modules`, `out/` or render caches (see `.gitignore`).
- Commit and push only when the owner asks. One branch per video (`video/{subject}-{topic-slug}`) unless the
  owner says to work on `main`. End commit messages with the Co-Authored-By line the session provides.
- When a video is approved, copy its script/message/thumbnail into the script skill's `examples/` so later videos
  learn from it. When a mistake repeats, fix the skill so it cannot happen again.

## Status
- Logo (network H, option 1), Facebook cover, profile photos and intro post: done (`brand/`).
- Videos: ICT ch.1 বিশ্বগ্রাম (script only), ICT ch.3 বাইনারি সংখ্যা ও স্থানীয় মান (script, message, thumbnail;
  voice/SRT/video pending).
- Format decision (owner, 2026-11-04): ICT chapter 3 goes out as short **Reels/Shorts** (9:16, 30–45 s), one trick each, series
  "ICT ট্রিক #n". 16 tricks planned in `docs/video-ideas/ict-chapter-3.md`; reels #১–#৮ have script, message and cover
  (`videos/ict/chapter-3/reel-0{1..8}-*/`); voice/SRT/video pending.
- Textbook notes: ICT 2026-27 edition, **whole book read** (book pages 1–244), summary at the end of
  `docs/textbook-notes/ict-2026-27.md`. Key findings: chapter 5 now teaches **Python** (older books used C) with computational
  thinking, trace tables, data structures, functions and file/CSV handling; chapter 6 uses **SQLite** and adds transactions/ACID
  and NoSQL/big data; chapter 1 adds AI models and software engineering/SDLC; chapter 2 adds network performance and the OSI model.
  Many সৃজনশীল stimuli are images or code (topology figures, logic circuits, HTML, Python, database tables).
- Teaching style: patterns learned from a popular BD one-shot ICT class (key rules, familiar examples, what not to copy)
  are in `hscstudy-video-script/references/teaching-patterns.md`.
