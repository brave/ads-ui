export function applySelection(
  filters: string[] | undefined | null,
  id: string,
): string[] | undefined {
  if (id === "all") {
    return undefined;
  }

  if (!filters) {
    return [id];
  }

  if (filters.includes(id)) {
    return filters.filter((f) => f !== id);
  }

  return [...filters, id];
}
