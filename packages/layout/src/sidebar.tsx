/**
 * @arc-ui/layout — Sidebar
 *
 * Fixed w-[260px] navigation panel for desktop.
 * Renders sections and items from LayoutConfig.navigation.
 */

import * as React from "react";
import { useLayout } from "./layout-context.js";
import { ScrollArea, Skeleton } from "@arc-ui/components";
import type { LayoutConfig, NavSection } from "./types.js";

/* ── Helpers ──────────────────────────────────────────────── */

function matchPath(href: string): boolean {
  // Relies on window.location for simplicity.
  // Consumers wrapping with Next/Vue/Remix router should override via active detection.
  if (typeof window === "undefined") return false;
  const path = window.location.pathname;
  return path === href || path.startsWith(href + "/");
}

/* ── Props ────────────────────────────────────────────────── */

export interface SidebarProps {
  config: LayoutConfig;
  isLoading?: boolean;
}

/* ── Component ────────────────────────────────────────────── */

export function Sidebar({ config, isLoading }: SidebarProps) {
  const { setSidebarOpen } = useLayout();

  const handleNav = React.useCallback(() => {
    setSidebarOpen(false);
  }, [setSidebarOpen]);

  return (
    <aside className="fixed left-0 top-0 z-30 flex h-screen w-[260px] flex-col border-r bg-sidebar">
      {/* Brand */}
      <div className="flex h-14 items-center gap-2 border-b border-sidebar-border px-5">
        {config.brand.logo ?? (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-primary"
          >
            <path
              d="M12 2L4 6V12C4 17.52 7.58 22.48 12 24C16.42 22.48 20 17.52 20 12V6L12 2Z"
              fill="currentColor"
              opacity="0.8"
            />
            <path
              d="M12 6L8 8V12C8 14.5 9.67 16.8 12 17.5C14.33 16.8 16 14.5 16 12V8L12 6Z"
              fill="currentColor"
              opacity="0.4"
            />
          </svg>
        )}
        <span className="font-semibold text-sidebar-foreground">
          {config.brand.name}
        </span>
      </div>

      {/* Nav */}
      <ScrollArea className="flex-1 px-3 py-4">
        {isLoading ? (
          <SidebarSkeleton />
        ) : config.navigation.length === 0 ? (
          <p className="px-2 text-sm text-sidebar-foreground/40">
            No navigation items
          </p>
        ) : (
          <nav className="space-y-6">
            {config.navigation.map((section) => (
              <NavSectionRenderer
                key={section.title}
                section={section}
                onNav={handleNav}
              />
            ))}
          </nav>
        )}
      </ScrollArea>

      {/* Footer */}
      <div className="border-t border-sidebar-border p-4">
        <p className="text-center text-xs text-sidebar-foreground/40">
          {config.brand.name} v0.1.0
        </p>
      </div>
    </aside>
  );
}

/* ── Nav section (internal) ───────────────────────────────── */

function NavSectionRenderer({
  section,
  onNav,
}: {
  section: NavSection;
  onNav: () => void;
}) {
  return (
    <div>
      <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-widest text-sidebar-foreground/50">
        {section.title}
      </p>
      <ul className="space-y-1">
        {section.items.map((item) => {
          const isActive = matchPath(item.href);
          return (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={onNav}
                className={`flex items-center gap-3 rounded-md px-2.5 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }`}
              >
                <span className="size-4 shrink-0">{item.icon}</span>
                <span className="flex-1">{item.label}</span>
                {item.badge != null && (
                  <span className="rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-medium text-primary-foreground">
                    {item.badge}
                  </span>
                )}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ── Skeleton ─────────────────────────────────────────────── */

function SidebarSkeleton() {
  return (
    <div className="space-y-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-3 w-16" />
          <div className="space-y-1">
            {[1, 2].map((j) => (
              <Skeleton key={j} className="h-8 w-full" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
