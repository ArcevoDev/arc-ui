import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SignIn } from "./sign-in.js";
import { ArcProvider } from "./provider.js";
import { ArcIdClient } from "@arc-ui/sdk";
import { createMemoryStorage } from "./test-storage.js";
import { defaultConfig } from "./types.js";

describe("SignIn OAuth providers", () => {
  it("renders provider buttons from config and calls onOAuth", async () => {
    const client = new ArcIdClient({ baseUrl: "https://auth.arcevo.dev/api/v1" });
    const onOAuth = vi.fn();

    // Config with OAuth providers: google + saml
    const config = {
      ...defaultConfig,
      oauthProviders: ["google", "saml"],
    };

    render(
      <ArcProvider client={client} storage={createMemoryStorage()}>
        <SignIn config={config} onOAuth={onOAuth} />
      </ArcProvider>,
    );

    // Provider buttons render after the initial select_method step
    const google = await screen.findByRole("button", {
      name: /sign in with google/i,
    });
    expect(google).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign in with saml/i })).toBeInTheDocument();

    await userEvent.click(google);
    expect(onOAuth).toHaveBeenCalledWith("google");
  });
});
