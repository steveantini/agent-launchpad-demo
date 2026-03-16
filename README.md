# Agent Launchpad — Website Template

## Description

A reusable, **platform-agnostic** template for creating agent launchpad websites. Provides organized access to AI agents through a modern web interface — works with any agent platform (watsonx Orchestrate, Dialogflow, Botpress, custom, or simple links).

This template includes:
- A main landing page with categorized agent cards
- A password-protected admin dashboard with adoption metrics and a Productivity Gains Calculator
- Configurable agent embedding (watsonx, iframe, custom script, or external links)
- A theme engine with built-in presets (Carbon, Modern, Minimal) or fully custom theming
- AI assistant conventions and skills for AI-assisted development

## Quick Start

1. Click **"Use this template"** on GitHub to create a new repository
2. Clone the new repo locally
3. Edit **`config.js`** to set your branding, theme, and agent platform
4. Follow **[SETUP.md](SETUP.md)** for detailed customization

## Configuration (`config.js`)

All site settings are centralized in a single file:

| Setting | Description | Example |
|---------|-------------|---------|
| `companyName` | Your company name | `"Acme Corp"` |
| `siteTitle` | Header title | `"AI Agent Hub"` |
| `departmentName` | Department name | `"Operations"` |
| `themePreset` | Visual theme | `"carbon"`, `"modern"`, `"minimal"`, `"custom"` |
| `agentPlatform` | How agents are loaded | `"watsonx"`, `"iframe"`, `"script"`, `"link"` |
| `adminPassword` | Admin dashboard password | `"your-secure-password"` |
| `calculator.costPerUserPerYear` | Platform cost for ROI calc | `500` |
| `storagePrefix` | localStorage key prefix | `"mysite_"` |

### Template Placeholders

These placeholders remain in HTML files for per-page customization:

| Placeholder | Description |
|-------------|-------------|
| `{{CATEGORY_1_NAME}}` | First category section heading |
| `{{CATEGORY_2_NAME}}` | Second category section heading |
| `{{AGENT_TITLE}}` | Agent page title (in agent-template.html) |
| `{{AGENT_ID}}` | Agent ID (watsonx platform) |
| `{{AGENT_ENVIRONMENT_ID}}` | Agent environment ID (watsonx platform) |
| `{{AGENT_URL}}` | Agent URL (iframe/link platform) |

## Features

### Main Website (`index.html`)
- **Agent Launchpad:** Categorized cards linking to agent experiences
- **Configurable Theme:** Switch between Carbon, Modern, Minimal, or fully custom styling
- **Dynamic Header:** Branding populated from `config.js`
- **Welcome Modal:** Session-based email collection (once per browser tab)
- **Support Button:** Floating chat button with contact modal
- **Tips & Best Practices:** Guidance section for users
- **Auto-updating "Last Updated" date:** Uses `document.lastModified`

### Agent Embed Pages (`agent-template.html`)
Platform-agnostic agent pages that load the appropriate embed based on `config.js`:
- **watsonx:** Loads the watsonx Orchestrate chat widget
- **iframe:** Embeds any agent via iframe URL
- **script:** Loads a custom embed script
- **link:** Redirects to an external URL

### Admin Dashboard (`admin.html`)
Password-protected panel with:
- **Adoption Metrics:** Key metrics, top users, clicks per agent (sample data until backend is deployed)
- **Productivity Gains Calculator:** Time & cost savings calculator with localStorage persistence
- **Report Export:** CSV export of calculator data

## File Structure

```
project-root/
├── index.html                          # Main landing page
├── admin.html                          # Admin dashboard
├── config.js                           # Site configuration (branding, theme, platform)
├── style.css                           # Shared styles (theme-aware CSS variables)
├── script.js                           # Back-to-top button logic
├── README.md                           # This file
├── SETUP.md                            # Template setup guide
├── CHANGELOG.md                        # Version history
├── agent-template.html                 # Copy this for each new agent
├── wxO-embed-chat-security-tool.sh     # Embed security tool (watsonx only)
│
├── server/                             # Node.js analytics backend (future use)
│   ├── server.js
│   ├── database.js
│   ├── package.json
│   └── README.md
│
├── CLAUDE.md                           # AI assistant conventions
└── .claude/                            # AI assistant configuration
    └── skills/
        └── add-agent.md                # Guided workflow: add a new agent
```

## Theme Presets

| Preset | Primary Color | Font | Border Radius | Header |
|--------|---------------|------|---------------|--------|
| `carbon` | `#0f62fe` | IBM Plex Sans | `0px` | Dark (`#161616`) |
| `modern` | `#6366f1` | Inter | `8px` | Dark Indigo (`#1e1b4b`) |
| `minimal` | `#18181b` | DM Sans | `6px` | Light (`#fafafa`) |
| `custom` | Your choice | Your choice | Your choice | Your choice |

## Embedded Chat Security (watsonx only)

> **WARNING:** Embedded chat security is DISABLED by default for GitHub Pages compatibility. Re-enable before deploying to any environment accessible outside your organization.

See `SETUP.md` Step 5 and the `wxO-embed-chat-security-tool.sh` script for details.

## AI Assistant Integration

This template includes AI assistant configuration:

| Type | Path | Description |
|------|------|-------------|
| Conventions | `CLAUDE.md` | Always-on. Enforces design system conventions, CSS tokens, file naming, and commit style. |
| Skill | `.claude/skills/add-agent.md` | On-demand. Guided workflow for adding a new agent. |

## License

Open source — use and customize freely.
