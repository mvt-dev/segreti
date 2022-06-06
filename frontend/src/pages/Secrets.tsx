import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSecretStore } from '../stores'

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
      <table>
        <tr>
          <th>#ID</th>
          <th>Username</th>
          <th>Password</th>
          <th>Ações</th>
        </tr>
        {secrets.map((secret) => (
          <tr key={secret.id}>
            <td>{secret.id}</td>
            <td>{secret.username}</td>
            <td>{secret.password}</td>
            <td>
              <button
                type="button"
                onClick={() => navigate(`/secret/${secret.id}`)}>
                Editar
              </button>
            </td>
          </tr>
        ))}
      </table>
    </section>
  )
}

export default Secrets
