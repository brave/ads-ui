import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import reactRecommended from "eslint-plugin-react/configs/recommended.js";
import jsxRuntime from "eslint-plugin-react/configs/jsx-runtime.js";
import prettier from "eslint-config-prettier";
import reactHooks from "eslint-plugin-react-hooks";
import lingui from "eslint-plugin-lingui";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{js,cjs,jsx,mjsx,ts,tsx,mtsx}"],
    ...reactRecommended,
    ...jsxRuntime,
    settings: {
      react: {
        version: "detect",
      },
    },
    plugins: {
      prettier,
      "react-hooks": reactHooks,
      lingui,
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
      "lingui/no-unlocalized-strings": [
        "error",
        {
          ignoreAttribute: [
            "style",
            "sx",
            "fontFamily",
            "bgcolor",
            "border",
            "padding",
            "color",
            "alt",
            "borderBottom",
            "gridTemplateColumns",
            "gridTemplateRows",
            "gridTemplateAreas",
            "rel",
          ],
          ignoreFunction: [
            "createSvgIcon",
            "log",
            "useTrackMatomoPageView",
            "useTrackWithMatomo",
            "formatInTimeZone",
            "zonedTimeToUtc",
            "utcToZonedTime",
            "graphql",
          ],
          ignoreProperty: [
            "documentTitle",
            "color",
            "border",
            "en",
            "es",
            "fontFamily",
            "boxShadow",
            "transform",
            "format",
            "name",
            "padding",
            "xDateFormat",
            "day",
            "week",
            "month",
          ],
        },
      ],
      "lingui/t-call-in-function": "error",
      "lingui/no-single-variables-to-translate": "error",
      "lingui/no-expression-in-message": "error",
      "lingui/no-single-tag-to-translate": "error",
      "lingui/no-trans-inside-trans": "error",
    },
    ignores: [
      "**/*.test.ts",
      "src/components/TimeZonePicker/useTimeZoneList.ts",
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
