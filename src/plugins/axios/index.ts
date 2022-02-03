import axios, { AxiosInstance } from 'axios'
import initInterceptors from './interceptors'

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    'Content-type': 'application/json'
  }
})
initInterceptors(instance)

export default instance
