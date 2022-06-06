import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSecretStore } from '../stores'

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

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSecret((secret) => ({
      ...secret,
      [e.target.name]: e.target.value
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

  function onGoBack() {
    navigate(-1)
  }

  return (
    <form onSubmit={onSubmit}>
      <h1>Secret</h1>
      <input
        type="text"
        name="username"
        placeholder="username"
        onChange={onChange}
        defaultValue={secret?.username}
      />
      <input
        type="password"
        name="password"
        placeholder="password"
        onChange={onChange}
        defaultValue={secret?.password}
      />
      <button type="submit">Confirmar</button>
      {id !== 'new' && (
        <button type="button" onClick={onRemove}>
          Remover
        </button>
      )}
      <button type="button" onClick={onGoBack}>
        Voltar
      </button>
    </form>
  )
}

export default Secret
