module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    jest: true,
  },
  extends: [
    'airbnb-typescript-prettier',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:jest/recommended',
  ],
  plugins: ['prettier', 'jest'],
  rules: {
    'no-underscore-dangle': 'off',
    'no-useless-constructor': 'off',
    'import/prefer-default-export': 'off',
    'import/extensions': 'off',
    'class-methods-use-this': 'off',
    'import/no-unresolved': 'off',
    '@typescript-eslint/no-shadow': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    'no-empty-function': ['error', { allow: ['constructors'] }],
  },
};
