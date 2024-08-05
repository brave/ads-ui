export function segmentNameWithNoDash(name: string): string {
  const audienceWithChild = name.split("-");
  if (audienceWithChild.length === 1) return `${name} (general)`;
  audienceWithChild.shift();

  return audienceWithChild.join("-");
}
