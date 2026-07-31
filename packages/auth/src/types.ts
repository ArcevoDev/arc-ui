/**
 * Core auth types used across provider, hooks, and components.
 */

import type {
  ApiResponse,
  LoginResult,
  MfaSetupResult,
  RegisterResult,
  TokenBundle,
  UserProfile,
} from "@arc-ui/sdk";
import type { ArcIdClient } from "@arc-ui/sdk";

/* ── Identity ──────────────────────────────────────────────── */

export type { TokenPair } from "@arc-ui/sdk";

export type AuthUser = UserProfile;

export type AuthState = {
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
};

export type LoginParams = {
  email: string;
  password: string;
};

export type RegisterParams = {
  name: string;
  email: string;
  password: string;
};

export type AuthContextValue = AuthState & {
  client: ArcIdClient;
  /**
   * Login is two-phase with arc-id:
   *  - No MFA required: returns a LoginResult with accessToken/refreshToken.
   *  - MFA required: returns a LoginResult with sessionId + requiresMfa,
   *    no tokens. Call `verifyMfa` (or `mfaRecovery`) to complete.
   */
  login: (params: LoginParams) => Promise<ApiResponse<LoginResult>>;
  register: (params: RegisterParams) => Promise<ApiResponse<RegisterResult>>;
  /** Complete the MFA challenge started by login. */
  verifyMfa: (code: string, sessionId: string) => Promise<ApiResponse<TokenBundle>>;
  mfaRecovery: (code: string, sessionId: string) => Promise<ApiResponse<TokenBundle>>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<string | null>;
  clearError: () => void;
  forgotPassword: (email: string) => Promise<ApiResponse<void>>;
  resetPassword: (token: string, newPassword: string) => Promise<ApiResponse<void>>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<ApiResponse<void>>;
};

/* ── SignIn State Machine ──────────────────────────────────── */

export type SignInStep =
  | "idle"
  | "check_session"
  | "select_method"
  | "login_form"
  | "magic_link_form"
  | "forgot_password"
  | "passkey_auth"
  | "check_mfa"
  | "mfa_challenge"
  | "complete"
  | "error";

/* ── MFA ───────────────────────────────────────────────────── */

export type MfaMethod = "totp" | "recovery";

export type MfaFlowState =
  | { phase: "idle" }
  | { phase: "verify"; sessionId: string }
  | { phase: "setup"; setupData: MfaSetupResult }
  | { phase: "confirm_setup"; setupData: MfaSetupResult }
  | { phase: "recovery_codes"; codes: string[] }
  | { phase: "recovery"; sessionId: string }
  | { phase: "complete" }
  | { phase: "error"; message: string };

/* ── Domain Config / Presets ───────────────────────────────── */

export type AuthConfig = {
  /** Require MFA for all users. Default: false */
  requireMfa: boolean;
  /** Allow passkey login/registration. Default: true */
  allowPasskey: boolean;
  /** Allow magic link login. Default: true */
  allowMagicLink: boolean;
  /** Session TTL in minutes. Default: 480 (8 hr) */
  sessionTtl: number;
  /** Require email verification after registration. Default: true */
  requireEmailVerification: boolean;
  /** Require step-up for sensitive actions. Default: false */
  requireStepUp: boolean;
  /** Allowed OAuth providers. Default: [] */
  oauthProviders: string[];
};

export const defaultConfig: AuthConfig = {
  requireMfa: false,
  allowPasskey: true,
  allowMagicLink: true,
  sessionTtl: 480,
  requireEmailVerification: true,
  requireStepUp: false,
  oauthProviders: [],
};

/* ── Component Prop Shapes ─────────────────────────────────── */

export type Appearance = {
  /** Override root element className */
  className?: string;
  /** Override specific slot classNames */
  classNames?: Record<string, string>;
};

export type ComponentSlots = Record<string, React.ReactNode>;
