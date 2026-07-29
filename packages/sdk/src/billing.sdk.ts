/**
 * Billing SDK — Subscription only
 *
 * arc-id: Only GET /billing/subscription. Self-service plan changes
 * intentionally removed (returns 410 Gone).
 */

import { ArcIdClient } from "./client.js";
import type { ApiResponse } from "./client.js";

/* ── SDK Module ────────────────────────────────────────────── */

export class BillingSdk {
  constructor(private client: ArcIdClient) {}

  getSubscription(): Promise<ApiResponse<Record<string, unknown>>> {
    return this.client.get<Record<string, unknown>>("/billing/subscription");
  }
}
