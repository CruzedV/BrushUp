module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'node_modules'],
  parser: '@typescript-eslint/parser',
  plugins: [
    'react',
    'react-hooks',
    '@typescript-eslint',
    'prettier',
  ],
  settings: {
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
  rules: {
    'object-shorthand': ['error', 'always'],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    '@typescript-eslint/naming-convention': [
      'error',
      {
        format: ['PascalCase'],
        prefix: ['I'],
        selector: 'interface',
      },
    ],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        args: 'none',
        vars: 'all',
      },
    ],
    '@typescript-eslint/no-invalid-this': 'error',
    'import/no-duplicates': 'error',
    'import/first': 'error',
    'import/no-anonymous-default-export': [
      'error',
      {
        allowArray: false,
        allowArrowFunction: false,
        allowAnonymousClass: false,
        allowAnonymousFunction: false,
        allowCallExpression: true,
        allowLiteral: false,
        allowObject: false,
      },
    ],
    'react/jsx-boolean-value': ['error', 'always'],
    'react/jsx-key': 'error',
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'react/self-closing-comp': [
      'error',
      {
        component: true,
        html: true,
      },
    ],
    'react/jsx-tag-spacing': [
      'error',
      {
        afterOpening: 'allow-multiline',
        beforeSelfClosing: 'always',
        closingSlash: 'never',
      },
    ],
    'react/jsx-wrap-multilines': [
      'error',
      {
        arrow: 'parens-new-line',
        assignment: 'parens-new-line',
        condition: 'parens-new-line',
        declaration: 'parens-new-line',
        logical: 'parens-new-line',
        prop: 'ignore',
        return: 'parens-new-line',
      },
    ],
    'arrow-body-style': ['error', 'as-needed'],
    'import/no-unresolved': 'off',
    'no-restricted-imports': [
      'error',
      {
        name: 'react-router',
        message: 'Use react-router-dom package',
      },
    ],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        'plugin:@typescript-eslint/recommended',
      ],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/naming-convention': [
          'error',
          {
            format: ['PascalCase'],
            prefix: ['I'],
            selector: 'interface',
          },
        ],
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-var-requires': 0,
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {
            args: 'none',
            vars: 'all',
          },
        ],
        '@typescript-eslint/no-invalid-this': 'error',
      },
    },
  ],
}
