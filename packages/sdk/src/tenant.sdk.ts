/**
 * Tenant SDK — Multi-tenant CRUD, members, policy, DID, signing keys, projects,
 * onboarding flows, JWKS
 *
 * arc-id paths: /tenants/*, /auth/switch-context, /tenants/invites/accept
 */

import { ArcIdClient } from "./client.js";
import type { ApiResponse } from "./client.js";
import type { SwitchContextResult } from "./auth.sdk.js";

/* ── SDK Module ────────────────────────────────────────────── */

export class TenantSdk {
  constructor(private client: ArcIdClient) {}

  /* ── Tenant CRUD ──────────────────────────────────────────── */

  list(): Promise<ApiResponse<Record<string, unknown>[]>> {
    return this.client.get<Record<string, unknown>[]>("/tenants");
  }

  get(slug: string): Promise<ApiResponse<Record<string, unknown>>> {
    return this.client.get<Record<string, unknown>>(`/tenants/${slug}`);
  }

  create(data: {
    name: string;
    slug: string;
  }): Promise<ApiResponse<void>> {
    return this.client.post<void>("/tenants", data);
  }

  /* ── Context Switching ────────────────────────────────────── */

  switchTenant(
    tenantId: string,
  ): Promise<ApiResponse<SwitchContextResult>> {
    return this.client.post<SwitchContextResult>("/auth/switch-context", {
      tenantId,
    });
  }

  /* ── Members ──────────────────────────────────────────────── */

  listMembers(
    tenantId: string,
  ): Promise<ApiResponse<Record<string, unknown>[]>> {
    return this.client.get<Record<string, unknown>[]>(
      `/tenants/${tenantId}/members`,
    );
  }

  addMember(
    tenantId: string,
    data: { identityId: string; roleId: string },
  ): Promise<ApiResponse<void>> {
    return this.client.post<void>(
      `/tenants/${tenantId}/members`,
      data,
    );
  }

  removeMember(
    tenantId: string,
    identityId: string,
  ): Promise<ApiResponse<void>> {
    return this.client.del<void>(
      `/tenants/${tenantId}/members/${identityId}`,
    );
  }

  /* ── Policy ───────────────────────────────────────────────── */

  getPolicy(
    tenantId: string,
  ): Promise<ApiResponse<Record<string, unknown>>> {
    return this.client.get<Record<string, unknown>>(
      `/tenants/${tenantId}/policy`,
    );
  }

  updatePolicy(
    tenantId: string,
    data: Record<string, unknown>,
  ): Promise<ApiResponse<void>> {
    return this.client.patch<void>(
      `/tenants/${tenantId}/policy`,
      data,
    );
  }

  /* ── Invites ──────────────────────────────────────────────── */

  acceptInvite(data: { token: string }): Promise<ApiResponse<void>> {
    return this.client.post<void>("/tenants/invites/accept", data);
  }

  /* ── DID ──────────────────────────────────────────────────── */

  getDid(
    tenantId: string,
  ): Promise<ApiResponse<Record<string, unknown>>> {
    return this.client.get<Record<string, unknown>>(
      `/tenants/${tenantId}/did`,
    );
  }

  provisionDid(
    tenantId: string,
    data: { domain: string },
  ): Promise<ApiResponse<void>> {
    return this.client.post<void>(
      `/tenants/${tenantId}/did`,
      data,
    );
  }

  /* ── Signing Keys ─────────────────────────────────────────── */

  listSigningKeys(
    tenantId: string,
  ): Promise<ApiResponse<Record<string, unknown>[]>> {
    return this.client.get<Record<string, unknown>[]>(
      `/tenants/${tenantId}/signing-keys`,
    );
  }

  createSigningKey(
    tenantId: string,
    data: Record<string, unknown>,
  ): Promise<ApiResponse<void>> {
    return this.client.post<void>(
      `/tenants/${tenantId}/signing-keys`,
      data,
    );
  }

  revokeSigningKey(
    tenantId: string,
    kid: string,
  ): Promise<ApiResponse<void>> {
    return this.client.del<void>(
      `/tenants/${tenantId}/signing-keys/${kid}`,
    );
  }

  /* ── Projects ─────────────────────────────────────────────── */

  listProjects(
    tenantId: string,
  ): Promise<ApiResponse<Record<string, unknown>[]>> {
    return this.client.get<Record<string, unknown>[]>(
      `/tenants/${tenantId}/projects`,
    );
  }

  createProject(
    tenantId: string,
    data: { name: string; description?: string },
  ): Promise<ApiResponse<void>> {
    return this.client.post<void>(
      `/tenants/${tenantId}/projects`,
      data,
    );
  }

  getProject(
    tenantId: string,
    projectId: string,
  ): Promise<ApiResponse<Record<string, unknown>>> {
    return this.client.get<Record<string, unknown>>(
      `/tenants/${tenantId}/projects/${projectId}`,
    );
  }

  updateProject(
    tenantId: string,
    projectId: string,
    data: { name?: string; description?: string },
  ): Promise<ApiResponse<void>> {
    return this.client.patch<void>(
      `/tenants/${tenantId}/projects/${projectId}`,
      data,
    );
  }

  deleteProject(
    tenantId: string,
    projectId: string,
  ): Promise<ApiResponse<void>> {
    return this.client.del<void>(
      `/tenants/${tenantId}/projects/${projectId}`,
    );
  }

  /* ── Onboarding Flows ─────────────────────────────────────── */

  createOnboardingFlow(
    tenantId: string,
    projectId: string,
    data: Record<string, unknown>,
  ): Promise<ApiResponse<void>> {
    return this.client.post<void>(
      `/tenants/${tenantId}/projects/${projectId}/onboarding-flows`,
      data,
    );
  }

  listOnboardingFlows(
    tenantId: string,
    projectId: string,
  ): Promise<ApiResponse<Record<string, unknown>[]>> {
    return this.client.get<Record<string, unknown>[]>(
      `/tenants/${tenantId}/projects/${projectId}/onboarding-flows`,
    );
  }

  getOnboardingFlow(
    tenantId: string,
    projectId: string,
    flowId: string,
  ): Promise<ApiResponse<Record<string, unknown>>> {
    return this.client.get<Record<string, unknown>>(
      `/tenants/${tenantId}/projects/${projectId}/onboarding-flows/${flowId}`,
    );
  }

  updateOnboardingFlow(
    tenantId: string,
    projectId: string,
    flowId: string,
    data: Record<string, unknown>,
  ): Promise<ApiResponse<void>> {
    return this.client.patch<void>(
      `/tenants/${tenantId}/projects/${projectId}/onboarding-flows/${flowId}`,
      data,
    );
  }

  deleteOnboardingFlow(
    tenantId: string,
    projectId: string,
    flowId: string,
  ): Promise<ApiResponse<void>> {
    return this.client.del<void>(
      `/tenants/${tenantId}/projects/${projectId}/onboarding-flows/${flowId}`,
    );
  }

  /* ── JWKS ─────────────────────────────────────────────────── */

  getJwksBySlug(
    slug: string,
  ): Promise<ApiResponse<Record<string, unknown>>> {
    return this.client.get<Record<string, unknown>>(
      `/tenants/${slug}/jwks`,
    );
  }
}
