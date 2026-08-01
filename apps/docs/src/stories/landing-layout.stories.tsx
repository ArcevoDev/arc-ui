import type { Meta, StoryObj } from "@storybook/react";
import { LandingLayout } from "@arcevo/facet-layout";
import { Button, Navbar } from "@arcevo/facet-components";

const meta: Meta<typeof LandingLayout> = {
  title: "Layout/LandingLayout",
  component: LandingLayout,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof LandingLayout>;

export const Default: Story = {
  args: {
    nav: (
      <Navbar
        variant="pill"
        brand={<span className="font-semibold text-foreground">Acme</span>}
        links={[
          { href: "#features", label: "Features" },
          { href: "#demo", label: "Demo" },
          { href: "#docs", label: "Docs" },
        ]}
        actions={<Button size="sm">Get started</Button>}
      />
    ),
    hero: (
      <div className="max-w-2xl">
        <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Build beautiful UIs, faster.
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          A domain-customizable component library for modern web apps.
        </p>
        <div className="mt-6 flex gap-3">
          <Button size="lg">Get started</Button>
          <Button size="lg" variant="outline">
            View docs
          </Button>
        </div>
      </div>
    ),
    children: (
      <div className="grid gap-6 px-8 py-16 sm:grid-cols-3">
        {[
          { title: "Fast", body: "Zero runtime config, tree-shakeable." },
          { title: "Accessible", body: "Radix primitives under the hood." },
          { title: "Customizable", body: "Domain presets for every industry." },
        ].map((f) => (
          <div key={f.title} className="rounded-lg border border-border bg-card p-6">
            <h3 className="font-semibold text-foreground">{f.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{f.body}</p>
          </div>
        ))}
      </div>
    ),
    footer: (
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-6 text-sm text-muted-foreground">
        <span>© 2026 Acme</span>
        <span>Built with facet</span>
      </div>
    ),
  },
};
