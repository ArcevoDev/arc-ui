/**
 * Form validation tests: validate flag on LoginForm + ResetPasswordForm.
 */

import { describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginForm } from "./forms/auth/login-form.js";
import { ResetPasswordForm } from "./forms/auth/reset-password-form.js";

describe("LoginForm validation", () => {
  it("blocks submit and shows inline errors when validate is enabled", async () => {
    const onSubmit = vi.fn().mockResolvedValue(null);
    render(<LoginForm onSubmit={onSubmit} validate />);

    await userEvent.click(screen.getByRole("button", { name: /sign in/i }));

    expect(await screen.findByText("Enter a valid email address")).toBeInTheDocument();
    expect(screen.getByText("Password must be at least 8 characters")).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("submits valid values when validate is enabled", async () => {
    const onSubmit = vi.fn().mockResolvedValue(null);
    render(<LoginForm onSubmit={onSubmit} validate />);

    await userEvent.type(screen.getByLabelText(/email/i), "user@example.com");
    await userEvent.type(screen.getByLabelText(/password/i), "correct-horse");
    await userEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => expect(onSubmit).toHaveBeenCalledWith("user@example.com", "correct-horse"));
  });
});

describe("ResetPasswordForm validation", () => {
  it("shows a mismatch error for non-matching passwords", async () => {
    const onSubmit = vi.fn().mockResolvedValue(null);
    render(<ResetPasswordForm token="tok" onSubmit={onSubmit} validate />);

    await userEvent.type(screen.getByLabelText(/new password/i), "longenough");
    await userEvent.type(screen.getByLabelText(/confirm password/i), "different");
    await userEvent.click(screen.getByRole("button", { name: /reset password/i }));

    expect(await screen.findByText("Passwords do not match")).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
