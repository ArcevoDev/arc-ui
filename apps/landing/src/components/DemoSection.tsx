import { useState } from "react";
import {
  Button,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Switch,
  Progress,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@arc-ui/components";
import { BUTTON_VARIANTS, BADGE_VARIANTS } from "../data/features.js";

export function DemoSection() {
  const [tab, setTab] = useState("preview");

  return (
    <section id="demo" className="mx-auto max-w-7xl px-8 py-24">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold text-foreground font-heading sm:text-4xl">
          See it in action
        </h2>
        <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
          Rendered live with our own tokens and utilities. What you see is what you get.
        </p>
      </div>

      <Tabs value={tab} onValueChange={(v) => setTab(v)} className="w-full">
        <div className="flex justify-center mb-8">
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Source</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="preview" className="space-y-12">
          <Card>
            <CardHeader>
              <CardTitle>Button variants</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {BUTTON_VARIANTS.map((v) => (
                  <Button key={v} variant={v} size="sm">
                    {v}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Badge variants</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {BADGE_VARIANTS.map((v) => (
                  <Badge key={v} variant={v}>
                    {v}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Interactive controls</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-center gap-8">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">Switch</span>
                  <Switch />
                </div>
                <div className="flex items-center gap-3 min-w-[200px]">
                  <span className="text-sm text-muted-foreground">Progress</span>
                  <Progress value={65} className="flex-1" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="code">
          <Card>
            <CardContent className="p-6">
              <pre className="text-sm font-mono text-foreground leading-relaxed overflow-auto">
                <code>{`import { Button, Badge, Switch, Progress } from "@arc-ui/components";

function MyComponent() {
  return (
    <div className="space-y-4">
      <Button variant="default">Default</Button>
      <Button variant="outline">Outline</Button>
      <Badge variant="success">Success</Badge>
      <Switch />
      <Progress value={65} />
    </div>
  );
}`}</code>
              </pre>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
}
