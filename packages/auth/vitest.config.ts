import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // React 19.2: react-dom/test-utils.act is a throwing deprecation stub.
      // RTL 16 imports act from there: point it at React's own act.
      "react-dom/test-utils": fileURLToPath(
        new URL("../../scripts/react-test-utils-shim.ts", import.meta.url),
      ),
    },
  },
  test: {
    include: ["src/**/*.test.tsx", "src/**/*.test.ts"],
    environment: "jsdom",
    globals: true,
    setupFiles: ["../../scripts/test-setup.ts"],
    // Windows worker spawn is unreliable for forks/threads: vmThreads is stable here.
    pool: "vmThreads",
    // React only exposes `act` in its development build.
    env: { NODE_ENV: "test" },
  },
});
