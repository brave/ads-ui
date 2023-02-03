export function wait(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}
