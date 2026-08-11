---
name: material-3-pages
description: Comprehensive design system and engineering guide for building modern Material Design 3 (Material You, M3 Expressive, and @material/web) web applications and pages. Includes dynamic color tokens, surface container hierarchy, baseline & 15 emphasized typography scales, organic shape morphing, physics-based expressive motion, Wavy Scalloped Circular & Linear Progress Indicators, Web Components (<md-*>) & React/TypeScript integration, component specs, and automated token generator scripts. Use when asked to create, design, or update Material 3 / Material You / M3 Expressive pages, web components, or dashboards.
---

# Material Design 3 (Material You, M3 Expressive & Material Web) Pages

A complete, production-grade guide and specification for designing and engineering web applications according to **Google Material Design 3, M3 Expressive, and Material Web Components (`@material/web`)** specs ([m3.material.io/develop/web](https://m3.material.io/develop/web)).

---

## 🛠️ Automated Token Generator (Baseline & Expressive)

Generate complete, mathematically harmonic M3 & M3 Expressive CSS tokens for Light and Dark modes from any seed color using the standard Python script:

```bash
# Baseline M3 Tokens
python .agents/skills/material-3-pages/scripts/generate_m3_tokens.py --seed "#6750A4" > m3-tokens.css

# 🔥 M3 Expressive Tokens (High Chroma + Emphasized Typography & Motion)
python .agents/skills/material-3-pages/scripts/generate_m3_tokens.py --seed "#6750A4" --expressive > m3-expressive-tokens.css
```

---

## 🎨 Core Design Tokens Architecture

Material 3 replaces static styles with a semantic token hierarchy: **Reference Tokens → System Tokens → Component Tokens**.

### 1. Dynamic Color Roles & Contrast Pairings

Every background role has a strictly paired `on-*` color token for WCAG AA+ contrast compliance:

| Color Role | Purpose | On-Color Token (Content) |
|------------|---------|-------------------------|
| `primary` | High-emphasis actions, active states, key buttons | `on-primary` |
| `primary-container` | Standout card fills, selected tabs, hero banners | `on-primary-container` |
| `secondary` | Less prominent components, filter chips, secondary buttons | `on-secondary` |
| `secondary-container` | Selected navigation items, badge containers | `on-secondary-container` |
| `tertiary` | Accent elements, vibrant highlights, notifications | `on-tertiary` |
| `tertiary-container` | Highlighted callouts, dynamic badges | `on-tertiary-container` |
| `error` | Warning & error states, deletion confirmation | `on-error` |
| `error-container` | Error alerts, inline validation banners | `on-error-container` |
| `surface` | Main page background canvas | `on-surface` |
| `surface-variant` | Input fields, unselected cards, dividers | `on-surface-variant` |
| `outline` | Structural borders, text field borders | — |
| `outline-variant` | Soft card dividers, subtle borders | — |

#### 🏢 Surface Container Hierarchy (M3 Depth System)

M3 deprecates reliance on heavy drop shadows in favor of **Tonal Surface Containers**:

```css
:root {
  --md-sys-color-surface-container-lowest:  #ffffff; /* Flat cards on tinted background */
  --md-sys-color-surface-container-low:     #f5f5f5; /* Subtle section grouping */
  --md-sys-color-surface-container:         #f0eff0; /* Default card fill */
  --md-sys-color-surface-container-high:    #eaeaeb; /* Modals, popovers, dropdowns */
  --md-sys-color-surface-container-highest: #e5e5e6; /* Active inputs, high-contrast cards */
}
```

---

### 2. Typography Scale (Baseline & 🔥 15 Emphasized Styles)

Import standard Material fonts (`Google Sans`, `Google Sans Text`, or `Roboto`):

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;700&family=Google+Sans+Text:wght@400;500;700&display=swap" rel="stylesheet">
```

M3 Expressive introduces **15 Emphasized Type Styles** (weight 700 / bold variable settings) for high-impact editorial moments and emotional resonance:

| Role | Baseline Token | Emphasized Token (M3 Expressive) | Weight / Size / Line Height |
|------|----------------|----------------------------------|-----------------------------|
| **Display Large** | `--md-sys-typescale-display-large` | `--md-sys-typescale-display-large-emphasized` | 700 / 57px / 64px |
| **Headline Large** | `--md-sys-typescale-headline-large` | `--md-sys-typescale-headline-large-emphasized` | 700 / 32px / 40px |
| **Title Large** | `--md-sys-typescale-title-large` | `--md-sys-typescale-title-large-emphasized` | 700 / 22px / 28px |
| **Body Large** | `--md-sys-typescale-body-large` | `--md-sys-typescale-body-large-emphasized` | 700 / 16px / 24px |
| **Label Large** | `--md-sys-typescale-label-large` | `--md-sys-typescale-label-large-emphasized` | 700 / 14px / 20px |

---

### 3. 🔥 M3 Expressive Wavy Progress Indicators

M3 Expressive replaces traditional rigid rings and bars with **Scalloped / Wavy Progress Indicators**:

#### 🌊 Wavy Circular Progress Ring (Scalloped Geometry)
Parameterized polar curve: $r(\theta) = R + A \cdot \sin(N \cdot \theta)$

```jsx
// React Component Usage: M3CircularProgress.jsx
<M3CircularProgress
  progress={progressPercentage} // 0..100 or null for indeterminate
  variant="wavy"
  size={112}
  strokeWidth={5}
  amplitude={3.5}  // Scallop wave height
  waves={10}       // Number of scalloped lobes
/>
```

#### 🌊 Wavy Linear Progress Bar (Sine Wave Geometry)

```jsx
// React Component Usage: M3LinearProgress.jsx
<M3LinearProgress
  progress={progressPercentage}
  variant="wavy"
  amplitude={2.5}
  wavelength={20}
/>
```

---

## ⚡ Option A: Material Web Components (`@material/web`)

Google's official web components library provides native `<md-*>` custom elements that bind directly to M3 CSS system tokens.

### 1. Custom Elements Reference Table

| Category | Component Tag | Key Attributes |
|----------|---------------|----------------|
| **Buttons** | `<md-filled-button>`, `<md-outlined-button>`, `<md-elevated-button>`, `<md-tonal-button>`, `<md-text-button>` | `disabled`, `has-icon`, `trailing-icon` |
| **FAB** | `<md-fab>` | `variant="primary \| surface \| secondary"`, `label="..."` |
| **Input Fields** | `<md-outlined-text-field>`, `<md-filled-text-field>` | `label="..."`, `value="..."`, `error`, `error-text="..."`, `type="text \| password \| email"` |
| **Selection** | `<md-switch>`, `<md-checkbox>`, `<md-radio>`, `<md-slider>` | `selected`, `checked`, `disabled` |
| **Progress** | `<md-circular-progress>`, `<md-linear-progress>` | `indeterminate`, `value="0.75"`, `four-color` |
