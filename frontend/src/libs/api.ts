import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_SEGRETI_API,
  headers: {}
})

export { api }
