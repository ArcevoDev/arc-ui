import type { Meta, StoryObj } from "@storybook/react";
import { TenantSwitcher } from "@arcevo/facet-layout";

const meta: Meta<typeof TenantSwitcher> = {
  title: "Layout/TenantSwitcher",
  component: TenantSwitcher,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TenantSwitcher>;

const tenants = [
  { id: "tenant_arc_001", name: "Arcevo Labs", plan: "pro" },
  { id: "tenant_acme_001", name: "Acme Corp", plan: "enterprise" },
  { id: "tenant_edu_001", name: "State University", plan: "edu" },
];

export const MultipleTenants: Story = {
  args: {
    tenants,
    activeTenant: tenants[0] ?? null,
    onSwitch: () => {},
  },
};

export const SingleTenant: Story = {
  args: {
    tenants: [tenants[0]!],
    activeTenant: tenants[0] ?? null,
    onSwitch: () => {},
  },
};
