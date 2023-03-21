import create from 'zustand'
import CryptoJS from 'crypto-js'
import jwtDecode, { JwtPayload } from 'jwt-decode'
import { StoreStatus } from '@/types'
import { api } from '@/libs'

interface State {
  status: StoreStatus
  isAuthenticated: boolean
  id: string | null
  name: string | null
  email: string | null
  password: string | null
  signup: (user: {
    name: string
    email: string
    password: string
  }) => Promise<void>
  signin: (user: { email: string; password: string }) => Promise<void>
}

interface JwtToken extends JwtPayload {
  id: string
  name: string
  email: string
}

function login({ token, password }: { token: string; password: string }) {
  api.defaults.headers.common.Authorization = token
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
  status: StoreStatus.SUCCESS,
  isAuthenticated: false,
  id: null,
  name: null,
  email: null,
  password: null,
  signup: async ({ name, email, password }) => {
    const { data } = await api.post('user/signup', {
      name,
      email,
      password: CryptoJS.SHA3(password).toString()
    })
    set((state) => login({ token: data.token, password }))
  },
  signin: async ({ email, password }) => {
    const { data } = await api.post('user/signin', {
      email,
      password: CryptoJS.SHA3(password).toString()
    })
    set((state) => login({ token: data.token, password }))
  }
}))

export default useAuthStore
