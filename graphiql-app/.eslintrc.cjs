module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'next.config.mjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  plugins: [
    'react',
    'react-hooks',
    'jsx-a11y',
    '@typescript-eslint',
    'react-refresh',
    'react-compiler',
    '@next/eslint-plugin-next',
  ],
  rules: {
    'prettier/prettier': 'error',
    'react-compiler/react-compiler': 'error',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'jsx-a11y/anchor-is-valid': 'warn',
    'react-hooks/exhaustive-deps': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    '@typescript-eslint/no-unused-vars': ['off', { argsIgnorePattern: '^_' }],

    'react-refresh/only-export-components': 'off',
  },
};
