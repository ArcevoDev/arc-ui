/**
 * @arc-ui/layout — Core types
 *
 * LayoutConfig drives the entire app shell: sidebar nav, brand identity,
 * and feature toggles. Domain presets in presets.ts provide pre-built
 * configs for fintech / med / edu / enterprise / default.
 */

import type { ReactNode } from "react";

/* ── Nav shape (mirrors arc-id's navConfig structure) ──────── */

export interface NavItem {
  /** Full route path e.g. "/dashboard" or "/security/sessions" */
  href: string;
  /** Display label */
  label: string;
  /** Icon component (consumer passes e.g. lucide icon) */
  icon: ReactNode;
  /** Optional badge count or label (e.g. "3", "New") */
  badge?: string | number;
  /** Optional RBAC permission string — reserved for future gating */
  requiredPermission?: string;
}

export interface NavSection {
  /** Section heading in the sidebar */
  title: string;
  /** Items in this section */
  items: NavItem[];
}

/* ── Brand identity (used in AppLayout left panel) ────────── */

export interface BrandConfig {
  /** Product / company name */
  name: string;
  /** Optional custom logo element (defaults to a shield icon) */
  logo?: ReactNode;
  /** Tagline displayed in the auth page left panel */
  tagline?: string;
  /** Benefit bullet points in the auth page left panel */
  benefits?: string[];
}

/* ── Feature toggles ──────────────────────────────────────── */

export interface LayoutFeatures {
  /** Show the tenant/organisation switcher in the topbar. Default: true */
  tenantSwitcher?: boolean;
  /** Show a theme toggle in the topbar. Default: false */
  themeToggle?: boolean;
  /** Show a search trigger in the topbar. Default: false */
  search?: boolean;
}

/* ── Main config ──────────────────────────────────────────── */

export interface LayoutConfig {
  brand: BrandConfig;
  navigation: NavSection[];
  features?: LayoutFeatures;
}

/* ── Tenant shape (consumer provides this) ────────────────── */

export interface Tenant {
  id: string;
  name: string;
  slug?: string;
  plan?: string;
}

/* ── Layout context value ─────────────────────────────────── */

export interface LayoutContextValue {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
}

/* ── Component props ──────────────────────────────────────── */

export interface LayoutProviderProps {
  config: LayoutConfig;
  children: ReactNode;
}
