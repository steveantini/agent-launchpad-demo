# Template Setup Guide

This guide walks you through setting up a new department website from this template.

## Quick Start

1. Click **"Use this template"** on GitHub to create a new repository
2. Clone your new repository locally
3. Follow the steps below to customize

---

## Step 1: Replace Placeholders

Search and replace the following placeholders across all files:

| Placeholder | Description | Example |
|-------------|-------------|---------|
| `{{DEPARTMENT_NAME}}` | Your department's name | `IP Law` |
| `{{SITE_TITLE}}` | Header title text | `IP Law Custom Agents` |
| `{{ORCHESTRATION_ID}}` | watsonx Orchestrate instance ID | `20250729-1457-...` |
| `{{ADMIN_PASSWORD}}` | Password for admin dashboard | `your-secure-password` |
| `{{GITHUB_REPO_URL}}` | Your new repo's clone URL | `git@github.ibm.com:user/repo.git` |
| `{{GITHUB_PAGES_URL}}` | Your GitHub Pages URL | `https://pages.github.ibm.com/user/repo/` |

**Files that contain placeholders:**
- `index.html` — Main page header, title
- `admin.html` — Admin page header, password
- `agent-template.html` — Agent embed template
- `README.md` — Documentation URLs and descriptions

## Step 2: Set Up Agent Categories

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

## Step 3: Add Agents

For each agent you want to include:

### 3a. Create the Agent Embed Page

1. Copy `agent-template.html` to a new file (e.g., `agent-ip-patent-review.html`)
2. Replace `{{AGENT_TITLE}}` with the agent name
3. Replace `{{ORCHESTRATION_ID}}` with your instance ID
4. Replace `{{AGENT_ID}}` with the agent's ID
5. Replace `{{AGENT_ENVIRONMENT_ID}}` with the agent's environment ID

**Where to find agent IDs:** In watsonx Orchestrate, go to your agent → Channels → Embedded Chat → copy the embed configuration values.

### 3b. Add the Card to `index.html`

Add a card in the appropriate category section:

```html
<a href="agent-ip-patent-review.html" class="icon-card ibm" target="_blank" rel="noopener noreferrer">
    <h3>Patent Review - Red Hat Paper</h3>
    <p>A custom agent designed to help Legal Associates review patent documents.</p>
</a>
```

**Card CSS classes by paper type:**
- `icon-card ibm` — Red Hat / IBM paper (blue accent)
- `icon-card vendor` — Vendor paper (teal accent)
- `icon-card customer` — Customer paper (green accent)

## Step 4: Configure the Admin Page

In `admin.html`:

1. Update the admin password (search for the password check in the `<script>` section)
2. The header badge says "ADMIN" by default — change if desired
3. The Impact Calculator works immediately with localStorage — no backend needed

## Step 5: Disable Embed Security (GitHub Pages only)

Since GitHub Pages can't run server-side code for JWT authentication:

```bash
chmod +x wxO-embed-chat-security-tool.sh
ACTION=disable ./wxO-embed-chat-security-tool.sh
```

> **Important:** Only disable security for internal IBM GitHub Pages. See `README.md` for details on re-enabling security for production deployments.

## Step 6: Enable GitHub Pages

1. Go to your repo's **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: `main`, Folder: `/ (root)`
4. Click **Save**
5. Your site will be live in 1-2 minutes

## Step 7: Clean Up

- Delete `agent-template.html` (or keep it for future reference)
- Remove any agent pages from the original template that don't apply to your department
- Update `README.md` with your department-specific documentation
- Update `CHANGELOG.md` or start fresh

---

## Cursor AI Integration

This template includes Cursor IDE configuration for AI-assisted development:

- **`.cursor/rules/`** — Project conventions that apply automatically in every Cursor session
- **`.cursor/skills/add-agent/`** — Guided workflow for adding new agents
- **`.cursor/skills/new-site-from-template/`** — Guided workflow for setting up from this template

When working in Cursor, the AI agent will automatically follow the project's Carbon Design System conventions, file naming patterns, and coding standards.
