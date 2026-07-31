import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LayoutProvider, useLayout } from "./layout-context.js";
import { Sidebar } from "./sidebar.js";
import { defaultLayoutPreset, enterpriseLayoutPreset, fintechLayoutPreset, medLayoutPreset, eduLayoutPreset } from "./presets.js";
import type { LayoutConfig } from "./types.js";

describe("domain presets", () => {
  it("exports all five presets with brand + navigation", () => {
    const presets = [fintechLayoutPreset, medLayoutPreset, eduLayoutPreset, enterpriseLayoutPreset, defaultLayoutPreset];
    expect(presets).toHaveLength(5);
    for (const p of presets) {
      expect(p.brand.name).toBeTruthy();
      expect(p.navigation.length).toBeGreaterThan(0);
    }
  });

  it("default preset keeps tenant switcher off", () => {
    expect(defaultLayoutPreset.features?.tenantSwitcher).toBe(false);
  });

  it("fintech + enterprise enable tenant switching", () => {
    expect(fintechLayoutPreset.features?.tenantSwitcher).toBe(true);
    expect(enterpriseLayoutPreset.features?.tenantSwitcher).toBe(true);
  });

  it("every nav item has unique hrefs within a preset", () => {
    for (const preset of [fintechLayoutPreset, enterpriseLayoutPreset]) {
      const hrefs = preset.navigation.flatMap((s) => s.items.map((i) => i.href));
      expect(new Set(hrefs).size).toBe(hrefs.length);
    }
  });

  it("presets satisfy the LayoutConfig shape", () => {
    const config: LayoutConfig = defaultLayoutPreset;
    expect(config).toBeDefined();
  });
});

describe("Sidebar", () => {
  function renderSidebar(config: LayoutConfig, isLoading?: boolean) {
    return render(
      <LayoutProvider>
        <Sidebar config={config} isLoading={isLoading} />
      </LayoutProvider>,
    );
  }

  it("renders brand name", () => {
    renderSidebar(defaultLayoutPreset);
    expect(screen.getByText("App")).toBeInTheDocument();
  });

  it("renders section titles and nav labels", () => {
    renderSidebar(defaultLayoutPreset);
    expect(screen.getByText("Overview")).toBeInTheDocument();
    expect(screen.getByText("Account")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /dashboard/i })).toHaveAttribute("href", "/dashboard");
    expect(screen.getByRole("link", { name: /profile/i })).toHaveAttribute("href", "/settings/profile");
  });

  it("shows skeleton when loading", () => {
    renderSidebar(defaultLayoutPreset, true);
    expect(screen.queryByText("Overview")).toBeNull();
    expect(document.querySelectorAll(".animate-pulse").length).toBeGreaterThan(0);
  });

  it("shows empty state when no navigation", () => {
    const empty: LayoutConfig = { brand: { name: "Empty" }, navigation: [] };
    renderSidebar(empty);
    expect(screen.getByText(/no navigation items/i)).toBeInTheDocument();
  });

  it("renders badges on nav items", () => {
    const config: LayoutConfig = {
      brand: { name: "App" },
      navigation: [
        { title: "Alerts", items: [{ href: "/alerts", label: "Alerts", badge: 3 }] },
      ],
    };
    renderSidebar(config);
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("collapses and expands nested nav groups", async () => {
    const config: LayoutConfig = {
      brand: { name: "App" },
      navigation: [
        {
          title: "Workspace",
          items: [
            {
              href: "/projects",
              label: "Projects",
              children: [
                { href: "/projects/active", label: "Active" },
                { href: "/projects/archived", label: "Archived" },
              ],
            },
          ],
        },
      ],
    };
    renderSidebar(config);

    // Group trigger renders but children are hidden initially
    const group = screen.getByRole("button", { name: /projects/i });
    expect(screen.queryByText("Active")).toBeNull();

    await userEvent.click(group);
    expect(screen.getByRole("link", { name: /active/i })).toHaveAttribute(
      "href",
      "/projects/active",
    );
    expect(screen.getByRole("link", { name: /archived/i })).toHaveAttribute(
      "href",
      "/projects/archived",
    );
  });
});

describe("Sidebar collapsed (rail mode)", () => {
  function renderCollapsedSidebar() {
    return render(
      <LayoutProvider>
        <Sidebar config={fintechLayoutPreset} collapsed />
      </LayoutProvider>,
    );
  }

  it("hides brand name and section titles when collapsed", () => {
    renderCollapsedSidebar();
    expect(screen.queryByText("ArcID")).toBeNull();
    expect(screen.queryByText("Overview")).toBeNull();
    expect(screen.queryByText("Security")).toBeNull();
  });

  it("keeps links reachable with aria-labels when collapsed", () => {
    renderCollapsedSidebar();
    const dashboard = screen.getByRole("link", { name: /dashboard/i });
    expect(dashboard).toHaveAttribute("href", "/dashboard");
    expect(dashboard).toHaveAttribute("aria-label", "Dashboard");
  });

  it("collapsed links are icon-only (label text not rendered)", () => {
    renderCollapsedSidebar();
    // Label text is hidden in collapsed mode; only the accessible name remains.
    expect(screen.queryByText("Dashboard")).toBeNull();
  });
});

describe("LayoutProvider collapsed state", () => {
  function CollapseProbe() {
    const { sidebarCollapsed, toggleSidebarCollapsed } = useLayout();
    return (
      <button
        type="button"
        onClick={toggleSidebarCollapsed}
        aria-pressed={sidebarCollapsed}
      >
        toggle
      </button>
    );
  }

  it("toggles the collapsed flag", async () => {
    render(
      <LayoutProvider>
        <CollapseProbe />
      </LayoutProvider>,
    );
    const toggle = screen.getByRole("button", { name: "toggle" });
    expect(toggle).toHaveAttribute("aria-pressed", "false");
    await userEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-pressed", "true");
  });
});
