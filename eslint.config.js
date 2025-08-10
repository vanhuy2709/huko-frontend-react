import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import unicorn from 'eslint-plugin-unicorn';
import sonarjs from 'eslint-plugin-sonarjs';
import tsEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      unicorn.configs.recommended,
      sonarjs.configs.recommended
    ],
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.es2020
      },
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        projectService: true,
        tsconfigRootDir: './tsconfig.json'
      }
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      // unicorn,
      // sonarjs,
      '@typescript-eslint': tsEslint
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'unicorn/prefer-query-selector': 'warn',
      'unicorn/no-array-reduce': 'off',
      'unicorn/filename-case': 'off',
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/no-null': 'off',
      'unicorn/prefer-node-protocol': 'off',
      'unicorn/prefer-event-target': 'off',
      'unicorn/number-literal-case': 'off',
      'unicorn/numeric-separators-style': 'off',
      'unicorn/no-array-for-each': 'off',
      'unicorn/no-abusive-eslint-disable': "off",
      'unicorn/prefer-dom-node-text-content': "off",
      'sonarjs/cognitive-complexity': ['warn', 15],
      'sonarjs/no-duplicate-string': 'warn',
      'sonarjs/no-identical-functions': 'error',
      'sonarjs/deprecation': 'off',
      'sonarjs/no-useless-intersection': "off",
      'sonarjs/no-duplicate-string': "off",
      'sonarjs/no-async-constructor': "off",
      'sonarjs/cognitive-complexity': "off",
      '@typescript-eslint/no-explicit-any': 'off',
      // '@typescript-eslint/naming-convention': [
      //   'error',
      //   {
      //     selector: ['variable', 'function', 'parameter', 'property'],
      //     types: ['boolean'],
      //     format: ['PascalCase', 'camelCase'],
      //     prefix: ['is', 'should', 'has', 'can', 'did', 'will']
      //   }
      // ]
    }
  }
);
