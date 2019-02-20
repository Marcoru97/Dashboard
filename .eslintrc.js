module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    'arrow-parens': 'as-needed',
  },
  env: {
    browser: true,
    node: true,
  },
  extends: ['airbnb-base', 'prettier'],
  globals: {
    __static: true,
  },
  plugins: ['html', 'prettier'],
  rules: {
    'prettier/prettier': ['error'],
    'global-require': 0,
    'import/no-unresolved': 0,
    'no-param-reassign': 0,
    'no-shadow': 0,
    'import/extensions': 0,
    'import/newline-after-import': 0,
    'no-multi-assign': 0,
    'no-mixed-operators': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
  },
};
