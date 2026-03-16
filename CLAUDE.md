# Agent Launchpad Template — Project Conventions

## Design System

This site uses a **configurable theme engine** defined in `config.js`. All colors, fonts, and border radius are driven by CSS custom properties set at runtime.

- **Border radius**: Controlled by `--radius` (default `0px` in Carbon preset)
- **Header**: Sticky header styled by `--header-bg` / `--header-text`
- **Page background**: `var(--bg-page)`
- **Card hover effects**: Preserve existing card styling — do not modify

## CSS Variables (defined in `style.css`, overridden by `config.js`)

| Token | Default (Carbon) | Usage |
|-------|-------------------|-------|
| `--color-primary` | `#0f62fe` | Primary actions, links |
| `--color-primary-hover` | `#0043ce` | Hover state for primary |
| `--color-accent` | `#4589ff` | Badge, gradients |
| `--text-primary` | `#161616` | Headings, body text |
| `--text-secondary` | `#525252` | Subheadings, labels |
| `--text-helper` | `#6f6f6f` | Helper/muted text |
| `--header-bg` | `#161616` | Header background |
| `--bg-page` | `#f4f4f4` | Page background |
| `--radius` | `0px` | Border radius for interactive elements |
| `--font-family` | `'Inter'` | Site font |

## Theme Presets

Three built-in presets in `config.js`: `carbon`, `modern`, `minimal`. Set `themePreset: "custom"` and fill in the `custom` object to define your own.

## Font Weights

| Weight | Usage |
|--------|-------|
| 100 (Thin) | "powered by" in header |
| 400 (Regular) | Body text, titles |
| 600 (Semi-Bold) | Buttons, labels |
| 700 (Bold) | Branding text |

## File Naming

- Agent pages: `agent-{category}-{type}.html` (e.g., `agent-compliance-vendor.html`)
- All agent pages load `config.js` which determines the embed platform

## Configuration

All branding, theming, and platform settings live in `config.js`:
- `SITE_CONFIG.siteTitle` — page header title
- `SITE_CONFIG.companyName` — company name
- `SITE_CONFIG.themePreset` — `"carbon"`, `"modern"`, `"minimal"`, or `"custom"`
- `SITE_CONFIG.agentPlatform` — `"widget"`, `"iframe"`, `"script"`, or `"link"`
- `SITE_CONFIG.storagePrefix` — localStorage/sessionStorage key prefix

HTML uses `data-bind` attributes for dynamic text injection from config.

## Commit Style

- Small, focused commits with descriptive messages
- Use HEREDOC format for multi-line commit messages

## Key Behaviors

- The "Last updated" date in index.html auto-updates via `document.lastModified` — never hardcode it
- Productivity Gains Calculator data auto-saves to `localStorage` (key: `{storagePrefix}calculator_data`)
- Welcome modal shows once per browser session (`sessionStorage`)
- Admin page mirrors main page header (only badge text differs)

## Documentation Sync

When adding, removing, or modifying skills in `.claude/`, update the following to reflect the change:
- The **"AI Assistant Integration"** section in `README.md` (including the summary table)
- The **file structure tree** in `README.md`
- The **"AI Assistant Integration"** section in `SETUP.md`
