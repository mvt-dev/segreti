import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSecretStore } from '../stores'
import { Input, Button } from '../components'

interface SecretData {
  username?: string
  password?: string
}

export function Secret() {
  const [secret, setSecret] = useState<SecretData | undefined>({})
  const { get, create, update, remove } = useSecretStore()
  const navigate = useNavigate()
  const { id } = useParams()

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
          username: secret?.username || '',
          password: secret?.password || ''
        })
      } else {
        await update({
          id: id || '',
          username: secret?.username || '',
          password: secret?.password || ''
        })
      }
      navigate(-1)
    } catch (error) {
      console.error(error)
    }
  }

  async function onRemove() {
    try {
      await remove(id as string)
      navigate(-1)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <h1>Secret</h1>
      <Input
        label="Username"
        name="username"
        value={secret?.username}
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
