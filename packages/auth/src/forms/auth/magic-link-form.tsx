/**
 * MagicLinkForm — email input form for magic link sign-in.
 *
 * Handles sent/resent confirmation state.
 */

import * as React from "react";
import type { Appearance } from "../../types.js";

import {
  Button,
  Input,
  Label,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@arc-ui/components";

/* ── Props ─────────────────────────────────────────────────── */

export interface MagicLinkFormProps {
  appearance?: Appearance;
  /** Called with the email address. Return error string or null/undefined. */
  onSubmit: (email: string) => Promise<string | null | undefined>;
  onBack?: () => void;
}

/* ── Component ─────────────────────────────────────────────── */

export function MagicLinkForm({
  appearance,
  onSubmit,
  onBack,
}: MagicLinkFormProps) {
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [sent, setSent] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const err = await onSubmit(email);
      if (err) {
        setError(err);
      } else {
        setSent(true);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    }
    setIsSubmitting(false);
  };

  if (sent) {
    return (
      <Card className={appearance?.className}>
        <CardHeader>
          <CardTitle>Magic Link</CardTitle>
          <CardDescription>Check your inbox for the sign-in link</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 text-center">
          <p className="text-sm text-muted-foreground">
            We sent a link to <strong>{email}</strong>. Click it to sign in.
          </p>
          <Button variant="outline" onClick={() => setSent(false)}>
            Send again
          </Button>
        </CardContent>
        {onBack && (
          <CardFooter className="justify-center">
            <Button variant="link" size="sm" onClick={onBack}>
              Back to sign-in options
            </Button>
          </CardFooter>
        )}
      </Card>
    );
  }

  return (
    <Card className={appearance?.className}>
      <CardHeader>
        <CardTitle>Magic Link</CardTitle>
        <CardDescription>
          Enter your email to receive a sign-in link
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="signin-ml-email">Email</Label>
            <Input
              id="signin-ml-email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Sending…" : "Send Magic Link"}
          </Button>
        </form>
      </CardContent>
      {onBack && (
        <CardFooter className="justify-center">
          <Button variant="link" size="sm" onClick={onBack}>
            Back to sign-in options
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
