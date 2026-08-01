import type { Meta, StoryObj } from "@storybook/react";
import { UserMenu } from "@arcevo/facet-layout";
import { withMockAuthSession } from "./layout-decorator.js";

const meta: Meta<typeof UserMenu> = {
  title: "Layout/UserMenu",
  component: UserMenu,
  decorators: [withMockAuthSession],
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof UserMenu>;

export const Default: Story = {
  args: {},
};

export const WithChildren: Story = {
  args: {
    children: (
      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-input text-muted-foreground">
        🔔
      </span>
    ),
  },
};
