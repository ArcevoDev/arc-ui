import type { Meta, StoryObj } from "@storybook/react";
import { ArcProvider } from "@arc-ui/auth";
import { withMockAuth } from "./auth-decorator.js";

const meta: Meta<typeof ArcProvider> = {
  title: "Auth/ArcProvider",
  component: ArcProvider,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ArcProvider>;

export const WrappingContent: Story = {
  decorators: [withMockAuth],
  render: () => (
    <div className="flex items-center justify-center p-12">
      <p className="text-muted-foreground">
        ArcProvider wraps the app. Check the "Auth Guard" story for a working example.
      </p>
    </div>
  ),
};
