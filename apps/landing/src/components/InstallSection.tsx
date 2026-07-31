import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  ScrollArea,
  ScrollBar,
} from "@arc-ui/components";
import { INSTALL_STEPS } from "../data/features.js";

export function InstallSection() {
  return (
    <section id="install" className="mx-auto max-w-7xl px-8 py-24">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold text-foreground font-heading sm:text-4xl">
          Get started in 5 minutes
        </h2>
        <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
          Install one command, import what you need, ship your app.
        </p>
      </div>

      <ScrollArea type="always" className="w-full">
        <div className="flex min-w-max gap-4 pb-4">
          {INSTALL_STEPS.map((step) => (
            <Card key={step.num} className="w-64 shrink-0">
              <CardHeader>
                <span className="inline-flex items-center justify-center size-8 rounded-full bg-primary/10 text-primary text-sm font-bold">
                  {step.num}
                </span>
                <CardTitle className="text-sm font-semibold">
                  {step.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <code className="block text-[11px] text-muted-foreground font-mono leading-relaxed break-all">
                  {step.code}
                </code>
              </CardContent>
            </Card>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
}
