import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSecretStore } from '../stores'
import { Item } from '../components'

export function Secrets() {
  const { secrets, list } = useSecretStore()
  const navigate = useNavigate()

  list()

  return (
    <section>
      <h1>Secrets</h1>
      <button type="button" onClick={() => navigate('/secret/new')}>
        Novo
      </button>
      {secrets.map((secret) => (
        <Item
          key={secret.username}
          username={secret.username}
          onEdit={() => navigate(`/secret/${secret.id}`)}
        />
      ))}
    </section>
  )
}

export default Secrets
