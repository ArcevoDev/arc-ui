import type { Meta, StoryObj } from "@storybook/react";
import { UserButton } from "@arc-ui/auth";
import { withMockAuth } from "./auth-decorator.js";

const meta: Meta<typeof UserButton> = {
  title: "Auth/UserButton",
  component: UserButton,
  decorators: [withMockAuth],
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof UserButton>;

export const Default: Story = {};
