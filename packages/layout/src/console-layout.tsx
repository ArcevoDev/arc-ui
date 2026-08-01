/**
 * @arcevo/facet-layout: ConsoleLayout
 *
 * Dashboard shell: fixed sidebar + topbar + content area.
 * On mobile the sidebar collapses into a Sheet overlay.
 * Uses LayoutProvider for sidebar state.
 */

import * as React from "react";
import { useAuth } from "@arcevo/facet-auth";
import { Sheet, SheetContent } from "@arcevo/facet-components";
import { useLayout, LayoutProvider } from "./layout-context.js";
import { Sidebar } from "./sidebar.js";
import { Topbar } from "./topbar.js";
import type { ConsoleLayoutMode, LayoutConfig, Tenant } from "./types.js";
import type { RouterAdapter } from "./router.js";

export interface ConsoleLayoutProps {
  config: LayoutConfig;
  tenants?: Tenant[];
  activeTenant?: Tenant | null;
  onTenantSwitch?: (tenantId: string) => void;
  /** Sidebar mode. "full" = always-labeled, "rail" = collapsible icon-only. Default: "full" */
  mode?: ConsoleLayoutMode;
  /** Framework-aware navigation (Next <Link>, react-router <Link>, ...). */
  router?: RouterAdapter;
  children: React.ReactNode;
}

function ConsoleLayoutInner({
  config,
  tenants,
  activeTenant,
  onTenantSwitch,
  mode = "full",
  children,
}: ConsoleLayoutProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const { sidebarOpen, setSidebarOpen, sidebarCollapsed } = useLayout();

  // Show loading state while auth resolves
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  // Not authenticated: render children directly (let Guard or SignIn handle it)
  if (!isAuthenticated) {
    return <>{children}</>;
  }

  const sidebarWidth = mode === "rail" && sidebarCollapsed ? "lg:pl-[68px]" : "lg:pl-[260px]";

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <Sidebar config={config} collapsed={mode === "rail" && sidebarCollapsed} />
      </div>

      {/* Mobile sidebar (sheet) */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-[260px] p-0">
          <Sidebar config={config} />
        </SheetContent>
      </Sheet>

      {/* Main area */}
      <div className={`flex flex-1 flex-col transition-[padding] duration-200 ${sidebarWidth}`}>
        <Topbar
          tenants={tenants}
          activeTenant={activeTenant}
          onTenantSwitch={onTenantSwitch}
          mode={mode}
        />
        <main className="flex-1 p-8">
          <div className="mx-auto w-full max-w-[1440px]">{children}</div>
        </main>
      </div>
    </div>
  );
}

export function ConsoleLayout(props: ConsoleLayoutProps) {
  return (
    <LayoutProvider router={props.router}>
      <ConsoleLayoutInner {...props} />
    </LayoutProvider>
  );
}
