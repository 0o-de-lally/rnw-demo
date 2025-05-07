import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";

export default [
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    ignores: [
      "node_modules/**",
      "build/**",
      "dist/**",
      ".github/**",
      "coverage/**",
      "local_testnet/**",
      "*.lock",
      "*.config*",
    ],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
        project: "./tsconfig.json", // Add project for type-aware rules
      },
      globals: {
        document: "readonly",
        navigator: "readonly",
        window: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      // TypeScript rules
      ...tseslint.configs.recommended.rules,

      "no-console": ["warn", { allow: ["warn", "error"] }],

      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],

      // React rules
      ...reactPlugin.configs.recommended.rules,
      "react/prop-types": "off", // Disable prop-types as we use TypeScript for type checking
      "react/react-in-jsx-scope": "off", // Not needed with React 17+
      // React Hooks rules
      ...reactHooksPlugin.configs.recommended.rules,
    },
  },
];
