import type { Meta, StoryObj } from "@storybook/react";
import { SignUp } from "@arc-ui/auth";
import { withMockAuth } from "./auth-decorator.js";

const meta: Meta<typeof SignUp> = {
  title: "Auth/SignUp",
  component: SignUp,
  decorators: [withMockAuth],
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SignUp>;

export const Default: Story = {};

export const WithMedPreset: Story = {
  args: { config: { requireMfa: true, requireEmailVerification: true } },
};
