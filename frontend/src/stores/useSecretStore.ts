import create from 'zustand'
import { StoreStatus, Secret } from '@/types'
import { api, encrypt, decrypt } from '@/helpers'
import { useAuthStore } from '@/stores'

interface State {
  status: StoreStatus
  secrets: Secret[]
  list: () => Promise<void>
  get: (id: string) => Secret | undefined
  create: (secret: {
    name: string
    fields: string[]
    values: string[]
  }) => Promise<void>
  update: (secret: {
    id: string
    name: string
    fields: string[]
    values: string[]
  }) => Promise<void>
  remove: (id: string) => Promise<void>
}

export const useSecretStore = create<State>((set, get) => ({
  status: StoreStatus.IDLE,
  secrets: [],
  list: async () => {
    const password = useAuthStore.getState().password
    if (get().status === StoreStatus.IDLE && password) {
      set({ status: StoreStatus.LOADING })
      try {
        const { data } = await api.get('secret')
        set({ secrets: data, status: StoreStatus.SUCCESS })
      } catch (error) {
        console.error(error)
        set({ status: StoreStatus.ERROR })
      }
    } else if (!password) {
      useAuthStore.getState().requirePassword()
    }
  },
  get: (id) => {
    const password = useAuthStore.getState().password
    if (!password) {
      useAuthStore.getState().requirePassword()
    } else {
      const secret = get().secrets.find((secret) => secret.id === id)
      for (const prop in secret) {
        if (prop !== 'id' && prop !== 'name') {
          secret[prop as keyof Secret] = decrypt(
            secret[prop as keyof Secret],
            password
          )
        }
      }
      return secret
    }
  },
  create: async ({ name, fields, values }) => {
    const password = useAuthStore.getState().password
    if (!password) {
      useAuthStore.getState().requirePassword()
    } else {
      const { data } = await api.post('secret', {
        name,
        fields,
        values: values.map((value) => encrypt(value, password))
      })
      set((state) => ({ secrets: [...state.secrets, data] }))
    }
  },
  update: async ({ id, name, fields, values }) => {
    const password = useAuthStore.getState().password
    if (!password) {
      useAuthStore.getState().requirePassword()
    } else {
      const { data } = await api.patch(`secret/${id}`, {
        name,
        fields,
        values: values.map((value) => encrypt(value, password))
      })
      set((state) => ({
        secrets: state.secrets.map((secret) =>
          secret.id === id ? data : secret
        )
      }))
    }
  },
  remove: async (id) => {
    const password = useAuthStore.getState().password
    if (!password) {
      useAuthStore.getState().requirePassword()
    } else {
      await api.delete(`secret/${id}`)
      set((state) => ({
        secrets: state.secrets.filter((secret) => secret.id !== id)
      }))
    }
  }
}))

export default useSecretStore
