# Kasha Multimedia — Design Direction

## Three Initial Directions

### Theme Name: Broadcast Atelier
**Very Brief Intro:** An editorial broadcast identity that treats Ethiopian culture, sound, and moving image as collected artifacts: warm paper, ink, brass, and precise red signal marks. It feels considered, tactile, and culturally grounded without becoming nostalgic.
**Probability:** 0.07

### Theme Name: Addis Afterimage
**Very Brief Intro:** A nocturnal media-lab language built around dark charcoal, electric signal colors, and kinetic visual fragments. It would feel urban, fast, and experimental, with the energy of a live control room.
**Probability:** 0.03

### Theme Name: Field Notes / Open Air
**Very Brief Intro:** A light, documentary-led system using mineral neutrals, landscape greens, and large photographic crops. It would make the brand feel expansive, observant, and close to people and place.
**Probability:** 0.09

## Chosen Direction: Broadcast Atelier

### Design Movement
Contemporary editorial modernism with references to **Swiss International Typographic Style**, archival radio ephemera, Ethiopian textile geometry, and independent cultural publishing. The interface should read like a carefully art-directed program guide rather than a generic agency landing page.

### Core Principles
1. **Culture is the subject, not decoration.** Visual choices should support stories about people, place, memory, and knowledge.
2. **Signal creates hierarchy.** Thin rules, red broadcast marks, timecodes, and waveform-like details should guide the eye without turning into gimmicks.
3. **Warm precision.** Strong typographic structure and measured spacing are softened by paper tones, grain, and tactile image framing.
4. **Editorial confidence.** Use short, specific copy and let asymmetry, contrast, and cropping create interest instead of filler.

### Color Philosophy
The base is **archive ivory** and soft parchment: it gives the site the warmth of a printed program sheet and keeps long-form reading comfortable. **Ink charcoal** provides serious contrast and lets imagery lead. The ownable accent is **Kasha Signal Red**—a saturated vermilion that recalls an “on air” indicator and gives action, navigation, and featured programs one clear visual voice. A restrained brass note can be used for metadata and small highlights, never as a generic luxury gradient.

### Layout Paradigm
Use a **broadcast-sheet composition**: a strong left rail for labels and section numbers, a wide editorial field for content, and occasional full-bleed image crops that interrupt the rhythm. On desktop, align sections to a recurring vertical rule rather than stacking centered cards. On mobile, collapse the rail into compact labels while preserving the sequence and red signal marks.

### Signature Elements
- A small “K / signal” mark that behaves like an on-air indicator and favicon.
- Hairline rules with red timecode labels such as `LIVE / 02:00` and `FIELD NOTE / 07`.
- Image frames with offset captions, paper edges, and subtle grain rather than uniform rounded cards.

### Interaction Philosophy
Interactions should feel like tuning into a broadcast: immediate, legible, and purposeful. Buttons use a small press-in response, links reveal a signal-red underline, and program cards shift by a few pixels on hover as if the paper has been nudged. No interaction should obscure the content or require discovery to understand.

### Animation
Entrances use short opacity-and-translate reveals with a stagger of 40–70ms, like pages being laid on a desk. The live marker uses a restrained pulse, and the waveform motif moves only when the user hovers or focuses an audio/program element. Keep all motion under 300ms, use a custom ease-out, and disable non-essential motion under `prefers-reduced-motion`.

### Typography System
Use **Bodoni Moda** for large editorial headlines and **DM Sans** for interface copy, navigation, labels, and body text. Headlines are high-contrast, with occasional italic emphasis for program names. Body copy stays compact and readable at 16–18px. Metadata is uppercase, letter-spaced, and smaller, with the red signal accent used only for active states and key facts.

### Brand Essence
**Kasha Multimedia is an Ethiopian storytelling studio for people who want to hear, see, and preserve the ideas shaping their communities—different because it connects radio, culture, events, and documentary craft in one editorial platform.**

Personality: **observant, vivid, generous**.

### Brand Voice
Headlines are direct, atmospheric, and specific. CTAs sound like invitations into a story rather than software actions. Microcopy is warm but not chatty, and avoids claims that cannot be supported.

Example lines:
- “Stories with a pulse. Places with a memory.”
- “Tune into the voices shaping what comes next.”

### Wordmark & Logo
The wordmark should pair a compact geometric **K / signal** symbol with a restrained serif wordmark. The mark is a diagonal split: one side suggests a folded program sheet, the other a radio signal notch. It should work as a bold standalone red symbol on ivory and as a small monochrome favicon.

### Signature Brand Color
**Kasha Signal Red — `#D84C3A`.** It is ownable, highly legible on archive ivory, and visually connects live broadcast indicators with the warmth of Ethiopian earth pigments.

### Product / Information Architecture
The first delivery is a responsive single-page experience with clear anchors for **Home, About, Programs, Services, Journal, and Contact**. The homepage will foreground the proposal’s core themes: radio and online media, culture and indigenous knowledge, documentary storytelling, event promotion, and a set of named Kasha programs. It will use lightweight local content and remote image assets only; no backend or fabricated testimonials will be added.

### File-Level Reminder
Every new or edited CSS, component, and page file must begin with a short comment that names the **Broadcast Atelier** direction and describes that file’s role in maintaining warm editorial precision, asymmetry, and Kasha Signal Red hierarchy.
