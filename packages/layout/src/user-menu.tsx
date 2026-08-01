/**
 * @arcevo/facet-layout: User Menu
 *
 * Avatar + dropdown with user info, settings link, and sign out.
 * Uses useAuth() from @arcevo/facet-auth and DropdownMenu from @arcevo/facet-components.
 */

import * as React from "react";
import { useAuth } from "@arcevo/facet-auth";
import {
  Avatar,
  AvatarFallback,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  Icon,
} from "@arcevo/facet-components";
import { useLayout } from "./layout-context.js";

export interface UserMenuProps {
  /** Path to settings page. Default: "/settings/profile" */
  settingsPath?: string;
  /** Callback when "Sign out" is clicked. Default: calls logout() from useAuth */
  onSignOut?: () => void;
  /** Additional topbar actions (notifications, theme toggle, etc.) */
  children?: React.ReactNode;
}

export function UserMenu({
  settingsPath = "/settings/profile",
  onSignOut,
  children,
}: UserMenuProps) {
  const { user, logout, isLoading } = useAuth();
  const { router } = useLayout();
  const SettingsLink = router?.Link ?? "a";

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  const handleSignOut = React.useCallback(async () => {
    if (onSignOut) {
      onSignOut();
    } else {
      await logout();
    }
  }, [logout, onSignOut]);

  if (isLoading) {
    return <div className="h-8 w-8 animate-pulse rounded-full bg-muted" />;
  }

  if (!user) return null;

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary/10 text-xs text-primary">
                {initials}
              </AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>
            <p className="text-sm font-medium text-foreground">{user.name}</p>
            <p className="text-xs font-normal text-muted-foreground">{user.email}</p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <SettingsLink href={settingsPath} className="flex items-center gap-2">
              <Icon name="settings" size={16} />
              Settings
            </SettingsLink>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleSignOut}
            className="text-destructive focus:text-destructive focus:bg-destructive/10"
          >
            <Icon name="logout" size={16} />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {children}
    </div>
  );
}
