/**
 * @arc-ui/sdk — Base HTTP client
 *
 * Pure fetch. No framework dependencies. Matches arc-id's ApiResponse shape.
 */

export type ApiError = {
  statusCode: number;
  error: string;
  message: string;
};

export type ApiResponse<T> =
  | { data: T; error: null }
  | { data: null; error: ApiError };

export interface ArcIdClientConfig {
  baseUrl: string;
  apiKey?: string;
  fetchInit?: RequestInit;
  /**
   * Optional 401 auto-refresh hook.
   * Called when any request returns 401. Return the new access token to
   * retry the request, or null to propagate the error.
   *
   * Usage:
   *   onTokenRefresh: async (failedToken) => {
   *     const newToken = await authSdk.refresh(refreshToken);
   *     return newToken ?? null;
   *   }
   */
  onTokenRefresh?: (failedToken: string) => Promise<string | null>;
}

export class ArcIdClient {
  private config: ArcIdClientConfig;

  constructor(config: ArcIdClientConfig) {
    this.config = config;
  }

  /** Override the apiKey at runtime (e.g. after a token refresh) */
  setApiKey(apiKey: string): void {
    this.config.apiKey = apiKey;
  }

  private async request<T>(
    method: string,
    path: string,
    body?: unknown,
    init?: RequestInit,
  ): Promise<ApiResponse<T>> {
    const attempt = async (): Promise<ApiResponse<T>> => {
      try {
        const url = `${this.config.baseUrl}${path}`;
        const headers: Record<string, string> = {
          "Content-Type": "application/json",
        };
        if (this.config.apiKey) {
          headers["Authorization"] = `Bearer ${this.config.apiKey}`;
        }

        const response = await fetch(url, {
          method,
          headers: {
            ...headers,
            ...this.config.fetchInit?.headers,
          },
          body: body ? JSON.stringify(body) : undefined,
          signal: this.config.fetchInit?.signal,
          ...init,
        });

        if (!response.ok) {
          let errBody: Partial<ApiError> = {};
          try {
            errBody = (await response.json()) as Partial<ApiError>;
          } catch {
            // ignore parse failure
          }
          return {
            data: null,
            error: {
              statusCode: response.status,
              error: errBody.error ?? "UNKNOWN_ERROR",
              message: errBody.message ?? response.statusText,
            },
          };
        }

        if (response.status === 204) {
          return { data: undefined as T, error: null };
        }

        const json = (await response.json()) as T;
        return { data: json, error: null };
      } catch (err) {
        return {
          data: null,
          error: {
            statusCode: 0,
            error: "NETWORK_ERROR",
            message: err instanceof Error ? err.message : "Unknown network error",
          },
        };
      }
    };

    // Make the initial request
    const result = await attempt();

    // Auto-refresh on 401 if a tokenRefresher is configured
    if (
      result.error?.statusCode === 401 &&
      this.config.onTokenRefresh &&
      this.config.apiKey
    ) {
      const newToken = await this.config.onTokenRefresh(this.config.apiKey);
      if (newToken) {
        this.config.apiKey = newToken;
        // Retry exactly once with the refreshed token
        return attempt();
      }
    }

    return result;
  }

  get<T>(path: string, init?: RequestInit) {
    return this.request<T>("GET", path, undefined, init);
  }

  post<T>(path: string, body?: unknown, init?: RequestInit) {
    return this.request<T>("POST", path, body, init);
  }

  put<T>(path: string, body?: unknown, init?: RequestInit) {
    return this.request<T>("PUT", path, body, init);
  }

  patch<T>(path: string, body?: unknown, init?: RequestInit) {
    return this.request<T>("PATCH", path, body, init);
  }

  del<T>(path: string, init?: RequestInit) {
    return this.request<T>("DELETE", path, undefined, init);
  }
}
