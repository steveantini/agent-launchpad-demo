---
name: add-agent
description: Add a new watsonx Orchestrate agent to the CLG Custom Agents website. Use when the user wants to add a new agent card, create a new agent embed page, or connect a new watsonx Orchestrate agent.
---

# Add a New Agent

## Prerequisites

Gather from the user:
1. **Agent name** (e.g., "Revenue SOW Review - Red Hat Paper")
2. **Agent environment ID** from watsonx Orchestrate
3. **Category**: Revenue (Sell-Side), Procurement (Buy-Side), or General Purpose
4. **Paper type**: Red Hat, Vendor, or Customer
5. **Brief description** of what the agent does

## Step 1: Create the Agent Embed Page

Copy an existing `agent-*.html` file and update the configuration:

```html
window.wxOConfiguration = {
    orchestrationID: 'keep-existing-instance-id',
    hostURL: 'https://dl.watson-orchestrate.ibm.com',
    rootElementID: 'root',
    showLauncher: false,
    chatOptions: {
        agentId: 'keep-existing-agent-id',
        agentEnvironmentId: 'PASTE_NEW_ENVIRONMENT_ID_HERE',
        layout: { form: 'fullscreen-overlay' }
    }
};
```

**File naming**: `agent-{category}-{type}-{paper}.html`
- Example: `agent-revenue-sow-redhat.html`

## Step 2: Add the Card to `index.html`

Find the correct category section and add a card:

```html
<a href="agent-revenue-sow-redhat.html" class="icon-card ibm" target="_blank" rel="noopener noreferrer">
    <h3>Revenue SOW Review - Red Hat Paper</h3>
    <p>A custom agent designed to help Legal Associates review a redlined Statement of Work on Red Hat paper.</p>
</a>
```

**Card classes by paper type:**
- Red Hat paper: `class="icon-card ibm"`
- Vendor paper: `class="icon-card vendor"`
- Customer paper: `class="icon-card customer"`

## Step 3: Update Documentation

1. Update `README.md` — add the new file to the File Structure section
2. Update the agent count if referenced (currently "16 agents")

## Step 4: Commit and Push

```
git add agent-{name}.html index.html README.md
git commit -m "Add {Agent Name} agent page and card"
git push
```

## Checklist

- [ ] Agent embed page created with correct `agentEnvironmentId`
- [ ] Card added to correct category section in `index.html`
- [ ] Card uses correct CSS class for paper type
- [ ] `target="_blank" rel="noopener noreferrer"` on the card link
- [ ] README file structure updated
- [ ] Committed and pushed
