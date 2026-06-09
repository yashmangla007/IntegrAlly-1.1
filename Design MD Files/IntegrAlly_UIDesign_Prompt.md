# IntegrAlly — Complete UI/UX Design Specification
### A Trauma-Informed Legal Memory Tool
**Version 1.0 | Full Product Design Prompt**

---

## PREFACE FOR THE DESIGNER

This document is a complete frontend design specification for **IntegrAlly** — a trauma-sensitive web application that helps survivors of sexual violence, domestic abuse, trafficking, and torture preserve and organise their memories as legally admissible evidence. Every design decision must be made through the lens of psychological safety. The user may be in crisis, may be monitored, may be physically shaking. Your design choices carry real-world consequence. Design with that weight in mind.

---

## PART 1: DESIGN PHILOSOPHY & AESTHETIC IDENTITY

### 1.1 Core Concept: "The Sanctuary"

The visual metaphor is a **safe, natural sanctuary** — like a quiet garden or a still forest clearing at golden hour. Not clinical. Not governmental. Not cold. The interface should feel like the user has stepped somewhere calm, somewhere that is theirs, somewhere no one can take from them.

This is a **non-traditional design**. Avoid every trope of legal, medical, or government software. No hard blues, no courier fonts, no grid-heavy dashboards. Instead: organic shapes, soft warmth, and breathing space.

### 1.2 Aesthetic Direction: "Warm Fog"

**The feeling**: Like holding a warm mug on a rainy day. Like amber light through thin curtains. Grounded but gentle. Still but alive.

**Non-traditional elements required**:
- A **custom cursor** — a soft, slow-pulsing circle (2px sage-green ring, 8px radius) that follows the user's mouse with a 150ms ease-follow delay, leaving a 200ms fading trail of tiny dots. On hover over interactive elements, the ring expands to 20px radius and fills with a 20% opacity sage wash.
- **Organic SVG background layer** — the page background (all pages) has a large, slowly animating SVG of abstract botanical forms: gentle leaf veins, soft oval shapes like river stones, thin arcing lines like grass blades. These move at 0.2deg/sec rotation, very subtle. They are not decorative flourishes — they are a breathing texture. Opacity 6-8%, never distracting.
- **The Timeline River** — not a standard vertical list. The memory timeline is drawn as a sinuous SVG path, like a river seen from above, with memory entries as smooth stones placed along its banks (detailed in Page 4).
- **Breathing animation** on the hero section — the main logo/wordmark gently scales between 100% and 101.5% on a 4-second ease-in-out loop. Like it is alive.

### 1.3 Color Palette

All colors exist in both light and dark variants. The interface defaults to light mode but respects system preference.

```
LIGHT MODE:
  --ivory:         #F7F4EE   (page background)
  --ivory-warm:    #F0EBE1   (card surfaces)
  --ivory-deep:    #E5DDD0   (hover surfaces, subtle dividers)
  --sage:          #7A9E8E   (primary accent — interactive elements, highlights)
  --sage-light:    #B5CDBF   (soft sage — decorative, secondary)
  --sage-deep:     #4E7564   (active states, pressed buttons)
  --forest:        #2D4A3E   (primary text, wordmark)
  --mauve:         #A47F8A   (secondary accent — tags, timestamps, soft emphasis)
  --mauve-light:   #D4B4BC   (gentle borders, timeline connectors)
  --amber-glow:    #D4884A   (confidence indicators, warm accents — use sparingly)
  --fog:           rgba(247,244,238,0.92) (frosted overlays)

DARK MODE:
  --ivory:         #1A1F1C   (page background — dark forest floor)
  --ivory-warm:    #222B26   (card surfaces)
  --ivory-deep:    #2D3830   (hover surfaces)
  --sage:          #6B9E8A   (primary accent)
  --sage-light:    #4E7564   (secondary)
  --sage-deep:     #8BBDAA   (active states)
  --forest:        #E8EDE9   (primary text)
  --mauve:         #C4A0AC   (secondary accent)
  --mauve-light:   #6B4E57   (borders)
  --amber-glow:    #D4884A   (same — unchanged)
```

**Color psychology rationale**:
- Ivory/warm cream: safety, warmth, not "medical white"
- Sage green: growth, calm, resilience — not clinical, not cold
- Mauve/rose: acknowledgment of pain without triggering red-coded danger associations
- Forest deep green: grounded, trustworthy, stable
- Amber only for confidence scores: warmth, not alarm

**Colors that MUST NEVER appear**: Bright red, bright orange, pure black (#000000), stark white (#FFFFFF), any neon shade. These are activating colors for trauma-affected individuals.

### 1.4 Typography

**Display / Headings**: `Lora` (Google Fonts, Serif) — warm, bookish, trustworthy. Not a legal font. Not a tech font. A letter-you-keep font.
- `font-weight: 500` for primary headings
- `font-weight: 400` for subheadings
- `letter-spacing: -0.02em`

**Body / UI**: `Nunito` (Google Fonts, Sans-Serif, rounded terminals) — the rounded letterforms are specifically chosen for emotional softness. Not Inter. Not Roboto. Nunito feels like a hand extended in help.
- `font-weight: 400` for body text, instructions
- `font-weight: 600` for button labels, field labels
- `font-weight: 300` for timestamps, metadata (whisper-weight)
- `line-height: 1.75` on all body text (generous breathing room)

**Font sizes**:
```
--text-display:  clamp(2rem, 5vw, 3.5rem)    (homepage hero only)
--text-h1:       clamp(1.5rem, 3vw, 2.25rem)
--text-h2:       1.375rem
--text-h3:       1.125rem
--text-body:     1rem (16px)
--text-small:    0.875rem (14px)
--text-micro:    0.75rem (12px)   (timestamps, metadata)
```

### 1.5 Spacing & Shape System

```
--radius-sm:   8px
--radius-md:   16px
--radius-lg:   24px
--radius-xl:   40px   (hero cards, large containers)
--radius-pill: 100px  (buttons, tags)

--shadow-whisper: 0 2px 12px rgba(45,74,62,0.06)
--shadow-soft:    0 4px 24px rgba(45,74,62,0.10)
--shadow-card:    0 8px 40px rgba(45,74,62,0.12)
```

All cards have `border: 1px solid rgba(164,127,138,0.15)` — a barely-visible mauve tint border. Nothing harsh.

### 1.6 Motion Principles

All animations must obey `prefers-reduced-motion`. When reduced motion is set, all animations reduce to instant opacity transitions only.

```
--ease-gentle:   cubic-bezier(0.34, 1.02, 0.64, 1)
--ease-soft:     cubic-bezier(0.25, 0.46, 0.45, 0.94)
--duration-fast: 180ms
--duration-mid:  320ms
--duration-slow: 600ms
--duration-breathe: 4000ms  (logo breathing)
```

**Animation rules**:
- No sudden pops or harsh bounces
- No fast-moving elements (max transition speed: 320ms on interaction, nothing faster for layout changes)
- Page transitions: a gentle upward fade (20px y-offset → 0, opacity 0→1, 400ms)
- Interactive elements scale max 1.03 on hover — no larger
- Nothing should feel urgent or alarming

---

## PART 2: GLOBAL COMPONENTS (PRESENT ON EVERY PAGE)

### 2.1 The Quick Exit Button (CRITICAL SAFETY FEATURE)

**This is the most important element on every screen. It must always be visible, always reachable, and must never look alarming.**

**Appearance**: Fixed position, bottom-right corner (32px from bottom, 32px from right). A pill-shaped button, 44px tall, 140px wide. Background: `var(--sage)`. Text: `var(--ivory)` in Nunito 14px, weight 600. Label: **"Leave Safely →"** (not "Exit", not "Escape" — empathetic framing).

**Behavior**:
- Single click: immediately navigates to `https://www.google.com` in the same tab, replacing history entry so back button does not return to IntegrAlly
- `Escape` key pressed twice within 500ms: same behavior (keyboard shortcut, documented in onboarding with icon `⎋⎋`)
- Hover state: background becomes `var(--sage-deep)`, a small tooltip appears above reading: *"Takes you away safely. Your progress is saved."* — in Nunito 13px, fog background, 8px radius, appearing at 200ms delay

**Visual design details**: 
- A small leaf SVG icon (14×14px) sits left of the text. The leaf is a single organic Bézier path, no fill, 1.5px stroke in ivory
- The button has a very subtle pulse animation: `box-shadow` cycling from `0 0 0 0 rgba(122,158,142,0)` to `0 0 0 8px rgba(122,158,142,0)` on a 3-second loop — like a heartbeat, gentle, not alarming
- On mobile: the button is a circle (52×52px, sage background) with only the leaf icon centered, 20×20px. A long-press (500ms) triggers the safe exit on mobile

**Keyboard shortcut indicator**: On desktop, a tiny `⎋⎋` label in Nunito 11px, weight 300, mauve color, appears above the button at all times, 8px gap. This is a visual cue so users always know the escape path.

### 2.2 Navigation Header

Present on all pages except the landing page (which has its own full-screen layout).

**Height**: 64px. **Background**: `var(--fog)` with `backdrop-filter: blur(12px)`. **Border-bottom**: `1px solid rgba(164,127,138,0.12)`. **Position**: sticky top.

**Contents (left to right)**:
- IntegrAlly wordmark: `Lora` 22px weight 500, `var(--forest)` color. The "Ally" portion renders in `var(--sage)`. No logo icon — the wordmark IS the logo.
- Spacer (flex: 1)
- Language toggle: a small pill `EN | हिं` — clicking toggles language. `var(--ivory-deep)` background, `var(--forest)` text, `--radius-pill`, 32px height, 12px horizontal padding. Current language gets `var(--sage)` text.
- A small circular button (36px) with a question mark `?` SVG icon — opens the Help drawer (see below)

**Help drawer**: Slides in from right, 320px wide, `var(--ivory-warm)` background, full viewport height. Contains: keyboard shortcuts, what data is saved, the privacy promise ("We never see your name. We never see your face. This is yours."), and support resources. Closes via an `×` button or clicking outside.

### 2.3 Visual Cue System (Trauma-Accessibility)

For trauma-affected users, all interactive elements must have redundant visual cues — not just color, not just shape, but both plus iconographic reinforcement.

**Icon library**: All icons are custom SVG, 20×20px bounding box, 1.5px stroke, rounded caps. The style is botanical/organic — not geometric tech icons. Key icons:
- **Add Memory**: A small leaf with a `+` — growth, addition
- **Open Safespace**: A gentle key shape — access, yours
- **Create Safespace**: A seedling sprout — new beginnings
- **Voice**: A soft speech bubble with wave lines inside
- **Media**: A gentle square with a small mountain/photo silhouette
- **Text entry**: A pen with a leaf-tip nib
- **Compile**: Pages gathering together into a bundle
- **Timeline**: A river path icon — winding horizontal line
- **Download**: A soft downward arrow with a tray
- **Guardian**: Two overlapping leaf shapes

All interactive buttons have: icon + label text + a subtle directional chevron. Three-layer cue system.

**Instructional microtext**: Every action has a one-line instruction beneath it in Nunito 13px, `var(--mauve)` color. Example: beneath the "Add a Memory" button: *"Take your time. Add as much or as little as you like."*

---

## PART 3: PAGE 1 — THE LANDING PAGE (HOMEPAGE)

### 3.1 Layout: Full Viewport, Split-Horizon

The homepage is a single-viewport, no-scroll design on desktop. On mobile it scrolls naturally. It is divided into three vertical zones:

**Zone A — Brand Header (top, 15vh)**:  
Centered. IntegrAlly wordmark in `Lora` display size (`clamp(2.5rem, 5vw, 3.75rem)`), weight 500, `var(--forest)`. The "Ally" portion in `var(--sage)`. Below it, a single tagline in Nunito 16px, weight 300, `var(--mauve)`:

> *"Your memories are valid. Your story deserves to be heard. We help you preserve it."*

The wordmark has the breathing animation (described in 1.3). Below the tagline, an ultra-thin horizontal rule: 1px, 80px wide, centered, `var(--mauve-light)`.

**Zone B — Two Safespace Cards (center, 55vh)**:  
Two large cards side by side, separated by 24px. On mobile, stacked vertically. Each card is 45% viewport width, max 520px, minimum 300px.

---

#### CARD 1: "Begin a New Safespace"

**Visual character**: The left card. Background: `var(--ivory-warm)`. A large, very subtle SVG illustration in the upper-right quadrant of the card — a single seedling sprout, 120×120px, 1px stroke in `var(--sage-light)`, opacity 25%. This is purely atmospheric.

**Card dimensions**: Padding 40px. Border-radius `var(--radius-xl)`. Border: `1px solid rgba(122,158,142,0.25)` — slightly sage-tinted. Box-shadow: `var(--shadow-card)`.

**Content**:
1. Small leaf-sprout icon, 32×32px, `var(--sage)` fill, centered on an `var(--ivory-deep)` circle background, 52px circle diameter. Top of card content.
2. Heading: `Lora` 24px weight 500, `var(--forest)`. Text: **"Begin a New Safespace"**
3. Body copy: Nunito 14px weight 400, `var(--forest)` at 65% opacity, `line-height: 1.75`:
   *"A private, secure place to gather your memories at your own pace. No personal information required. Your space, your rules."*
4. Divider: 1px `var(--ivory-deep)`, full card width minus 40px padding each side
5. **SafeCard introduction** (important sub-section):
   - A small amber-glow badge: pill-shaped, `var(--amber-glow)` background at 15% opacity, `var(--amber-glow)` text at 100%, Nunito 12px. Text: **"Optional Safety Feature"**
   - Text below badge: Nunito 13px, `var(--forest)` at 60%: *"After creating your Safespace, you can download a SafeCard — a disguised image file containing your access details. Keep it safe, like a spare key."*
6. **Primary CTA button** — full width of card content (minus 40px total horizontal padding = card width minus 80px). Height: 56px. Background: `var(--sage)`. Border-radius: `var(--radius-pill)`. Label: Nunito 16px weight 600, `var(--ivory)`. Text: **"Create My Safespace"** with the seedling icon left-aligned and a right-pointing soft arrow right-aligned.
   - Hover: background `var(--sage-deep)`, scale 1.01, `var(--shadow-soft)` appears
   - Active/press: scale 0.98, 80ms transition
   - Below button: Nunito 12px weight 300, `var(--mauve)`, centered: *"No email. No phone. No name needed."*

---

#### CARD 2: "Return to Your Safespace"

**Visual character**: Right card. Background: `var(--ivory-warm)`. A large atmospheric SVG in upper-left quadrant: a simple key silhouette, 100×100px, 1px stroke `var(--mauve-light)`, opacity 20%. 

**Card dimensions**: Same as Card 1, but border tinted mauve: `1px solid rgba(164,127,138,0.25)`.

**Content**:
1. Small key icon, 32×32px, `var(--mauve)` stroke, on `var(--ivory-deep)` 52px circle.
2. Heading: **"Return to Your Safespace"** — same typography as Card 1
3. Body copy: *"Welcome back. Your memories are waiting, exactly as you left them."*
4. **Form fields** (two fields, stacked):
   - Field 1 — Safespace Name:
     - Label: Nunito 13px weight 600, `var(--forest)`. Text: **"Your Safespace Name"**
     - Microtext below label: Nunito 12px, `var(--mauve)`: *"The name you chose when you started"*
     - Input: height 48px, background `var(--ivory)`, border `1.5px solid var(--ivory-deep)`, border-radius `var(--radius-md)`, Nunito 15px, `var(--forest)`. Placeholder text (mauve, 40% opacity): *"e.g. Case-492-Blue-Fox"*
     - Focus state: border becomes `1.5px solid var(--sage)`, a very soft `box-shadow: 0 0 0 3px rgba(122,158,142,0.12)` — never alarming, just a gentle acknowledgment
   - Field 2 — Your PIN:
     - Label: **"Your PIN or Passphrase"**
     - Microtext: *"The 6-digit PIN or phrase you created"*
     - Input: same styling, `type="password"`. An eye SVG icon on the right inner edge toggles visibility. The eye icon is drawn as a gentle leaf-eye hybrid shape.
5. **Secondary CTA button** — full width. Height: 56px. Background: transparent. Border: `1.5px solid var(--sage)`. Label: `var(--sage)`. Text: **"Open My Safespace →"**
   - Hover: background `rgba(122,158,142,0.08)`, slight scale 1.01
6. Below button: Nunito 12px, `var(--mauve)`, centered: *"Forgot your name or PIN? See the Help section (?)"*

---

**Zone C — Footer Strip (bottom, 10vh)**:  
A very quiet strip. Centered. Nunito 12px weight 300, `var(--mauve)` at 60%:
*"IntegrAlly holds zero personal identifying information. Your Safespace belongs only to you."*

A thin 60px wide, 1px `var(--mauve-light)` line above this text.

### 3.2 Background of Homepage

**The Organic Botanical SVG**: Full-page SVG, `position: fixed`, `z-index: -1`. Contains:
- 6–8 large organic oval shapes (like river stones seen from above), no fill, 0.5px stroke `var(--sage-light)`, 5% opacity, scattered across the viewport
- 4–5 long arcing lines (like bent grass or creek paths), no fill, 0.5px stroke `var(--mauve-light)`, 4% opacity
- 3 very large leaf-vein branching paths (fractal-like, simple), `var(--sage-light)`, 3% opacity
- All of these rotate at 0.2–0.4 degrees per second around their own centers via CSS animation, creating an almost imperceptible living quality
- The entire SVG also has a very slow scale from 1.0 to 1.04 and back on a 12-second loop — the whole background breathes

**Noise texture overlay**: A static SVG `<feTurbulence>` noise texture at 3% opacity, covering the full page, adding a slight paper/canvas quality.

---

## PART 4: PAGE 2 — SAFESPACE CREATION FLOW

### 4.1 Overview

This is a multi-step modal/overlay flow that activates when "Create My Safespace" is clicked. It does NOT navigate away from the homepage — it appears as a centered modal with a semi-transparent botanical fog overlay (`var(--fog)` at 92% opacity, `backdrop-filter: blur(8px)`).

The modal itself: 560px wide, `var(--radius-xl)`, `var(--ivory-warm)` background, `var(--shadow-card)`. On mobile: full screen with 24px margins.

There are **3 steps** indicated by a soft step indicator at the top of the modal: three small circles (8px) in `var(--ivory-deep)`. The active step circle is `var(--sage)` and expands to 10px. Connected by a 1px `var(--ivory-deep)` line. Steps animate left-to-right as progress is made — no numbers, just organic dots.

The modal can always be dismissed via a small `×` button (32×32px, `var(--ivory-deep)` background on hover, centered `var(--mauve)` × mark, top-right of modal). Dismissing prompts a gentle confirmation: *"Are you sure you want to leave? Your Safespace hasn't been created yet."* in an inline message within the modal, not a browser dialog.

---

#### Step 1: "What shall we call your Safespace?"

**Visual**: The leaf-sprout icon, 48px, centered at top of modal content.

**Heading** (Lora 22px, forest): *"Let's give your Safespace a name"*

**Body** (Nunito 14px, forest 65%): *"This is a name only you will know. It can be anything — a word, a phrase, something meaningful only to you. We generate one for you below, but you can change it."*

**Auto-generated name field**:
- A display area (not a plain input — a soft rounded rectangle, `var(--ivory)`, `var(--radius-md)`, 20px padding, full width)
- Shows the auto-generated name in Lora 20px, `var(--sage-deep)` — e.g., **"Case-492-Blue-Fox"**
- Below it, a small Nunito 12px `var(--mauve)` text: *"Auto-generated for you. Tap to edit or refresh to generate new."*
- A refresh icon (circular arrow, `var(--sage)`) to regenerate a new name
- Tapping the name area turns it into an editable input field — same styling, cursor appears

**A note about the name format**: The system generates three-word hyphenated IDs combining a number (100–999) and two random evocative words (color + animal or nature + place, etc.). These should be memorable but meaningless to anyone else.

**Next button**: Full width, 56px, sage, pill: **"This is my name →"**. Disabled (opacity 40%, not-allowed cursor) until a name is set.

---

#### Step 2: "Create your key"

**Heading**: *"Now, create your key"*

**Body**: *"Choose something you'll remember. A short phrase, a date that's meaningful to you, or a 6-digit number. This is never stored anywhere — only you know it."*

**PIN/Passphrase field**:
- Toggle control: two small pill tabs side by side — **"6-digit PIN"** and **"Passphrase"**. Active tab: `var(--sage)` background, `var(--ivory)` text. Inactive: `var(--ivory-deep)` background, `var(--forest)` text.
- PIN mode: 6 individual square inputs (48×48px each, `var(--radius-md)`, spaced 8px apart, centered) — like an OTP entry. Tab/arrow key moves between them. Each accepts one digit. All show `•` when filled.
- Passphrase mode: A single tall textarea (96px, resizable vertically up to 200px), `var(--ivory)` background, `var(--radius-md)`, Nunito 15px. Placeholder: *"e.g. 'rainy tuesday green boots'"*. A small toggle to show/hide content.

**Strength indicator** (only for passphrase mode): A thin 4px tall bar below the input, full width. Background `var(--ivory-deep)`. Fill slides from left: red zone → amber zone → sage zone based on passphrase entropy. Labels below: **"fragile / okay / strong"** in Nunito 12px matching bar color. No alarming language — "fragile" not "weak", nothing that criticizes the user.

**Confirmation field**: A second identical field below with label *"Enter it once more to be sure"*. A gentle checkmark SVG (sage, 16px) appears at the right of the field when they match.

**Next button**: **"Set my key →"**

---

#### Step 3: "Your Safespace is ready"

**Visual**: A gentle full-width illustration across the top of the modal — a simple SVG of a small sanctuary: an open archway made of bent branches, a soft glow inside, stars or leaves floating. This is the emotional payoff moment. Illustrated in sage and mauve line art, 200px tall, animated: the leaves inside drift slowly upward in an infinite gentle loop.

**Heading** (Lora 26px): *"Your Safespace is ready."*

**Sub-heading** (Nunito 15px, mauve): *"A private, protected place — just for you. No one else can enter."*

**Safespace details display** (a soft card within the modal):
- Label: **"Your Safespace name"** — Nunito 13px, mauve  
- Value: **"Case-492-Blue-Fox"** — Lora 20px, forest
- Divider line
- Label: **"Your key"** — Nunito 13px, mauve
- Value: **"••••••"** — Nunito 20px (masked, with a small eye-leaf toggle)

**SafeCard download section**:
- A subtle sage-tinted info box (background `rgba(122,158,142,0.08)`, `var(--radius-md)`, 16px padding)
- Amber badge: **"Recommended"**
- Text: *"Download your SafeCard — a disguised image file that looks like a generic digital receipt. You can keep it hidden on your device. It contains your Safespace name so you can always return."*
- A download button: pill, `var(--ivory-deep)` background, `var(--forest)` text, download icon: **"Download SafeCard"**. The SafeCard is a 480×280px image file styled as an innocuous "digital receipt" or "confirmation slip" — the word IntegrAlly does not appear on it. It simply shows the Safespace Name in a plain, business-like format.

**Primary action**: Full-width button, large (64px), sage: **"Enter My Safespace"** with a gentle right-arrow animation (the arrow slides 4px rightward on hover in a loop).

---

## PART 5: PAGE 3 — THE SAFESPACE DASHBOARD

### 5.1 Layout

This is the main working space. Full-page layout, the navigation header is present. The page has two primary zones:

**Left panel (sidebar, 280px wide on desktop)**: Persistent. Contains the Memory Actions and case info.

**Right panel (main area, flexible)**: Contains the Timeline — the emotional heart of the application.

On mobile/tablet: sidebar collapses to a bottom sheet triggered by a floating action button (`var(--sage)`, 56px circle, leaf icon).

### 5.2 Left Panel — Sidebar

**Top section — Greeting**:
- Nunito 13px, `var(--mauve)`, weight 300: *"Welcome to your Safespace"*
- Safespace name in Lora 18px, `var(--forest)`: *"Case-492-Blue-Fox"*
- A thin sage horizontal rule

**Middle section — Actions**:

Both action buttons follow the same design language:

**Button 1: "Add a Memory"**
- Large, prominent. Height: 72px. Full sidebar width minus 32px padding. Background: `var(--sage)`. Border-radius: `var(--radius-lg)`. 
- Inside: leaf icon (24px, ivory) on left. Text block on right: Label in Nunito 15px weight 600, ivory: **"Add a Memory"**. Below label, in Nunito 12px weight 300, `rgba(247,244,238,0.75)`: *"Text, voice, or media"*
- Right-pointing arrow SVG, ivory, 16px
- Hover: `var(--sage-deep)`, scale 1.01

**Button 2: "Gather My Story"** (instead of "Compile Case")
- Height: 72px. Same width. Background: transparent. Border: `1.5px solid var(--sage)`. Border-radius: `var(--radius-lg)`.
- Inside: bundle-of-pages icon (24px, `var(--sage)`) left. Text: **"Gather My Story"** in Nunito 15px weight 600, `var(--sage)`. Below: Nunito 12px weight 300, `var(--mauve)`: *"Compile all memories into documents"*
- Hover: background `rgba(122,158,142,0.06)`, border `var(--sage-deep)`

**Instructional note below both buttons**: A small text block, Nunito 13px, `var(--forest)` at 60%, `line-height: 1.75`:
*"There is no rush. Add memories in any order, at any time. You can always come back."*

**Bottom section — Memory count & last session**:
- A pair of small stat pills: `var(--ivory-deep)` background, `var(--radius-pill)`, 10px 16px padding
- Left pill: leaf icon + **"3 memories"** in Nunito 13px `var(--forest)`
- Right pill: clock icon + **"Last added 2 days ago"** in Nunito 13px `var(--mauve)`

### 5.3 Right Panel — The River Timeline

This is the design's most unique and emotionally resonant element. **Do not make this a standard list.**

#### The River Path

The background of the right panel has a large SVG `<path>` drawn as a sinuous, gently winding river — roughly S-shaped if the timeline is long enough, or a gentle single curve if few memories exist. The path:

- Stroke: 2px, `var(--mauve-light)` at 50% opacity
- `stroke-dasharray: 6 4` — a gentle dashed line, like stepping stones
- No fill
- The path begins at the top of the panel and flows downward, ending in a soft opening (the path's terminal end blooms into a small arrowhead or petal shape pointing downward — the story continues)
- The path is a decorative SVG behind the memory cards — it is not interactive. It is the river. The memories are the stones.

#### Memory Cards ("Stones")

Each memory entry is a card positioned along (to the left or right of, alternating) the River path.

**Card design**:
- Size: 280px wide, variable height (minimum 120px)
- Background: `var(--ivory-warm)`
- Border-radius: `var(--radius-lg)`
- Border: `1px solid rgba(164,127,138,0.15)`
- Shadow: `var(--shadow-whisper)`
- A thin sage `3px` left-border accent
- A small connector line (1px, `var(--mauve-light)`, dashed) extends from the card's center-left or center-right to the River path — the "stone" touching the "river bank"

**Card contents**:
1. **Type indicator** (top-left of card): A small pill badge. Examples:
   - Text memory: `var(--sage-light)` background, `var(--sage-deep)` text, pen-leaf icon: **"Written"**
   - Voice memory: `var(--mauve-light)` background, `var(--mauve)` text, wave icon: **"Voice"**
   - Media memory: amber-glow background at 15%, amber text, photo icon: **"Media"**
   - Guardian-added: A separate small pill: double-leaf icon, `var(--ivory-deep)` background: **"Added by Guardian"**

2. **Date & time** (top-right): Nunito 11px weight 300, `var(--mauve)` at 70%: *"14 Mar 2025, 9:42 PM"*. The date is always human-readable — not ISO format.

3. **Memory preview text**: Nunito 14px, `var(--forest)` at 85%, 3 lines max, then `…` (ellipsis). Clicking the card expands it to full content. For voice memories, a small waveform SVG visualization (5–7 bars of varying heights in `var(--sage-light)`, animated to pulse gently). For media memories, a thumbnail image with rounded corners.

4. **Confidence Score Indicator** (bottom of card):
   - Label: Nunito 11px, `var(--mauve)`: *"Certainty"*
   - A segmented 5-dot bar. Each dot is 8px circle. Filled dots: `var(--amber-glow)`. Empty dots: `var(--ivory-deep)`. Example: 3/5 = three amber dots, two empty dots.
   - A hover tooltip appears above the dots: *"You rated your certainty of this memory as 3 out of 5 when you added it."* — Nunito 12px, `var(--fog)` background, `var(--radius-md)`.

5. **Expand/edit action**: A small `…` button (three horizontal dots), 28×28px, `var(--ivory-deep)` on hover, bottom-right of card. Opens a small dropdown with options: **"Read in full"**, **"Edit this memory"**, **"Remove this memory"**. Dropdown uses the same ivory card styling, `var(--radius-md)`, `var(--shadow-soft)`.

#### Empty State (New Safespace)

When no memories exist yet, the River path is still shown but is lighter (30% opacity). In the center of the panel:
- A large (160×160px) SVG illustration: a single empty vessel (like a smooth stone with a hollow, or a simple open palm) in sage line art
- Below it, Lora 20px, `var(--forest)`: *"Your Safespace is ready for your first memory"*
- Nunito 14px, `var(--mauve)`, `line-height: 1.75`: *"When you're ready, add your first memory using the button on the left. Start with whatever feels easiest — a date, a place, a single sentence. There is no wrong way."*
- The "Add a Memory" button is repeated here, same styling, as a contextual shortcut

#### Panel Header

Above the River timeline, a quiet header:
- Left: Lora 18px, `var(--forest)`: **"Your Memories"**
- Right: A sort/filter control — a small pill with a chevron: **"Oldest first ↕"** — clicking toggles between oldest/newest first. `var(--ivory-deep)` background, `var(--forest)` text, Nunito 13px.

---

## PART 6: PAGE 4 — ADD A MEMORY

### 6.1 Page Layout

This page slides in from the right (320ms, `var(--ease-gentle)`) when "Add a Memory" is clicked from the dashboard. The dashboard remains visible behind a frosted overlay — grounding the user, ensuring they know they can return.

A back-navigation element lives at the top-left: a left-pointing leaf chevron + Nunito 13px `var(--mauve)` text: *"← Back to your Safespace"*

**Page heading** (below nav):
- Lora 22px, `var(--forest)`: *"Add a Memory"*
- Nunito 14px, `var(--mauve)`, `line-height: 1.75`: *"Share what you remember in whatever way feels most natural. You can use one method or all three."*

### 6.2 Memory Input Method Cards

Three large cards in a row (on desktop) or stacked (on mobile). These are the method selectors. Each card is 30% viewport width, minimum 240px.

All three cards have: `var(--ivory-warm)` background, `var(--radius-xl)`, `1px solid rgba(164,127,138,0.12)`, `var(--shadow-whisper)`. 

**Inactive state**: The card appears at full normal styling.

**Selected state**: The card's border becomes `2px solid var(--sage)`, background shifts to `rgba(122,158,142,0.04)`. A small sage checkmark appears in the top-right.

---

**Card A: Write it down**
- Top: pen-leaf icon, 48px, `var(--sage)`, centered on `var(--ivory-deep)` 72px circle
- Heading: Lora 20px: *"Write it down"*
- Body: Nunito 13px, `var(--forest)` 65%, `line-height: 1.75`: *"Use your own words. Fragments are welcome. Write as much or as little as feels right."*
- CTA: Nunito 14px weight 600, `var(--sage)`: **"Start writing →"**

**Card B: Speak it out**
- Top: wave-speech icon, 48px, `var(--mauve)`, centered on `var(--ivory-deep)` 72px circle
- Heading: Lora 20px: *"Speak it out"*
- Body: *"Record your voice. Speak in English or Hindi — we'll help organise the words."*
- CTA: Nunito 14px weight 600, `var(--mauve)`: **"Start recording →"**
- Small language badge below CTA: `var(--ivory-deep)` pill: **"EN | हिं supported"**

**Card C: Upload evidence**
- Top: mountain-frame icon, 48px, amber-glow tinted, centered on `var(--ivory-deep)` 72px circle
- Heading: Lora 20px: *"Upload evidence"*
- Body: *"Photos, videos, screenshots, documents. We preserve exactly what you share, along with the date it was recorded."*
- CTA: Nunito 14px weight 600, `var(--amber-glow)`: **"Choose files →"**
- Micro note: `var(--mauve)` 12px: *"EXIF data (photo location & date) will be preserved if available."*

### 6.3 Active Input Areas

These appear below the method cards when a card is selected. All three can be active simultaneously (multi-method memory).

**Text Input Area**:
- A large textarea, `var(--ivory)` background, `var(--radius-lg)`, `1.5px solid var(--ivory-deep)`, Nunito 16px, `var(--forest)`, `line-height: 1.75`, minimum 200px tall, auto-grows. No character limit (or very high limit — 50,000 chars).
- Placeholder (Nunito 16px, `var(--mauve)` 45%): *"Begin wherever feels right. You can always add more later..."*
- Focus state: `1.5px solid var(--sage)`, `box-shadow: 0 0 0 4px rgba(122,158,142,0.08)`
- A quiet word count in the bottom-right corner of the textarea border: Nunito 12px, `var(--mauve)` 50%: *"247 words"*
- Hindi language support: A small language toggle above the textarea: **"EN | हिं"** pill — selecting Hindi changes input to Devanagari script mode (note: front end accepts the input; backend transliteration/translation handled separately).

**Voice Recording Area**:
- Large centered recording control: a circle, 96px diameter, `var(--mauve)` background. Inside: a microphone SVG icon, ivory, 40px. Clicking begins recording.
- When recording: the circle pulses (grows from 96px to 104px and back, 1.2s loop, `var(--mauve)` color). A live waveform visualization (horizontal bars, 32 bars, `var(--mauve-light)` filled proportional to audio amplitude) appears below the circle. Duration timer: Nunito 14px, `var(--forest)`: *"0:23"*
- Stop button: a square shape inside a circle (the universal stop icon), 64px, appears when recording starts
- After recording: the waveform freezes. A play button appears. A small label: Nunito 13px, `var(--mauve)`: *"Recording — 0:43"*. A discard option (small `×` link) and a re-record option.
- Voice note below: *"Recording is stored on this device first. It uploads automatically after a few seconds."*

**Media Upload Area**:
- A large dashed drop zone: full width, 160px tall, `var(--ivory-deep)` dashed border (2px dashed, `var(--ivory-deep)` at 150%), `var(--radius-lg)`.
- Inside: upload-cloud SVG icon (36px, `var(--sage-light)`) + Nunito 14px `var(--forest)` 70%: *"Drop files here or tap to choose"*. Below: Nunito 12px `var(--mauve)`: *"Photos, videos, PDFs, and more. All formats welcomed."*
- After upload: Files appear as small cards in a row. Each card: thumbnail (for images/video) or file-type icon (for PDF, doc, etc.), filename in Nunito 12px, file size in Nunito 11px `var(--mauve)`. A `×` to remove individual files.
- EXIF notification (for image uploads): If EXIF data is detected, a sage info pill appears: *"📍 Date taken: 14 Mar 2025 — Preserved for you"*

### 6.4 Confidence Score Selector

Below all input methods, a section appears:

**Heading**: Nunito 15px weight 600, `var(--forest)`: *"How clearly do you remember this?"*

**Instructional note**: Nunito 13px, `var(--mauve)`, `line-height: 1.75`: *"There is no wrong answer. Partial or unclear memories are just as important and valid. This rating is for your own reference."*

**Selector**: 5 circular buttons (48px diameter each), spaced 12px apart, centered. Each has a number (1–5) in Lora 18px. A short label below each:
- 1: *"Hazy"*
- 2: *"Partial"*
- 3: *"Moderate"*
- 4: *"Clear"*
- 5: *"Very clear"*

Unselected: `var(--ivory-deep)` background, `var(--forest)` number.
Selected: `var(--amber-glow)` background, `var(--ivory)` number. A scale-in animation (0.8 → 1.0, 200ms) when selected.

### 6.5 Save Memory Button

A large, full-width button. Height: 64px. Background: `var(--sage)`. Border-radius: `var(--radius-pill)`. Nunito 18px weight 600, `var(--ivory)`.

Text: **"Save this memory to my Safespace"**

Below button: Nunito 12px, `var(--mauve)` 60%: *"Your memory is saved to this device immediately and backed up to your secure Safespace within 15 seconds."*

A small progress indicator appears after clicking: a thin sage progress bar running full-width beneath the button, filling over 15 seconds. Label above bar: Nunito 12px, `var(--mauve)`: *"Saving..."* → *"Safely saved ✓"*

After saving: The page auto-navigates back to the Safespace dashboard with a gentle slide-out-left animation. The new memory card appears at the top of the River timeline with a brief amber glow (0 → amber-glow border → fade to normal over 2 seconds) to signal the new addition.

---

## PART 7: PAGE 5 — GATHER MY STORY (COMPILE PAGE)

### 7.1 Navigation to This Page

Clicking "Gather My Story" from the dashboard triggers a confirmation page — not a browser popup. The main content area transforms (soft cross-fade, 400ms) into this page. The sidebar remains.

### 7.2 Page Intro Section

**Heading**: Lora 26px, `var(--forest)`: *"Gathering your story"*

**Body**: Nunito 15px, `var(--mauve)`, `line-height: 1.75`: *"When you're ready, we can bring all of your memories together into two documents. One is your complete, unaltered record. The other is an organised summary. Both are yours to keep, share, or hand to someone you trust."*

**A note of reassurance** (a distinct sage-tinted info box, `var(--radius-md)`, `rgba(122,158,142,0.08)` bg, 20px padding, `1px solid rgba(122,158,142,0.20)` border):
- Small sage leaf icon left-aligned
- Nunito 14px, `var(--forest)` 80%, `line-height: 1.75`: *"This doesn't delete or change anything in your Safespace. All your memories remain here, safe and intact. You can gather your story as many times as you like."*

### 7.3 The Two Document Cards

Two tall cards, side by side (desktop) or stacked (mobile). Each: `var(--ivory-warm)`, `var(--radius-xl)`, `var(--shadow-card)`, 40px padding.

---

**Document 1: "Your Complete Memory Record"**

- Top illustration: an SVG of layered pages/leaves, stacked, sage and mauve line art, 80px height, gently fanned
- Badge: `var(--ivory-deep)` pill: **"Full record"**
- Heading: Lora 20px: *"Your Complete Memory Record"*
- Body: Nunito 14px, `var(--forest)` 70%, `line-height: 1.75`:
  *"Every memory you've added, in the order you added it. Nothing edited or reorganised — exactly as you experienced and shared it. This document is a raw, timestamped record and can be used as a primary legal reference."*
- What it contains (a small list with leaf bullet points instead of standard bullets):
  - *"Each memory in full — text, voice transcription, or media reference"*
  - *"The exact date and time you added each memory"*
  - *"Your certainty rating for each entry"*
  - *"Any notes on EXIF data from uploaded media"*
  - *"Whether each entry was added by you or a Guardian"*
- Format selector: Two pill tabs: **"PDF"** and **"Word Document (.docx)"** — sage active, `var(--ivory-deep)` inactive. Default: PDF.
- Download button: Full width, 56px, `var(--sage)`, pill: **"Download Document 1"**

---

**Document 2: "Your Organised Summary"**

- Top illustration: An SVG of a compass or map with gentle flowing paths, mauve line art, 80px
- Badge: amber-glow tinted pill: **"AI-organised"**
- Heading: Lora 20px: *"Your Organised Summary"*
- Body: Nunito 14px, `var(--forest)` 70%, `line-height: 1.75`:
  *"Your memories thoughtfully arranged in chronological order, with patterns and connections identified. Includes reference numbers linking back to Document 1. Designed to help lawyers, doctors, or support workers understand your experience at a glance."*
- What it contains:
  - *"Events arranged by the timeline of what happened (not when you remembered it)"*
  - *"Each event cross-referenced to Document 1"*
  - *"Your certainty ratings clearly marked"*
  - *"A brief summary of key events"*
  - *"Optionally formatted as an FIR report or medical intake record (see below)"*
- **Proposed format options** (only for Document 2):
  A row of three small pill-cards (secondary option group): **"Standard Summary"** (default selected), **"FIR Format"**, **"Medical Intake"**. Tapping one highlights it sage. Below: Nunito 12px, `var(--mauve)`: *"These templates help translate your record into formats recognised by police and hospitals. You can edit any document after downloading."*
- Download button: Full width, 56px, `var(--sage)` border + text (outlined style): **"Download Document 2"**

---

**Below both cards — Combined download option**:
A centered secondary option: a flat text-link button, Nunito 14px `var(--sage)`, underline on hover: **"Download both documents together →"**

### 7.4 Processing / Loading State

When a download is requested, a full-screen overlay appears (fog background, blur). A centered animation:
- The bundle-of-pages SVG illustration, animated: the pages fan out and come back together rhythmically (2-second loop)
- Lora 20px, `var(--forest)`: *"Gathering your story..."*
- Nunito 13px, `var(--mauve)`: *"This usually takes less than a minute."*
- A progress bar, `var(--radius-pill)`, sage fill, animated
- Below: Nunito 12px, `var(--mauve)` 60%: *"You can close this at any time and come back. The documents will be ready when you return."*

---

## PART 8: RESPONSIVE & MOBILE DESIGN

### 8.1 Breakpoints

```
Mobile portrait:   320px – 479px
Mobile landscape:  480px – 767px
Tablet:            768px – 1023px
Desktop:           1024px+
```

### 8.2 Mobile Adaptations

**Homepage**: Cards stack vertically. Brand zone shrinks but the wordmark always fits single-line at `clamp(1.75rem, 6vw, 2.5rem)`. Both cards take 100% width minus 32px page margin. The botanical background SVG scales naturally.

**Dashboard**: The sidebar becomes a bottom-mounted sheet. A persistent bottom bar with two buttons: "Add a Memory" and "Gather My Story" — 56px height, full width, two-column layout, sage and outlined respectively. Tapping "Add a Memory" slides the sheet up (70% viewport height) showing full sidebar content. The River timeline fills 100% viewport width.

**Memory cards on mobile**: Full-width (minus 20px margins). The alternating left/right positioning becomes all left-aligned. The River path sits behind as a centered vertical dashed line.

**Quick Exit on mobile**: Circle button, bottom-right, 52px, always visible. Long-press (500ms) triggers exit. A very faint pulsing ring animation.

### 8.3 Touch Interaction Enhancements

- All tap targets minimum 44×44px (WCAG AA)
- Swipe-right on any subpage returns to dashboard
- Memory cards on dashboard: tap to expand, long-press for quick options menu
- Voice recording: large tap target, clear recording indicator that can be seen peripherally
- PIN entry: large digit keys (min 64px), clear feedback on each digit entered

---

## PART 9: ACCESSIBILITY REQUIREMENTS

This application serves users who may have physical tremors, visual impairments, or cognitive load issues due to trauma.

### 9.1 WCAG Compliance

Target: WCAG 2.1 AA minimum, AAA for all text-heavy and action-heavy areas.

- All text contrasts ≥ 4.5:1 on their background (verify each sage/ivory combination)
- All interactive elements have `focus-visible` styles: a `3px solid var(--sage)` outline with `3px offset`, never suppressed globally
- All icons that carry meaning have `aria-label` attributes
- All form inputs have associated `<label>` elements, never just placeholder text
- Error messages (e.g., wrong PIN) use aria-live="polite" and appear as inline text, not browser alerts

### 9.2 Cognitive Load Reduction

- Never more than two primary actions visible simultaneously
- All multi-step flows show clear progress (dot indicators)
- Confirmation dialogs use clear plain language, never technical jargon
- All destructive actions (remove a memory) require a two-step confirmation, never a single click
- No autoplaying media of any kind
- No countdown timers (which induce panic)
- Session duration: the application never times out automatically while in active use

### 9.3 Language

**All UI copy must be reviewed against these principles**:
- Never blame or question the user ("Are you sure?" is acceptable, "Are you sure you want to delete?" is better reframed as "Remove this memory — you can always add it again")
- Use second-person possessive consistently: "your memory", "your Safespace", "your story"
- Avoid legal jargon entirely in the user-facing UI (it appears only in downloaded documents)
- Confidence ratings use soft language (Hazy / Partial / Moderate / Clear / Very Clear) — never "incorrect" or "unreliable"
- Error messages are never critical in tone: e.g., "That didn't match — try your PIN again" not "Invalid credentials"

---

## PART 10: DESIGN TOKENS — COMPLETE REFERENCE

```css
/* === TYPOGRAPHY === */
--font-display:  'Lora', Georgia, serif;
--font-body:     'Nunito', system-ui, sans-serif;

/* === COLORS (LIGHT) === */
--ivory:         #F7F4EE;
--ivory-warm:    #F0EBE1;
--ivory-deep:    #E5DDD0;
--sage:          #7A9E8E;
--sage-light:    #B5CDBF;
--sage-deep:     #4E7564;
--forest:        #2D4A3E;
--mauve:         #A47F8A;
--mauve-light:   #D4B4BC;
--amber-glow:    #D4884A;
--fog:           rgba(247,244,238,0.92);

/* === COLORS (DARK) === */
--ivory:         #1A1F1C;
--ivory-warm:    #222B26;
--ivory-deep:    #2D3830;
--sage:          #6B9E8A;
--sage-light:    #4E7564;
--sage-deep:     #8BBDAA;
--forest:        #E8EDE9;
--mauve:         #C4A0AC;
--mauve-light:   #6B4E57;
--amber-glow:    #D4884A;
--fog:           rgba(26,31,28,0.92);

/* === RADII === */
--radius-sm:    8px;
--radius-md:    16px;
--radius-lg:    24px;
--radius-xl:    40px;
--radius-pill:  100px;

/* === SHADOWS === */
--shadow-whisper: 0 2px 12px rgba(45,74,62,0.06);
--shadow-soft:    0 4px 24px rgba(45,74,62,0.10);
--shadow-card:    0 8px 40px rgba(45,74,62,0.12);

/* === EASING === */
--ease-gentle:   cubic-bezier(0.34, 1.02, 0.64, 1);
--ease-soft:     cubic-bezier(0.25, 0.46, 0.45, 0.94);

/* === DURATIONS === */
--duration-fast:    180ms;
--duration-mid:     320ms;
--duration-slow:    600ms;
--duration-breathe: 4000ms;
```

---

## PART 11: TECHNICAL NOTES FOR IMPLEMENTATION

### 11.1 Custom Cursor Implementation

```javascript
// Cursor: a soft-following ring
// Create a div#cursor-ring (position:fixed, z-index:9999, 
// pointer-events:none, width:16px, height:16px, 
// border-radius:50%, border: 2px solid var(--sage),
// transition: transform 150ms ease-out, width 200ms, height 200ms)
// On mousemove: update ring position with requestAnimationFrame
// On hover over [data-interactive]: expand ring to 40px, fill rgba(122,158,142,0.15)
// Trail: create 5 fading dot divs (4px, sage, opacity decreasing) 
// that follow cursor with increasing delays (30ms, 60ms, 90ms, 120ms, 150ms)
```

### 11.2 Quick Exit Implementation

```javascript
// Double-escape detection
let lastEscape = 0;
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const now = Date.now();
    if (now - lastEscape < 500) {
      // Replace current history entry, then navigate
      window.history.replaceState(null, '', 'https://www.google.com');
      window.location.href = 'https://www.google.com';
    }
    lastEscape = now;
  }
});
```

### 11.3 Local-First Data Storage

All memory entries should write to `IndexedDB` first (structured local storage), then trigger a sync to Supabase after 10–15 seconds. The progress indicator on the "Save Memory" page reflects this. If the user exits immediately (Quick Exit), data is already in IndexedDB and will sync on next session open.

### 11.4 SVG Botanical Background Generation

The botanical background SVG should be generated once on page load using a seeded random function based on the day's date — this ensures it's the same throughout a session but varies slightly each day, maintaining a sense of living quality. Use JavaScript to generate the path coordinates procedurally.

### 11.5 SafeCard Design (Downloadable Image)

The SafeCard is a PNG image (480×280px) generated client-side using the Canvas API. It intentionally resembles a generic digital receipt or confirmation slip. It contains:
- A generic header: **"Confirmation Reference"** — a company name that sounds like any digital service, not IntegrAlly (e.g., "SecureVault Ref.")
- The Safespace name in plain text
- A QR code or barcode decoration (non-functional)
- A date
- No mention of IntegrAlly, trauma, legal, or memory
- Typography: a monospace font, gray tones, entirely unremarkable

---

## APPENDIX A: PAGE TRANSITION MAP

```
Homepage
    │
    ├── [Create My Safespace] → Modal Overlay (3-step flow)
    │       └── Step 3 Complete → Safespace Dashboard
    │
    └── [Open My Safespace] → (Validation) → Safespace Dashboard
            │
            ├── [Add a Memory] → Add Memory Page
            │       └── [Save] → Back to Dashboard
            │
            └── [Gather My Story] → Compile Page
                    └── [Download] → File download + return to Dashboard
```

---

## APPENDIX B: COPY VOICE GUIDE (FOR ALL UI TEXT)

The voice of IntegrAlly is:
- **A trusted friend, not a system** — warm, not bureaucratic
- **Patient** — never rushing, never conditional
- **Validating** — every instruction acknowledges the user's courage
- **Clear** — simple words, short sentences, active voice

**Do**: *"Your memory is saved."*  
**Don't**: *"Memory entry successfully committed to database."*

**Do**: *"Take your time."*  
**Don't**: *"Please complete all required fields."*

**Do**: *"There is no wrong way to remember."*  
**Don't**: *"Input must contain at least 10 characters."*

---

*End of IntegrAlly UI/UX Design Specification — v1.0*
*Designed with care for those who need it most.*


# IntegrAlly — Fog Reveal Effect
### Addendum to Main Design Spec
**Applies to: Homepage only (behind the two Safespace cards)**

---

## Concept: "Uncovering the Evidence"

The homepage background contains a hidden collage of fragmented words and
phrases — the kind of things a survivor might write, remember, or say.
These words are permanently obscured by a soft animated fog layer.

As the user moves their cursor across the screen, the fog parts wherever
they go — like a hand brushing condensation off a window — momentarily
revealing the words beneath. The fog slowly drifts back after the cursor
leaves, re-concealing the text.

The metaphor is intentional: the user's agency uncovers what was hidden.
Their movement reveals truth. This mirrors the core purpose of IntegrAlly
itself.

---

## Technical Architecture

### Layer Stack (bottom to top)

```
z-index: -2  →  Botanical SVG background (existing, unchanged)
z-index: -1  →  FogCanvas component (NEW — described here)
z-index:  0  →  Page layout (cards, form, header)
z-index:999  →  Quick Exit button (always on top)
```

### The FogCanvas Component

A full-viewport `<canvas>` element, `position: fixed`, `top: 0`, `left: 0`,
`width: 100vw`, `height: 100vh`, `pointer-events: none` (critical — this
ensures zero interference with any interactive element on the page).

The canvas renders three layers on every animation frame:

**Layer 1 — The word collage (static, drawn once)**
Scattered text fragments across the canvas. Words are placed using a
seeded random function so their positions are consistent per session.
Drawn in `var(--forest)` at 18–22% opacity. Font: Lora italic, sizes
varying between 11px and 22px to create collage depth.

Word list to use (a mix of legal, emotional, and sensory fragments):
```
"I remember"    "testimony"      "3rd March"      "she said"
"evidence"      "bruise"         "I was there"    "statement"
"he told me"    "I am certain"   "it happened"    "witness"
"my account"    "that night"     "I felt"         "record"
"affidavit"     "I know"         "the truth"      "documented"
"memory"        "I saw"          "it was real"    "I survived"
"my words"      "deposition"    "I am valid"     "I was heard"
```

Words are placed in clusters — some overlapping, some isolated — like
a genuine evidence board or journal scattered across a surface.
No word appears within 60px of the center of either card's bounding box.

**Layer 2 — The fog (animated, redrawn every frame)**
A solid fill of `var(--ivory)` at 82% opacity in light mode,
`var(--ivory-dark)` at 88% opacity in dark mode. This covers the
entire canvas uniformly, obscuring the word layer beneath.

**Layer 3 — The reveal hole (follows cursor)**
A radial gradient centered on the cursor position, drawn using
`globalCompositeOperation: 'destination-out'` — this punches a
transparent hole in the fog layer, revealing the words beneath.

The hole shape:
- Inner radius: 0px (full reveal at cursor center)
- Outer radius: 180px (soft feathered edge)
- Gradient: opaque at 180px → transparent at 0px (inverted, for
  destination-out compositing)
- The hole is not a perfect circle — it has a very subtle organic
  wobble (±8px variation using a slow sin wave on radius) to feel
  natural rather than mechanical

**Trail behavior:**
The cursor's previous positions are stored in a trail array (last
40 positions, 16ms apart). Each trail point renders its own smaller
reveal hole at decreasing opacity — creating the sense that the fog
drifts back slowly rather than snapping shut. The trail fades over
approximately 1.8 seconds.

### Mouse tracking
```javascript
// Track cursor globally on the homepage
// Store last 40 positions with timestamps
// On each requestAnimationFrame:
//   1. Draw word collage (cached offscreen canvas, drawn once)
//   2. Draw fog layer (full viewport fill)
//   3. For each trail point (newest to oldest):
//      - Calculate age (0ms = full reveal, 1800ms = zero reveal)
//      - Draw radial gradient with destination-out at age-scaled opacity
//   4. Draw current cursor position (full reveal)
```

### Performance requirements
- Use an **offscreen canvas** for the word collage layer (drawn once,
  composited each frame — never re-rendered)
- Target 60fps on desktop, gracefully degrade to 30fps on mobile
- On mobile: reduce reveal radius to 100px, disable trail (single
  point only, follows touch position)
- Entire effect disabled if `prefers-reduced-motion` is set —
  fog simply sits static at 60% opacity, words permanently hidden

---

## Visual Specifications

### Fog color values
```
Light mode fog:  rgba(247, 244, 238, 0.82)   /* --ivory at 82% */
Dark mode fog:   rgba(26, 31, 28, 0.88)       /* --ivory-dark at 88% */
```

### Reveal hole
```
Max radius:        180px
Feather softness:  The outer 80px of the radius is gradient fade
Wobble:            ±8px on radius, sin(time * 0.8) cycle
Trail length:      40 frames
Trail decay:       linear, 0ms→1800ms maps to 100%→0% opacity of hole
```

### Word collage styling
```
Font family:    Lora, serif
Font style:     italic for emotional phrases, normal for legal terms
Font sizes:     random between 11px and 22px per word
Color:          var(--forest) — #2D4A3E light / #E8EDE9 dark
Base opacity:   0.20 light mode / 0.15 dark mode
Rotation:       each word rotated between -18deg and +18deg
Placement:      seeded random, avoiding card bounding boxes
                and a 40px margin from viewport edges
Density:        all 28 words placed, some overlapping intentionally
```

---

## Component Specification

### File: `FogCanvas.jsx`

Props accepted:
```typescript
interface FogCanvasProps {
  excludeZones?: DOMRect[]  // bounding boxes where fog is always clear
                             // (not used currently, reserved for future)
  wordList?: string[]        // override default word list
  fogOpacity?: number        // 0-1, default 0.82
}
```

The component:
1. Renders a `<canvas>` with the fixed full-viewport styling
2. On mount: places words using seeded random (seed = today's date,
   so positions shift daily — the background feels alive)
3. On mount: draws the word collage to an offscreen canvas
4. Adds `mousemove` and `touchmove` listeners to `window`
5. Starts `requestAnimationFrame` loop
6. On unmount: cancels animation frame, removes event listeners

### Integration into Homepage

```jsx
// In Homepage.jsx, inside the return, as first child of the page wrapper:
<FogCanvas />

// Everything else (NavHeader, Zone A, Zone B cards, Zone C) sits
// above it naturally due to z-index stacking.
// No other changes to Homepage.jsx required.
```

---

## What This Must NOT Do

- Must never capture mouse events (pointer-events: none, always)
- Must never cause layout shift or affect card positioning
- Must never render on any page other than the Homepage
- Must never slow page load (canvas initializes after first paint)
- Must not reveal words that could be distressing on first load —
  the fog starts fully opaque; words only appear through user action
- Must not auto-animate the reveal — only user cursor movement
  triggers uncovering (agency is the point)

---

## Accessibility Note

The word collage is purely decorative and atmospheric. All canvas
content has `aria-hidden="true"`. Screen readers receive no
information from this layer. The words in the collage do not
constitute readable content — they are visual texture only.

---

*End of Fog Effect Addendum*