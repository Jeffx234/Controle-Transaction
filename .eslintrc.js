module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['@rocketseat/eslint-config/react'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'prettier', 'react-hooks', 'import'],
  rules: {
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'react/react-in-jsx-scope': 'off',
  },
}
