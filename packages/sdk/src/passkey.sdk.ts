/**
 * Passkey SDK — WebAuthn registration and authentication
 *
 * arc-id paths: /auth/passkey/*
 */

import { ArcIdClient } from "./client.js";
import type { ApiResponse } from "./client.js";

/* ── SDK Module ────────────────────────────────────────────── */

export class PasskeySdk {
  constructor(private client: ArcIdClient) {}

  list(): Promise<ApiResponse<Record<string, unknown>[]>> {
    return this.client.get<Record<string, unknown>[]>("/auth/passkey");
  }

  registrationOptions(
    data: { name: string },
  ): Promise<ApiResponse<Record<string, unknown>>> {
    return this.client.post<Record<string, unknown>>(
      "/auth/passkey/options/register",
      data,
    );
  }

  register(
    data: Record<string, unknown>,
  ): Promise<ApiResponse<Record<string, unknown>>> {
    return this.client.post<Record<string, unknown>>(
      "/auth/passkey/register",
      data,
    );
  }

  authenticationOptions(
    sessionId?: string,
  ): Promise<ApiResponse<Record<string, unknown>>> {
    return this.client.post<Record<string, unknown>>(
      "/auth/passkey/options/authenticate",
      sessionId ? { sessionId } : {},
    );
  }

  authenticate(
    data: Record<string, unknown>,
  ): Promise<ApiResponse<Record<string, unknown>>> {
    return this.client.post<Record<string, unknown>>(
      "/auth/passkey/authenticate",
      data,
    );
  }

  deregister(passkeyId: string): Promise<ApiResponse<void>> {
    return this.client.del<void>(`/auth/passkey/${passkeyId}`);
  }
}
