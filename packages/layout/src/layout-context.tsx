/**
 * @arc-ui/layout: Layout context
 *
 * Manages sidebar open/close state and the optional RouterAdapter.
 * ConsoleLayout provides this; consumers can call `useLayout()` from
 * any child to toggle the sidebar or read the active router.
 */

import * as React from "react";
import type { LayoutContextValue } from "./types.js";
import { createDefaultAdapter, type RouterAdapter } from "./router.js";

const LayoutContext = React.createContext<LayoutContextValue | null>(null);

/** localStorage key for the rail-mode collapsed state. */
const STORAGE_KEY = "arc-ui:sidebar-collapsed";

export function LayoutProvider({
  children,
  router,
}: {
  children: React.ReactNode;
  /** Framework-aware navigation. Defaults to window.location + plain <a>. */
  router?: RouterAdapter;
}) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const toggleSidebar = React.useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  // Rail collapse state, persisted so the choice survives reloads.
  const [sidebarCollapsed, setSidebarCollapsedState] = React.useState(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem(STORAGE_KEY) === "1";
  });

  const setSidebarCollapsed = React.useCallback((collapsed: boolean) => {
    setSidebarCollapsedState(collapsed);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, collapsed ? "1" : "0");
    }
  }, []);

  const toggleSidebarCollapsed = React.useCallback(() => {
    setSidebarCollapsedState((prev) => {
      const next = !prev;
      if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
      }
      return next;
    });
  }, []);

  // Keep a stable default adapter so the context value is referentially
  // stable across renders unless the consumer swaps the router.
  const defaultRouter = React.useMemo(() => createDefaultAdapter(), []);
  const activeRouter = router ?? defaultRouter;

  const value: LayoutContextValue = React.useMemo(
    () => ({
      sidebarOpen,
      setSidebarOpen,
      toggleSidebar,
      sidebarCollapsed,
      setSidebarCollapsed,
      toggleSidebarCollapsed,
      router: activeRouter,
    }),
    [
      sidebarOpen,
      setSidebarOpen,
      toggleSidebar,
      sidebarCollapsed,
      setSidebarCollapsed,
      toggleSidebarCollapsed,
      activeRouter,
    ],
  );

  return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>;
}

export function useLayout(): LayoutContextValue {
  const ctx = React.useContext(LayoutContext);
  if (!ctx) {
    throw new Error("useLayout must be used within a <LayoutProvider>");
  }
  return ctx;
}
