/**
 * SignIn — multi-step sign-in component with state machine.
 *
 * Orchestrates LoginForm, MagicLinkForm, and ForgotPasswordForm through
 * the auth step flow. Extracted forms are independently importable from
 * @arc-ui/auth.
 *
 * Steps: idle → check_session → select_method → login_form / magic_link_form
 *        → check_mfa → mfa_challenge → complete
 */

import * as React from "react";
import { useAuth } from "./provider.js";
import { defaultConfig } from "./types.js";
import type { AuthConfig, Appearance, ComponentSlots, SignInStep, TokenPair } from "./types.js";
import { LoginForm } from "./forms/auth/login-form.js";
import { MagicLinkForm } from "./forms/auth/magic-link-form.js";
import { ForgotPasswordForm } from "./forms/auth/forgot-password-form.js";

import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Separator,
} from "@arc-ui/components";

/* ── Props ─────────────────────────────────────────────────── */

export interface SignInProps {
  appearance?: Appearance;
  config?: Partial<AuthConfig>;
  slots?: ComponentSlots;
  onSuccess?: (result: TokenPair) => void;
}

/* ── Method selector (internal to SignIn) ──────────────────── */

function SelectMethodStep({
  appearance,
  slots,
  cfg,
  onSelectMethod,
  handlePasskeyAuth,
}: {
  appearance?: Appearance;
  slots?: ComponentSlots;
  cfg: AuthConfig;
  onSelectMethod: (step: SignInStep) => void;
  handlePasskeyAuth: () => void;
}) {
  return (
    <Card className={appearance?.className}>
      <CardHeader>
        {slots?.title ?? <CardTitle>Sign In</CardTitle>}
        {slots?.description ?? (
          <CardDescription>Choose how to sign in to your account</CardDescription>
        )}
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <Button className="w-full" onClick={() => onSelectMethod("login_form")}>
          Continue with Email & Password
        </Button>
        {cfg.allowMagicLink && (
          <Button
            variant="outline"
            className="w-full"
            onClick={() => onSelectMethod("magic_link_form")}
          >
            Continue with Magic Link
          </Button>
        )}
        {cfg.allowPasskey && (
          <Button variant="outline" className="w-full" onClick={handlePasskeyAuth}>
            Continue with Passkey
          </Button>
        )}
        {cfg.oauthProviders.length > 0 && (
          <>
            <Separator className="my-2" />
            {cfg.oauthProviders.map((provider) => (
              <Button key={provider} variant="outline" className="w-full">
                Sign in with {provider}
              </Button>
            ))}
          </>
        )}
      </CardContent>
    </Card>
  );
}

/* ── SignIn orchestrator ───────────────────────────────────── */

export function SignIn({
  appearance,
  config: configOverrides,
  slots,
  onSuccess,
}: SignInProps) {
  const cfg = { ...defaultConfig, ...configOverrides };
  const { login, isAuthenticated } = useAuth();

  const [step, setStep] = React.useState<SignInStep>("idle");
  const [error, setError] = React.useState<string | null>(null);

  // Form fields that persist across steps
  const [, setEmail] = React.useState("");

  /* ── Bootstrap ───────────────────────────────────────────── */

  React.useEffect(() => {
    if (isAuthenticated) {
      setStep("complete");
    } else {
      setStep("select_method");
    }
  }, [isAuthenticated]);

  /* ── Handlers ────────────────────────────────────────────── */

  const handleEmailPasswordLogin = async (emailVal: string, password: string) => {
    setError(null);
    setEmail(emailVal);

    try {
      const res = await login({ email: emailVal, password });
      if (res.data) {
        const data = res.data as Record<string, unknown>;
        if (data.sessionId && !data.accessToken) {
          setStep("mfa_challenge");
          return null;
        }
        setStep("complete");
        onSuccess?.(res.data);
        return null;
      }
      return res.error?.message ?? "Login failed";
    } catch (err) {
      return err instanceof Error ? err.message : "Unexpected error";
    }
  };

  const handleMagicLinkRequest = async (emailVal: string) => {
    setEmail(emailVal);
    // Magic link is initiated server-side; the form handles sent state
    return null;
  };

  const handleForgotPassword = () => {
    setStep("forgot_password");
  };

  const handleForgotPasswordSubmit = async (_email: string) => {
    // Placeholder: wire to actual password-reset-request flow
    return null;
  };

  const handlePasskeyAuth = () => {
    // Placeholder: wire to passkey auth flow
    setStep("login_form");
  };

  /* ── Root render ─────────────────────────────────────────── */

  switch (step) {
    case "check_session":
    case "idle":
      return null;
    case "select_method":
      return (
        <SelectMethodStep
          appearance={appearance}
          slots={slots}
          cfg={cfg}
          onSelectMethod={setStep}
          handlePasskeyAuth={handlePasskeyAuth}
        />
      );
    case "login_form":
      return (
        <LoginForm
          appearance={appearance}
          onSubmit={handleEmailPasswordLogin}
          onBack={() => setStep("select_method")}
          onForgotPassword={handleForgotPassword}
        />
      );
    case "magic_link_form":
      return (
        <MagicLinkForm
          appearance={appearance}
          onSubmit={handleMagicLinkRequest}
          onBack={() => setStep("select_method")}
        />
      );
    case "forgot_password":
      return (
        <ForgotPasswordForm
          appearance={appearance}
          onSubmit={handleForgotPasswordSubmit}
          onBack={() => setStep("login_form")}
        />
      );
    case "mfa_challenge":
      return (
        <Card className={appearance?.className}>
          <CardHeader>
            <CardTitle>Two-Factor Authentication</CardTitle>
            <CardDescription>
              Enter the code from your authenticator app
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              MFA verification required. Please enter your authentication code.
            </p>
            {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button className="w-full" onClick={() => setStep("select_method")}>
              Use a different method
            </Button>
          </CardFooter>
        </Card>
      );
    case "complete":
      return slots?.complete ?? null;
    case "error":
      return (
        <Card className={appearance?.className}>
          <CardHeader>
            <CardTitle>Sign In Failed</CardTitle>
            <CardDescription>
              {error ?? "An unexpected error occurred"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" onClick={() => setStep("select_method")}>
              Try Again
            </Button>
          </CardContent>
        </Card>
      );
  }
}
