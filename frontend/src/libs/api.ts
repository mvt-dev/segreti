import axios from 'axios'
import { useAuthStore } from '@/stores'

const api = axios.create({
  baseURL: import.meta.env.VITE_SEGRETI_API,
  headers: {}
})

api.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (error?.response?.status === 401) {
      useAuthStore.getState().signout()
    }
    return Promise.reject(error)
  }
)

export { api }
