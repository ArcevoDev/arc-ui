import type { Meta, StoryObj } from "@storybook/react";
import { Topbar, LayoutProvider } from "@arc-ui/layout";
import { withMockAuthSession } from "./layout-decorator.js";

const meta: Meta<typeof Topbar> = {
  title: "Layout/Topbar",
  component: Topbar,
  decorators: [
    withMockAuthSession,
    (Story) => (
      <LayoutProvider>
        <Story />
      </LayoutProvider>
    ),
  ],
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Topbar>;

const tenants = [
  { id: "tenant_arc_001", name: "Arcevo Labs", plan: "pro" },
  { id: "tenant_acme_001", name: "Acme Corp", plan: "enterprise" },
];

export const Default: Story = {
  args: {
    tenants,
    activeTenant: tenants[0],
  },
};

export const WithChildren: Story = {
  args: {
    tenants,
    activeTenant: tenants[0],
    children: (
      <span className="flex h-8 items-center gap-2 rounded-md border border-input px-3 text-sm text-muted-foreground">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        Search
      </span>
    ),
  },
};
