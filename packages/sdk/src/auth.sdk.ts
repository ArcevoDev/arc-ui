/**
 * Auth SDK — Login, register, MFA, sessions, magic link, password management
 *
 * Matches arc-id's actual /auth/* endpoints.
 */

import { ArcIdClient } from "./client.js";
import type { ApiResponse } from "./client.js";

/* ── Types ─────────────────────────────────────────────────── */

export type TokenPair = {
  accessToken: string;
  refreshToken: string;
  user: Record<string, unknown>;
};

export type MfaVerifyResult = {
  accessToken: string;
  refreshToken: string;
  user: Record<string, unknown>;
};

export type MfaSetupResult = {
  secret: string;
  qrCode: string;
  uri: string;
};

export type RecoveryCodesResult = {
  recoveryCodes: string[];
};

export type StepUpResult = {
  success: true;
  elevatedUntil: string;
};

export type UserProfile = {
  id: string;
  email: string;
  name: string;
  memberships: Record<string, unknown>[];
  plan: string;
  tenantId: string | null;
};

export type SwitchContextResult = {
  accessToken: string;
  refreshToken: string;
  idToken: string | null;
  expiresIn: number;
};

/* ── SDK Module ────────────────────────────────────────────── */

export class AuthSdk {
  constructor(private client: ArcIdClient) {}

  login(email: string, password: string): Promise<ApiResponse<TokenPair>> {
    return this.client.post<TokenPair>("/auth/login", { email, password });
  }

  register(
    name: string,
    email: string,
    password: string,
  ): Promise<ApiResponse<TokenPair>> {
    return this.client.post<TokenPair>("/auth/register", {
      name,
      email,
      password,
    });
  }

  logout(sessionId: string): Promise<ApiResponse<void>> {
    return this.client.post<void>("/auth/logout", { sessionId });
  }

  me(): Promise<ApiResponse<UserProfile>> {
    return this.client.get<UserProfile>("/identity/profile");
  }

  listSessions(): Promise<ApiResponse<Record<string, unknown>[]>> {
    return this.client.get<Record<string, unknown>[]>("/auth/sessions");
  }

  revokeSession(sessionId: string): Promise<ApiResponse<void>> {
    return this.client.del<void>(`/auth/sessions/${sessionId}`);
  }

  forgotPassword(email: string): Promise<ApiResponse<void>> {
    return this.client.post<void>("/auth/password/reset", { email });
  }

  resetPassword(
    token: string,
    newPassword: string,
  ): Promise<ApiResponse<void>> {
    return this.client.post<void>("/auth/password/reset/confirm", {
      token,
      newPassword,
    });
  }

  verifyEmail(token: string): Promise<ApiResponse<void>> {
    return this.client.post<void>("/auth/email/verify", { token });
  }

  verifyMfa(
    code: string,
    sessionId: string,
  ): Promise<ApiResponse<MfaVerifyResult>> {
    return this.client.post<MfaVerifyResult>("/auth/mfa/verify", {
      code,
      sessionId,
    });
  }

  setupMfa(): Promise<ApiResponse<MfaSetupResult>> {
    return this.client.post<MfaSetupResult>("/auth/mfa/setup", {
      type: "TOTP",
    });
  }

  confirmMfa(code: string): Promise<ApiResponse<RecoveryCodesResult>> {
    return this.client.post<RecoveryCodesResult>("/auth/mfa/confirm", {
      code,
    });
  }

  disableMfa(): Promise<ApiResponse<void>> {
    return this.client.del<void>("/auth/mfa/disable");
  }

  stepUp(
    method: "password" | "totp" | "passkey",
    sessionId: string,
    credential: Record<string, unknown>,
  ): Promise<ApiResponse<StepUpResult>> {
    return this.client.post<StepUpResult>("/auth/step-up", {
      method,
      sessionId,
      ...credential,
    });
  }

  mfaRecovery(
    code: string,
    sessionId: string,
  ): Promise<ApiResponse<MfaVerifyResult>> {
    return this.client.post<MfaVerifyResult>("/auth/mfa/recovery", {
      code,
      sessionId,
    });
  }

  changePassword(
    currentPassword: string,
    newPassword: string,
  ): Promise<ApiResponse<void>> {
    return this.client.post<void>("/auth/password/change", {
      currentPassword,
      newPassword,
    });
  }

  requestMagicLink(email: string): Promise<ApiResponse<void>> {
    return this.client.post<void>("/auth/magic-link/request", { email });
  }

  authenticateMagicLink(
    token: string,
  ): Promise<ApiResponse<TokenPair>> {
    return this.client.post<TokenPair>("/auth/magic-link", { token });
  }

  refresh(
    refreshToken: string,
  ): Promise<ApiResponse<{ accessToken: string; refreshToken?: string }>> {
    return this.client.post<{ accessToken: string; refreshToken?: string }>(
      "/oauth/token",
      {
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      },
    );
  }

  setUsername(name: string): Promise<ApiResponse<void>> {
    return this.client.patch<void>("/auth/username", { name });
  }
}
