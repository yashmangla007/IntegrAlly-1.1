# River Timeline Design — Correction Prompt for Antigravity

## DESIGN SPEC vs ACTUAL IMPLEMENTATION GAP

### What the Design Specifies:
1. **SVG River Path as Background** — A sinuous, S-shaped or gently winding river flowing down the entire panel
2. **Path Styling:**
   - Stroke: 2px
   - Color: `var(--mauve-light)` at 50% opacity
   - Stroke-dasharray: `6 4` (dashed line like "stepping stones")
   - No fill
3. **Path Behavior:**
   - Begins at top of panel
   - Flows downward in a smooth curve
   - Ends with soft opening (petal/teardrop shape pointing downward — "story continues")
4. **Conceptual Truth:** "The river is decorative SVG behind memory cards — it is not interactive. The memories are the stones."

### What the Current Implementation Shows:
- ✗ Memory cards are positioned randomly left-right without a flowing visual guide
- ✗ There's a **vertical dashed line** in the center, but it's:
  - Too thin and muted
  - Not styled as a sinuous river
  - Not acting as a visual storytelling device
- ✗ The timeline **lacks emotional resonance** — it feels more like a technical data display than a narrative river
- ✗ No "S-shaped" or "flowing" quality to the path
- ✗ No petal/teardrop terminal shape indicating story continuation

---

## CORRECTION PROMPT FOR ANTIGRAVITY

**Agent Assignment:** **Claude Sonnet 4.6** (Reasoning: This requires detailed SVG path generation, styling specificity, and narrative design understanding — Sonnet is ideal for design-centric prompts with technical precision)

**Prompt to Send:**

```
You are tasked with fixing the "River Timeline" component in the IntegrAlly Safespace dashboard.

CURRENT STATE:
The right panel's memory timeline has a simple vertical dashed line in the center. 

DESIRED STATE:
Implement the River Timeline as originally designed:

1. **SVG River Path (Background Layer)**
   - Generate an SVG <path> element with a sinuous, gently winding river
   - The river should be S-shaped if timeline is long (3+ memories), or a gentle single curve if short (1-2 memories)
   - Path should start at the top of the timeline panel and flow downward
   - Path should END with a soft petal/teardrop shape pointing downward (symbol of "story continues")
   - Styling:
     * Stroke width: 2px
     * Stroke color: CSS variable --mauve-light (or #A89DA9 if mauve-light is unavailable) at 50% opacity
     * Stroke-dasharray: "6 4" (dashed like stepping stones)
     * No fill
     * SVG should be full-height, positioned absolutely behind memory cards
   
2. **Memory Card Positioning**
   - Cards should alternate left-right as they flow down the timeline
   - Cards should visually connect to the river path (feel like they're "on" the stepping stones)
   - Odd memories (1st, 3rd, 5th): positioned on the LEFT side
   - Even memories (2nd, 4th, 6th): positioned on the RIGHT side
   
3. **Conceptual Integrity**
   - The river is DECORATIVE and NOT interactive
   - It serves as visual storytelling — trauma narrative as a flowing journey
   - Memory cards are the "stones" in the river
   - The river path should give the impression of time flowing downward, not a rigid list

4. **Technical Requirements**
   - SVG should dynamically adjust based on number of memories (use React to generate path)
   - River width should be proportional to panel width (~60-70% of panel)
   - Path should have smooth curves (use quadratic or cubic bezier curves, not sharp angles)
   - Ensure path is responsive and scales properly on different screen sizes

5. **Visual Polish**
   - Add subtle glow or shadow to the dashed river line (optional but recommended for emotional impact)
   - Ensure color contrast is appropriate (mauve-light at 50% should be visible but not overpowering)
   - Memory cards should have slight margin/padding from the river to maintain visual hierarchy

OUTPUT:
- React component with integrated SVG path generation
- CSS/Tailwind classes for styling
- Responsive design that works on mobile and desktop
- Ensure the component is named clearly (e.g., RiverTimeline.jsx)

CRITICAL: This is NOT a standard list. The river metaphor is central to the app's emotional resonance for trauma survivors. 
Do not simplify to a basic vertical timeline.
```

---

## AGENT RECOMMENDATION BREAKDOWN

| Agent | Reasoning | Best For |
|-------|-----------|----------|
| **Claude Sonnet 4.6** ✅ **CHOOSE THIS** | Excels at design-centric implementation, understands narrative design principles, good at SVG path generation with curves, balances technical precision with design intent | River Timeline fix requires design philosophy + technical SVG code |
| Claude Opus 4.6 | Overkill for this task; more expensive; would be better for architectural decisions | Not needed for single component refinement |
| Gemini 3.1 Pro (low) | May miss design nuance; lower reasoning capacity | Design-heavy components need stronger model |
| Gemini 3.1 (high) | Good option but less design-focused than Sonnet; better for pure code | Could work but Sonnet is better choice |
| Gemini 3 Flash | Too fast/shallow for design specification detail | Not suitable for design-sensitive component |

---

## KEY FIXES SUMMARY

| Issue | Fix |
|-------|-----|
| Straight dashed line | Replace with sinuous SVG path with flowing curves |
| Random card positioning | Implement strict left-right alternation |
| Missing terminal shape | Add petal/teardrop at path end |
| No design philosophy | Reframe as narrative river, not technical timeline |
| SVG styling too subtle | Adjust opacity and line weight for better visibility |
| Non-responsive path | Generate path dynamically based on memory count |

---

## EXPECTED OUTCOME

After implementing this correction:
- ✅ River flows visually from top to bottom with curves
- ✅ Memory cards alternate left-right as "stepping stones"
- ✅ Petal/teardrop terminal indicates story continuation
- ✅ SVG path is decorative but emotionally powerful
- ✅ Design spec and implementation finally align
- ✅ User experience reinforces narrative healing journey
