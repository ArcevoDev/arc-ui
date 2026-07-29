# arc-ui

Domain-customizable auth-first component system for the Arcevo ecosystem.

arc-ui is what you get when you own the identity backend (arc-id), have a formal
design manual (Alpha Palette), and your auth requirements differ per sector
(fintech vs med vs edu vs enterprise).

## Packages

| Package | Description | Status |
|---------|-------------|--------|
| `@arc-ui/tokens` | Design tokens — Alpha Palette, typography, spacing | ✅ Done |
| `@arc-ui/sdk` | arc-id API client (pure fetch, typed) | ✅ Done |
| `@arc-ui/components` | Styled shadcn-equivalent components | 🔲 Planned |
| `@arc-ui/auth` | Auth components with domain presets | 🔲 Planned |

## Quick Start

```sh
pnpm install
pnpm build
```

## Architecture

Every component follows 4 layers: Primitive → Styled Base → Composed → Domain Preset.
Customization via 3 axes: `appearance` (style), `config` (behavior), `slots` (render props).

## License

MIT — Arcevo
