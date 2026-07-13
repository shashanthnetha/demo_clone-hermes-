---
name: get-shit-done
description: Install and use GSD (Get Shit Done) — a spec-driven development workflow for coding agents that takes a project from idea to roadmap to phase-by-phase shipping. Use when the user wants structured planning/execution, a roadmap, or mentions GSD or "get shit done".
---

# Get Shit Done (GSD)

GSD is a meta-prompting / spec-driven development system (by TÂCHES, now `@opengsd/gsd-core`). It adds
`/gsd-*` commands that take a project from idea → roadmap → per-phase plans → shipped code, with
atomic commits and verification.

## Install it (once, in this project)

Run the official installer — it is REQUIRED for cross-runtime compatibility; do NOT copy files from
the repo's `agents/` or `commands/` directly:

```
npx @opengsd/gsd-core@latest
```

It is interactive: choose your runtime (Claude Code, Codex, opencode, Cursor, Gemini, Copilot, …) and
a **local** (this-project) install. If you are running headless / non-interactive, do this in a
terminal where the prompts can be answered, or check `npx @opengsd/gsd-core@latest --help` for any
non-interactive flags before running it.

## Use it

After install, the `/gsd-*` commands are available. Start a project with:

```
/gsd-new-project
```

Then follow GSD's flow — it builds a roadmap, plans each phase, and executes phase by phase. Run
`/gsd-help` to list every command. Docs: https://github.com/open-gsd/gsd-core
