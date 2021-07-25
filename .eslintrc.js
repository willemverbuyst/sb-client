module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  overrides: [
    {
      files: 'server/**/*.js',
      rules: {
        'simple-import-sort/imports': 'off',
        'import/order': ['error', { 'newlines-between': 'always' }],
      },
    },
  ],
  plugins: ['simple-import-sort'],
  rules: {
    'no-console': 0,
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
  },
};
