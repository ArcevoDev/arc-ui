/**
 * OAuth SDK — Full OIDC provider (clients, tokens, consent, introspection, revocation)
 *
 * arc-id paths: /oauth/*
 */

import { ArcIdClient } from "./client.js";
import type { ApiResponse } from "./client.js";

/* ── Types ─────────────────────────────────────────────────── */

export type CreateClientParams = {
  name: string;
  redirectUris: string[];
  grantTypes?: ("authorization_code" | "refresh_token" | "client_credentials")[];
  scopes?: string[];
  public?: boolean;
  requirePkce?: boolean;
  tenantId?: string;
  projectId?: string;
};

export type GrantConsentParams = {
  clientId: string;
  scopes: string[];
};

/* ── SDK Module ────────────────────────────────────────────── */

export class OAuthSdk {
  constructor(private client: ArcIdClient) {}

  /* ── Clients ──────────────────────────────────────────────── */

  listClients(): Promise<ApiResponse<Record<string, unknown>[]>> {
    return this.client.get<Record<string, unknown>[]>("/oauth/clients");
  }

  createClient(
    data: CreateClientParams,
  ): Promise<ApiResponse<void>> {
    return this.client.post<void>("/oauth/clients", data);
  }

  deleteClient(clientId: string): Promise<ApiResponse<void>> {
    return this.client.del<void>(`/oauth/clients/${clientId}`);
  }

  /* ── Tokens ───────────────────────────────────────────────── */

  listTokens(): Promise<ApiResponse<Record<string, unknown>[]>> {
    return this.client.get<Record<string, unknown>[]>("/oauth/tokens");
  }

  revokeToken(tokenId: string): Promise<ApiResponse<void>> {
    return this.client.del<void>(`/oauth/tokens/${tokenId}`);
  }

  /* ── Consent ──────────────────────────────────────────────── */

  grantConsent(
    data: GrantConsentParams,
  ): Promise<ApiResponse<void>> {
    return this.client.post<void>("/oauth/consent", data);
  }

  revokeConsent(clientId: string): Promise<ApiResponse<void>> {
    return this.client.del<void>(`/oauth/consent/${clientId}`);
  }

  listConsents(): Promise<ApiResponse<Record<string, unknown>[]>> {
    return this.client.get<Record<string, unknown>[]>("/oauth/consents");
  }

  /* ── Introspection & Revocation ──────────────────────────── */

  introspectToken(
    token: string,
  ): Promise<ApiResponse<Record<string, unknown>>> {
    return this.client.post<Record<string, unknown>>(
      "/oauth/introspect",
      { token },
    );
  }

  revokeTokenRFC7009(
    token: string,
    tokenTypeHint?: string,
  ): Promise<ApiResponse<void>> {
    return this.client.post<void>("/oauth/revoke", {
      token,
      token_type_hint: tokenTypeHint,
    });
  }

  /* ── OIDC ─────────────────────────────────────────────────── */

  userinfo(): Promise<ApiResponse<Record<string, unknown>>> {
    return this.client.get<Record<string, unknown>>("/oauth/userinfo");
  }

  jwks(): Promise<ApiResponse<Record<string, unknown>>> {
    return this.client.get<Record<string, unknown>>("/oauth/jwks");
  }
}
