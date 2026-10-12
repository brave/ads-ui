import eslintReact from "@eslint-react/eslint-plugin";
import eslint from "@eslint/js";
import graphqlPlugin from "@graphql-eslint/eslint-plugin";
import esLintConfigPrettier from "eslint-config-prettier";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  eslintReact.configs["recommended-typescript"],
  {
    name: "ignore generated files",
    ignores: [
      "**/*.generated.tsx",
      "*.json",
      "src/graphql-client/*.ts",
      "build/**",
    ],
  },
  {
    name: "apply graphql processor to all typescript files",
    files: ["**/*.{ts,tsx}"],
    processor: graphqlPlugin.processor,
  },
  {
    name: "configure graphql linter",
    files: ["**/*.graphql"],
    plugins: {
      "@graphql-eslint": graphqlPlugin,
    },
    languageOptions: {
      parser: graphqlPlugin.parser,
    },
    rules: {
      ...graphqlPlugin.configs["operations-recommended"].rules,
      "@graphql-eslint/no-deprecated": "warn",
      "@graphql-eslint/selection-set-depth": ["error", { maxDepth: 8 }],
    },
  },
  {
    name: "our specific rules",
    rules: {
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-inferrable-types": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-require-imports": "error",
      // we should enable this in due course:
      "@eslint-react/no-array-index-key": "off",
      "no-console": "error",
      eqeqeq: "error",
    },
  },
  esLintConfigPrettier,
);
