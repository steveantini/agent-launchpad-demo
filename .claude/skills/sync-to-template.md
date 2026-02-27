---
name: sync-to-template
description: Review and sync accumulated changes from the production site back to the template repo. Use when the user wants to finalize changes for the template, extract reusable improvements, or update the template with production-tested changes.
---

# Sync Changes to Template Repo

## Overview

This skill guides you through reviewing changes accumulated in the production site and preparing them for the template repository. Changes should be generalized (placeholders instead of hardcoded values) before syncing.

## Step 1: Identify Changes

Review recent commits to identify changes that should be synced to the template:

```bash
git log --oneline -20
```

Look for:
- **Structural changes** (new HTML patterns, CSS updates, JS improvements)
- **Bug fixes** that apply to the template
- **New features** that other departments would benefit from
- **Documentation updates** (README, SETUP, CLAUDE.md, skills)

Skip department-specific changes (specific agent pages, department branding, etc.).

## Step 2: Categorize Changes

For each change, determine:

1. **Template-worthy?** — Would other departments benefit from this change?
2. **Needs generalization?** — Does it contain hardcoded department values that should become `{{PLACEHOLDER}}`?
3. **Dependencies?** — Does it require other changes to work?

## Step 3: Prepare Template Changes

For each change to sync:

1. Identify the affected files
2. Replace department-specific values with template placeholders:
   - Department name → `{{DEPARTMENT_NAME}}`
   - Site title → `{{SITE_TITLE}}`
   - Orchestration IDs → `{{ORCHESTRATION_ID}}`
   - Agent IDs → `{{AGENT_ID}}` / `{{AGENT_ENVIRONMENT_ID}}`
3. Write a summary describing the change and why it's template-worthy

## Step 4: Create a Changes Document

Create a `template-changes.md` file summarizing all changes to apply to the template repo:

```markdown
# Template Changes

**Source repo:** `{production-repo-name}`
**Date range:** {date range}
**Commit range:** `{first-commit}..{last-commit}`

---

## Change N: {Title}

### Description
{What changed and why}

### Files affected
{List of files with before/after or instructions}

---
```

## Step 5: Review and Finalize

Before syncing:
- [ ] All hardcoded values replaced with placeholders
- [ ] Changes are self-contained and don't break the template
- [ ] Documentation reflects the changes
- [ ] Template-changes.md is complete and accurate

## Checklist

- [ ] Recent commits reviewed
- [ ] Template-worthy changes identified
- [ ] Changes generalized with placeholders
- [ ] template-changes.md created
- [ ] Ready for manual application to template repo
