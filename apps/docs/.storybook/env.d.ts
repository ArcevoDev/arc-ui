/// <reference types="vite/client" />

/* ── CSS side-effect imports (Storybook's TS pipeline won't resolve vite/client) ─ */
declare module "*.css" {
  const content: string;
  export default content;
}
