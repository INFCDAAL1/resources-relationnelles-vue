import vue from 'eslint-plugin-vue';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import vuetify from 'eslint-plugin-vuetify';
import vueParser from 'vue-eslint-parser';

export default [
  {
    ignores: ['**/dist', '**/coverage', '**/android/**', '**/*.d.ts'],
  },
  ...tseslint.configs.recommended,
  ...vue.configs['flat/recommended'],
  ...vuetify.configs['flat/base'],
  {
    files: ['**/*.{ts,vue}'],
    languageOptions: {
      parser: vueParser, // 👈 nécessaire pour .vue
      parserOptions: {
        parser: tseslint.parser, // 👈 utilisé à l’intérieur de <script lang="ts">
        project: './tsconfig.app.json',
        extraFileExtensions: ['.vue'],
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: globals.browser,
    },
    plugins: {
      vue,
      '@typescript-eslint': tseslint.plugin,
      vuetify,
    },
    rules: {
      // Exemple de règles personnalisées :
      'vue/script-indent': 'off',
      'vuetify/no-deprecated-props': 'warn',
      'vue/multi-word-component-names': 'off',
      'vue/no-v-html': 'warn',
      'vue/no-unused-vars': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
];
