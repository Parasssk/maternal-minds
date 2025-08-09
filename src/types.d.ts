// Minimal TS declaration to satisfy tsconfig.app.json include
// You can extend this as needed.
declare module "*.svg" {
  const src: string;
  export default src;
}
