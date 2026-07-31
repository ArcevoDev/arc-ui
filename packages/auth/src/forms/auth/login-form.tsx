/**
 * LoginForm: email/password form with forgot-password link.
 *
 * Standalone form for direct use outside the SignIn state machine.
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

export interface LoginFormProps {
  appearance?: Appearance;
  /** Called with email + password. Return error string or null/undefined. */
  onSubmit: (email: string, password: string) => Promise<string | null | undefined>;
  /** Called when user clicks the back button */
  onBack?: () => void;
  /** Called when user clicks "Forgot password?" */
  onForgotPassword?: () => void;
}

/* ── Component ─────────────────────────────────────────────── */

export function LoginForm({
  appearance,
  onSubmit,
  onBack,
  onForgotPassword,
}: LoginFormProps) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const err = await onSubmit(email, password);
      if (err) setError(err);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    }
    setIsSubmitting(false);
  };

  return (
    <Card className={appearance?.className}>
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Enter your credentials</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="signin-email">Email</Label>
            <Input
              id="signin-email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="signin-password">Password</Label>
              {onForgotPassword && (
                <Button
                  type="button"
                  variant="link"
                  className="h-auto p-0 text-xs"
                  onClick={onForgotPassword}
                >
                  Forgot password?
                </Button>
              )}
            </div>
            <Input
              id="signin-password"
              type="password"
              placeholder="········"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Signing in…" : "Sign In"}
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
