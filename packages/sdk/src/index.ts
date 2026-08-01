/**
 * @arc-ui/sdk: arc-id API client
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
export type {
  ApiError,
  ApiEnvelope,
  ApiResponse,
  ArcIdClientConfig,
  RequestOptions,
} from "./client.js";

export { AuthSdk } from "./auth.sdk.js";
export type {
  TokenPair,
  MfaVerifyResult,
  MfaSetupResult,
  RecoveryCodesResult,
  StepUpResult,
  UserProfile,
  SwitchContextResult,
  RefreshResult,
} from "./auth.sdk.js";

export type {
  User,
  Membership,
  Session,
  Device,
  LinkedAccount,
  ExternalId,
  Delegation,
  LoginResult,
  RegisterResult,
  TokenBundle,
  OAuthTokenResponse,
  OAuthClient,
  OAuthToken,
  Consent,
  TokenIntrospection,
  OidcUserInfo,
  Jwks,
  JwkKey,
  Tenant,
  TenantPolicy,
  TenantDid,
  SigningKey,
  Project,
  OnboardingFlow,
  OnboardingStep,
  InviteAcceptResult,
  WebhookEndpoint,
  WebhookEvent,
  Subscription,
  AuditLogEntry,
  IdpConnection,
  Credential,
  VerificationSession,
  VerificationResult,
  StatusList,
  Passkey,
  OnboardingSession,
  Paginated,
  JsonObject,
  JsonValue,
} from "./types.js";

export { PasskeySdk } from "./passkey.sdk.js";
export type {
  PasskeyRegistrationOptions,
  PasskeyAuthenticationOptions,
  PasskeyRegisterResult,
} from "./passkey.sdk.js";

export { VcSdk } from "./vcs.sdk.js";

export { IdentitySdk } from "./identity.sdk.js";

export { OAuthSdk } from "./oauth.sdk.js";
export type { CreateClientParams, GrantConsentParams } from "./oauth.sdk.js";

export { TenantSdk } from "./tenant.sdk.js";

export { BillingSdk } from "./billing.sdk.js";

export { WebhooksSdk } from "./webhooks.sdk.js";
export type { CreateWebhookParams, UpdateWebhookParams, ListEventsParams } from "./webhooks.sdk.js";

export { AuditSdk } from "./audit.sdk.js";
export type { AuditListParams } from "./audit.sdk.js";

export { IdpSdk } from "./idp.sdk.js";
export type { CreateConnectionParams } from "./idp.sdk.js";
