/**
 * ArcProvider — React context provider for auth state.
 *
 * Wraps the app with authentication state, login/logout/register actions,
 * and automatic session refresh on mount.
 *
 * Usage:
 *   <ArcProvider client={arcIdClient} storage={myStorage}>
 *     <App />
 *   </ArcProvider>
 */

import * as React from "react";
import { type ArcIdClient, AuthSdk } from "@arc-ui/sdk";
import type { AuthContextValue, AuthUser, LoginParams, RegisterParams } from "./types.js";
import { defaultStorage, type TokenStorage } from "./storage.js";

/* ── Context ───────────────────────────────────────────────── */

const AuthContext = React.createContext<AuthContextValue | null>(null);

/* ── Provider Props ────────────────────────────────────────── */

export interface ArcProviderProps {
  client: ArcIdClient;
  storage?: TokenStorage;
  children: React.ReactNode;
  /** Called after session restore succeeds (user was rehydrated from stored tokens).
   *  Useful for loading tenant/scoped data on app boot. */
  onSessionRestore?: (user: AuthUser) => void;
  /** Called when auth state changes (login, logout, session expiry). */
  onAuthChange?: (state: { isAuthenticated: boolean; user: AuthUser | null }) => void;
}

/* ── Provider ──────────────────────────────────────────────── */

export function ArcProvider({
  client,
  storage = defaultStorage,
  children,
  onSessionRestore,
  onAuthChange,
}: ArcProviderProps) {
  const authSdk = React.useMemo(() => new AuthSdk(client), [client]);

  const [state, setState] = React.useState<{
    user: AuthUser | null;
    accessToken: string | null;
    refreshToken: string | null;
    isLoading: boolean;
    error: string | null;
  }>({
    user: null,
    accessToken: storage.getAccessToken(),
    refreshToken: storage.getRefreshToken(),
    isLoading: true,
    error: null,
  });

  /* ── Derive isAuthenticated (not stored in state) ──────────── */

  const isAuthenticated = !!state.user && !!state.accessToken;

  /* ── Track state changes for onAuthChange ──────────────────── */

  const prevAuthRef = React.useRef(isAuthenticated);

  React.useEffect(() => {
    if (prevAuthRef.current !== isAuthenticated || state.isLoading === false) {
      onAuthChange?.({
        isAuthenticated,
        user: state.user,
      });
    }
    prevAuthRef.current = isAuthenticated;
  }, [isAuthenticated, state.user, state.isLoading, onAuthChange]);

  /* ── Bootstrap: try to restore session ─────────────────────── */

  React.useEffect(() => {
    const token = storage.getAccessToken();
    if (!token) {
      setState((prev) => ({ ...prev, isLoading: false }));
      return;
    }

    authSdk
      .me()
      .then((res: import("@arc-ui/sdk").ApiResponse<import("@arc-ui/sdk").UserProfile>) => {
        if (res.data) {
          const user = res.data as unknown as AuthUser;
          setState((prev) => ({
            ...prev,
            user,
            isLoading: false,
          }));
          onSessionRestore?.(user);
        } else {
          // Token expired — try refresh
          return refreshAccessToken(authSdk, storage).then((newToken) => {
            if (newToken) {
              return authSdk.me().then((r: import("@arc-ui/sdk").ApiResponse<import("@arc-ui/sdk").UserProfile>) => {
                if (r.data) {
                  const refreshedUser = r.data as unknown as AuthUser;
                  setState((prev) => ({
                    ...prev,
                    user: refreshedUser,
                    isLoading: false,
                  }));
                  onSessionRestore?.(refreshedUser);
                } else {
                  throw new Error("Session expired");
                }
              });
            }
            throw new Error("Session expired");
          });
        }
      })
      .catch(() => {
        storage.clearTokens();
        setState({ user: null, accessToken: null, refreshToken: null, isLoading: false, error: null });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Actions ──────────────────────────────────────────────── */

  const login = React.useCallback(
    async (params: LoginParams) => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      const res = await authSdk.login(params.email, params.password);
      if (res.data) {
        storage.setTokens(res.data.accessToken, res.data.refreshToken);
        setState((prev) => ({
          ...prev,
          user: res.data.user as unknown as AuthUser,
          accessToken: res.data.accessToken,
          refreshToken: res.data.refreshToken,
          isLoading: false,
        }));
      } else {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: res.error?.message ?? "Login failed",
        }));
      }
      return res;
    },
    [authSdk, storage],
  );

  const register = React.useCallback(
    async (params: RegisterParams) => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      const res = await authSdk.register(params.name, params.email, params.password);
      if (res.data) {
        storage.setTokens(res.data.accessToken, res.data.refreshToken);
        setState((prev) => ({
          ...prev,
          user: res.data.user as unknown as AuthUser,
          accessToken: res.data.accessToken,
          refreshToken: res.data.refreshToken,
          isLoading: false,
        }));
      } else {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: res.error?.message ?? "Registration failed",
        }));
      }
      return res;
    },
    [authSdk, storage],
  );

  const logout = React.useCallback(async () => {
    try {
      // Best-effort server-side logout
      const sessionId = state.accessToken;
      if (sessionId) {
        await authSdk.logout(sessionId);
      }
    } catch {
      // Ignore network errors during logout
    }
    storage.clearTokens();
    setState({ user: null, accessToken: null, refreshToken: null, isLoading: false, error: null });
  }, [authSdk, storage, state.accessToken]);

  const refreshSession = React.useCallback(async () => {
    return refreshAccessToken(authSdk, storage);
  }, [authSdk, storage]);

  const clearError = React.useCallback(() => {
    setState((prev) => ({ ...prev, error: null }));
  }, []);

  const value: AuthContextValue = {
    ...state,
    isAuthenticated,
    login,
    register,
    logout,
    refreshSession,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/* ── Hook ──────────────────────────────────────────────────── */

export function useAuth(): AuthContextValue {
  const ctx = React.useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an <ArcProvider>");
  }
  return ctx;
}

/* ── Helpers ───────────────────────────────────────────────── */

async function refreshAccessToken(
  authSdk: AuthSdk,
  storage: TokenStorage,
): Promise<string | null> {
  const refreshToken = storage.getRefreshToken();
  if (!refreshToken) return null;

  const res = await authSdk.refresh(refreshToken);
  if (res.data) {
    const newAccess = res.data.accessToken;
    const newRefresh = res.data.refreshToken ?? refreshToken;
    storage.setTokens(newAccess, newRefresh);
    return newAccess;
  }

  storage.clearTokens();
  return null;
}
