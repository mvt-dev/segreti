import create from 'zustand'
import CryptoJS from 'crypto-js'
import jwtDecode, { JwtPayload } from 'jwt-decode'
import { StoreStatus } from '@/types'
import { api } from '@/helpers'

const LOCAL_STORAGE_KEY = 'segreti'

interface State {
  status: StoreStatus
  isAuthenticated: boolean
  id: string | null
  name: string | null
  email: string | null
  password: string | null
  init: () => Promise<void>
  signup: (user: {
    name: string
    email: string
    password: string
  }) => Promise<void>
  signin: (user: { email: string; password: string }) => Promise<void>
  signout: () => void
  requirePassword: () => void
  setPassword: (password: string) => Promise<void>
}

interface JwtToken extends JwtPayload {
  id: string
  name: string
  email: string
}

function login({
  token,
  password = null
}: {
  token: string
  password?: string | null
}) {
  api.defaults.headers.common.Authorization = token
  localStorage.setItem(LOCAL_STORAGE_KEY, token)
  const decoded = jwtDecode<JwtToken>(token)
  return {
    isAuthenticated: true,
    id: decoded?.id,
    name: decoded?.name,
    email: decoded?.email,
    password
  }
}

export const useAuthStore = create<State>((set, get) => ({
  status: StoreStatus.IDLE,
  isAuthenticated: false,
  id: null,
  name: null,
  email: null,
  password: null,
  init: async () => {
    try {
      const token = localStorage.getItem(LOCAL_STORAGE_KEY)
      if (token) {
        api.defaults.headers.common.Authorization = token
        const { data } = await api.get('user/token')
        const newState = login({ token: data.token })
        set({ ...newState, password: 'REQUIRED' })
      }
      set({ status: StoreStatus.SUCCESS })
    } catch (error) {
      console.error(error)
      set({ status: StoreStatus.ERROR })
    }
  },
  signup: async ({ name, email, password }) => {
    const { data } = await api.post('user/signup', {
      name,
      email,
      password: CryptoJS.SHA3(password).toString()
    })
    set(login({ token: data.token, password }))
  },
  signin: async ({ email, password }) => {
    const { data } = await api.post('user/signin', {
      email,
      password: CryptoJS.SHA3(password).toString()
    })
    set(login({ token: data.token, password }))
  },
  signout: () => {
    api.defaults.headers.common.Authorization = ''
    localStorage.removeItem(LOCAL_STORAGE_KEY)
    set({
      isAuthenticated: false,
      id: null,
      name: null,
      email: null,
      password: null
    })
  },
  requirePassword: () => {
    set({ password: 'REQUIRED' })
  },
  setPassword: async (password) => {
    await api.post('user/password', {
      password: CryptoJS.SHA3(password).toString()
    })
    set({ password })
  }
}))

export default useAuthStore
