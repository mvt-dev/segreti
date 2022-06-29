import create from 'zustand'

interface State {
  show: boolean
  type: 'success' | 'warning' | 'error'
  message: string
  notify: (type: 'success' | 'warning' | 'error', message: string) => void
}

export const useNotificationStore = create<State>((set) => ({
  show: false,
  type: 'success',
  message: '',
  notify: (type, message) => {
    set({ show: true, type, message })
    setTimeout(() => set({ show: false }), 5000)
  }
}))

export default useNotificationStore
