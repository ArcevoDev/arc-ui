/**
 * @arc-ui/layout: Domain-configurable app shell components.
 *
 * Usage:
 *   import { ConsoleLayout, Sidebar, PageHeader } from "@arc-ui/layout";
 *   import { defaultLayoutPreset } from "@arc-ui/layout";
 *
 *   <ConsoleLayout config={defaultLayoutPreset}>
 *     <PageHeader title="Dashboard" />
 *     ...
 *   </ConsoleLayout>
 */

/* ── Types ────────────────────────────────────────────────── */
export type {
  NavItem,
  NavSection,
  BrandConfig,
  LayoutFeatures,
  LayoutConfig,
  Tenant,
  LayoutContextValue,
  LayoutProviderProps,
  ConsoleLayoutMode,
} from "./types.js";

/* ── Presets ──────────────────────────────────────────────── */
export {
  fintechLayoutPreset,
  medLayoutPreset,
  eduLayoutPreset,
  enterpriseLayoutPreset,
  defaultLayoutPreset,
} from "./presets.js";

/* ── Context ──────────────────────────────────────────────── */
export { LayoutProvider, useLayout } from "./layout-context.js";

/* ── Router adapter ───────────────────────────────────────── */
export {
  createDefaultAdapter,
  matchPath,
} from "./router.js";
export type { RouterAdapter, RouterLinkProps } from "./router.js";

/* ── Components ───────────────────────────────────────────── */
export { type SidebarProps, Sidebar } from "./sidebar.js";

export { type TopbarProps, Topbar } from "./topbar.js";

export { type UserMenuProps, UserMenu } from "./user-menu.js";

export { type TenantSwitcherProps, TenantSwitcher } from "./tenant-switcher.js";

export { type PageHeaderProps, PageHeader } from "./page-header.js";

export { type AppLayoutProps, AppLayout } from "./app-layout.js";

export { type ConsoleLayoutProps, ConsoleLayout } from "./console-layout.js";

export { type LandingLayoutProps, LandingLayout } from "./landing-layout.js";
