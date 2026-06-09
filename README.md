# IntegrAlly — Your Sanctuary

> A trauma-informed memory preservation tool built for survivors. Designed to help you document, organise, and protect your memories with dignity — and, when you're ready, produce them as legally structured records.

---

## What Is IntegrAlly?

IntegrAlly is a private, secure safespace where individuals — particularly survivors of trauma, abuse, or harassment — can preserve their memories in their own words, at their own pace. It was built with the belief that documentation shouldn't feel clinical or cold. The interface is calm, gentle, and purposefully human.

Memories are stored as a timeline. When the user is ready, they can generate either a complete evidence record or an AI-organised legal summary — both exportable as formatted PDFs, structured for use in Indian legal proceedings.

---

## Features

### Safespace Onboarding
- Users create a named, PIN-protected safespace on first visit
- The PIN is hashed using **SHA-256** (via the Web Crypto API) before being stored — the raw PIN never leaves the device
- A downloadable **SafeCard confirmation** (a discreet PNG styled as a transaction receipt) is generated on setup, so the user can safely remember their credentials without raising suspicion
- All session state is tied to a Supabase-generated UUID, stored in `localStorage`

### Memory Capture
The Add Memory panel supports three input methods:
- **Written** — freeform text entry with live word count
- **Voice** — in-browser audio recording (WebM format), uploaded directly to Supabase Storage
- **Media** — image or file attachments, with EXIF metadata awareness

Every saved memory is tagged with a **confidence rating (1–5)** reflecting how certain the user feels about the recollection — from "Hazy" to "Very clear." This rating is preserved in the database and appears in all exports.

Each entry is immediately hashed (**SHA-256**) on save, creating a tamper-evidence trail.

### Memory Timeline
- Memories render on an animated, sinuous **river timeline** — the SVG path adapts dynamically based on how many memories exist
- Cards alternate left/right along the river, each connected by a dashed line to the central flow
- Timeline supports **oldest-first / newest-first** sorting
- Each card is expandable in-place, with a full-view modal accessible via "Read in full"
- Memory type is visually distinguished: Written (sage), Voice (mauve), Media (amber)

### Gather My Story — PDF Export
Two export modes, accessible from the sidebar:

**Output 1 — Complete Memory Record**
A structured PDF containing every memory entry with timestamps, type, confidence rating, SHA-256 integrity hash, and media attachment links. The final page generates a **Certificate under Section 63 of the Bharatiya Sakshya Adhiniyam (BSA), 2023** — the Indian evidence law provision for admissibility of electronic records. This certificate includes a signature block and is formatted for submission alongside legal filings.

**Output 2 — AI-Organised Summary** *(architecture complete — API key not included in this build)*
A Gemini-powered legal summary generator that takes the user's raw, fragmented memory entries and produces a clean, objective, third-person narrative structured into two sections:
- **Section A — FIR Narrative**: Formatted for Zero FIR registration under BNSS Section 173
- **Section B — MLC Injury Summary**: Formatted for Medico-Legal Case report

The AI prompt is strictly constrained — it does not extrapolate, infer, or add anything not stated by the user. It flags inconsistencies without resolving them. The full pipeline (Gemini API call → jsPDF generation → download) is implemented and functional; only the API key has been omitted from this prototype submission.

### Safety Features
- **Quick Exit button** — a persistent, one-click escape that immediately redirects to Google with no browser history trace (`location.replace()`)
- **Double-Escape keyboard shortcut** — pressing Escape twice in rapid succession triggers the same safe exit (ignored when focus is inside a text input)
- **Long-press on mobile** — 500ms touch-hold on the Quick Exit button triggers the exit on smaller devices

### UI & Design
- Fully custom design system with CSS variables — distinct **light and dark mode**, respecting system preference with a manual override toggle
- **System theme sync** — detects `prefers-color-scheme` on load; toggle state is persisted in `localStorage`
- **Custom animated cursor** with trail effect on desktop (skipped on touch devices)
- Animated **botanical SVG background** with slow, layered rotations and a subtle breathing scale
- Glassmorphism nav bar with `backdrop-filter: blur`
- Responsive layout with a mobile FAB and slide-out sidebar
- Language toggle UI present (Hindi/English) — localisation architecture in place

### Technical Architecture
- **Frontend only** — pure HTML, CSS, and vanilla JavaScript, no build tools or frameworks
- **Supabase** for authentication-free backend: `safespaces` and `memories` tables, plus `evidence` storage bucket for media/voice files
- **jsPDF** for all client-side PDF generation
- **Gemini API** (Google Generative Language) for AI narrative generation — wired up but key-gated
- `merge.js` — a Node.js script used during development to programmatically merge the Add Memory slide panel (originally a separate `add_memory.html` page) into `dashboard.html`, handling CSS extraction, JS injection, animation adjustments, and trigger wiring automatically

---

## Project Status

This is a **prototype version**. The full product architecture is implemented and functional end-to-end, with one deliberate omission:

> The **Gemini API key** for AI-organised summary generation has not been included in this build. To activate Output 2, add a valid `GEMINI_API_KEY` value to the `dashboard.html` script block. Everything else — the API call, prompt, response parsing, and PDF generation — is already wired and ready.

The Supabase backend (URL + anon key) is included in `index.html` and is live for this prototype.

---

## Setup & Running

No build step required. Just open `index.html` in a browser.

For the full experience with your own database:

1. Create a [Supabase](https://supabase.com) project
2. Create two tables:
   - `safespaces` — columns: `id` (uuid, primary key), `case_name` (text), `pin_hash` (text)
   - `memories` — columns: `id` (uuid), `safespace_id` (uuid, FK), `type` (text), `content` (text), `confidence` (int), `sha256_hash` (text), `media_url` (text), `language` (text), `created_at` (timestamptz)
3. Create a storage bucket named `evidence` (set to public)
4. Replace `SUPABASE_URL` and `SUPABASE_ANON_KEY` in `index.html`
5. Optionally, add a `GEMINI_API_KEY` in `dashboard.html` to activate the AI summary feature

To run `merge.js` (developer utility):
```bash
node merge.js
```
This merges `add_memory.html` into `dashboard.html`. Only needed if you're editing the slide panel as a standalone file.

---

## File Structure

```
├── index.html          # Landing page + Safespace creation onboarding
├── dashboard.html      # Main app — timeline, memory capture, exports
├── theme.js            # Theme initialisation script (runs before page paint)
└── merge.js            # Dev utility: merges add_memory panel into dashboard
```

---

## Built With

- Vanilla HTML / CSS / JavaScript
- [Supabase](https://supabase.com) — database + file storage
- [jsPDF](https://github.com/parallax/jsPDF) — client-side PDF generation
- [Google Gemini API](https://ai.google.dev/) — AI narrative generation *(key not included)*
- [Lora](https://fonts.google.com/specimen/Lora) + [Nunito](https://fonts.google.com/specimen/Nunito) — Google Fonts

---

## A Note on Vibe Coding

IntegrAlly was built through an iterative, feel-first design process — the UI, the flow, and the emotional tone were shaped together alongside the functionality rather than after it. Every animation curve, every color token, every label ("Your Sanctuary", "Gather My Story", "Hazy → Very clear") was a deliberate choice made to serve people in a difficult moment. The code reflects that: it's expressive, it's opinionated, and it was written to feel like something — not just work like something.

---

## Legal Context

The PDF export is structured around Indian law:
- **Bharatiya Sakshya Adhiniyam (BSA), 2023 — Section 63**: Admissibility of electronic records
- **Bharatiya Nagarik Suraksha Sanhita (BNSS) — Section 173**: Zero FIR registration
- **MLC (Medico-Legal Case)** report format for physical trauma documentation

> This tool is designed to assist in documentation. It does not constitute legal advice.

---

*Built as a prototype for now, plan for expansion is also there. All feedback welcome.*
