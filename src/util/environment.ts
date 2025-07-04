export enum Environment {
  LOCAL = "local",
  STAGE = "stage",
  PRODUCTION = "production",
}

export function getEnvironment(): Environment {
  const host = window.location.hostname;

  if (host.endsWith(".brave.com")) {
    return Environment.PRODUCTION;
  }

  if (host.endsWith(".bravesoftware.com")) {
    return Environment.STAGE;
  }

  return Environment.LOCAL;
}

export function buildAdServerEndpoint(suffix: string): string {
  return `${import.meta.env.REACT_APP_SERVER_ADDRESS}${suffix}`;
}

export function buildAdServerV2Endpoint(suffix: string): string {
  return `${import.meta.env.REACT_APP_SERVER_ADDRESS.replace(
    "v1",
    "v2",
  )}${suffix}`;
}
