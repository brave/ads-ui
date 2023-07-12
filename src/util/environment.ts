export function buildAdServerEndpoint(suffix: string): string {
  return `${import.meta.env.REACT_APP_SERVER_ADDRESS}${suffix}`;
}

export function buildAdServerV2Endpoint(suffix: string): string {
  return `${import.meta.env.REACT_APP_SERVER_ADDRESS.replace(
    "v1",
    "v2",
  )}${suffix}`;
}

export function buildGraphQlEndpoint() {
  return `${import.meta.env.REACT_APP_SERVER_ADDRESS}`.replace("v1", "graphql");
}
