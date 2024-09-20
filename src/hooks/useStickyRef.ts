import { Dispatch, useCallback, useRef } from "react";

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
