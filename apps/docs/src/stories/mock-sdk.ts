/**
 * Mock data for Storybook auth stories.
 * Types match @arc-ui/sdk's actual types exactly.
 */

import type {
  TokenPair,
  UserProfile,
  MfaVerifyResult,
  MfaSetupResult,
  RecoveryCodesResult,
} from "@arc-ui/sdk";

export const MOCK_USER: UserProfile = {
  id: "usr_mock_001",
  email: "jane@example.com",
  name: "Jane Archer",
  memberships: [
    { id: "mem_001", name: "Arcevo Labs", organizationId: "org_arc_001", role: "admin" },
    { id: "mem_002", name: "Acme Corp", organizationId: "org_acme_001", role: "member" },
  ],
  plan: "pro",
  tenantId: "tenant_arc_001",
};

export const MOCK_TOKEN_PAIR: TokenPair = {
  accessToken: "mock_access_eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
  refreshToken: "mock_refresh_eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
  user: MOCK_USER as unknown as Record<string, unknown>,
};

export const MOCK_MFA_VERIFY: MfaVerifyResult = {
  accessToken: "mock_mfa_access_xxx",
  refreshToken: "mock_mfa_refresh_xxx",
  user: MOCK_USER as unknown as Record<string, unknown>,
};

export const MOCK_MFA_SETUP: MfaSetupResult = {
  secret: "JBSWY3DPEHPK3PXP",
  qrCode:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
  uri: "otpauth://totp/Arcevo:jane@example.com?secret=JBSWY3DPEHPK3PXP&issuer=Arcevo",
};

export const MOCK_RECOVERY_CODES: RecoveryCodesResult = {
  recoveryCodes: [
    "ABCD-EFGH-IJKL-MNOP",
    "QRST-UVWX-YZ12-3456",
    "7890-ABCD-EFGH-IJKL",
    "MNOP-QRST-UVWX-YZ12",
    "3456-7890-ABCD-EFGH",
    "IJKL-MNOP-QRST-UVWX",
    "YZ12-3456-7890-ABCD",
    "EFGH-IJKL-MNOP-QRST",
  ],
};

export const MOCK_REFRESH_RESPONSE = {
  accessToken: "mock_refreshed_access_xxx",
  refreshToken: "mock_refreshed_refresh_xxx",
};
