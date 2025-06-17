import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginReact from "eslint-plugin-react";
import jsxA11y from 'eslint-plugin-jsx-a11y';
import globals from "globals";

import baseConfig from "./base.mjs";

/**
 * @type {import("eslint").Linter.Config[]} */
const config = [
  {
    name: 'globals',
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.serviceworker,
      },
    },
  },

  ...baseConfig,
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat["jsx-runtime"],

  jsxA11y.flatConfigs.recommended,

  {
    ...pluginReactHooks.configs["recommended-latest"],
    settings: { react: { version: "detect" } },
  },

  {
    files: ["**/*.tsx"],
    rules: {
      "react/self-closing-comp": [
        "error",
        {
          "component": true,
          "html": true
        }
      ],
    }
  }
];

export default config;
