import jwt from 'jsonwebtoken'

interface Sign {
  id: string
  name: string
  email: string
}

export function jwtSign({ id, name, email }: Sign): string {
  return jwt.sign(
    {
      id,
      name,
      email
    },
    'segreti',
    { expiresIn: '1d' }
  )
}
