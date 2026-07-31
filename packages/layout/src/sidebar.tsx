/**
 * @arc-ui/layout: Sidebar
 *
 * Fixed w-[260px] navigation panel for desktop.
 * Renders sections and items from LayoutConfig.navigation.
 * Uses the LayoutProvider RouterAdapter when provided (Next/react-router
 * aware links + active detection); falls back to window.location + <a>.
 */

import * as React from "react";
import { useLayout } from "./layout-context.js";
import { ScrollArea, Skeleton, Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@arc-ui/components";
import type { LayoutConfig, NavItem, NavSection } from "./types.js";
import type { RouterAdapter } from "./router.js";

/* ── Props ────────────────────────────────────────────────── */

export interface SidebarProps {
  config: LayoutConfig;
  isLoading?: boolean;
  /** Rail mode: render icon-only with tooltip labels. Default: false */
  collapsed?: boolean;
}

/* ── Component ────────────────────────────────────────────── */

export function Sidebar({ config, isLoading, collapsed = false }: SidebarProps) {
  const { setSidebarOpen, router } = useLayout();

  const handleNav = React.useCallback(() => {
    setSidebarOpen(false);
  }, [setSidebarOpen]);

  return (
    <aside
      className={`fixed left-0 top-0 z-30 flex h-screen flex-col border-r bg-sidebar transition-[width] duration-200 ${
        collapsed ? "w-[68px]" : "w-[260px]"
      }`}
    >
      {/* Brand */}
      <div className="flex h-14 items-center gap-2 border-b border-sidebar-border px-5">
        {config.brand.logo ?? (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="shrink-0 text-primary"
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
        {!collapsed && (
          <span className="font-semibold text-sidebar-foreground">
            {config.brand.name}
          </span>
        )}
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
          <nav className={collapsed ? "space-y-4" : "space-y-6"}>
            {config.navigation.map((section) => (
              <NavSectionRenderer
                key={section.title}
                section={section}
                router={router}
                onNav={handleNav}
                collapsed={collapsed}
              />
            ))}
          </nav>
        )}
      </ScrollArea>

      {/* Footer */}
      <div className="border-t border-sidebar-border p-4">
        {collapsed ? (
          <p className="text-center text-xs text-sidebar-foreground/40">
            {config.brand.name.slice(0, 1).toUpperCase()}
          </p>
        ) : (
          <p className="text-center text-xs text-sidebar-foreground/40">
            {config.brand.name} v0.1.0
          </p>
        )}
      </div>
    </aside>
  );
}

/* ── Nav section (internal) ───────────────────────────────── */

function NavSectionRenderer({
  section,
  router,
  onNav,
  collapsed,
}: {
  section: NavSection;
  router: RouterAdapter | undefined;
  onNav: () => void;
  collapsed: boolean;
}) {
  return (
    <div>
      {!collapsed && (
        <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-widest text-sidebar-foreground/50">
          {section.title}
        </p>
      )}
      <ul className="space-y-1">
        {section.items.map((item) => (
          <NavItemRenderer key={item.href} item={item} router={router} onNav={onNav} depth={0} collapsed={collapsed} />
        ))}
      </ul>
    </div>
  );
}

/* ── Nav item (internal): supports nested collapsible groups ─ */

function NavItemRenderer({
  item,
  router,
  onNav,
  depth,
  collapsed,
}: {
  item: NavItem;
  router: RouterAdapter | undefined;
  onNav: () => void;
  depth: number;
  collapsed: boolean;
}) {
  const [open, setOpen] = React.useState(false);
  const children = item.children;
  const hasChildren = children?.length;

  // Group item: toggles its children inline (full mode) or shows icon-only trigger
  if (hasChildren) {
    return (
      <li>
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={() => !collapsed && setOpen((v) => !v)}
                aria-expanded={collapsed ? undefined : open}
                aria-label={collapsed ? item.label : undefined}
                className={`flex w-full items-center gap-3 rounded-md px-2.5 py-2 text-sm font-medium transition-colors text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${
                  collapsed ? "justify-center px-0" : ""
                }`}
                style={collapsed ? undefined : { paddingLeft: `${8 + depth * 12}px` }}
              >
                {item.icon && <span className="size-4 shrink-0">{item.icon}</span>}
                {!collapsed && <span className="flex-1 text-left">{item.label}</span>}
                {!collapsed && item.badge != null && (
                  <span className="rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-medium text-primary-foreground">
                    {item.badge}
                  </span>
                )}
                {!collapsed && (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className={`shrink-0 text-sidebar-foreground/40 transition-transform ${open ? "rotate-180" : ""}`}
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                )}
              </button>
            </TooltipTrigger>
            {collapsed && (
              <TooltipContent side="right">{item.label}</TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
        {!collapsed && open && (
          <ul className="mt-1 space-y-1">
            {children.map((child) => (
              <NavItemRenderer
                key={child.href}
                item={child}
                router={router}
                onNav={onNav}
                depth={depth + 1}
                collapsed={collapsed}
              />
            ))}
          </ul>
        )}
      </li>
    );
  }

  // Leaf item: framework-aware link when an adapter is provided.
  const isActive = router ? router.isActive(item.href) : defaultIsActive(item.href);
  const Link = router?.Link ?? DefaultAnchor;
  return (
    <li key={item.href}>
      <TooltipProvider delayDuration={200}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href={item.href}
              onClick={onNav}
              aria-label={collapsed ? item.label : undefined}
              aria-current={isActive ? "page" : undefined}
              className={`flex items-center gap-3 rounded-md px-2.5 py-2 text-sm font-medium transition-colors ${
                collapsed ? "justify-center px-0" : ""
              } ${
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
            >
              {item.icon && (
                <span className="size-4 shrink-0">{item.icon}</span>
              )}
              {!collapsed && <span className="flex-1">{item.label}</span>}
              {!collapsed && item.badge != null && (
                <span className="rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-medium text-primary-foreground">
                  {item.badge}
                </span>
              )}
            </Link>
          </TooltipTrigger>
          {collapsed && (
            <TooltipContent side="right">{item.label}</TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    </li>
  );
}

/* ── Default (no adapter) behavior ────────────────────────── */

function defaultIsActive(href: string): boolean {
  if (typeof window === "undefined") return false;
  const path = window.location.pathname;
  return path === href || path.startsWith(href + "/");
}

function DefaultAnchor({
  href,
  className,
  onClick,
  children,
}: {
  href: string;
  className?: string;
  onClick?: (event: React.MouseEvent) => void;
  children?: React.ReactNode;
}) {
  return (
    <a href={href} className={className} onClick={onClick}>
      {children}
    </a>
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
