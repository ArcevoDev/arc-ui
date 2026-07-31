import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./ui/button.js";
import { Badge } from "./ui/badge.js";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card.js";
import { Navbar, type NavLink } from "./ui/navbar.js";
import { NotificationDrawer, type Notification } from "./ui/notification-drawer.js";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion.js";
import { Dialog, DialogContent } from "./ui/dialog.js";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Save</Button>);
    expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument();
  });

  it("applies variant + size classes", () => {
    const { container } = render(<Button variant="destructive" size="lg">Delete</Button>);
    const btn = container.querySelector("button");
    expect(btn).toHaveClass("bg-destructive");
    expect(btn).toHaveClass("h-10");
  });

  it("is disabled when disabled prop set", () => {
    render(<Button disabled>Off</Button>);
    expect(screen.getByRole("button", { name: /off/i })).toBeDisabled();
  });

  it("fires onClick", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click</Button>);
    await userEvent.click(screen.getByRole("button", { name: /click/i }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe("Badge", () => {
  it("renders label", () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("applies variant classes", () => {
    const { container } = render(<Badge variant="secondary">Tag</Badge>);
    expect(container.querySelector("div")).toHaveClass("bg-secondary");
  });

  it("renders an optional leading icon", () => {
    const { container } = render(
      <Badge icon={<span data-testid="icon">*</span>}>New</Badge>,
    );
    expect(screen.getByText("New")).toBeInTheDocument();
    expect(container.querySelector("[data-testid=icon]")).toBeInTheDocument();
  });

  it("renders icon-only when iconOnly is set", () => {
    const { container } = render(
      <Badge iconOnly icon={<span data-testid="icon">*</span>} />,
    );
    expect(container.querySelector("[data-testid=icon]")).toBeInTheDocument();
    expect(container.querySelector("div")).toHaveClass("size-6");
  });
});

describe("Card", () => {
  it("composes header, title, content", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
          <CardDescription>Manage settings</CardDescription>
        </CardHeader>
        <CardContent>Body</CardContent>
      </Card>,
    );
    expect(screen.getByText("Account")).toBeInTheDocument();
    expect(screen.getByText("Manage settings")).toBeInTheDocument();
    expect(screen.getByText("Body")).toBeInTheDocument();
  });

  it.each(["outline", "elevated", "interactive"] as const)(
    "applies %s variant classes",
    (variant) => {
      const { container } = render(<Card variant={variant}>Body</Card>);
      const card = container.querySelector("div");
      expect(card).toHaveClass("rounded-xl");
      if (variant === "outline") expect(card).toHaveClass("shadow-none");
      if (variant === "elevated") expect(card).toHaveClass("shadow-md");
      if (variant === "interactive") expect(card).toHaveClass("cursor-pointer");
    },
  );
});

describe("Accordion", () => {
  it("renders trigger and expands content", async () => {
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Question</AccordionTrigger>
          <AccordionContent>Answer</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );
    expect(screen.getByText("Question")).toBeInTheDocument();
    await userEvent.click(screen.getByText("Question"));
    expect(await screen.findByText("Answer")).toBeInTheDocument();
  });

  it("applies the separated variant classes to the item", () => {
    const { container } = render(
      <Accordion type="single">
        <AccordionItem variant="separated" value="item-1">
          <AccordionTrigger>Q</AccordionTrigger>
        </AccordionItem>
      </Accordion>,
    );
    // The AccordionItem renders an <h3> (Header) inside the item div.
    const header = container.querySelector("h3");
    const item = header?.parentElement;
    expect(item?.className).toContain("bg-card");
    expect(item?.className).toContain("rounded-lg");
  });
});

describe("Dialog", () => {
  it("renders content inside a dialog with a dim overlay by default", async () => {
    render(
      <Dialog defaultOpen>
        <DialogContent aria-describedby={undefined}>
          <p>Content</p>
        </DialogContent>
      </Dialog>,
    );
    const content = await screen.findByText("Content");
    expect(content).toBeInTheDocument();
    const dialog = content.closest("[role=dialog]");
    expect(dialog?.className).toContain("bg-background");
    // The overlay is rendered by Radix into the portal; the dim variant applies bg-black/80.
    expect(document.querySelector(".bg-black\\/80")).not.toBeNull();
  });

  it("applies the compact variant class to content", async () => {
    render(
      <Dialog defaultOpen>
        <DialogContent variant="compact" aria-describedby={undefined}>
          <p>Small</p>
        </DialogContent>
      </Dialog>,
    );
    const content = await screen.findByText("Small");
    const dialog = content.closest("[role=dialog]");
    expect(dialog?.className).toContain("max-w-md");
  });
});

describe("Navbar", () => {
  const links: NavLink[] = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/settings", label: "Settings", badge: "New" },
  ];

  it("renders brand and desktop links", () => {
    render(<Navbar brand={<span>Acme</span>} links={links} />);
    expect(screen.getByText("Acme")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /dashboard/i })).toHaveAttribute("href", "/dashboard");
    expect(screen.getByText("Settings")).toBeInTheDocument();
  });

  it("renders badge on links", () => {
    render(<Navbar links={links} />);
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("calls onNavigate and prevents default", async () => {
    const onNavigate = vi.fn();
    render(<Navbar links={links} onNavigate={onNavigate} />);

    const link = screen.getByRole("link", { name: /dashboard/i });
    await userEvent.click(link);

    expect(onNavigate).toHaveBeenCalledWith("/dashboard");
  });

  it("toggles the mobile menu", async () => {
    render(<Navbar brand="Acme" links={links} />);

    const toggle = screen.getByRole("button", { name: /toggle menu/i });
    // Desktop links are rendered but hidden; mobile menu starts closed
    expect(screen.getAllByText("Settings").length).toBe(1);

    await userEvent.click(toggle);
    // Mobile menu adds a duplicate of the links
    expect(screen.getAllByText("Settings").length).toBe(2);

    await userEvent.click(toggle);
    expect(screen.getAllByText("Settings").length).toBe(1);
  });

  it("renders sub-links in a dropdown trigger", async () => {
    const onNavigate = vi.fn();
    render(
      <Navbar
        links={[
          {
            href: "/product",
            label: "Product",
            children: [{ href: "/product/pricing", label: "Pricing" }],
          },
        ]}
        onNavigate={onNavigate}
      />,
    );

    // The parent link becomes a dropdown trigger button
    const trigger = screen.getByRole("button", { name: /product/i });
    expect(trigger).toBeInTheDocument();

    // Sub-link renders inside the dropdown once opened
    await userEvent.click(trigger);
    const subLink = await screen.findByText("Pricing");
    expect(subLink).toBeInTheDocument();

    await userEvent.click(subLink);
    expect(onNavigate).toHaveBeenCalledWith("/product/pricing");
  });

  it("applies frosted-glass pill classes when variant is pill", () => {
    const { container } = render(<Navbar variant="pill" brand="Acme" links={links} />);
    const nav = container.querySelector("nav");
    expect(nav).toHaveClass("rounded-full");
    expect(nav).toHaveClass("backdrop-blur-xl");
    expect(nav).toHaveClass("sticky");
  });

  it("renders a segmented tray for pill links", () => {
    const { container } = render(<Navbar variant="pill" brand="Acme" links={links} />);
    const tray = container.querySelector("nav > div:nth-of-type(2)");
    expect(tray).toHaveClass("rounded-full");
    expect(tray).toHaveClass("bg-muted/40");
  });

  it("marks a hash link active when the hash matches", () => {
    const anchorLinks: NavLink[] = [
      { href: "#features", label: "Features" },
      { href: "#demo", label: "Demo" },
    ];
    window.location.hash = "#demo";
    render(<Navbar brand="Acme" links={anchorLinks} />);

    const features = screen.getByRole("link", { name: /features/i });
    const demo = screen.getByRole("link", { name: /demo/i });
    expect(features).not.toHaveAttribute("aria-current", "page");
    expect(demo).toHaveAttribute("aria-current", "page");
  });
});

describe("NotificationDrawer", () => {
  const notifications: Notification[] = [
    { id: "1", title: "New sign-in", description: "From Lagos", read: false, type: "warning" },
    { id: "2", title: "Payment received", read: true, type: "success" },
  ];

  it("renders bell with unread count", () => {
    render(<NotificationDrawer notifications={notifications} />);
    expect(screen.getByText("1")).toBeInTheDocument(); // unread badge
  });

  it("opens drawer and lists notifications", async () => {
    render(<NotificationDrawer notifications={notifications} />);
    await userEvent.click(screen.getByRole("button"));

    expect(await screen.findByText("New sign-in")).toBeInTheDocument();
    expect(screen.getByText("Payment received")).toBeInTheDocument();
  });

  it("marks all read via callback", async () => {
    const onMarkAllRead = vi.fn();
    render(<NotificationDrawer notifications={notifications} onMarkAllRead={onMarkAllRead} />);

    await userEvent.click(screen.getByRole("button"));
    await userEvent.click(await screen.findByText(/mark all/i));

    expect(onMarkAllRead).toHaveBeenCalledTimes(1);
  });
});
