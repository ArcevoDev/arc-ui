/**
 * SignIn: multi-step sign-in component with state machine.
 *
 * Orchestrates LoginForm, MagicLinkForm, and ForgotPasswordForm through
 * the auth step flow. Extracted forms are independently importable from
 * @arc-ui/auth.
 *
 * Steps: idle → check_session → select_method → login_form / magic_link_form
 *        → check_mfa → mfa_challenge → complete
 */

import * as React from "react";
import { AuthSdk, PasskeySdk } from "@arc-ui/sdk";
import type { LoginResult, TokenPair } from "@arc-ui/sdk";
import { useAuth } from "./provider.js";
import { defaultConfig } from "./types.js";
import type { AuthConfig, Appearance, ComponentSlots, SignInStep } from "./types.js";
import { LoginForm } from "./forms/auth/login-form.js";
import { MagicLinkForm } from "./forms/auth/magic-link-form.js";
import { ForgotPasswordForm } from "./forms/auth/forgot-password-form.js";
import { MfaVerifyForm } from "./forms/mfa/verify-form.js";

import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
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
  const { login, verifyMfa, isAuthenticated, client } = useAuth();

  const authSdk = React.useMemo(() => new AuthSdk(client), [client]);
  const passkeySdk = React.useMemo(() => new PasskeySdk(client), [client]);

  const [step, setStep] = React.useState<SignInStep>("idle");
  const [error, setError] = React.useState<string | null>(null);

  // Form fields that persist across steps
  const [, setEmail] = React.useState("");
  const [sessionId, setSessionId] = React.useState<string | null>(null);

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
        const result = res.data as LoginResult;
        if (result.sessionId && !result.accessToken) {
          setSessionId(result.sessionId);
          setStep("mfa_challenge");
          return null;
        }
        setStep("complete");
        onSuccess?.(res.data as unknown as TokenPair);
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

  const handleForgotPasswordSubmit = async (email: string) => {
    setError(null);
    const res = await authSdk.forgotPassword(email);
    return res.error?.message ?? null;
  };

  const handleMfaVerify = async (code: string) => {
    const sId = sessionId;
    if (!sId) {
      setStep("select_method");
      return;
    }
    const res = await verifyMfa(code, sId);
    if (res.data) {
      setStep("complete");
    } else {
      setError(res.error?.message ?? "Invalid code");
    }
  };

  const handlePasskeyAuth = async () => {
    setError(null);
    try {
      const optsRes = await passkeySdk.authenticationOptions();
      if (!optsRes.data) {
        setError(optsRes.error?.message ?? "Failed to initiate passkey auth");
        return;
      }

      const challengeId = optsRes.data.challengeId;
      const publicKey = optsRes.data.options as unknown as PublicKeyCredentialRequestOptions;

      // WebAuthn API: browser creates the assertion
      const credential = (await navigator.credentials.get({
        publicKey,
      })) as PublicKeyCredential | null;

      if (!credential) {
        setError("Passkey authentication cancelled");
        return;
      }

      const res = await passkeySdk.authenticate({
        response: {
          id: credential.id,
          rawId: Array.from(new Uint8Array(credential.rawId)),
          type: credential.type,
          response: {
            authenticatorData: Array.from(
              new Uint8Array(
                (credential.response as AuthenticatorAssertionResponse).authenticatorData,
              ),
            ),
            clientDataJSON: Array.from(
              new Uint8Array(
                (credential.response as AuthenticatorAssertionResponse).clientDataJSON,
              ),
            ),
            signature: Array.from(
              new Uint8Array(
                (credential.response as AuthenticatorAssertionResponse).signature,
              ),
            ),
            userHandle: (credential.response as AuthenticatorAssertionResponse).userHandle
              ? Array.from(
                  new Uint8Array(
                    (credential.response as AuthenticatorAssertionResponse).userHandle!,
                  ),
                )
              : null,
          },
        },
        challengeId,
      });

      if (res.data) {
        setStep("complete");
        onSuccess?.(res.data as unknown as TokenPair);
      } else {
        setError(res.error?.message ?? "Passkey authentication failed");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Passkey authentication failed");
    }
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
          <CardContent className="p-0">
            <MfaVerifyForm
              onVerify={handleMfaVerify}
              onCancel={() => setStep("select_method")}
              error={error ?? undefined}
            />
          </CardContent>
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
