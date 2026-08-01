import { Github } from "lucide-react";
import { Navbar, Button, ThemeToggle } from "@arc-ui/components";
import type { NavLink } from "@arc-ui/components";

// Anchor links scroll to in-page sections; no dead routes.
const LINKS: NavLink[] = [
  { href: "#features", label: "Features" },
  { href: "#demo", label: "Demo" },
  { href: "#install", label: "Install" },
];

function Brand() {
  return (
    <div className="flex items-center gap-2.5">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-primary">
        <path
          d="M12 2L4 6V12C4 17.52 7.58 22.48 12 24C16.42 22.48 20 17.52 20 12V6L12 2Z"
          fill="currentColor"
          opacity="0.8"
        />
        <path
          d="M12 6L8 8V12C8 14.5 9.67 16.8 12 17.5C14.33 16.8 16 14.5 16 12V8L12 6Z"
          fill="currentColor"
          opacity="0.4"
        />
      </svg>
      <span className="font-heading text-lg font-bold text-foreground">arc-ui</span>
    </div>
  );
}

export function Nav() {
  return (
    <Navbar
      variant="pill"
      brand={<Brand />}
      links={LINKS}
      actions={
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/arcevodev/arc-ui"
            className="hidden items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground sm:flex"
          >
            <Github size={16} />
            GitHub
          </a>
          <ThemeToggle />
          <Button size="sm" onClick={() => window.open("http://localhost:6006")}>
            Browse components
          </Button>
        </div>
      }
    />
  );
}
