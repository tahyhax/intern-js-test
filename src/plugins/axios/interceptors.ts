import { AxiosInstance, AxiosResponse } from 'axios'

function transformResponse (response:AxiosResponse) {
  return response.data
}

export default function (axios:AxiosInstance) {
  axios.interceptors.response.use(transformResponse)
}
