/**
 * IdP SDK — SAML2 / OIDC / OAUTH2 enterprise identity provider connections
 *
 * arc-id paths: /idp/connections/*
 */

import { ArcIdClient } from "./client.js";
import type { ApiResponse } from "./client.js";

/* ── Types ─────────────────────────────────────────────────── */

export type CreateConnectionParams = {
  protocol: "SAML2" | "OIDC" | "OAUTH2";
  providerName: string;
  issuer?: string;
  entryPoint?: string;
  metadataUrl?: string;
  clientId?: string;
  clientSecret?: string;
  attributeMapping?: Record<string, string>;
  enabled?: boolean;
};

/* ── SDK Module ────────────────────────────────────────────── */

export class IdpSdk {
  constructor(private client: ArcIdClient) {}

  listConnections(): Promise<ApiResponse<Record<string, unknown>[]>> {
    return this.client.get<Record<string, unknown>[]>("/idp/connections");
  }

  getConnection(
    id: string,
  ): Promise<ApiResponse<Record<string, unknown>>> {
    return this.client.get<Record<string, unknown>>(
      `/idp/connections/${id}`,
    );
  }

  createConnection(
    data: CreateConnectionParams,
  ): Promise<ApiResponse<void>> {
    return this.client.post<void>("/idp/connections", data);
  }

  updateConnection(
    id: string,
    data: Partial<Record<string, unknown>>,
  ): Promise<ApiResponse<void>> {
    return this.client.patch<void>(`/idp/connections/${id}`, data);
  }

  deleteConnection(id: string): Promise<ApiResponse<void>> {
    return this.client.del<void>(`/idp/connections/${id}`);
  }
}
