module.exports = {
  root: true,
  env: {
    browser: true,
  },
  settings: {
    'import/resolver': 'webpack',
  },
  extends: ['airbnb'],
  // parserOptions: {
  //   ecmaVersion: 2020,
  //   sourceType: 'module',
  // },
  // rules: {
  //   'semi': ['error', 'never'],
  // },
  ignorePatterns: ['dist/*'],
};
