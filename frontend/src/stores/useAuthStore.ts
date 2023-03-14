import create from 'zustand'
import CryptoJS from 'crypto-js'
import { StoreStatus } from '@/types'
import { api } from '@/libs'

interface State {
  status: StoreStatus
  isAuthenticated: boolean
  signup: (user: {
    name: string
    email: string
    password: string
  }) => Promise<void>
}

export const useAuthStore = create<State>((set, get) => ({
  status: StoreStatus.IDLE,
  isAuthenticated: false,
  signup: async ({ name, email, password }) => {
    const { data } = await api.post('user', {
      name,
      email,
      password: CryptoJS.SHA256(password).toString()
    })
    console.log(data)
    set((state) => ({ isAuthenticated: true }))
  }
}))

export default useAuthStore
