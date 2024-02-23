module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    requireConfigFile: false,
    parser: "@typescript-eslint/parser"
  },
  extends: [
    "@nuxtjs/eslint-config-typescript"
  ],
  env: {
    browser: true,
    es2021: true
  },
  overrides: [
    {
      env: {
        node: true
      },
      files: [
        ".eslintrc.{js,cjs}"
      ],
      parserOptions: {
        sourceType: "script"
      }
    }
  ],
  rules: {
    indent: [
      "warn",
      2
    ],
    "linebreak-style": [
      "warn",
      "unix"
    ],
    quotes: [
      "warn",
      "double"
    ],
    semi: [
      "warn",
      "always"
    ],
    "space-before-function-paren": ["error", "never"],
    "@typescript-eslint/no-unused-vars": "off",
    "vue/multi-word-component-names": "off"
  }
};
