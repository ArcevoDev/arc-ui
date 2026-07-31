import type { Meta, StoryObj } from "@storybook/react";
import { PageHeader } from "@arc-ui/layout";
import { Button } from "@arc-ui/components";

const meta: Meta<typeof PageHeader> = {
  title: "Layout/PageHeader",
  component: PageHeader,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PageHeader>;

export const Default: Story = {
  args: {
    title: "Security",
    description: "Manage your sessions, MFA, and audit log.",
  },
};

export const WithActions: Story = {
  args: {
    title: "Members",
    description: "Invite and manage your team.",
    actions: (
      <>
        <Button variant="outline" size="sm">
          Export
        </Button>
        <Button size="sm">Invite member</Button>
      </>
    ),
  },
};
