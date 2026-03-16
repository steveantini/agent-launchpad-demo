---
name: add-agent
description: Add a new agent to the Agent Launchpad website. Use when the user wants to add a new agent card, create a new agent embed page, or connect a new agent.
---

# Add a New Agent

## Prerequisites

Gather from the user:
1. **Agent name** (e.g., "Compliance Check Agent - Vendor")
2. **Category** where the card should appear
3. **Brief description** of what the agent does
4. **Platform-specific info:**
   - For **widget**: Agent ID and environment ID
   - For **iframe**: Agent embed URL
   - For **link**: Agent URL

## Step 1: Create the Agent Embed Page

Copy `agent-template.html` to a new file and set the data attributes:

```html
<div id="root"
     data-agent-id="{{AGENT_ID}}"
     data-agent-env-id="{{AGENT_ENVIRONMENT_ID}}"
     data-agent-url="{{AGENT_URL}}">
</div>
```

**File naming**: `agent-{category}-{type}.html`
- Example: `agent-compliance-vendor.html`

## Step 2: Add the Card to `index.html`

Find the correct category section and add a card:

```html
<a href="agent-compliance-vendor.html" class="icon-card primary-accent" target="_blank" rel="noopener noreferrer">
    <h3>Compliance Check Agent - Vendor</h3>
    <p>A custom agent designed to help associates review vendor compliance documents.</p>
</a>
```

**Card classes:**
- `icon-card primary-accent` — Primary color accent on the title
- `icon-card` — Default card (no accent)

## Step 3: Update Documentation

1. Update `README.md` — add the new file to the File Structure section
2. Update the agent count if referenced

## Step 4: Commit and Push

```
git add agent-{name}.html index.html README.md
git commit -m "Add {Agent Name} agent page and card"
git push
```

## Checklist

- [ ] Agent embed page created with correct data attributes
- [ ] Card added to correct category section in `index.html`
- [ ] `target="_blank" rel="noopener noreferrer"` on the card link
- [ ] README file structure updated
- [ ] Committed and pushed
