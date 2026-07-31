/**
 * @arc-ui/tokens: Design tokens for the Arcevo ecosystem
 *
 * Single source of truth for the Alpha Palette, typography scale,
 * spacing system, and sub-brand accent colors.
 *
 * Usage:
 *   import { alpha, typography, spacing, subBrands } from "@arc-ui/tokens";
 *
 * CSS custom properties are available at:
 *   import "@arc-ui/tokens/tokens.css";
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
