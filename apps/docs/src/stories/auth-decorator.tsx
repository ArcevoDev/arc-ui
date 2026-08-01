/**
 * Storybook decorator providing a mock ArcIdClient for auth component stories.
 * Intercepts fetch() calls to return realistic responses without a backend.
 */

import * as React from "react";
import { ArcProvider } from "@arcevo/facet-auth";
import { ArcIdClient } from "@arcevo/facet-sdk";
import {
  MOCK_USER,
  MOCK_TOKEN_PAIR,
  MOCK_MFA_VERIFY,
  MOCK_MFA_SETUP,
  MOCK_RECOVERY_CODES,
  MOCK_REFRESH_RESPONSE,
} from "./mock-sdk.js";

/* ── Mock responses keyed by URL path ──────────────────────── */

const MOCK_RESPONSES: Record<string, { status: number; body: unknown }> = {
  "/auth/login": { status: 200, body: MOCK_TOKEN_PAIR },
  "/auth/register": { status: 200, body: MOCK_TOKEN_PAIR },
  "/identity/profile": { status: 200, body: MOCK_USER },
  "/oauth/token": { status: 200, body: MOCK_REFRESH_RESPONSE },
  "/auth/logout": { status: 204, body: undefined },
  "/auth/mfa/verify": { status: 200, body: MOCK_MFA_VERIFY },
  "/auth/mfa/setup": { status: 200, body: MOCK_MFA_SETUP },
  "/auth/mfa/confirm": { status: 200, body: MOCK_RECOVERY_CODES },
  "/auth/mfa/recovery": { status: 200, body: MOCK_MFA_VERIFY },
};

/* ── Mock fetch ────────────────────────────────────────────── */

const originalFetch = globalThis.fetch.bind(globalThis);

function mockFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
  const path = new URL(url).pathname;

  const mock = MOCK_RESPONSES[path];
  if (mock) {
    return Promise.resolve(
      new Response(mock.body ? JSON.stringify(mock.body) : null, {
        status: mock.status,
        headers: { "Content-Type": "application/json" },
      }),
    );
  }

  return originalFetch(input, init);
}

/* ── Decorator ─────────────────────────────────────────────── */

export function withMockAuth(Story: React.ComponentType) {
  globalThis.fetch = mockFetch;

  const client = React.useMemo(
    () => new ArcIdClient({ baseUrl: "https://auth.arcevo.dev/api/v1" }),
    [],
  );

  React.useEffect(() => {
    return () => {
      globalThis.fetch = originalFetch;
    };
  }, []);

  return (
    <ArcProvider client={client}>
      <Story />
    </ArcProvider>
  );
}
