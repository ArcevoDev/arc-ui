import type { Meta, StoryObj } from "@storybook/react";
import { ConsoleLayout, fintechLayoutPreset, enterpriseLayoutPreset } from "@arcevo/facet-layout";
import { withMockAuthSession } from "./layout-decorator.js";

const meta: Meta<typeof ConsoleLayout> = {
  title: "Layout/ConsoleLayout",
  component: ConsoleLayout,
  decorators: [withMockAuthSession],
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ConsoleLayout>;

const tenants = [
  { id: "tenant_arc_001", name: "Arcevo Labs", plan: "pro" },
  { id: "tenant_acme_001", name: "Acme Corp", plan: "enterprise" },
];

const content = (
  <div className="space-y-4">
    <div className="rounded-lg border border-border bg-card p-6">
      <h2 className="text-lg font-semibold text-foreground">Dashboard</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Signed in as Jane Archer. This shell is driven by the fintech layout preset.
      </p>
    </div>
    <div className="grid gap-4 sm:grid-cols-3">
      {["Active sessions", "MFA enabled", "Audit events"].map((label) => (
        <div key={label} className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="mt-1 text-2xl font-bold text-foreground">-</p>
        </div>
      ))}
    </div>
  </div>
);

export const Fintech: Story = {
  args: {
    config: fintechLayoutPreset,
    tenants,
    activeTenant: tenants[0],
    children: content,
  },
};

export const Rail: Story = {
  args: {
    config: fintechLayoutPreset,
    mode: "rail",
    tenants,
    activeTenant: tenants[0],
    children: content,
  },
};

export const Enterprise: Story = {
  args: {
    config: enterpriseLayoutPreset,
    tenants,
    activeTenant: tenants[0],
    children: content,
  },
};
