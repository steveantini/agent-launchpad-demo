# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [2.0.0] - Generic Template Release

### Changed
- **De-branded** — All platform-specific branding removed from the UI
- **Centralized configuration** — New `config.js` file drives all branding, theming, and agent platform settings
- **Theme engine** — CSS custom properties now set dynamically at runtime from config; three built-in presets (Carbon, Modern, Minimal) plus fully custom option
- **Generic agent platform** — Agent embed pages now support widget, iframe, custom script, or simple link platforms via `config.js`
- **Dynamic text injection** — Header branding, welcome modal, and calculator labels populate from config via `data-bind` attributes
- **Generic mock data** — Admin dashboard sample data uses `@example.com` emails and generic agent names
- **Configurable storage keys** — All localStorage/sessionStorage keys use a configurable prefix
- **Configurable calculator** — Platform cost label and per-user cost driven by config

### Added
- `config.js` — Centralized site configuration with theme presets
- `--color-primary`, `--color-primary-hover`, `--color-accent`, `--radius`, `--font-family` CSS variables
- `data-bind` attribute system for dynamic text injection from config
- Platform abstraction in `agent-template.html` supporting multiple agent providers

### Removed
- Hardcoded font (now configurable via theme presets)
- Hardcoded blue CSS variable (now `--color-primary`)
- Hardcoded email addresses in sample data
- Platform-specific branding in headers and modals
- Procurement/Revenue-specific agent names in sample data

---

## [1.0.0] - Initial Template Release

### Included
- Main landing page with categorized agent cards
- Password-protected admin dashboard
- Adoption Metrics section (sample data)
- Productivity Gains Calculator with localStorage persistence
- Agent embed template page with placeholders
- Template setup guide (SETUP.md)
- AI assistant rules and skills
- Embed security configuration tool

---

## How to Update This Changelog

When making changes to the project:

1. Add new entries under the `[Unreleased]` section during development
2. When releasing, move entries to a new version section with the release date
3. Use the following categories:
   - **Added** - New features
   - **Changed** - Changes to existing functionality
   - **Removed** - Features removed in this version
   - **Fixed** - Bug fixes
