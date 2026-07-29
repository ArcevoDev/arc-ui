/**
 * @arc-ui/layout — User Menu
 *
 * Avatar + dropdown with user info, settings link, and sign out.
 * Uses useAuth() from @arc-ui/auth.
 */

import * as React from "react";
import { useAuth } from "@arc-ui/auth";
import { Avatar, AvatarFallback } from "@arc-ui/components";

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
  const [open, setOpen] = React.useState(false);

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
    setOpen(false);
  }, [logout, onSignOut]);

  if (isLoading) {
    return <div className="h-8 w-8 animate-pulse rounded-full bg-muted" />;
  }

  if (!user) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-primary/10 text-xs text-primary">
            {initials}
          </AvatarFallback>
        </Avatar>
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-10 z-50 w-56 rounded-lg border bg-popover p-1 shadow-lg">
            {/* User info */}
            <div className="px-2 py-2">
              <p className="text-sm font-medium text-foreground">
                {user.name}
              </p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>

            <div className="h-px bg-border" />

            {/* Settings */}
            <a
              href={settingsPath}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-sm px-2 py-2 text-sm text-foreground/80 hover:bg-accent"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-4"
              >
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
              Settings
            </a>

            <div className="h-px bg-border" />

            {/* Sign out */}
            <button
              onClick={handleSignOut}
              className="flex w-full items-center gap-2 rounded-sm px-2 py-2 text-sm text-destructive hover:bg-destructive/10"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-4"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Sign out
            </button>
          </div>
        </>
      )}

      {children}
    </div>
  );
}
