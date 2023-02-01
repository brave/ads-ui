import {CodegenConfig} from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: '../ads-serve/src/graphql/schema.graphql',
  documents: './src/**/*.graphql',
  generates: {
    'src/': {
      preset: 'near-operation-file',
      presetConfig: {
        extension: '.generated.tsx',
        baseTypesPath: 'graphql/types.ts',
      },
      plugins: ['typescript-operations', 'typescript-react-apollo'],
      config: { withHooks: true },
    },
    'src/graphql/types.ts': {
      plugins: ['typescript', 'addScalars'],
      config: { onlyEnums: true },
    },
    'src/gql/ads-ui-types.json': {
      // Nicety for fragment autocompletion, don't need to check in
      plugins: ['introspection'],
      config: {
        minify: true,
        descriptions: false,
      },
    },
  },
};
export default config;
