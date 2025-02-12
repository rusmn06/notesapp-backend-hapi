import globals from "globals";


/** @type {import('eslint').Linter.Config[]} */
export default [
  daStyle,
  {files: ["**/*.js"], languageOptions: {sourceType: "commonjs"}},
  {languageOptions: { globals: globals.browser }},
];