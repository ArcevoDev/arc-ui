import type { Meta, StoryObj } from "@storybook/react";
import { AuthLayout, fintechLayoutPreset, eduLayoutPreset } from "@arc-ui/layout";
import { Button } from "@arc-ui/components";

const meta: Meta<typeof AuthLayout> = {
  title: "Layout/AuthLayout",
  component: AuthLayout,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AuthLayout>;

export const Fintech: Story = {
  args: {
    config: fintechLayoutPreset,
    children: (
      <div className="space-y-4">
        <div className="space-y-1">
          <h1 className="text-xl font-bold text-foreground">Sign in</h1>
          <p className="text-sm text-muted-foreground">
            Enter your credentials to access your account.
          </p>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">
            Email
          </label>
          <input className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm text-foreground placeholder:text-muted-foreground" placeholder="you@company.com" />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">
            Password
          </label>
          <input type="password" className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm text-foreground" placeholder="••••••••" />
        </div>
        <Button className="w-full">Continue</Button>
      </div>
    ),
  },
};

export const Education: Story = {
  args: {
    config: eduLayoutPreset,
    children: (
      <div className="space-y-4">
        <div className="space-y-1">
          <h1 className="text-xl font-bold text-foreground">Create account</h1>
          <p className="text-sm text-muted-foreground">
            Join your school with a passkey or email.
          </p>
        </div>
        <Button className="w-full">Continue with Google</Button>
        <Button variant="outline" className="w-full">
          Continue with Email
        </Button>
      </div>
    ),
  },
};
