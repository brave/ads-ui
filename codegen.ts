import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "../ads-serve/src/graphql/schema.graphql",
  documents: "./src/**/*.graphql",
  hooks: { afterAllFileWrite: ["prettier --write"] },
  config: {
    strictScalars: true,
    useTypeImports: true,
    scalars: {
      DateTime: "string",
      Numeric: {
        input: "string | number",
        output: "string",
      },
      JSONObject: "object",
    },
  },
  generates: {
    "src/": {
      preset: "near-operation-file",
      presetConfig: {
        extension: ".generated.tsx",
        baseTypesPath: "graphql/types.ts",
      },
      plugins: ["typescript-operations", "typescript-react-apollo"],
      config: { withHooks: true, withRefetchFn: true, skipTypename: true },
    },
    "src/graphql/types.ts": {
      plugins: ["typescript"],
      config: { onlyOperationTypes: true },
    },
  },
};
export default config;
