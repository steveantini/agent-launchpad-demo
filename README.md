# IBM Custom Agents — Website Template

## Description

A reusable template for creating IBM legal department websites powered by **watsonx Orchestrate**. Each site provides Legal Associates with organized access to AI agents for contract review and legal inquiries.

This template includes:
- A main landing page with categorized agent cards
- A password-protected admin dashboard with adoption metrics and an Impact Calculator
- Embedded watsonx Orchestrate chat for each agent (fullscreen overlay)
- Carbon Design System styling aligned with watsonx Orchestrate
- Cursor IDE rules and skills for AI-assisted development

## Quick Start

1. Click **"Use this template"** on GitHub to create a new repository
2. Clone the new repo locally
3. Follow **[SETUP.md](SETUP.md)** to customize for your department

## Placeholders

Search and replace these placeholders throughout the project:

| Placeholder | Description | Example |
|-------------|-------------|---------|
| `{{SITE_TITLE}}` | Site title for header and page titles | `IP Law Custom Agents` |
| `{{DEPARTMENT_NAME}}` | Department name | `IP Law` |
| `{{ORCHESTRATION_ID}}` | watsonx Orchestrate instance ID | `20250729-1457-...` |
| `{{ADMIN_PASSWORD}}` | Admin dashboard password | `your-secure-password` |
| `{{CATEGORY_1_NAME}}` | First category section heading | `PATENT AGENTS` |
| `{{CATEGORY_2_NAME}}` | Second category section heading | `TRADEMARK AGENTS` |
| `{{AGENT_ID}}` | Agent ID (in agent embed pages) | `155363d1-12e8-...` |
| `{{AGENT_ENVIRONMENT_ID}}` | Agent environment ID (in agent embed pages) | `1cb05a09-a6c8-...` |
| `{{SUPPORT_SLACK_URL}}` | Slack profile URL for support contact | `https://ibm.enterprise.slack.com/team/...` |
| `{{SUPPORT_SLACK_NAME}}` | Slack display name for support contact | `@YourName` |
| `{{SUPPORT_EMAIL}}` | Email for support contact | `yourname@ibm.com` |
| `{{GITHUB_REPO_URL}}` | Repo clone URL | `git@github.ibm.com:user/repo.git` |
| `{{GITHUB_PAGES_URL}}` | GitHub Pages URL | `https://pages.github.ibm.com/user/repo/` |

## Features

### Main Website (`index.html`)
- **Agent Launchpad:** Categorized cards that open embedded watsonx Orchestrate chat
- **Carbon Design System Styling:** Dark header, squared UI, IBM Carbon color tokens
- **Header Branding:** "{{SITE_TITLE}} | powered by IBM watsonx Orchestrate BETA"
- **Welcome Modal:** Session-based email collection (once per browser tab)
- **Support Button:** Floating chat button with contact modal
- **Tips & Best Practices:** Guidance section for users
- **Auto-updating "Last Updated" date:** Uses `document.lastModified`
- **Back to Top:** Dynamic button on scroll

### Embedded Agent Pages (`agent-template.html`)
Minimal HTML pages that load the watsonx Orchestrate chat widget in fullscreen overlay mode. Copy `agent-template.html` for each new agent.

### Admin Dashboard (`admin.html`)
Password-protected panel with:
- **Adoption Metrics:** Key metrics, top users, clicks per agent (sample data until backend is deployed)
- **Impact Calculator:** Time & cost savings calculator with localStorage persistence
- **Report Export:** CSV export of calculator data

## File Structure

```
project-root/
├── index.html                          # Main landing page
├── admin.html                          # Admin dashboard
├── style.css                           # Shared styles (Carbon Design System)
├── script.js                           # Back-to-top button logic
├── README.md                           # This file
├── SETUP.md                            # Template setup guide
├── CHANGELOG.md                        # Version history
├── agent-template.html                 # Copy this for each new agent
├── wxO-embed-chat-security-tool.sh     # Embed security configuration tool
│
├── server/                             # Node.js analytics backend (future use)
│   ├── server.js
│   ├── database.js
│   ├── package.json
│   └── README.md
│
└── .cursor/                            # Cursor IDE AI configuration
    ├── rules/
    │   └── project-conventions.mdc     # Auto-applied project conventions
    └── skills/
        ├── add-agent/SKILL.md          # Guided workflow: add a new agent
        └── new-site-from-template/SKILL.md  # Guided workflow: set up new site
```

## Design System

This template follows IBM's **Carbon Design System**:

| Convention | Value |
|------------|-------|
| Border radius | `0` on all interactive elements |
| Header background | `#161616` (Gray 100) |
| Page background | `#f4f4f4` (Gray 10) |
| Primary blue | `#0f62fe` (Blue 60) |
| Badge color | `#4589ff` (Blue 50) |
| Text primary | `#161616` |
| Text secondary | `#525252` |
| Font | IBM Plex Sans (weights: 100, 300, 400, 600, 700) |

## Embedded Chat Security

> **WARNING:** Embedded chat security is DISABLED by default for GitHub Pages compatibility. Re-enable before deploying to any environment accessible outside IBM.

See `SETUP.md` Step 6 and the `wxO-embed-chat-security-tool.sh` script for details.

## Cursor AI Integration

This template includes Cursor IDE configuration:

- **Rules** — Auto-applied Carbon Design System conventions
- **Skills** — Guided workflows for adding agents and setting up new sites

## License

*Internal Use Only — IBM Legal and Regulatory Affairs.*
