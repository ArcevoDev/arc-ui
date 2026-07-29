/**
 * @arc-ui/layout — Domain presets
 *
 * Five pre-built LayoutConfig presets matching @arc-ui/auth presets.
 * Consumers mix-and-match: authPreset + layoutPreset for a complete domain.
 */

import type { LayoutConfig } from "./types.js";

/**
 * Fintech — high security, branded for regulated finance.
 * Tenant-scoped, billing-aware.
 */
export const fintechLayoutPreset: LayoutConfig = {
  brand: {
    name: "ArcID",
    tagline: "Sovereign Identity Engine",
    benefits: [
      "Passkey-native authentication",
      "Multi-tenant by design",
      "WebAuthn + TOTP MFA",
      "Real-time fraud monitoring",
    ],
  },
  navigation: [
    {
      title: "Overview",
      items: [{ href: "/dashboard", label: "Dashboard", icon: "BarChart3" as unknown as never }],
    },
    {
      title: "Security",
      items: [
        { href: "/security/sessions", label: "Sessions", icon: "Monitor" as unknown as never },
        { href: "/security/mfa", label: "Two-Factor", icon: "Lock" as unknown as never },
        { href: "/security/audit", label: "Audit Log", icon: "FileText" as unknown as never },
      ],
    },
    {
      title: "Billing",
      items: [{ href: "/billing", label: "Billing", icon: "CreditCard" as unknown as never }],
    },
    {
      title: "Account",
      items: [{ href: "/settings/profile", label: "Profile", icon: "User" as unknown as never }],
    },
  ],
  features: { tenantSwitcher: true },
};

/**
 * Medical / Healthcare — HIPAA-aware, audit-first.
 */
export const medLayoutPreset: LayoutConfig = {
  brand: {
    name: "ArcID",
    tagline: "Secure Healthcare Identity",
    benefits: [
      "HIPAA-compliant authentication",
      "Enterprise SSO (SAML/OIDC)",
      "Granular audit trails",
      "Role-based access control",
    ],
  },
  navigation: [
    {
      title: "Overview",
      items: [{ href: "/dashboard", label: "Dashboard", icon: "BarChart3" as unknown as never }],
    },
    {
      title: "Security",
      items: [
        { href: "/security/sessions", label: "Sessions", icon: "Monitor" as unknown as never },
        { href: "/security/audit", label: "Audit Log", icon: "FileText" as unknown as never },
      ],
    },
    {
      title: "Account",
      items: [{ href: "/settings/profile", label: "Profile", icon: "User" as unknown as never }],
    },
  ],
  features: { tenantSwitcher: true },
};

/**
 * Education — low friction, content-first.
 * No tenant switching (single-organisation by default).
 */
export const eduLayoutPreset: LayoutConfig = {
  brand: {
    name: "ArcID",
    tagline: "Learning Identity Platform",
    benefits: [
      "Social login (Google, Microsoft, Clever)",
      "Passkey-friendly",
      "24-hour persistent sessions",
      "Self-service account recovery",
    ],
  },
  navigation: [
    {
      title: "Overview",
      items: [{ href: "/dashboard", label: "Dashboard", icon: "BarChart3" as unknown as never }],
    },
    {
      title: "Content",
      items: [{ href: "/content", label: "My Content", icon: "BookOpen" as unknown as never }],
    },
    {
      title: "Account",
      items: [{ href: "/settings/profile", label: "Profile", icon: "User" as unknown as never }],
    },
  ],
  features: { tenantSwitcher: false },
};

/**
 * Enterprise — SSO-first, permission-aware, multi-tenant.
 */
export const enterpriseLayoutPreset: LayoutConfig = {
  brand: {
    name: "ArcID",
    tagline: "Enterprise Identity Platform",
    benefits: [
      "Enterprise SSO (SAML/OIDC)",
      "Hardware security key support",
      "Multi-tenant administration",
      "Comprehensive audit logging",
    ],
  },
  navigation: [
    {
      title: "Overview",
      items: [{ href: "/dashboard", label: "Dashboard", icon: "BarChart3" as unknown as never }],
    },
    {
      title: "Administration",
      items: [
        { href: "/admin", label: "Admin", icon: "Shield" as unknown as never },
        { href: "/identities", label: "Identities", icon: "Users" as unknown as never },
        { href: "/tenants", label: "Tenants", icon: "Building" as unknown as never },
      ],
    },
    {
      title: "Security",
      items: [
        { href: "/security/sessions", label: "Sessions", icon: "Monitor" as unknown as never },
        { href: "/security/passkeys", label: "Passkeys", icon: "Fingerprint" as unknown as never },
        { href: "/security/mfa", label: "Two-Factor", icon: "Lock" as unknown as never },
        { href: "/security/audit", label: "Audit Log", icon: "FileText" as unknown as never },
      ],
    },
    {
      title: "Developers",
      items: [
        { href: "/oauth/applications", label: "OAuth Apps", icon: "Globe" as unknown as never },
        { href: "/developer/webhooks", label: "Webhooks", icon: "Send" as unknown as never },
      ],
    },
    {
      title: "Account",
      items: [{ href: "/settings/profile", label: "Profile", icon: "User" as unknown as never }],
    },
  ],
  features: { tenantSwitcher: true },
};

/**
 * Default / general-purpose — balanced, minimal.
 */
export const defaultLayoutPreset: LayoutConfig = {
  brand: {
    name: "App",
    tagline: "Welcome",
  },
  navigation: [
    {
      title: "Overview",
      items: [{ href: "/dashboard", label: "Dashboard", icon: "BarChart3" as unknown as never }],
    },
    {
      title: "Account",
      items: [{ href: "/settings/profile", label: "Profile", icon: "User" as unknown as never }],
    },
  ],
  features: { tenantSwitcher: false },
};
