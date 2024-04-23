import {
  useValidateTargetUrlLazyQuery,
  ValidateTargetUrlQuery,
} from "@/graphql/url.generated";
import _ from "lodash";
import { useEffect, useMemo, useState } from "react";

type ValidateResult = ValidateTargetUrlQuery["validateTargetUrl"];

export interface UrlValidationResult {
  // is this positively known to be valid?
  // if undefined, means we don't know yet
  isValid: boolean | undefined;

  // validation is currently running
  validating: boolean;

  // and the output of any validation, relevant to the current url
  response: ValidateResult | undefined;

  // any unexpected error during validation
  error: unknown | undefined;
}

export function useUrlValidation(url: string): UrlValidationResult {
  // setting this value triggers that we should start checking the url
  const [urlToCheck, setUrlToCheck] = useState(url);
  const [validating, setValidating] = useState(false);
  const [response, setResponse] = useState<ValidateResult>();
  const [error, setError] = useState<unknown>();

  const [validateUrl] = useValidateTargetUrlLazyQuery({
    fetchPolicy: "no-cache",
  });

  const debouncedSetUrlToCheck = useMemo(
    () => _.debounce(setUrlToCheck, 2000),
    [setUrlToCheck],
  );

  // cancel the debounce on onmount
  useEffect(() => () => debouncedSetUrlToCheck.cancel(), []);

  // when the input url changes we should queue an update
  useEffect(() => {
    setResponse(undefined);
    setError(undefined);
    setValidating(false);
    debouncedSetUrlToCheck(url);
  }, [url, debouncedSetUrlToCheck]);

  // when the url to check changes, we should kick off the validation
  // nb: see https://react.dev/reference/react/useEffect#fetching-data-with-effects
  // for the "notCancelled" pattern here
  useEffect(() => {
    // special check: if the url doesn't start with https:// then don't bother
    // to call the serve for validation since that will fail anyway
    if (!urlToCheck.startsWith("https://")) {
      setResponse(undefined);
      return;
    }

    let notCancelled = true;
    setValidating(true);

    validateUrl({ variables: { url: urlToCheck } })
      .then((result) => {
        if (notCancelled) {
          setResponse(result.data?.validateTargetUrl);
        }
      })
      .catch((error) => {
        if (notCancelled) {
          setError(error);
        }
      })
      .finally(() => {
        if (notCancelled) setValidating(false);
      });

    return () => {
      notCancelled = false;
    };
  }, [urlToCheck]);

  const currentUrlIsValid = urlToCheck === url ? response?.isValid : undefined;

  return {
    isValid: currentUrlIsValid,
    validating,
    response,
    error,
  };
}
