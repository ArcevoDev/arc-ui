/**
 * Token persistence layer. Swappable: uses localStorage by default.
 *
 * Safe on the server: localStorage is only touched lazily inside the
 * accessor functions, so importing this module during SSR never throws.
 */

export interface TokenStorage {
  getAccessToken: () => string | null;
  getRefreshToken: () => string | null;
  setTokens: (accessToken: string, refreshToken: string) => void;
  clearTokens: () => void;
}

const ACCESS_KEY = "arcid_access_token";
const REFRESH_KEY = "arcid_refresh_token";

function hasWindow(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export const defaultStorage: TokenStorage = {
  getAccessToken: () =>
    hasWindow() ? window.localStorage.getItem(ACCESS_KEY) : null,
  getRefreshToken: () =>
    hasWindow() ? window.localStorage.getItem(REFRESH_KEY) : null,
  setTokens: (accessToken, refreshToken) => {
    if (!hasWindow()) return;
    window.localStorage.setItem(ACCESS_KEY, accessToken);
    window.localStorage.setItem(REFRESH_KEY, refreshToken);
  },
  clearTokens: () => {
    if (!hasWindow()) return;
    window.localStorage.removeItem(ACCESS_KEY);
    window.localStorage.removeItem(REFRESH_KEY);
  },
};
