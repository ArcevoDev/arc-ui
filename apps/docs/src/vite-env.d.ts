/// <reference types="vite/client" />

/* ── CSS side-effect imports (resolve *.css modules in TS) ─ */
declare module "*.css" {
  const content: string;
  export default content;
}
