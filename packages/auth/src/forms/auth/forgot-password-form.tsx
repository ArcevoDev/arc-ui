/**
 * ForgotPasswordForm — email input for password reset request.
 *
 * Currently the SignIn component has an empty stub for "Forgot password?".
 * This fills that gap with a proper form.
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

export interface ForgotPasswordFormProps {
  appearance?: Appearance;
  /** Called with email. Return error string or null/undefined on success. */
  onSubmit: (email: string) => Promise<string | null | undefined>;
  onBack?: () => void;
}

/* ── Component ─────────────────────────────────────────────── */

export function ForgotPasswordForm({
  appearance,
  onSubmit,
  onBack,
}: ForgotPasswordFormProps) {
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
          <CardTitle>Check Your Email</CardTitle>
          <CardDescription>
            If an account exists for <strong>{email}</strong>, we've sent a
            password reset link.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" className="w-full" onClick={() => setSent(false)}>
            Send again
          </Button>
        </CardContent>
        {onBack && (
          <CardFooter className="justify-center">
            <Button variant="link" size="sm" onClick={onBack}>
              Back to sign in
            </Button>
          </CardFooter>
        )}
      </Card>
    );
  }

  return (
    <Card className={appearance?.className}>
      <CardHeader>
        <CardTitle>Reset Password</CardTitle>
        <CardDescription>
          Enter your email and we'll send you a reset link.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="forgot-email">Email</Label>
            <Input
              id="forgot-email"
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
            {isSubmitting ? "Sending…" : "Send Reset Link"}
          </Button>
        </form>
      </CardContent>
      {onBack && (
        <CardFooter className="justify-center">
          <Button variant="link" size="sm" onClick={onBack}>
            Back to sign in
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
