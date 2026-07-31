/**
 * @arc-ui/auth: domain-customizable auth components wired to arc-id SDK.
 *
 * Usage:
 *   import { ArcProvider, SignIn, Guard } from "@arc-ui/auth";
 *
 *   <ArcProvider client={arcIdClient}>
 *     <Guard fallback={<SignIn />}>
 *       <App />
 *     </Guard>
 *   </ArcProvider>
 */

/* ── Provider ──────────────────────────────────────────────── */
export { type ArcProviderProps, ArcProvider, useAuth } from "./provider.js";

/* ── Storage ───────────────────────────────────────────────── */
export { type TokenStorage, defaultStorage } from "./storage.js";

/* ── Components ────────────────────────────────────────────── */
export { type SignInProps, SignIn } from "./sign-in.js";

export { type SignUpProps, SignUp } from "./sign-up.js";

export { type UserButtonProps, UserButton } from "./user-button.js";

export { type GuardProps, Guard } from "./guard.js";

export { type MfaDialogProps, MfaDialog } from "./mfa-dialog.js";

/* ── Domain Presets ────────────────────────────────────────── */
export {
  fintechPreset,
  medPreset,
  eduPreset,
  enterprisePreset,
  defaultPreset,
} from "./presets.js";

/* ── Forms ─────────────────────────────────────────────────── */
export {
  type LoginFormProps,
  LoginForm,
  type MagicLinkFormProps,
  MagicLinkForm,
  type ForgotPasswordFormProps,
  ForgotPasswordForm,
  type ResetPasswordFormProps,
  ResetPasswordForm,
  type MfaVerifyFormProps,
  MfaVerifyForm,
  type MfaSetupFormProps,
  MfaSetupForm,
  type MfaRecoveryCodesFormProps,
  MfaRecoveryCodesForm,
  type MfaRecoveryFormProps,
  MfaRecoveryForm,
} from "./forms/index.js";

/* ── Types ─────────────────────────────────────────────────── */
export type {
  AuthUser,
  AuthState,
  AuthContextValue,
  AuthConfig,
  Appearance,
  ComponentSlots,
  LoginParams,
  RegisterParams,
  SignInStep,
  MfaMethod,
  MfaFlowState,
} from "./types.js";
