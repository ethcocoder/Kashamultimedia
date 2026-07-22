# UI Documentation

## Table of Contents
1. [Design Tokens](#design-tokens)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Glass Morphism](#glass-morphism)
5. [Dark / Light Mode](#dark--light-mode)
6. [Language Toggle](#language-toggle)
7. [Animations & Keyframes](#animations--keyframes)
8. [Hero Section](#hero-section)
9. [Navbar](#navbar)
10. [Footer](#footer)
11. [Home Page Layout](#home-page-layout)
12. [Dashboard Admin Panel](#dashboard-admin-panel)
13. [Component Library](#component-library)
14. [Responsive Breakpoints](#responsive-breakpoints)
15. [CSS Classes Reference](#css-classes-reference)

---

## Design Tokens

All design values are defined as CSS custom properties in `:root` and overridden in `.dark`.

### Light Mode (default)

```css
--color-primary:    #3B82F6;   /* blue-500  — buttons, links, focus rings    */
--color-secondary:  #0F172A;   /* slate-900 — headings, dark text            */
--color-accent:     #F59E0B;   /* amber-500 — CTAs, highlights, badges       */
--color-surface:    #F8FAFC;   /* slate-50  — card backgrounds, inputs       */
--color-background: #FFFFFF;   /* page background                            */
--color-text:       #0F172A;   /* body text color                            */
--radius:           0.75rem;   /* default border radius                      */
```

### Dark Mode

```css
--color-surface:    #1E293B;   /* slate-800  — card/input backgrounds        */
--color-background: #0B1120;   /* deep navy  — page background               */
--color-text:       #F1F5F9;   /* slate-100  — body text                     */
--color-secondary:  #CBD5E1;   /* slate-300  — secondary headings            */
```

### Tailwind Theme Mapping

```js
// tailwind.theme extensions (via @theme in CSS)
"color-primary":   "var(--color-primary)",
"color-secondary": "var(--color-secondary)",
"color-accent":    "var(--color-accent)",
"color-surface":   "var(--color-surface)",
"color-base":      "var(--color-background)",
"color-ink":       "var(--color-text)",
"radius-theme":    "var(--radius)",
"font-display":    "var(--font-display)",
"font-body":       "var(--font-body)",
```

---

## Color System

### Primary Palette

| Token         | Light         | Dark          | Usage                              |
|---------------|---------------|---------------|------------------------------------|
| `primary`     | `#3B82F6`     | `#3B82F6`     | Buttons, links, focus rings, icons |
| `secondary`   | `#0F172A`     | `#CBD5E1`     | Headings (light) / body text (dark)|
| `accent`      | `#F59E0B`     | `#F59E0B`     | CTA buttons, badges, highlights    |

### Neutral Palette (hardcoded in components)

| Tailwind Class        | Hex / Value              | Usage                            |
|-----------------------|--------------------------|----------------------------------|
| `bg-white`            | `#FFFFFF`                | Light card surfaces              |
| `bg-slate-50`         | `#F8FAFC`                | Page sections (light)            |
| `bg-slate-900`        | `#0F172A`                | Footer, dark card surfaces       |
| `bg-slate-950`        | `#020617`                | Deepest admin background         |
| `text-white/75`       | `rgba(255,255,255,0.75)` | Body text on dark backgrounds    |
| `text-white/50`       | `rgba(255,255,255,0.50)` | Muted text, labels, captions     |
| `text-white/40`       | `rgba(255,255,255,0.40)` | Footer text, timestamps          |
| `text-white/30`       | `rgba(255,255,255,0.30)` | Placeholder text, section titles |
| `text-white/20`       | `rgba(255,255,255,0.20)` | Icon placeholders in inputs      |

### Semantic Colors

| Meaning         | Class / Value                    | Usage                          |
|-----------------|----------------------------------|--------------------------------|
| Success         | `text-green-400`, `bg-green-400/20` | Active badges, saved toast  |
| Warning         | `text-amber-400`                 | Pending states                 |
| Error / Danger  | `text-red-400`, `bg-red-500/10`  | Delete buttons, errors         |
| Info            | `text-blue-400`, `bg-blue-500/10`| Info badges                    |

---

## Typography

### Font Families

| Token           | Font Stack                        | Usage               |
|-----------------|-----------------------------------|----------------------|
| `font-display`  | `"Sora", sans-serif`              | Headings, nav, stats|
| `font-body`     | `"Inter", sans-serif`             | Body text, inputs   |

### Font Weights

| Weight  | Tailwind Class    | Usage                        |
|---------|-------------------|------------------------------|
| 400     | `font-normal`     | Body text                    |
| 500     | `font-medium`     | Nav links, badges            |
| 600     | `font-semibold`   | Subheadings, button text     |
| 700     | `font-bold`       | Headings, stat numbers       |
| 800     | `font-extrabold`  | Hero headline                |

### Scale

| Element          | Mobile                    | Desktop                     |
|------------------|---------------------------|-----------------------------|
| Hero headline    | `text-4xl` (2.25rem)      | `text-7xl` (4.5rem)         |
| Section title    | `text-2xl` (1.5rem)       | `text-3xl` (1.875rem)       |
| Card title       | `text-lg` (1.125rem)      | `text-xl` (1.25rem)         |
| Body text        | `text-base` (1rem)        | `text-lg` (1.125rem)        |
| Caption / label  | `text-xs` (0.75rem)       | `text-xs` (0.75rem)         |
| Stat number      | `text-3xl` (1.875rem)     | `text-4xl` (2.25rem)        |

---

## Glass Morphism

### Base Glass

```css
.glass {
  background: rgba(15, 23, 42, 0.65);
  backdrop-filter: blur(16px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
}
```

- **Dark override**: `rgba(11, 17, 32, 0.75)`, border `white/0.06`, stronger shadow
- **Used in**: Navbar, modal overlays, service cards, stat cards, footer quick links panel

### Strong Glass

```css
.glass-strong {
  background: rgba(255, 255, 255, 0.14);
  backdrop-filter: blur(24px) saturate(200%);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}
```

- **Dark override**: `rgba(11, 17, 32, 0.7)`, border `white/0.08`
- **Used in**: Hero stat cards, modal content panels

### Glass Usage Pattern

```jsx
{/* Nav / card */}
<div className="glass rounded-2xl p-6">...</div>

{/* Hero stat card */}
<div className="glass-strong stat-card rounded-2xl px-7 py-5">...</div>

{/* Modal backdrop */}
<div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" />

{/* Modal panel (desktop) */}
<div className="glass-strong rounded-2xl max-w-lg w-full">...</div>

{/* Modal panel (mobile) */}
<div className="glass-strong rounded-t-2xl max-w-lg w-full">...</div>
```

---

## Dark / Light Mode

### Mechanism

- Stored in `localStorage("darkMode")` as `"true"` / `"false"`
- Toggled via `DarkModeContext`
- Applied via `.dark` class on `<html>`
- Respects system preference on first visit via `prefers-color-scheme: dark`

### Transition

```css
body {
  transition: background-color 0.4s, color 0.4s;
}
```

All major surfaces use CSS custom properties that swap automatically:

| Element       | Light                    | Dark (.dark)                  |
|---------------|--------------------------|-------------------------------|
| Page bg       | `#FFFFFF`                | `#0B1120`                     |
| Cards         | `#F8FAFC`                | `rgba(11,17,32,0.75)` glass   |
| Navbar        | transparent (glass)      | `rgba(11,17,32,0.65)` glass   |
| Admin bg      | `#0B1120` (always dark)  | `#0B1120` (same)              |
| Footer        | `bg-slate-900`           | `bg-black/60`                 |
| Text          | `#0F172A`                | `#F1F5F9`                     |

### Toggle Button

```jsx
// Moon / Sun icon toggle in Navbar
<Moon className="w-5 h-5" />   // shown in light mode
<Sun className="w-5 h-5" />    // shown in dark mode
```

---

## Language Toggle

### Mechanism

- Stored in `localStorage("lang")` as `"en"` / `"am"`
- Managed by `LanguageContext` — provides `lang`, `setLang()`, `t(key)`
- `t(key)` returns the string for the current language from a flat translation map
- All bilingual content in Firestore stored as `{ en: "...", am: "..." }`

### Public Language Toggle (Navbar)

```jsx
<Globe className="w-5 h-5" />   // language icon button
```

Toggles between English and Amharic for the public site.

### Admin Language Toggle (Header)

```jsx
// Inline pill toggle in admin top bar
<button>EN</button>
<button>አማ</button>
```

Toggles all admin UI labels/headings.

### Content Form Language Toggle

```jsx
// Used in ServiceForm, BlogPostForm, EventForm, SiteSettings
<LanguageToggle value={formLang} onChange={setFormLang} />
```

Switches which language you're writing content in. Label shows active language:

```jsx
<label>Center Name <span className="text-white/20 text-xs">(English)</span></label>
```

### Translation Map Structure

```js
const translations = {
  en: {
    // Navigation
    home: "Home",
    aboutUs: "About Us",
    ourServices: "Our Services",
    blog: "Blog",
    events: "Events",
    contact: "Contact",

    // Hero
    heroTitle: "Building Digital Solutions",
    heroSubtitle: "...",
    exploreServices: "Explore Services",
    getInTouch: "Get In Touch",
    servicesLabel: "Services",
    youthCenter: "Youth Center",
    digitalAccess: "Digital Access",

    // Footer
    quickLinks: "Quick Links",
    servicesWeOffer: "Services",
    showMore: "Show more",
    contactInfo: "Contact Info",
    copyright: "All rights reserved.",

    // Admin panel (50+ keys)
    dashboard: "Dashboard",
    services: "Services",
    blog: "Blog",
    events: "Events",
    settings: "Settings",
    addNew: "Add New",
    edit: "Edit",
    delete: "Delete",
    saveChanges: "Save",
    cancel: "Cancel",
    // ... etc
  },
  am: {
    home: "መነሻ",
    aboutUs: "ስለ እኛ",
    ourServices: "አገልግሎቶችን",
    // ... (full Amharic equivalents)
  }
};
```

---

## Animations & Keyframes

### Named Keyframes

| Name            | Effect                                      | Duration   |
|-----------------|---------------------------------------------|------------|
| `fadeInUp`      | Fade in + translate up 24px                 | 0.7s       |
| `fadeIn`        | Fade in                                     | 0.6s       |
| `slideInLeft`   | Slide in from left 30px                     | 0.6s       |
| `slideInRight`  | Slide in from right 30px                    | 0.6s       |
| `scaleIn`       | Scale up from 0.9 + fade in                 | 0.5s       |
| `shimmer`       | Gradient text shimmer (hero)                | 6s loop    |
| `float-morph`   | Floating shape drift + morph                | 20s loop   |
| `morph-slow`    | Border-radius morphing                      | 12s loop   |
| `pulse-glow`    | Box-shadow pulse                            | 4s loop    |
| `orbit`         | Orbital rotation                            | infinite   |
| `spin`          | Loader spinner                              | 1s linear  |

### Animation Utility Classes

```html
<div class="animate-fade-in-up">...</div>
<div class="animate-fade-in">...</div>
<div class="animate-slide-left">...</div>
<div class="animate-slide-right">...</div>
<div class="animate-scale-in">...</div>
```

### Staggered Delays

```html
<div class="animate-fade-in-up animate-delay-1">  <!-- 0.1s -->
<div class="animate-fade-in-up animate-delay-2">  <!-- 0.2s -->
<div class="animate-fade-in-up animate-delay-3">  <!-- 0.3s -->
<div class="animate-fade-in-up animate-delay-4">  <!-- 0.4s -->
<div class="animate-fade-in-up animate-delay-5">  <!-- 0.5s -->
```

### Floating Shapes (Hero Background)

Three blurred radial gradient circles that drift and morph:

| Shape         | Size    | Color                        | Position        |
|---------------|---------|------------------------------|-----------------|
| Shape 1       | 400px   | `blue-500 @ 0.5`            | Top-right       |
| Shape 2       | 300px   | `amber-500 @ 0.4`           | Bottom-left     |
| Shape 3       | 200px   | `violet-500 @ 0.35`         | Mid-right       |

- Dark mode: opacity reduced to `0.2`
- All use `filter: blur(60px)`, `pointer-events: none`

---

## Hero Section

### Structure

```
<section class="relative hero-bg min-h-screen flex items-center overflow-hidden">
  ├── .hero-overlay (gradient overlay)
  ├── .floating-shape × 3 (decorative blobs)
  ├── .orbit-ring × 2 (decorative circles, lg+ only)
  ├── Content container
  │   ├── Pill badge (glass, ping dot, location text)
  │   ├── Heading (gradient-text-hero, shimmer)
  │   ├── Subtitle (text-white/75)
  │   ├── Stat cards (glass-strong + stat-card, 3 items)
  │   │   ├── Services count (blue icon)
  │   │   ├── Youth Center (amber icon)
  │   │   └── 24/7 Access (green icon)
  │   └── CTA buttons
  │       ├── Primary (accent bg, btn-glow, ArrowRight icon)
  │       └── Secondary (glass, white text)
  └── Bottom gradient fade (→ base background)
</section>
```

### Background

```css
.hero-bg {
  background-image: url('/background-image.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;          /* parallax on scroll */
}
```

### Overlay Gradient

```css
/* Light mode */
background: linear-gradient(
  160deg,
  rgba(11, 17, 32, 0.88) 0%,      /* dark navy — top-left */
  rgba(59, 130, 246, 0.45) 40%,   /* blue wash — center */
  rgba(245, 158, 11, 0.2) 60%,    /* amber glow — lower-right */
  rgba(11, 17, 32, 0.92) 100%     /* dark navy — bottom */
);

/* Dark mode — more opaque */
background: linear-gradient(
  160deg,
  rgba(11, 17, 32, 0.95) 0%,
  rgba(59, 130, 246, 0.35) 40%,
  rgba(245, 158, 11, 0.15) 60%,
  rgba(11, 17, 32, 0.97) 100%
);
```

### Hero Text Gradient (shimmer)

```css
.gradient-text-hero {
  background: linear-gradient(135deg, #FFFFFF 0%, #E0E7FF 30%, #FDE68A 70%, #FFFFFF 100%);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer 6s ease-in-out infinite;
}
```

### Stat Card

```html
<div class="glass-strong stat-card rounded-2xl px-7 py-5 text-center min-w-[130px]">
  <div class="w-10 h-10 mx-auto mb-3 rounded-xl bg-primary/20 flex items-center justify-center">
    <Icon class="w-5 h-5 text-primary" />
  </div>
  <p class="font-display font-bold text-3xl md:text-4xl text-white">{number}+</p>
  <p class="text-xs text-white/50 mt-1.5 uppercase tracking-widest font-medium">{label}</p>
</div>
```

- Applies both `morph-slow` (12s) and `pulse-glow` (4s) animations
- Staggered `animation-delay` per child: `-3s`, `-6s`

---

## Navbar

### Behavior

- Starts transparent, gets `.glass` background on scroll (`scrolled` state)
- Fixed top: `fixed top-0 left-0 right-0 z-50`
- Transition: `transition-all duration-300`
- Padding: `py-4` (default) → `py-3` (scrolled)

### Layout

```
<nav class="fixed top-0 left-0 right-0 z-50 {glass on scroll}">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
    ├── Logo (primary bg, white text, rounded-lg, font-display font-bold)
    ├── Desktop links (hidden md:flex, gap-8, font-medium, text-white/75 hover:text-white)
    ├── Right controls
    │   ├── Language toggle (Globe icon)
    │   ├── Dark mode toggle (Moon/Sun icon)
    │   └── Contact button (accent bg, hidden sm:inline-flex)
    └── Mobile hamburger (md:hidden, Menu icon)
  </div>
</nav>
```

### Mobile Menu

- Slides in from right (`translate-x-full` → `translate-x-0`)
- Full height, glass background, z-50
- X close button top-right
- Links stacked vertically, large touch targets

---

## Footer

### Layout

```
<footer class="relative bg-slate-900 dark:bg-black/60 text-white mt-auto overflow-hidden">
  ├── Top accent bar (h-1, gradient primary → accent → primary)
  └── Grid (4 columns on md+)
      ├── Brand column
      │   ├── Logo + center name
      │   └── About text (first 150 chars)
      ├── Quick Links
      │   ├── About Us → /about
      │   ├── Our Services → /services
      │   ├── Blog → /blog
      │   ├── Events → /events
      │   └── Contact → /contact
      ├── Services We Offer (dynamic from CMS)
      │   ├── Up to 5 services from Firestore
      │   ├── External link if websiteUrl set, else internal link
      │   └── "Show more →" link if >5 services
      └── Contact Info
          ├── Address (MapPin icon)
          ├── Phone (Phone icon)
          ├── Email (Mail icon)
          └── Social links (Globe, Send, AtSign icons)
```

### Bottom Bar

```html
<div class="border-t border-white/10 mt-10 pt-6 flex items-center justify-between text-xs text-white/40">
  <p>© {year} {centerName}. All rights reserved.</p>
  <p>Made with ❤️ by Woreda 4 IT Team</p>
</div>
```

---

## Home Page Layout

### Section Order

```
1. Hero              (full screen, parallax bg, floating shapes)
2. Services Grid     (glass cards, 1→2→3 col grid, external/internal links)
3. Announcements     (latest posts feed)
4. About section     (text + dot pattern bg)
5. Contact section   (form + map embed)
6. Footer            (4-column grid)
```

### Services Grid Card

```html
<div class="glass card-hover rounded-2xl p-6 group cursor-pointer">
  <div class="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
    <Icon class="w-7 h-7 text-primary" />
  </div>
  <h3 class="font-display font-semibold text-lg mb-2">{title}</h3>
  <p class="text-sm text-white/50 mb-4 line-clamp-3">{description}</p>
  {hasWebsiteUrl && (
    <a href="{url}" target="_blank" class="text-xs text-primary font-medium hover:text-accent">
      Visit Site →
    </a>
  )}
</div>
```

---

## Dashboard Admin Panel

### Layout Structure

```
<div class="min-h-screen bg-[#0B1120] flex">
  ├── Sidebar (fixed left, collapsible)
  │   ├── Logo (72px wide when collapsed, 256px when expanded)
  │   ├── Nav items (icon + label, active = bg-primary/10 text-primary)
  │   ├── Tooltip on hover when collapsed
  │   └── Toggle button (PanelLeftClose / PanelLeftOpen)
  ├── Main content
  │   ├── Top bar (sticky)
  │   │   ├── Hamburger (mobile/tablet only)
  │   │   ├── Breadcrumbs
  │   │   ├── Language toggle (EN/አማ)
  │   │   ├── Search placeholder
  │   │   ├── Notification bell
  │   │   └── Profile dropdown
  │   └── Page content (<Outlet />)
  └── (bottom gradient bar not in admin — public-only)
```

### Sidebar States

| Breakpoint     | Behavior                                  |
|----------------|-------------------------------------------|
| < 1024px       | Hidden off-screen, overlay + backdrop blur|
| 1024–1279px    | Auto-collapsed (icons only, 72px)         |
| ≥ 1280px       | Full expanded (256px), toggle available    |

- State persisted in `localStorage("admin-sidebar-collapsed")`
- Collapsed: tooltips appear on icon hover

### Sidebar Item

```html
<a class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm
          text-white/50 hover:text-white hover:bg-white/5
          transition-all group">
  <Icon class="w-5 h-5 shrink-0" />
  <span class="hidden xl:block truncate">{label}</span>
</a>

<!-- Active state -->
<a class="... bg-primary/10 text-primary">
```

### Dashboard Stat Cards

```html
<div class="admin-stat-card">
  <div class="flex items-center gap-3 mb-3">
    <div class="w-10 h-10 rounded-xl bg-{color}/10 flex items-center justify-center">
      <Icon class="w-5 h-5 text-{color}" />
    </div>
    <div>
      <p class="text-xs text-white/40 uppercase tracking-wider">{label}</p>
      <p class="font-display font-bold text-2xl text-white">{number}</p>
    </div>
  </div>
</div>
```

- Color per card: `blue` (services), `green` (blog), `amber` (events), `violet` (settings)
- Grid: `grid-cols-2 lg:grid-cols-4 gap-4`

### Admin List Item

```html
<div class="admin-list-item">
  <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
    <Icon class="w-5 h-5 text-primary" />
  </div>
  <div class="flex-1 min-w-0">
    <p class="font-medium text-sm text-white truncate">{title}</p>
    <p class="text-xs text-white/40 mt-0.5">{date}</p>
  </div>
  <div class="flex items-center gap-2 shrink-0">
    <button class="p-1.5 text-white/30 hover:text-white/60"><EditIcon /></button>
    <button class="p-1.5 text-white/30 hover:text-red-400"><TrashIcon /></button>
  </div>
</div>
```

### Admin Background

Admin pages always use `bg-[#0B1120]` regardless of dark/light mode setting. This is hardcoded via the `ProtectedRoute` wrapper and `AdminLayout`.

---

## Component Library

### Button

| Variant     | Classes                                              | Usage           |
|-------------|------------------------------------------------------|-----------------|
| `primary`   | `bg-primary text-white rounded-xl shadow-lg shadow-primary/20` | Primary CTA |
| `accent`    | `bg-accent text-secondary rounded-2xl shadow-accent/30` | Hero CTA   |
| `glass`     | `glass text-white rounded-2xl`                       | Secondary CTA   |
| `danger`    | `bg-red-500/10 text-red-400 border border-red-500/20` | Delete action |

- All buttons: `active:scale-[0.97]` press feedback
- `btn-glow` class adds radial gradient hover glow overlay
- Disabled: `disabled:opacity-40 disabled:pointer-events-none`

### Modal

```html
{/* Backdrop */}
<div class="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 animate-fade-in" />

{/* Desktop: centered */}
<div class="glass-strong rounded-2xl max-w-lg w-full mx-4 animate-scale-in
            sm:items-center sm:flex">

{/* Mobile: bottom sheet */}
<div class="glass-strong rounded-t-2xl max-w-lg w-full mx-4 animate-fade-in-up
            fixed bottom-0 items-end sm:items-center sm:flex">
```

- Close on `Escape` key or backdrop click
- Close button: `X` icon, top-right, `text-white/40 hover:text-white`

### Badge / Pill

```html
<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium
             bg-green-400/10 text-green-400">
  <span class="w-1.5 h-1.5 rounded-full bg-green-400" />
  Active
</span>
```

Colors: `green` (active/published), `amber` (pending), `red` (inactive/deleted), `blue` (draft)

### Image Uploader

```html
<div class="glass rounded-xl p-4">
  {preview ? (
    <img src={preview} class="w-full h-48 object-cover rounded-lg" />
  ) : (
    <div class="h-48 rounded-lg border-2 border-dashed border-white/10 flex flex-col items-center justify-center">
      <Upload class="w-8 h-8 text-white/20 mb-2" />
      <p class="text-sm text-white/40">Click or drag to upload</p>
    </div>
  )}
</div>
```

- Uploads via `POST /api/upload` (local to `public/uploads/`)

### Language Toggle (Forms)

```html
<div class="flex rounded-xl bg-white/5 p-0.5">
  <button class="px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                 bg-primary text-white">
    EN
  </button>
  <button class="px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                 text-white/40 hover:text-white/60">
    አማ
  </button>
</div>
```

---

## Responsive Breakpoints

| Breakpoint   | Width     | Tailwind   | Behavior                              |
|--------------|-----------|------------|---------------------------------------|
| Mobile       | < 640px   | default    | Single column, stacked layouts        |
| Tablet       | ≥ 640px   | `sm:`      | 2-col grids, larger padding           |
| Laptop       | ≥ 768px   | `md:`      | Desktop nav visible, 2–3 col grids    |
| Desktop      | ≥ 1024px  | `lg:`      | Sidebar collapses, 3–4 col grids      |
| Wide         | ≥ 1280px  | `xl:`      | Full sidebar, max content width       |

### Admin Responsive Classes

```css
.admin-stat-card  { padding: 1rem }           /* mobile */
@media sm        { admin-stat-card  { padding: 1.25rem } }
@media lg        { admin-stat-card  { padding: 1.5rem } }

.admin-list-item  { padding: 0.75rem; gap: 0.625rem }  /* mobile */
@media sm        { admin-list-item  { padding: 0.875rem 1rem; gap: 0.75rem } }
@media lg        { admin-list-item  { padding: 1rem 1.25rem; gap: 1rem } }

.admin-input      { padding: 0.5rem 0.75rem; font-size: 0.8125rem; border-radius: 0.625rem }
@media sm        { admin-input      { padding: 0.625rem 0.875rem; font-size: 0.875rem; border-radius: 0.75rem } }

.admin-label      { font-size: 0.6875rem; margin-bottom: 0.375rem }
@media sm        { admin-label      { font-size: 0.75rem; margin-bottom: 0.5rem } }
```

---

## CSS Classes Reference

### Utility Classes

| Class               | Definition                                              |
|---------------------|---------------------------------------------------------|
| `.glass`            | Navy dark glass (blur, saturate, border, shadow)        |
| `.glass-strong`     | Stronger glass (more blur, brighter border)             |
| `.card-hover`       | `translateY(-6px)` + blue shadow on hover               |
| `.gradient-text`    | `primary → accent` gradient text fill                   |
| `.gradient-text-hero` | White → indigo → gold → white shimmer gradient       |
| `.btn-glow`         | Radial gradient glow overlay on hover                   |
| `.stat-card`        | `morph-slow` + `pulse-glow` animation combo             |
| `.dot-pattern`      | Blue dot grid background (24px spacing)                 |
| `.section-divider`  | Bottom gradient line (primary → accent, 120px wide)    |

### Admin Utility Classes

| Class               | Definition                                     |
|---------------------|------------------------------------------------|
| `.admin-input`      | Dark glass input (white/0.05 bg, white/0.1 border) |
| `.admin-label`      | Uppercase small label (white/0.5, 0.6875rem)   |
| `.admin-checkbox`   | Custom checkbox (white/0.2 border, primary fill)|
| `.admin-stat-card`  | Stat card with hover lift + shadow              |
| `.admin-list-item`  | List row with icon, text, actions               |

### Decorative Classes

| Class               | Effect                                         |
|---------------------|------------------------------------------------|
| `.floating-shape`   | Absolutely positioned blurred gradient circle  |
| `.floating-shape-1` | 400px blue, top-right                          |
| `.floating-shape-2` | 300px amber, bottom-left                       |
| `.floating-shape-3` | 200px violet, mid-right                        |
| `.hero-bg`          | Fixed background image cover                   |
| `.hero-overlay`     | 4-stop gradient overlay (160deg)               |

---

## File Reference

| File                          | Purpose                                    |
|-------------------------------|--------------------------------------------|
| `src/styles/index.css`        | All CSS tokens, keyframes, utility classes |
| `src/contexts/DarkModeContext.jsx` | Dark/light mode toggle + localStorage |
| `src/contexts/LanguageContext.jsx` | Translation map (100+ keys, EN + AM) |
| `src/contexts/SidebarContext.jsx`  | Sidebar collapse/mobile state          |
| `src/contexts/ThemeContext.jsx`    | Firestore-driven brand color theming  |
| `src/components/layout/Navbar.jsx` | Fixed glass navbar                    |
| `src/components/layout/Footer.jsx` | 4-column footer with dynamic services|
| `src/components/home/Hero.jsx`     | Hero with parallax, morph shapes     |
| `src/components/home/ServicesGrid.jsx` | Glass service cards              |
| `src/components/admin/AdminLayout.jsx` | Admin wrapper (top bar + Outlet)  |
| `src/components/admin/AdminSidebar.jsx` | Collapsible sidebar            |
| `src/components/admin/LanguageToggle.jsx` | EN/AM toggle for forms       |
| `src/components/ui/Modal.jsx`      | Mobile bottom-sheet / desktop centered   |
| `src/components/ui/ImageUploader.jsx` | Local file upload component          |
