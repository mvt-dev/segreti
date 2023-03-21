import React, { useState } from 'react'
import { useAuthStore, useNotificationStore } from '@/stores'
import { Input, Button } from '@/components'
import { useNavigate } from 'react-router-dom'

interface FormData {
  name?: string
  email?: string
  password?: string
}

export function Signup() {
  const [form, setForm] = useState<FormData | undefined>({})
  const { notify } = useNotificationStore()
  const { signup } = useAuthStore()
  const navigate = useNavigate()

  function onChange({ name, value }: { name: string; value: string }) {
    setForm((form) => ({
      ...form,
      [name]: value
    }))
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try {
      await signup({
        name: form?.name || '',
        email: form?.email || '',
        password: form?.password || ''
      })
      navigate('/secret')
    } catch (error) {
      console.error(error)
      notify('error', 'Não foi possível se inscrever. Tente novamente.')
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <h1>Cadastrar</h1>
      <Input label="Nome" name="name" value={form?.name} onChange={onChange} />
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

export default Signup
