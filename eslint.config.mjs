import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactRecommended from "eslint-plugin-react/configs/recommended.js";
import prettier from "eslint-config-prettier/prettier";

const Config = [
  {
    prettier,
    files: ["**/*.{js,jsx,ts,tsx}"],
    ...reactRecommended,
    plugins: {
      react,
    },
    languageOptions: { globals: globals.browser },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];

export default Config;
