import moment from "moment";

function parseBuildTime(): moment.Moment {
  try {
    if (import.meta.env.REACT_APP_BUILD_TIME) {
      return moment(import.meta.env.REACT_APP_BUILD_TIME);
    }
  } catch {
    // ignore
  }
  return moment();
}

export const VERSION = {
  fullHash: import.meta.env.REACT_APP_GIT_SHA1 ?? "dev",
  shortHash: import.meta.env.REACT_APP_GIT_SHA1?.substring(0, 8) ?? "dev",
  buildTime: parseBuildTime(),
};
