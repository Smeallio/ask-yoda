module.exports = {
    parser: '@babel/eslint-parser',
    extends: ['next', 'next/core-web-vitals'],
    parserOptions: {
      requireConfigFile: false,
      babelOptions: {
        presets: ['next/babel'],
      },
    },
    rules: {
      // Add any custom ESLint rules here
    },
  };
  