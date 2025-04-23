/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'
import { registerDirectives } from '@/directives'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
import axios from 'axios';
import { useUserStore } from '@/stores/user.ts'

axios.defaults.baseURL = 'http://localhost:8000/api/';
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.interceptors.request.use(config => {
  const store = useUserStore()
  const token = store.token
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});


const app = createApp(App)

registerPlugins(app)
registerDirectives(app)

app.mount('#app')
