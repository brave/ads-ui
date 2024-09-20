import { Dispatch, useCallback, useRef } from "react";

// this is like "useState", but persists and restores the state to the local storage key
// specified.  For simplicity, it doesn't fully support setting the state with a function,
// as we can't always see the resulting value after the function is called.
export function useStickyRef<S>(
  localStorageKey: string,
  initialState: S,
): [S, Dispatch<S>] {
  const ref = useRef<S>(initialState);
  const localStorageValue = localStorage.getItem(localStorageKey);
  if (localStorageValue) {
    ref.current = JSON.parse(localStorageValue);
  }

  const setRefSticky = useCallback(
    (value: S) => {
      ref.current = value;
      localStorage.setItem(localStorageKey, JSON.stringify(value));
    },
    [localStorageKey],
  );

  return [ref.current, setRefSticky];
}
