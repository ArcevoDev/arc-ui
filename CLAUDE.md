# arc-ui — Engineering Handbook

## Overview

arc-ui is the shared UI layer for the Arcevo ecosystem (arc-id, arcbase, arc-wallet).
It replaces ~100 duplicated shadcn components between projects with a single,
domain-customizable auth-first component system.

**Key constraint:** Auth components must be domain-customizable (fintech vs med vs edu)
— not one-size-fits-all.

## Architecture

Every component follows a 4-layer architecture:

1. **Primitive** — Radix/headless (unstyled, accessible)
2. **Styled Base** — Primitive + Alpha Palette tokens + animation
3. **Composed** — Multiple Layer-2 components wired into a flow
4. **Domain Preset** — Layer-3 with domain-specific defaults

Three customization axes: `appearance` (style), `config` (behavior flags), `slots` (render props).

## Package Layout

```
packages/tokens/       ← Design tokens (finished)
packages/sdk/          ← arc-id SDK (finished)
packages/components/   ← Styled shadcn equivalents
packages/auth/         ← Auth components + presets
apps/docs/             ← Documentation site
apps/landing/          ← Landing page
```

## Code Standards

- TypeScript strict mode, ESM-only
- React 19, functional components with hooks
- Tailwind CSS v4 for styling (unless overridden by `appearance` API)
- `clsx` + `tailwind-merge` for className merging (use `cn()`)
- Every component accepts `className` for override
- Exports: named exports only (no default exports)
- File naming: kebab-case (e.g., `sign-in.tsx`, `use-session.ts`)
- Barrel exports from package `index.ts`

## SDK Architecture

`@arc-ui/sdk` is a pure fetch client. No React, no axios. Each API domain
gets its own class that takes `ArcIdClient` in its constructor. Consumers
instantiate the modules they need:

```ts
const client = new ArcIdClient({ baseUrl });
const auth = new AuthSdk(client);
const { data, error } = await auth.signIn({ email, password });
```

## Auth State Machine

The `SignIn` component is a configurable state machine:

```
IDLE → CHECK_SESSION → (authenticated → REDIRECT)
                      → (unauthenticated → SELECT_METHOD)

SELECT_METHOD → (email_password → LOGIN_FORM)
              → (magic_link → MAGIC_LINK_FORM)
              → (social → SOCIAL_LOGIN)
              → (passkey → PASSKEY_AUTH)

LOGIN_FORM → (success → CHECK_MFA)
           → (error → LOGIN_FORM)

CHECK_MFA → (mfa_not_required → COMPLETE)
          → (mfa_required → MFA_CHALLENGE)

MFA_CHALLENGE → (verified → COMPLETE)
              → (error → MFA_CHALLENGE)

COMPLETE → (onSuccess callback) → redirect
         → (step_up_required → STEP_UP)
```

## Domain Presets

| Feature | Fintech | Med | Edu | Enterprise |
|---------|---------|-----|-----|------------|
| MFA required | ✅ | ✅ | ❌ | ✅ |
| Passkeys | ❌ | ❌ | ✅ | optional |
| Session TTL | 15 min | 30 min | 24 hr | 8 hr |
| Magic link | ✅ | ❌ | ✅ | ❌ |

## First Build (Ship 1)

1. ✅ `packages/tokens/` — Complete
2. ✅ `packages/sdk/` — Complete
3. 🔲 `packages/components/` — Button, Input, Card, Dialog, Select + utils
4. 🔲 `packages/auth/` — ArcProvider, SignIn, SignUp, UserButton, Guard
5. 🔲 `apps/docs/` + `apps/landing/`
6. 🔲 Root docs (CLAUDE.md, AGENTS.md, README.md)

## Commands

```sh
pnpm install              # Install all workspace dependencies
pnpm build                # Build all packages
pnpm build:tokens         # Build tokens only
pnpm build:sdk            # Build SDK only
pnpm dev:docs             # Start documentation site
pnpm typecheck            # TypeScript check all packages
pnpm lint                 # ESLint all packages
pnpm format               # Prettier format all files
```

## AGENTS.md

Always read `AGENTS.md` at the start of every session. It contains the
compressed AI-agent rules that override or supplement this handbook.
