import config from "@repo/eslint-config/next";
import { globalIgnores } from "eslint/config";

/** @type {import("eslint").Linter.Config} */
export default [
  globalIgnores(["src/components/ui/**/*", "eslint.config.mjs"]),
  ...config
];
