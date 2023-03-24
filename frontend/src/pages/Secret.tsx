import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSecretStore, useNotificationStore } from '../stores'
import { Input, Button } from '../components'

interface SecretData {
  name?: string
  email?: string
  password?: string
}

export function Secret() {
  const [secret, setSecret] = useState<SecretData | undefined>({})
  const { get, create, update, remove } = useSecretStore()
  const navigate = useNavigate()
  const { id } = useParams()
  const { notify } = useNotificationStore()

  useEffect(() => {
    if (id !== 'new') {
      setSecret(get(id as string))
    }
  }, [id])

  function onChange({ name, value }: { name: string; value: string }) {
    setSecret((secret) => ({
      ...secret,
      [name]: value
    }))
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try {
      if (id === 'new') {
        await create({
          name: secret?.name || '',
          fields: ['email', 'password'],
          values: [secret?.email || '', secret?.password || '']
        })
        notify('success', 'Segredo criado com sucesso!')
      } else {
        await update({
          id: id || '',
          name: secret?.name || '',
          fields: ['email', 'password'],
          values: [secret?.email || '', secret?.password || '']
        })
        notify('success', 'Segredo atualizado com sucesso!')
      }
      navigate(-1)
    } catch (error) {
      console.error(error)
      notify('error', 'Não foi possível salvar o segredo. Tente novamente.')
    }
  }

  async function onRemove() {
    try {
      await remove(id as string)
      notify('success', 'Segredo removido com sucesso!')
      navigate(-1)
    } catch (error) {
      console.error(error)
      notify('error', 'Não foi possível remover o segredo. Tente novamente.')
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <h1>Secret</h1>
      <Input
        label="Nome"
        name="name"
        value={secret?.name}
        onChange={onChange}
      />
      <Input
        label="E-mail"
        name="email"
        value={secret?.email}
        onChange={onChange}
      />
      <Input
        label="Password"
        name="password"
        type="password"
        value={secret?.password}
        onChange={onChange}
      />
      <Button label="Confirmar" type="submit" />
      <Button label="Voltar" type="text" to="-1" />
      {id !== 'new' && (
        <Button label="Remover" type="outlined" onClick={onRemove} />
      )}
    </form>
  )
}

export default Secret
