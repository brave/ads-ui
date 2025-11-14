import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import reactRecommended from "eslint-plugin-react/configs/recommended.js";
import jsxRuntime from "eslint-plugin-react/configs/jsx-runtime.js";
import prettier from "eslint-config-prettier";
import reactHooks from "eslint-plugin-react-hooks";
import * as graphql from "@graphql-eslint/eslint-plugin";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      prettier,
      "react-hooks": reactHooks,
    },
  },
  {
    files: ["**/*.{js,cjs,jsx,mjsx,ts,tsx,mtsx}"],
    ...reactRecommended,
    ...jsxRuntime,
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    name: "apply graphql processor to all typescript files",
    files: ["**/*.{ts,tsx}"],
    processor: graphql.processors.graphql,
  },
  {
    name: "configure graphql linter",
    files: ["**/*.graphql"],
    plugins: {
      "@graphql-eslint": graphql,
    },
    languageOptions: {
      parser: graphql,
    },
    rules: {
      ...graphql.configs["operations-recommended"].rules,
      "@graphql-eslint/no-deprecated": "warn",
    },
  },
  {
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
    },
    ignores: [
      "**/*.test.ts",
      "src/components/TimeZonePicker/useTimeZoneList.ts",
      "codegen.ts",
      "eslint.config.js",
    ],
  },
  {
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 2020,
        project: true,
        sourceType: "module",
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
);
