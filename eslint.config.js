// @ts-check

import eslint from "@eslint/js";
import love from "eslint-config-love";
import prettier from "eslint-config-prettier";
import a11y from "eslint-plugin-jsx-a11y";
import n from "eslint-plugin-n";
import react from "eslint-plugin-react";
import hooks from "eslint-plugin-react-hooks";
import sort from "eslint-plugin-simple-import-sort";
import { configs as sonarConfigs } from "eslint-plugin-sonarjs";
import globals from "globals";
import tseslint from "typescript-eslint";

const files = ["**/*.{js,cjs,mjs,ts,tsx}"];

export default [
  {
    ignores: [
      ".wrangler/**",
      "functions/**",
      "public/build/**",
      "dist/**",
      ".tanstack/**",
      "app/routeTree.gen.ts",
      "**/.claude/**",
    ],
  },
  { ...eslint.configs.recommended, files },
  ...[
    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
  ].map((config) => ({
    ...config,
    files: "files" in config ? config.files : files,
  })),
  { ...love, files, plugins: { ...love.plugins, n } },
  { ...react.configs.flat["recommended"], files },
  { ...react.configs.flat["jsx-runtime"], files },
  { ...hooks.configs.flat.recommended, files },
  { ...a11y.flatConfigs.strict, files },
  { ...sonarConfigs.recommended, files },
  { ...prettier, files },
  {
    files,
    languageOptions: {
      globals: { ...globals.browser, ...globals.commonjs },
      parserOptions: {
        project: ["./tsconfig.json", "./tsconfig.eslint.json"],
        tsconfigRootDir: import.meta.dirname,
        projectService: false,
      },
    },
    settings: {
      react: { version: "detect" },
      formComponents: ["Form"],
      linkComponents: [
        { name: "Link", linkAttribute: "to" },
        { name: "NavLink", linkAttribute: "to" },
      ],
    },
    plugins: { "simple-import-sort": sort },
    rules: {
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { fixStyle: "separate-type-imports" },
      ],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-deprecated": "error",
      "import/newline-after-import": "error",
      "jsx-a11y/alt-text": ["error", { elements: ["img"], img: ["Image"] }],
      "jsx-a11y/anchor-has-content": [
        "error",
        { components: ["Link", "NavLink"] },
      ],
      "lines-between-class-members": [
        "error",
        "always",
        { exceptAfterSingleLine: true },
      ],
      "react/jsx-no-leaked-render": ["error", { validStrategies: ["ternary"] }],
      "simple-import-sort/exports": "error",
      "simple-import-sort/imports": "error",
      "spaced-comment": [
        "error",
        "always",
        {
          line: { markers: ["*package", "!", "/", ",", "="] },
          block: {
            balanced: true,
            markers: ["*package", "!", ",", ":", "::", "flow-include"],
            exceptions: ["*"],
          },
        },
      ],
    },
  },
  {
    files: ["**/*.d.ts"],
    rules: { "@typescript-eslint/triple-slash-reference": "off" },
  },
];
