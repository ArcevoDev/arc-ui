/**
 * @arc-ui/sdk — arc-id API client
 *
 * Pure fetch. No framework dependencies.
 *
 * Usage:
 *   import { ArcIdClient, AuthSdk } from "@arc-ui/sdk";
 *
 *   const client = new ArcIdClient({ baseUrl: "https://auth.arcevo.dev/api/v1" });
 *   const auth = new AuthSdk(client);
 *   const { data, error } = await auth.login("email", "password");
 */

export { ArcIdClient } from "./client.js";
export type { ApiError, ApiResponse, ArcIdClientConfig } from "./client.js";

export { AuthSdk } from "./auth.sdk.js";
export type {
  TokenPair,
  MfaVerifyResult,
  MfaSetupResult,
  RecoveryCodesResult,
  StepUpResult,
  UserProfile,
  SwitchContextResult,
} from "./auth.sdk.js";

export { PasskeySdk } from "./passkey.sdk.js";

export { VcSdk } from "./vcs.sdk.js";

export { IdentitySdk } from "./identity.sdk.js";

export { OAuthSdk } from "./oauth.sdk.js";
export type { CreateClientParams, GrantConsentParams } from "./oauth.sdk.js";

export { TenantSdk } from "./tenant.sdk.js";

export { BillingSdk } from "./billing.sdk.js";

export { WebhooksSdk } from "./webhooks.sdk.js";
export type {
  CreateWebhookParams,
  UpdateWebhookParams,
  ListEventsParams,
} from "./webhooks.sdk.js";

export { AuditSdk } from "./audit.sdk.js";
export type { AuditListParams } from "./audit.sdk.js";

export { IdpSdk } from "./idp.sdk.js";
export type { CreateConnectionParams } from "./idp.sdk.js";
