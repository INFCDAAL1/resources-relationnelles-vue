import { computed } from 'vue'
import api from '@/lib/axios'
import { useAxios } from '@vueuse/integrations/useAxios'
import type {AxiosRequestConfig} from "axios";

export function useFetch<T = unknown>(url: string, config: AxiosRequestConfig<any> = {} as AxiosRequestConfig<any>, immediate = true) {
  return useAxios<T>(url, config, api, {immediate})
}
