import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "../ads-serve/schema.graphql",
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
    "src/graphql/ads-serve.graphql.schema.json": {
      plugins: ["introspection"],
    },
  },
  config: {
    strictScalars: true,
    useTypeImports: true,
    enumType: "native",
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
