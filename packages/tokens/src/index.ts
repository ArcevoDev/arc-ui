/**
 * @arcevo/facet-tokens: Design tokens for the Arcevo ecosystem
 *
 * Single source of truth for the Alpha Palette, typography scale,
 * spacing system, and sub-brand accent colors.
 *
 * Usage:
 *   import { alpha, typography, spacing, subBrands } from "@arcevo/facet-tokens";
 *
 * CSS custom properties are available at:
 *   import "@arcevo/facet-tokens/tokens.css";
 */

export { alpha } from "./colors";
export { typography } from "./typography";
export { spacing } from "./spacing";
export { subBrands } from "./sub-brands";
export type {
  AlphaPalette,
  TypographyScale,
  SpacingScale,
  SpacingToken,
  SubBrand,
  SubBrandKey,
  SubBrands,
  ArcevoTokens,
} from "./types";
