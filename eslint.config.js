import vuetify from 'eslint-config-vuetify/index.ts.mjs';
import eslintPluginVue from 'eslint-plugin-vue';

export default [
  vuetify,
  {
    plugins: {
      vue: eslintPluginVue,
    },
    rules: {
      'vue/script-indent': 'off',
    },
  },
];