# arc-ui

Domain-customizable auth-first component system for the ArcevoCirqle ecosystem.

arc-ui is what you get when you own the identity backend (arc-id), have a formal
design manual (Alpha Palette), and your auth requirements differ per sector
(fintech vs med vs edu vs enterprise).

## Packages

| Package | Description | Status |
|---------|-------------|--------|
| `@arc-ui/tokens` | Design tokens: Alpha Palette, typography, spacing, CSS vars | ✅ Done |
| `@arc-ui/sdk` | arc-id API client (pure fetch, typed, 10 domain SDKs) | ✅ Done |
| `@arc-ui/components` | 35+ styled UI components (Radix + tailwind-merge + variants) | ✅ Done |
| `@arc-ui/auth` | Auth components + domain presets: SignIn, SignUp, Guard, MfaDialog, forms | ✅ Done |
| `@arc-ui/layout` | Domain-configurable app shell: ConsoleLayout, AppLayout, LandingLayout, Sidebar, Topbar, 5 presets | ✅ Done |

## Quick Start

```sh
pnpm install
pnpm build
```

Consume in your app:

```tsx
import { ConsoleLayout, defaultLayoutPreset } from "@arc-ui/layout";
import { AuthGuard } from "@arc-ui/auth";

function App() {
  return (
    <ConsoleLayout config={enterpriseLayoutPreset} tenants={tenants}>
      <AuthGuard>
        <YourRoutes />
      </AuthGuard>
    </ConsoleLayout>
  );
}
```

## Architecture

Every component follows 4 layers: **Primitive → Styled Base → Composed → Domain Preset**.
Customization via 3 axes: `appearance` (style), `config` (behavior), `slots` (render props).

### Layout Shell

Framework-agnostic slot-based shells: no routing dependency:

- **ConsoleLayout**: sidebar + topbar + content area, mobile sheet, auth-aware.
  Two sidebar versions: `mode="full"` (always-labeled sidebar) and
  `mode="rail"` (collapsible to an icon-only rail, choice persisted in
  localStorage). Both are screen responsive (mobile collapses to a Sheet).
- **AppLayout**: split-panel auth page (login/register/MFA), brand left panel
- **LandingLayout**: full-bleed marketing page, glassmorphic hero, glow CTAs.
  Pair it with the `Navbar` `pill` variant for a floating frosted-glass bar.
- **5 domain presets**: fintech, med, edu, enterprise, default

### Auth System

```tsx
import { fintechAuthPreset, SignIn, MfaVerifyForm } from "@arc-ui/auth";

// Domain presets customise every copy, step, and behaviour
<SignIn authPreset={fintechAuthPreset} layoutPreset={fintechLayoutPreset} />
```

Forms are independently importable: `LoginForm`, `MagicLinkForm`, `ForgotPasswordForm`,
`MfaVerifyForm`, `MfaSetupForm`, `MfaRecoveryForm`.

## Dev Preview

```sh
pnpm dev:docs   # Storybook → http://localhost:6006
```

## License

MIT: ArcevoCirqle
