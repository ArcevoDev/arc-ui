/**
 * Verifiable Credentials (VC) SDK — VC lifecycle, offers, verification, DID documents
 *
 * arc-id paths: /credentials/*
 */

import { ArcIdClient } from "./client.js";
import type { ApiResponse } from "./client.js";

/* ── SDK Module ────────────────────────────────────────────── */

export class VcSdk {
  constructor(private client: ArcIdClient) {}

  /** GET /credentials — list credentials held by the authenticated identity. */
  list(): Promise<ApiResponse<Record<string, unknown>[]>> {
    return this.client.get<Record<string, unknown>[]>("/credentials");
  }

  /** POST /credentials/verify — verify a Verifiable Credential string. */
  verify(
    credential: string,
  ): Promise<ApiResponse<Record<string, unknown>>> {
    return this.client.post<Record<string, unknown>>("/credentials/verify", {
      credential,
    });
  }

  /** POST /credentials/issue — issue a new credential. */
  issue(
    data: Record<string, unknown>,
  ): Promise<ApiResponse<void>> {
    return this.client.post<void>("/credentials/issue", data);
  }

  /** POST /credentials/offers — create a credential offer. */
  offer(
    data: Record<string, unknown>,
  ): Promise<ApiResponse<{ token: string; expiresAt: string }>> {
    return this.client.post<{ token: string; expiresAt: string }>(
      "/credentials/offers",
      data,
    );
  }

  /** POST /credentials/revoke — revoke a credential by ID. */
  revoke(credentialId: string): Promise<ApiResponse<void>> {
    return this.client.post<void>("/credentials/revoke", { credentialId });
  }

  /** POST /credentials/offers/:token/accept — accept a credential offer. */
  acceptOffer(token: string): Promise<ApiResponse<void>> {
    return this.client.post<void>(`/credentials/offers/${token}/accept`);
  }

  /** POST /credentials/verify/session — create a verification session. */
  createVerificationSession(
    credentialRef?: string,
  ): Promise<ApiResponse<Record<string, unknown>>> {
    return this.client.post<Record<string, unknown>>(
      "/credentials/verify/session",
      credentialRef ? { credentialRef } : undefined,
    );
  }

  /** POST /credentials/verify/present — present a credential for verification. */
  presentForVerification(data: {
    sessionId: string;
    credential: unknown;
    proof: unknown;
  }): Promise<ApiResponse<void>> {
    return this.client.post<void>("/credentials/verify/present", data);
  }

  /** GET /credentials/status-lists/:id — resolve a Bitstring Status List. */
  getStatusList(
    id: string,
  ): Promise<ApiResponse<Record<string, unknown>>> {
    return this.client.get<Record<string, unknown>>(
      `/credentials/status-lists/${id}`,
    );
  }

  /** GET /credentials/tenants/:slug/did.json — resolve a tenant's DID document. */
  resolveTenantDidDoc(
    slug: string,
  ): Promise<ApiResponse<Record<string, unknown>>> {
    return this.client.get<Record<string, unknown>>(
      `/credentials/tenants/${slug}/did.json`,
    );
  }
}
