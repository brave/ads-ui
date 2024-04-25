import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "../ads-serve/src/graphql/schema.graphql",
  documents: ["src/**/*.ts", "src/**/*.tsx", "src/**/*.graphql"],
  ignoreNoDocuments: true,
  overwrite: true,
  generates: {
    "./src/graphql-client/": {
      preset: "client",
      presetConfig: {
        fragmentMasking: false,
      },
    },
  },
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
};

export default config;
