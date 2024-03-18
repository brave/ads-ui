import dayjs, { Dayjs } from "dayjs";

function parseBuildTime(): Dayjs {
  try {
    if (import.meta.env.REACT_APP_BUILD_TIME) {
      return dayjs(import.meta.env.REACT_APP_BUILD_TIME);
    }
  } catch {
    // ignore
  }
  return dayjs();
}

export const VERSION = {
  fullHash: import.meta.env.REACT_APP_GIT_SHA1 ?? "dev",
  shortHash: import.meta.env.REACT_APP_GIT_SHA1?.substring(0, 8) ?? "dev",
  buildTime: parseBuildTime(),
};
