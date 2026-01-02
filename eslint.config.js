import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import esLintConfigPrettier from "eslint-config-prettier";
import reactHooks from "eslint-plugin-react-hooks";
import graphqlPlugin from "@graphql-eslint/eslint-plugin";

export default defineConfig(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  react.configs.flat.recommended,
  react.configs.flat["jsx-runtime"],
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
    name: "react hooks",
    plugins: {
      "react-hooks": reactHooks,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
    },
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
    },
  },
  {
    settings: {
      react: {
        version: "detect",
      },
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
      "react/react-in-jsx-scope": "off",
      "react-hooks/exhaustive-deps": "error",
      "no-console": "error",
      eqeqeq: "error",
    },
  },
  esLintConfigPrettier,
);
