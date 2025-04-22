import { ref } from 'vue'
import { useUserStore } from '@/stores/user.ts'

export function useFetch<T = unknown>(url: string, options: RequestInit = {}) {
  const data = ref<T | null>(null)
  const error = ref<Error | null>(null)
  const loading = ref(true)

  const fetchData = () => {
    const store = useUserStore()
    const token = store.token

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(token ? {Authorization: `Bearer ${token}`} : {}),
      ...options.headers,
    }

    fetch("http://localhost:8000/" + url, {
      ...options,
      headers,
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Erreur ${response.status}: ${response.statusText}`)
        }
        return response.json()
      })
      .then(json => {
        data.value = json
      })
      .catch(err => {
        error.value = err instanceof Error ? err : new Error('Une erreur inconnue est survenue')
        data.value = null
      })
      .finally(() => {
        loading.value = false
      })
  }

  fetchData()

  return {
    data,
    error,
    loading,
  }
}
