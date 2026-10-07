import type { TSESLint } from "@typescript-eslint/utils";
import { noDateStringConstructor } from "./rules/no-date-string-constructor";

const plugin = {
  meta: {
    name: "eslint-plugin-safe-dates",
    version: "0.1.0",
  },
  rules: {
    "no-date-string-constructor": noDateStringConstructor,
  },
};

const recommended = {
  name: "safe-dates/recommended",
  plugins: { "safe-dates": plugin },
  rules: {
    "safe-dates/no-date-string-constructor": "error",
  },
} satisfies TSESLint.FlatConfig.Config;

export default {
  ...plugin,
  configs: { recommended },
};