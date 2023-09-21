export const uInt8Array = (s?: string | null) =>
  s
    ? Uint8Array.from(atob(s), (c) => c.charCodeAt(0))
    : new Uint8Array().fill(0);
