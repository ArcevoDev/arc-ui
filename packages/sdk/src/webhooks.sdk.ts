/**
 * Webhooks SDK — Endpoint management, delivery events, test pings, retries
 *
 * arc-id paths: /webhooks/endpoints/*, /webhooks/events/*
 */

import { ArcIdClient } from "./client.js";
import type { ApiResponse } from "./client.js";

/* ── Types ─────────────────────────────────────────────────── */

export type CreateWebhookParams = {
  url: string;
  events: string[];
  secret?: string;
  enabled?: boolean;
};

export type UpdateWebhookParams = {
  url?: string;
  events?: string[];
  enabled?: boolean;
};

export type ListEventsParams = {
  status?: string;
  cursor?: string;
  limit?: number;
};

/* ── SDK Module ────────────────────────────────────────────── */

export class WebhooksSdk {
  constructor(private client: ArcIdClient) {}

  list(): Promise<ApiResponse<Record<string, unknown>[]>> {
    return this.client.get<Record<string, unknown>[]>("/webhooks/endpoints");
  }

  create(
    data: CreateWebhookParams,
  ): Promise<ApiResponse<void>> {
    return this.client.post<void>("/webhooks/endpoints", data);
  }

  update(
    id: string,
    data: UpdateWebhookParams,
  ): Promise<ApiResponse<void>> {
    return this.client.patch<void>(`/webhooks/endpoints/${id}`, data);
  }

  delete(id: string): Promise<ApiResponse<void>> {
    return this.client.del<void>(`/webhooks/endpoints/${id}`);
  }

  test(id: string): Promise<ApiResponse<void>> {
    return this.client.post<void>(`/webhooks/endpoints/${id}/test`);
  }

  listEvents(
    params?: ListEventsParams,
  ): Promise<ApiResponse<Record<string, unknown>[]>> {
    const qs = new URLSearchParams();
    if (params?.status) qs.set("status", params.status);
    if (params?.cursor) qs.set("cursor", params.cursor);
    if (params?.limit) qs.set("limit", String(params.limit));
    const q = qs.toString();
    return this.client.get<Record<string, unknown>[]>(
      `/webhooks/events${q ? `?${q}` : ""}`,
    );
  }

  retryEvent(id: string): Promise<ApiResponse<void>> {
    return this.client.post<void>(`/webhooks/events/${id}/retry`);
  }
}
