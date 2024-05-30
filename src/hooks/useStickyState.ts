import { Dispatch, useCallback, useState } from "react";

// this is like "useState", but persists and restores the state to the local storage key
// specified.  For simplicity, it doesn't fully support setting the state with a function,
// as we can't always see the resulting value after the function is called.
export function useStickyState<S>(
  localStorageKey: string,
  initialState: S,
): [S, Dispatch<S>] {
  const [state, setState] = useState<S>(() => {
    const localStorageValue = localStorage.getItem(localStorageKey);
    if (localStorageValue) {
      return JSON.parse(localStorageValue);
    }
    return initialState;
  });

  const setStateSticky = useCallback(
    (value: S) => {
      setState(value);
      localStorage.setItem(localStorageKey, JSON.stringify(value));
    },
    [localStorageKey],
  );

  return [state, setStateSticky];
}
