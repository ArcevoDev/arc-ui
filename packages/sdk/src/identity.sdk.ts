/**
 * Identity SDK — Profile, admin, devices, linked accounts, external IDs,
 * delegations, onboarding, wallet DID
 *
 * arc-id paths: /identity/*
 */

import { ArcIdClient } from "./client.js";
import type { ApiResponse } from "./client.js";

/* ── SDK Module ────────────────────────────────────────────── */

export class IdentitySdk {
  constructor(private client: ArcIdClient) {}

  /* ── Admin ─────────────────────────────────────────────── */

  list(params?: {
    search?: string;
    status?: string;
  }): Promise<ApiResponse<Record<string, unknown>[]>> {
    const qs = new URLSearchParams();
    if (params?.search) qs.set("search", params.search);
    if (params?.status) qs.set("status", params.status);
    const q = qs.toString();
    return this.client.get<Record<string, unknown>[]>(
      `/identity/admin${q ? `?${q}` : ""}`,
    );
  }

  suspend(
    id: string,
    reason?: string,
  ): Promise<ApiResponse<void>> {
    return this.client.post<void>(`/identity/admin/${id}/suspend`, {
      reason,
    });
  }

  reinstate(
    id: string,
    reason?: string,
  ): Promise<ApiResponse<void>> {
    return this.client.patch<void>(
      `/identity/${id}/status`,
      reason ? { status: "ACTIVE", reason } : { status: "ACTIVE" },
    );
  }

  /* ── Profile ───────────────────────────────────────────── */

  updateProfile(data: {
    name?: string;
    displayName?: string;
    picture?: string;
    metadata?: Record<string, unknown>;
  }): Promise<ApiResponse<void>> {
    return this.client.patch<void>("/identity/profile", data);
  }

  deleteAccount(): Promise<ApiResponse<void>> {
    return this.client.del<void>("/identity/profile");
  }

  /* ── Devices ───────────────────────────────────────────── */

  listDevices(): Promise<ApiResponse<Record<string, unknown>[]>> {
    return this.client.get<Record<string, unknown>[]>("/identity/devices");
  }

  deleteDevice(id: string): Promise<ApiResponse<void>> {
    return this.client.del<void>(`/identity/devices/${id}`);
  }

  /* ── Linked Accounts ───────────────────────────────────── */

  listLinkedAccounts(): Promise<ApiResponse<Record<string, unknown>[]>> {
    return this.client.get<Record<string, unknown>[]>(
      "/identity/linked-accounts",
    );
  }

  unlinkLinkedAccount(id: string): Promise<ApiResponse<void>> {
    return this.client.del<void>(`/identity/linked-accounts/${id}`);
  }

  /* ── External IDs ──────────────────────────────────────── */

  listExternalIds(): Promise<ApiResponse<Record<string, unknown>[]>> {
    return this.client.get<Record<string, unknown>[]>(
      "/identity/external-ids",
    );
  }

  linkExternalId(data: {
    provider: string;
    externalId: string;
  }): Promise<ApiResponse<void>> {
    return this.client.post<void>("/identity/external-ids", data);
  }

  unlinkExternalId(id: string): Promise<ApiResponse<void>> {
    return this.client.del<void>(`/identity/external-ids/${id}`);
  }

  /* ── Delegations ───────────────────────────────────────── */

  listDelegations(): Promise<ApiResponse<Record<string, unknown>[]>> {
    return this.client.get<Record<string, unknown>[]>(
      "/identity/delegations",
    );
  }

  createDelegation(
    data: Record<string, unknown>,
  ): Promise<ApiResponse<void>> {
    return this.client.post<void>("/identity/delegations", data);
  }

  revokeDelegation(id: string): Promise<ApiResponse<void>> {
    return this.client.del<void>(`/identity/delegations/${id}`);
  }

  /* ── Onboarding ────────────────────────────────────────── */

  startOnboarding(
    flowId: string,
  ): Promise<ApiResponse<Record<string, unknown>>> {
    return this.client.post<Record<string, unknown>>(
      "/identity/onboarding/start",
      { flowId },
    );
  }

  getOnboardingProgress(
    progressId: string,
  ): Promise<ApiResponse<Record<string, unknown>>> {
    return this.client.get<Record<string, unknown>>(
      `/identity/onboarding/${progressId}`,
    );
  }

  advanceOnboarding(
    progressId: string,
    stepId: string,
    data?: Record<string, unknown>,
  ): Promise<ApiResponse<void>> {
    return this.client.post<void>(
      `/identity/onboarding/${progressId}/advance`,
      { stepId, ...data },
    );
  }

  /* ── Wallet DID ────────────────────────────────────────── */

  registerWalletDid(data: {
    publicKeyJwk: Record<string, unknown>;
    provider: string;
    providerWalletId: string;
  }): Promise<ApiResponse<void>> {
    return this.client.post<void>("/identity/wallet/did", data);
  }
}
