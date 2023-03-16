import { sign, verify } from 'jsonwebtoken'
import { APIGatewayProxyEvent } from 'aws-lambda'

interface Sign {
  id: string
  name: string
  email: string
}

const SECRET = 'segreti'

export function jwtSign({ id, name, email }: Sign): string {
  return sign(
    {
      id,
      name,
      email
    },
    SECRET,
    { expiresIn: '1d' }
  )
}

export function isAuthorized(event: APIGatewayProxyEvent): Sign {
  try {
    const decoded = verify(event.headers.Authorization, SECRET) as Sign
    return decoded
  } catch (error) {
    console.warn(error)
    throw new Error('UNAUTHORIZED')
  }
}
