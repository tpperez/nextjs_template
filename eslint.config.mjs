import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import eslintPluginPreferArrowFunctions from 'eslint-plugin-prefer-arrow-functions'
import eslintPluginReact from 'eslint-plugin-react'
import eslintPluginPrettier from 'eslint-plugin-prettier'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'plugin:jsx-a11y/recommended',
    'prettier',
  ),

  {
    plugins: {
      'eslint-plugin-prefer-arrow-functions': eslintPluginPreferArrowFunctions,
      'eslint-plugin-react': eslintPluginReact,
      'eslint-plugin-prettier': eslintPluginPrettier,
    },
    rules: {
      'eslint-plugin-prettier/prettier': ['error'],
      'arrow-body-style': ['error', 'always'],
      'arrow-parens': ['error', 'always'],
      '@typescript-eslint/no-explicit-any': 'error',
      'eslint-plugin-prefer-arrow-functions/prefer-arrow-functions': [
        'warn',
        {
          returnStyle: 'explicit',
        },
      ],
      'eslint-plugin-react/jsx-wrap-multilines': [
        'warn',
        {
          declaration: 'parens-new-line',
          assignment: 'parens-new-line',
          return: 'parens-new-line',
          arrow: 'parens-new-line',
          condition: 'parens-new-line',
          logical: 'parens-new-line',
          prop: 'parens-new-line',
        },
      ],
    },
  },
]

export default eslintConfig
