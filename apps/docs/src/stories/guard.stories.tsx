import type { Meta, StoryObj } from "@storybook/react";
import { Guard } from "@arcevo/facet-auth";
import { withMockAuth } from "./auth-decorator.js";

const meta: Meta<typeof Guard> = {
  title: "Auth/Guard",
  component: Guard,
  decorators: [withMockAuth],
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Guard>;

export const Authenticated: Story = {
  render: () => (
    <Guard>
      <div className="rounded-lg border border-border bg-card p-6">
        <p className="text-sm text-foreground">
          You are authenticated. This content is only visible to signed-in users.
        </p>
      </div>
    </Guard>
  ),
};

export const WithFallback: Story = {
  render: () => (
    <Guard
      fallback={
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-6">
          <p className="text-sm text-destructive">
            You are not authenticated. Please sign in to continue.
          </p>
        </div>
      }
    >
      <div className="rounded-lg border border-border bg-card p-6">
        <p className="text-sm text-foreground">Protected content here.</p>
      </div>
    </Guard>
  ),
};
