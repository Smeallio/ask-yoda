module.exports = {
    parser: '@babel/eslint-parser',
    extends: ['next/babel','next/core-web-vitals'],
    parserOptions: {
      requireConfigFile: false,
      ecmaVersion: 2020,
      babelOptions: {
        presets: ['next/babel'],
      },
    },
    rules: {
      // Add any custom ESLint rules here
    },
  };
  