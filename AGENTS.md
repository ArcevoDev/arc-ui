# arc-ui: Agent Session Rules

This file is loaded at the start of every session.
It overrides/supplements CLAUDE.md for AI agents.

## Session Protocol

1. Always write analysis and planning output to `.agent/output.txt` first,
   so the user can read from that file instead of scrolling the terminal.
2. After every significant milestone, update `.agent/output.txt` status dashboard.
3. When starting a new package, read any existing `.agent/**` planning files
   first before writing code.

## Architecture Rules

- Auth components must be domain-customizable (different configs for
  fintech vs med vs edu): not one-size-fits-all.
- Include a welcoming landing page and deployed documentation site alongside
  the component library.
- Build a differentiated component library wired to arc-id SDK, not a generic
  clone of existing UI libraries.

## File Structure Rules

- Every package has: `src/`, `package.json`, `tsconfig.json`
- Every package exports from `src/index.ts` as barrel
- Re-export types alongside implementations

## Current Build Status

See `.agent/output.txt` for the live status dashboard.

## Publish Status

Initial 1.0.0 release is ready but blocked: the `@arc-ui/*` npm scope is
owned by an unrelated project (BT's Arc UI System), and npm requires
delegated browser auth to publish. See the PUBLISH STATUS section of
`.agent/output.txt` before attempting any publish.
