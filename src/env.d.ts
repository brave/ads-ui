/// <reference types="vite/client" />

// see https://vitejs.dev/guide/env-and-mode.html#env-files

interface ImportMetaEnv {
  readonly REACT_APP_SERVER_ADDRESS: string;
  readonly REACT_APP_BUILD_TIME: string;
  readonly REACT_APP_GIT_SHA1: string;
  readonly REACT_APP_QLASS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
