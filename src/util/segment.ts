export function segmentNameWithNoDash(name: string): string {
  if (name === "Untargeted") return "Automatic targeting";
  const audienceWithChild = name.split("-");
  if (audienceWithChild.length === 1) return `${name} (general)`;
  audienceWithChild.shift();

  return audienceWithChild.join("-");
}
