import type { LucideIcon } from "lucide-react";
import {
  Building2,
  Puzzle,
  Lock,
  Zap,
  Palette,
  Ruler,
} from "lucide-react";

export interface Feature {
  title: string;
  desc: string;
  icon: LucideIcon;
}

export const FEATURES: Feature[] = [
  {
    title: "Radix quality",
    desc: "Accessible primitives with keyboard support and focus management, so you don't have to build them.",
    icon: Puzzle,
  },
  {
    title: "Themeable tokens",
    desc: "CSS variables for colors and spacing. Dark mode included. Swap into any project without changing markup.",
    icon: Palette,
  },
  {
    title: "Auth orchestration",
    desc: "A sign-in flow with MFA, passkeys and magic links that works with your backend.",
    icon: Lock,
  },
  {
    title: "Typed SDK",
    desc: "A TypeScript client for your identity API. Call it from the browser, not just the server.",
    icon: Zap,
  },
  {
    title: "Layout shells",
    desc: "Console, app and landing shells with sidebar, topbar and mobile support. Bring your own router.",
    icon: Ruler,
  },
  {
    title: "Your domain",
    desc: "Presets for fintech, healthcare and education. Extend them or build your own.",
    icon: Building2,
  },
];

export interface InstallStep {
  num: string;
  label: string;
  code: string;
}

export const INSTALL_STEPS: InstallStep[] = [
  {
    num: "01",
    label: "Install",
    code: "pnpm add @arc-ui/components @arc-ui/auth @arc-ui/layout @arc-ui/sdk",
  },
  {
    num: "02",
    label: "Import tokens",
    code: '@import "@arc-ui/tokens/tokens.css"',
  },
  {
    num: "03",
    label: "Use components",
    code: `import { Button, Card } from "@arc-ui/components"`,
  },
  {
    num: "04",
    label: "Wire auth",
    code: "<ArcProvider client={client}>...</ArcProvider>",
  },
  {
    num: "05",
    label: "Deploy",
    code: "pnpm build && pnpm changeset publish",
  },
];

export const BUTTON_VARIANTS: Array<
  "default" | "outline" | "secondary" | "ghost" | "glass" | "glow"
> = ["default", "outline", "secondary", "ghost", "glass", "glow"];

export const BADGE_VARIANTS: Array<
  "default" | "secondary" | "outline" | "success" | "warning" | "destructive"
> = ["default", "secondary", "outline", "success", "warning", "destructive"];
