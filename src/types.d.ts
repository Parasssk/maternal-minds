// Minimal declaration file so tsconfig.app.json has an input
// Does not affect runtime; safe to keep
declare module "*.svg" {
  const src: string;
  export default src;
}
