import { Dispatch, useEffect, useState } from "react";

export function useGetEntityState(
  ephemeralState: string,
): [string, Dispatch<string>] {
  const [state, setState] = useState(ephemeralState);

  useEffect(() => {
    setState(ephemeralState);
  }, [ephemeralState]);

  return [state, setState];
}
