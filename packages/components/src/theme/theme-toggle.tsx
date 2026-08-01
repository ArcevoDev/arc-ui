/**
 * @arcevo/facet-components: ThemeToggle
 *
 * Dropdown control for switching between light, dark, and system themes.
 * Requires a <ThemeProvider> ancestor. The trigger icon reflects the
 * currently applied (resolved) theme.
 */

import { Icon } from "../icon/index.js";
import { cn } from "../utils.js";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu.js";
import { useTheme, type Theme } from "./theme-provider.js";

export interface ThemeToggleProps {
  className?: string;
  /** Options to show. Default: ["light", "dark", "system"] */
  items?: readonly Theme[];
  /** Accessible label for the trigger. Default: "Toggle theme" */
  label?: string;
}

const ITEM_LABELS: Record<Theme, string> = {
  light: "Light",
  dark: "Dark",
  system: "System",
};

export function ThemeToggle({
  className,
  items = ["light", "dark", "system"],
  label = "Toggle theme",
}: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const TriggerIcon = resolvedTheme === "dark" ? "moon" : "sun";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={label}
        className={cn(
          "inline-flex h-9 w-9 items-center justify-center rounded-md text-foreground/70 transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          className,
        )}
      >
        <Icon name={TriggerIcon} className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {items.map((item) => (
          <DropdownMenuItem key={item} onClick={() => setTheme(item)} className="cursor-pointer">
            {theme === item && <Icon name="check" className="size-4" />}
            <span className={theme === item ? "" : "pl-6"}>{ITEM_LABELS[item]}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
