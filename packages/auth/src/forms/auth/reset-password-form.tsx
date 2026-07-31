/**
 * ResetPasswordForm: new password input for password reset flow.
 *
 * Accepts a token (from the reset link) and new password, calls the
 * AuthSdk.resetPassword method. Designed to be embedded in apps that
 * handle the token extraction from URL search params.
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

export interface ResetPasswordFormProps {
  appearance?: Appearance;
  /** Reset token from the email link (extracted by the consuming app). */
  token: string;
  /** Called with token + new password. Return error string or null/undefined on success. */
  onSubmit: (token: string, newPassword: string) => Promise<string | null | undefined>;
  onSuccess?: () => void;
  onBack?: () => void;
}

/* ── Component ─────────────────────────────────────────────── */

export function ResetPasswordForm({
  appearance,
  token,
  onSubmit,
  onSuccess,
  onBack,
}: ResetPasswordFormProps) {
  const [password, setPassword] = React.useState("");
  const [confirm, setConfirm] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [done, setDone] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setIsSubmitting(true);

    try {
      const err = await onSubmit(token, password);
      if (err) {
        setError(err);
      } else {
        setDone(true);
        onSuccess?.();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    }
    setIsSubmitting(false);
  };

  if (done) {
    return (
      <Card className={appearance?.className}>
        <CardHeader>
          <CardTitle>Password Reset</CardTitle>
          <CardDescription>
            Your password has been successfully reset.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            You can now sign in with your new password.
          </p>
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
        <CardTitle>Set New Password</CardTitle>
        <CardDescription>
          Enter your new password below.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="reset-password">New Password</Label>
            <Input
              id="reset-password"
              type="password"
              placeholder="At least 8 characters"
              autoComplete="new-password"
              required
              minLength={8}
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="reset-confirm">Confirm Password</Label>
            <Input
              id="reset-confirm"
              type="password"
              placeholder="Re-enter your password"
              autoComplete="new-password"
              required
              minLength={8}
              value={confirm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirm(e.target.value)}
            />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Resetting…" : "Reset Password"}
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
