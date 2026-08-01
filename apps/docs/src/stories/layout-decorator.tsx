/**
 * Storybook decorator for @arcevo/facet-layout stories.
 *
 * Wraps stories in an ArcProvider with a memory storage pre-seeded with
 * valid tokens, so useAuth() resolves to an authenticated user and
 * ConsoleLayout / Topbar / UserMenu render their full states.
 */

import * as React from "react";
import { ArcProvider, type TokenStorage } from "@arcevo/facet-auth";
import { ArcIdClient } from "@arcevo/facet-sdk";
import { MOCK_USER, MOCK_TOKEN_PAIR } from "./mock-sdk.js";

/* ── In-memory storage pre-seeded with tokens ──────────────── */

function createSeededStorage(): TokenStorage {
  let access: string | null = MOCK_TOKEN_PAIR.accessToken;
  let refresh: string | null = MOCK_TOKEN_PAIR.refreshToken;
  return {
    getAccessToken: () => access,
    getRefreshToken: () => refresh,
    setTokens: (a, r) => {
      access = a;
      refresh = r;
    },
    clearTokens: () => {
      access = null;
      refresh = null;
    },
  };
}

/* ── Mock fetch (same responses as auth-decorator) ─────────── */

const MOCK_RESPONSES: Record<string, { status: number; body: unknown }> = {
  "/identity/profile": { status: 200, body: MOCK_USER },
  "/auth/logout": { status: 204, body: undefined },
};

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

export function withMockAuthSession(Story: React.ComponentType) {
  globalThis.fetch = mockFetch;

  const client = React.useMemo(
    () => new ArcIdClient({ baseUrl: "https://auth.arcevo.dev/api/v1" }),
    [],
  );

  const storage = React.useMemo(() => createSeededStorage(), []);

  React.useEffect(() => {
    return () => {
      globalThis.fetch = originalFetch;
    };
  }, []);

  return (
    <ArcProvider client={client} storage={storage}>
      <Story />
    </ArcProvider>
  );
}
