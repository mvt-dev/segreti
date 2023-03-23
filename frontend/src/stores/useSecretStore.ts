import create from 'zustand'
import { StoreStatus, Secret } from '../types'
import { api } from '../helpers'

interface State {
  status: StoreStatus
  secrets: Secret[]
  list: () => Promise<void>
  get: (id: string) => Secret | undefined
  create: (secret: { fields: string[]; values: string[] }) => Promise<void>
  update: (secret: {
    id: string
    fields: string[]
    values: string[]
  }) => Promise<void>
  remove: (id: string) => Promise<void>
}

export const useSecretStore = create<State>((set, get) => ({
  status: StoreStatus.IDLE,
  secrets: [],
  list: async () => {
    if (get().status === StoreStatus.IDLE) {
      set({ status: StoreStatus.LOADING })
      try {
        const { data } = await api.get('secret')
        set({ secrets: data, status: StoreStatus.SUCCESS })
      } catch (error) {
        console.error(error)
        set({ status: StoreStatus.ERROR })
      }
    }
  },
  get: (id) => get().secrets.find((secret) => secret.id === id),
  create: async ({ fields, values }) => {
    const { data } = await api.post('secret', { fields, values })
    set((state) => ({ secrets: [...state.secrets, data] }))
  },
  update: async ({ id, fields, values }) => {
    const { data } = await api.patch(`secret/${id}`, { fields, values })
    set((state) => ({
      secrets: state.secrets.map((secret) => (secret.id === id ? data : secret))
    }))
  },
  remove: async (id) => {
    await api.delete(`secret/${id}`)
    set((state) => ({
      secrets: state.secrets.filter((secret) => secret.id !== id)
    }))
  }
}))

export default useSecretStore
