export const uInt8Array = (s: string) =>
  Uint8Array.from(atob(s), (c) => c.charCodeAt(0));
