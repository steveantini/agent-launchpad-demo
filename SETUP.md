# Template Setup Guide

This guide walks you through setting up a new agent launchpad website from this template.

## Quick Start

1. Click **"Use this template"** on GitHub to create a new repository
2. Clone your new repository locally
3. Follow the steps below to customize

---

## Step 1: Configure Branding & Theme (`config.js`)

Open `config.js` and update the settings:

```javascript
const SITE_CONFIG = {
    companyName: "Your Company",
    siteTitle: "Your Agent Hub",
    departmentName: "Your Department",
    poweredByText: "powered by AI Agents",
    badgeText: "BETA",
    themePreset: "carbon",  // or "modern", "minimal", "custom"
    adminPassword: "your-secure-password",
    // ...
};
```

### Theme Options

- `"carbon"` — IBM-style squared UI with dark header
- `"modern"` — Rounded corners, indigo palette
- `"minimal"` — Clean, light header, neutral palette
- `"custom"` — Fill in the `custom` object with your own colors and font

## Step 2: Choose Your Agent Platform

In `config.js`, set `agentPlatform`:

| Platform | Description | Required Config |
|----------|-------------|-----------------|
| `"link"` | Agent cards open URLs in new tabs (default) | Card `href` attributes |
| `"iframe"` | Embed agents via iframe | `agentDefaults.iframeBaseURL` or per-page `data-agent-url` |
| `"watsonx"` | IBM watsonx Orchestrate widget | `agentDefaults.hostURL`, `agentDefaults.orchestrationID` |
| `"script"` | Load a custom embed script | `agentDefaults.embedScriptURL` |

## Step 3: Set Up Agent Categories

In `index.html`, you'll find three category sections. Customize them:

```html
<div class="section">
    <h2>YOUR CATEGORY NAME</h2>
    <div class="icon-grid">
        <!-- Add agent cards here -->
    </div>
</div>
```

You can add, remove, or rename category sections as needed.

## Step 4: Add Agents

For each agent you want to include:

### 4a. Create the Agent Embed Page

1. Copy `agent-template.html` to a new file (e.g., `agent-compliance-vendor.html`)
2. Replace `{{AGENT_TITLE}}` with the agent name
3. Set the appropriate data attributes on the `#root` div:
   - For **watsonx**: set `data-agent-id` and `data-agent-env-id`
   - For **iframe**: set `data-agent-url`
   - For **link**: set `data-agent-url`

### 4b. Add the Card to `index.html`

Add a card in the appropriate category section:

```html
<a href="agent-compliance-vendor.html" class="icon-card primary-accent" target="_blank" rel="noopener noreferrer">
    <h3>Compliance Check Agent</h3>
    <p>A custom agent designed to help associates review vendor compliance.</p>
</a>
```

**Card CSS classes:**
- `icon-card primary-accent` — Primary color accent on the title
- `icon-card` — Default card (no accent color)

## Step 5: Configure Security (watsonx only)

If using watsonx Orchestrate and deploying to GitHub Pages:

```bash
chmod +x wxO-embed-chat-security-tool.sh
ACTION=disable ./wxO-embed-chat-security-tool.sh
```

> **Important:** Only disable security for internal deployments.

## Step 6: Enable GitHub Pages

1. Go to your repo's **Settings** > **Pages**
2. Source: **Deploy from a branch**
3. Branch: `main`, Folder: `/ (root)`
4. Click **Save**
5. Your site will be live in 1-2 minutes

## Step 7: Clean Up

- Delete `agent-template.html` (or keep it for future reference)
- Remove any example agent cards from `index.html`
- Update `README.md` with your site-specific documentation

---

## AI Assistant Integration

This template includes AI assistant configuration for AI-assisted development:

| Type | Path | Description |
|------|------|-------------|
| Conventions | `CLAUDE.md` | Always-on. Conventions, file naming, commit style. |
| Skill | `.claude/skills/add-agent.md` | On-demand. Guided workflow for adding new agents. |
