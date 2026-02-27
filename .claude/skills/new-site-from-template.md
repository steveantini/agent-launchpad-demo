---
name: new-site-from-template
description: Set up a new IBM legal department website from the {{DEPARTMENT_NAME}} Custom Agents template. Use when the user wants to create a new site for a different department, replicate the website, or spin up a new instance from the template.
---

# Set Up a New Department Site from Template

## Prerequisites

Gather from the user:
1. **Department name** (e.g., "IP Law", "Employment Law")
2. **Site title** for the header
3. **Agent categories** and their names
4. **List of agents** with watsonx Orchestrate environment IDs
5. **watsonx Orchestrate instance ID** (`orchestrationID`)
6. **Admin password** for the admin dashboard

## Step 1: Create Repo from Template

On GitHub, click **"Use this template"** on the template repository to create a new repo. Clone it locally.

## Step 2: Replace Placeholders

Search and replace throughout the project:

| Placeholder | Replace with |
|-------------|-------------|
| `{{DEPARTMENT_NAME}}` | Department name (e.g., "IP Law") |
| `{{SITE_TITLE}}` | Header title (e.g., "IP Law Custom Agents") |
| `{{ORCHESTRATION_ID}}` | watsonx Orchestrate instance ID |
| `{{ADMIN_PASSWORD}}` | Admin dashboard password |
| `{{GITHUB_REPO_URL}}` | New repo's GitHub URL |
| `{{GITHUB_PAGES_URL}}` | New repo's GitHub Pages URL |

## Step 3: Configure Categories

In `index.html`, update the category section headings and cards:

1. Rename or add/remove `<div class="section">` blocks
2. Update `<h2>` headings with new category names
3. Add agent cards for each agent (follow the `add-agent` skill)

## Step 4: Create Agent Embed Pages

For each agent, create an `agent-*.html` page:

1. Copy `agent-template.html`
2. Set `agentEnvironmentId` to the agent's ID
3. Set `orchestrationID` to the department's instance ID
4. Name the file following the convention: `agent-{category}-{type}-{paper}.html`

## Step 5: Configure Admin

In `admin.html`:
1. Update the admin password
2. Update the header badge text if needed
3. Clear any sample data specific to the previous department

## Step 6: Disable Embed Security (for GitHub Pages)

Run the security tool to disable embed security for anonymous GitHub Pages access:

```bash
chmod +x wxO-embed-chat-security-tool.sh
ACTION=disable ./wxO-embed-chat-security-tool.sh
```

## Step 7: Enable GitHub Pages

1. Go to repo **Settings** > **Pages**
2. Source: **Deploy from a branch**
3. Branch: `main`, folder: `/ (root)`
4. Save and wait 1-2 minutes

## Step 8: Update Documentation

1. Update `README.md` with department-specific info
2. Update file structure listing
3. Update deployment URLs

## Checklist

- [ ] Repo created from template
- [ ] All placeholders replaced
- [ ] Category sections configured
- [ ] All agent embed pages created
- [ ] Admin password set
- [ ] Embed security configured
- [ ] GitHub Pages enabled
- [ ] README updated
- [ ] Committed and pushed
