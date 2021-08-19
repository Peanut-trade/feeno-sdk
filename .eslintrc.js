module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    jest: true,
  },
  extends: ['airbnb', 'prettier', 'plugin:prettier/recommended', 'plugin:jest/recommended'],
  plugins: ['prettier', 'jest'],
  rules: {
    'no-underscore-dangle': 'off',
    'no-useless-constructor': 'off',
    'import/prefer-default-export': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'no-empty-function': ['error', { allow: ['constructors'] }],
  },
};
