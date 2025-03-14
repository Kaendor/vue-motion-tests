import globals from 'globals'
import stylistic from '@stylistic/eslint-plugin'
import pluginVue from 'eslint-plugin-vue'
import eslintPluginUnicorn from 'eslint-plugin-unicorn'

/** @type {import('eslint').Linter.Config[]} */
export default [
  stylistic.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  eslintPluginUnicorn.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts,vue}'],
    languageOptions: { globals: globals.browser, parserOptions: { parser: stylistic.parser } },
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      '@stylistic/semi': 'error',
    },
  },
]
