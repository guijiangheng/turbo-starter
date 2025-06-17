import { flatConfig as nextFlatConfig } from "@next/eslint-plugin-next";

import baseConfig from "./react.mjs";

/**
 * @type {import("eslint").Linter.Config[]}
 * */
const config = [
  ...baseConfig,
  nextFlatConfig.coreWebVitals,
];

export default config;
