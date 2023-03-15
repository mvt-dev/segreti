import React, { useState } from 'react'
import { useAuthStore, useNotificationStore } from '@/stores'
import { Input, Button } from '@/components'

interface FormData {
  email?: string
  password?: string
}

export function Signin() {
  const [form, setForm] = useState<FormData | undefined>({})
  const { notify } = useNotificationStore()
  const { signin } = useAuthStore()

  function onChange({ name, value }: { name: string; value: string }) {
    setForm((form) => ({
      ...form,
      [name]: value
    }))
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try {
      await signin({
        email: form?.email || '',
        password: form?.password || ''
      })
      notify('success', 'Usuário entrou com sucesso!')
    } catch (error) {
      console.error(error)
      notify('error', 'Não foi possível se inscrever. Tente novamente.')
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <h1>Entrar</h1>
      <Input
        label="E-mail"
        name="email"
        type="email"
        value={form?.email}
        onChange={onChange}
      />
      <Input
        label="Password"
        name="password"
        type="password"
        value={form?.password}
        onChange={onChange}
      />
      <Button label="Confirmar" type="submit" />
    </form>
  )
}

export default Signin
