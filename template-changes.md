# Template Changes

**Source repo:** `IBM-LRA-RH-CLG-custom-agents-website`
**Date range:** February 26, 2026
**Commit range:** `ceafb8e..aec55f3`

---

## Change 1: Migrate from Cursor to Claude Code

The project AI configuration has been migrated from `.cursor/` (Cursor IDE) to `.claude/` (Claude Code) and `CLAUDE.md`.

### 1a. Delete `.cursor/` directory

Remove the entire `.cursor/` folder:

```
.cursor/
├── rules/
│   └── project-conventions.mdc
└── skills/
    ├── add-agent/SKILL.md
    ├── new-site-from-template/SKILL.md
    └── sync-to-template/SKILL.md
```

### 1b. Create `CLAUDE.md` in the project root

Create `CLAUDE.md` with the project conventions. Replace hardcoded department values with template placeholders:

- `CLG` → `{{DEPARTMENT_NAME}}`
- `Red Hat CLG Custom Agents` → `{{SITE_TITLE}}`
- `IBM Legal and Regulatory Affairs` / `LRA` → `{{ORG_NAME}}`

> **Template note:** The `CLAUDE.md` in the template repo should use `{{DEPARTMENT_NAME}}` and `{{SITE_TITLE}}` placeholders wherever the source repo has "CLG" or "Red Hat CLG Custom Agents".

### 1c. Create `.claude/skills/` directory with 3 skill files

Create the following flat files (not nested in subdirectories like the old `.cursor/skills/` structure):

```
.claude/
└── skills/
    ├── add-agent.md
    ├── new-site-from-template.md
    └── sync-to-template.md
```

**Files affected:** New files — copy from the source repo's `.claude/skills/` directory.

---

## Change 2: Update README.md

### 2a. File structure tree

**Before:**
```
├── .cursor/                            # Cursor IDE AI configuration
│   ├── rules/
│   │   └── project-conventions.mdc     # Auto-applied project conventions
│   └── skills/
│       ├── add-agent/SKILL.md          # Guided workflow: add a new agent
│       ├── new-site-from-template/SKILL.md  # Guided workflow: set up new site
│       └── sync-to-template/SKILL.md   # Review & sync changes to template repo
```

**After:**
```
├── CLAUDE.md                           # Claude Code project conventions & skills reference
├── .claude/                            # Claude Code AI configuration
│   └── skills/
│       ├── add-agent.md                # Guided workflow: add a new agent
│       ├── new-site-from-template.md   # Guided workflow: set up new site
│       └── sync-to-template.md         # Review & sync changes to template repo
```

### 2b. AI Integration section

**Before:** Section titled "Cursor AI Integration" referencing `.cursor/` paths.

**After:** Section titled "Claude Code Integration" with updated paths:

| Type | Path | Description |
|------|------|-------------|
| Conventions | `CLAUDE.md` | Always-on. Enforces Carbon Design System conventions, CSS tokens, file naming, commit style, and template sync prompts. |
| Skill | `.claude/skills/add-agent.md` | On-demand. Guided workflow for adding a new watsonx Orchestrate agent. |
| Skill | `.claude/skills/new-site-from-template.md` | On-demand. Guided workflow for setting up a new department site from this template. |
| Skill | `.claude/skills/sync-to-template.md` | On-demand. Review and finalize accumulated changes for syncing to the template repo. |

Updated description text to reference "CLAUDE.md" and "Claude Code" instead of "Cursor" and ".cursor/".

---

## Change 3: Update SETUP.md

### AI Integration section

**Before:** Section titled "Cursor AI Integration" referencing `.cursor/` paths.

**After:** Section titled "Claude Code Integration" with updated paths:

| Type | Path | Description |
|------|------|-------------|
| Conventions | `CLAUDE.md` | Always-on. Conventions, file naming, commit style, and template sync prompts. |
| Skill | `.claude/skills/add-agent.md` | On-demand. Guided workflow for adding new agents. |
| Skill | `.claude/skills/new-site-from-template.md` | On-demand. Guided workflow for setting up from this template. |
| Skill | `.claude/skills/sync-to-template.md` | On-demand. Review and sync accumulated changes to the template repo. |

Updated description text to reference "Claude Code" instead of "Cursor".

---

## Summary of Files to Modify

| File | Action |
|------|--------|
| `.cursor/` (entire directory) | **Delete** |
| `CLAUDE.md` | **Create** (new file in project root) |
| `.claude/skills/add-agent.md` | **Create** (copy from source repo) |
| `.claude/skills/new-site-from-template.md` | **Create** (copy from source repo) |
| `.claude/skills/sync-to-template.md` | **Create** (copy from source repo) |
| `README.md` | **Edit** — file structure tree + AI Integration section |
| `SETUP.md` | **Edit** — AI Integration section |
