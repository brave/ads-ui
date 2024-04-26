import { useMemo } from "react";
import { useLocation } from "react-router-dom";

// see https://v5.reactrouter.com/web/example/query-parameters
function useQueryStringParams(): URLSearchParams {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export function useQueryStringValue(key: string): string | null {
  const query = useQueryStringParams();
  return query.get(key);
}
