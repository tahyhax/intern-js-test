import instance from '@/plugins/axios'
import { AxiosRequestConfig, AxiosResponse } from 'axios'

export const ApiService = {
  get: (url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
    return instance.get(url, config)
  },
  post: (url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
    return instance.post(url, data, config)
  },
  put: (url: string, data: any, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
    return instance.put(url, data, config)
  },
  delete: (url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
    return instance.delete(url, config)
  }
}
