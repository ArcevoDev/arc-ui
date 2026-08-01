import type { Meta, StoryObj } from "@storybook/react";
import { SignIn } from "@arcevo/facet-auth";
import { withMockAuth } from "./auth-decorator.js";

const meta: Meta<typeof SignIn> = {
  title: "Auth/SignIn",
  component: SignIn,
  decorators: [withMockAuth],
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SignIn>;

export const Default: Story = {};

export const WithFintechPreset: Story = {
  args: { config: { requireMfa: true, sessionTtl: 15 } },
};

export const WithPasskeyOnly: Story = {
  args: { config: { allowMagicLink: false, allowPasskey: true } },
};

export const WithOAuthProviders: Story = {
  args: { config: { oauthProviders: ["Google", "GitHub", "Microsoft"] } },
};
