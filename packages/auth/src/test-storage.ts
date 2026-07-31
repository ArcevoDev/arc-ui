import type { TokenStorage } from "./storage.js";

/** In-memory TokenStorage for tests. */
export function createMemoryStorage(): TokenStorage & {
  access: string | null;
  refresh: string | null;
  clearCount: number;
} {
  const storage = {
    access: null as string | null,
    refresh: null as string | null,
    clearCount: 0,
    getAccessToken: function () {
      return this.access;
    },
    getRefreshToken: function () {
      return this.refresh;
    },
    setTokens: function (a: string, r: string) {
      this.access = a;
      this.refresh = r;
    },
    clearTokens: function () {
      this.access = null;
      this.refresh = null;
      this.clearCount++;
    },
  };
  return storage;
}
