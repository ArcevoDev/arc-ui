/**
 * Icon registry tests: registerIcon / getIcon / IconProvider overrides.
 */

import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Settings, LogOut } from "lucide-react";
import { Icon, IconProvider, getIcon, registerIcon } from "./index.js";

describe("icon registry", () => {
  it("provides built-in semantic icons", () => {
    expect(getIcon("settings")).toBe(Settings);
    expect(getIcon("logout")).toBe(LogOut);
  });

  it("registerIcon overrides a global icon", () => {
    const Custom = () => <span data-testid="custom-settings">S</span>;
    registerIcon("settings", Custom);
    expect(getIcon("settings")).toBe(Custom);
  });

  it("IconProvider overrides win over the global registry", () => {
    const DomainBell = () => <span data-testid="domain-bell">B</span>;
    render(
      <IconProvider overrides={{ bell: DomainBell }}>
        <Icon name="bell" />
      </IconProvider>,
    );
    expect(screen.getByTestId("domain-bell")).toBeInTheDocument();
  });

  it("Icon renders the default icon without a provider", () => {
    render(<Icon name="logout" />);
    // lucide renders an svg
    expect(document.querySelector("svg")).not.toBeNull();
  });
});
