const DEFAULT_STATE_COLOUR = "#d1d1da";

const STATE_COLOURS: Record<string, string> = {
  active: "#9bf4a8",
  paused: "#f997a4",
  alert: "#f997a4",
  suspended: "#f997a4",
  completed: DEFAULT_STATE_COLOUR,
  daycomplete: "#fce172",
  draft: DEFAULT_STATE_COLOUR,
  under_review: DEFAULT_STATE_COLOUR,
  deleted: DEFAULT_STATE_COLOUR,
};

export function calcColorForState(state: string): string {
  return STATE_COLOURS[state] ?? DEFAULT_STATE_COLOUR;
}
