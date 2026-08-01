import * as React from "react";
import { cn } from "../utils.js";
import { Button } from "./button.js";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "./sheet.js";

export interface Notification {
  id: string;
  title: string;
  description?: string;
  time?: string;
  read?: boolean;
}

export interface NotificationBellProps {
  /** List of notifications */
  notifications?: Notification[];
  /** Total unread count (defaults to counting unread from notifications) */
  unreadCount?: number;
  /** Called when a notification is clicked */
  onNotificationClick?: (notification: Notification) => void;
  /** Called when "Mark all as read" is clicked */
  onMarkAllRead?: () => void;
  /** Custom trigger icon */
  trigger?: React.ReactNode;
  className?: string;
}

/**
 * @deprecated Use NotificationDrawer instead: it supports the same API plus
 * read/dismiss actions, type styling, and a scrollable list.
 */
export function NotificationBell({
  notifications = [],
  unreadCount,
  onNotificationClick,
  onMarkAllRead,
  trigger,
  className,
}: NotificationBellProps) {
  const count = unreadCount ?? notifications.filter((n) => n.read !== true).length;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn("relative", className)}
          aria-label={`Notifications${count > 0 ? ` (${count} unread)` : ""}`}
        >
          {trigger ?? <Bell size={18} />}
          {count > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-medium text-destructive-foreground">
              {count > 99 ? "99+" : count}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-sm">
        <SheetHeader className="flex flex-row items-center justify-between">
          <SheetTitle>Notifications</SheetTitle>
          {count > 0 && onMarkAllRead && (
            <button onClick={onMarkAllRead} className="text-xs text-primary hover:underline">
              Mark all as read
            </button>
          )}
        </SheetHeader>
        <div className="mt-4 flex flex-col gap-1">
          {notifications.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">No notifications</p>
          ) : (
            notifications.map((n) => (
              <button
                key={n.id}
                onClick={() => onNotificationClick?.(n)}
                className={`flex flex-col gap-1 rounded-lg px-3 py-2.5 text-left text-sm transition-colors hover:bg-accent ${
                  n.read === false ? "bg-accent/50" : ""
                }`}
              >
                <span className="font-medium text-foreground">{n.title}</span>
                {n.description && (
                  <span className="text-xs text-muted-foreground">{n.description}</span>
                )}
                {n.time && <span className="text-[10px] text-muted-foreground/60">{n.time}</span>}
              </button>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

function Bell({ size }: { size?: number }) {
  return (
    <svg
      width={size ?? 18}
      height={size ?? 18}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}
