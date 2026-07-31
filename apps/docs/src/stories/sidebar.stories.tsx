import type { Meta, StoryObj } from "@storybook/react";
import {
  FolderKanban,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react";
import { Sidebar, LayoutProvider, fintechLayoutPreset } from "@arc-ui/layout";
import type { LayoutConfig } from "@arc-ui/layout";

const meta: Meta<typeof Sidebar> = {
  title: "Layout/Sidebar",
  component: Sidebar,
  decorators: [
    (Story) => (
      <LayoutProvider>
        <div className="relative min-h-[400px]">
          <Story />
        </div>
      </LayoutProvider>
    ),
  ],
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {
  args: {
    config: fintechLayoutPreset,
  },
};

export const Loading: Story = {
  args: {
    config: fintechLayoutPreset,
    isLoading: true,
  },
};

export const Collapsed: Story = {
  args: {
    config: fintechLayoutPreset,
    collapsed: true,
  },
};

export const WithNestedGroups: Story = {
  args: {
    config: {
      brand: { name: "Acme" },
      navigation: [
        {
          title: "Overview",
          items: [
            { href: "/dashboard", label: "Dashboard", icon: <LayoutDashboard className="size-4" /> },
          ],
        },
        {
          title: "Manage",
          items: [
            {
              href: "/projects",
              label: "Projects",
              icon: <FolderKanban className="size-4" />,
              children: [
                { href: "/projects/active", label: "Active" },
                { href: "/projects/archived", label: "Archived" },
              ],
            },
            {
              href: "/team",
              label: "Team",
              icon: <Users className="size-4" />,
              children: [
                { href: "/team/members", label: "Members" },
                { href: "/team/roles", label: "Roles" },
                { href: "/team/invites", label: "Invites", badge: 2 },
              ],
            },
          ],
        },
        {
          title: "Settings",
          items: [
            {
              href: "/settings",
              label: "Settings",
              icon: <Settings className="size-4" />,
              children: [
                { href: "/settings/profile", label: "Profile" },
                { href: "/settings/billing", label: "Billing" },
              ],
            },
          ],
        },
      ],
    } satisfies LayoutConfig,
  },
};
