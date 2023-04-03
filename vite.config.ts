import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), tsconfigPaths(), checker({ typescript: true })],

    // and these settings are all about maintaining compatibility with
    // create-react-app, which this project originally used
    envPrefix: "REACT_APP_",
    server: {
      port: 3000,
      proxy: {
        "/v1": {
          target: `${env.BACKEND_URL}`,
          changeOrigin: true,
        },
        "/graphql": {
          target: `${env.BACKEND_URL}`,
          changeOrigin: true,
        },
      },
    },
    build: {
      outDir: "build",
      assetsDir: "static",
      chunkSizeWarningLimit: 3000,
      sourcemap: true,
    },
    test: {
      // see https://vitest.dev/config/#globals
      //  this maintains compatibility with jest where methods like "it"
      //  and "test" are there by default. It's probably clearer in due course
      //  to import explicitly.
      globals: true,
      deps: {
        interopDefault: true,
      },
    },
  };
});
