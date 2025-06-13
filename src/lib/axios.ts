import axios from 'axios'
import {useUserStore} from '@/stores/user'

const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'https://rr.qalpuch.cc/api/' : 'https://dev-rr.qalpuch.cc/api/',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
})

// Intercepteur pour ajouter le token à chaque requête
api.interceptors.request.use((config) => {
  const store = useUserStore()
  if (store.token) {
    config.headers.Authorization = `Bearer ${store.token}`
  }
  return config
})

export default api
