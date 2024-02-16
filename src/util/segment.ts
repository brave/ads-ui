export function segmentNameWithNoDash(name: string): string {
  // eslint-disable-next-line lingui/no-unlocalized-strings
  if (name === "Untargeted") return "Automatic targeting";
  const audienceWithChild = name.split("-");
  if (audienceWithChild.length === 1) return `${name} (general)`;
  audienceWithChild.shift();

  return audienceWithChild.join("-");
}
