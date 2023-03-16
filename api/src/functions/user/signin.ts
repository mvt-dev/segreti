import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import {
  httpResponse,
  httpRequestData,
  validate,
  validator,
  jwtSign
} from '../../helpers'
import { HttpStatus } from '../../types'
import { getByEmail } from '../../db/user'

export async function handler(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  try {
    const data = httpRequestData(event)

    const { error, email, password } = validate(data, {
      email: validator.string().email().required(),
      password: validator.string().required()
    })

    if (error) {
      console.warn(error)
      return httpResponse(HttpStatus.BAD_REQUEST, String(error))
    }

    const user = await getByEmail(email)

    if (!user) {
      console.warn('User not found')
      return httpResponse(HttpStatus.UNAUTHORIZED, 'INVALID_EMAIL_PASS')
    }

    if (user.password !== password) {
      console.warn('Invalid password')
      return httpResponse(HttpStatus.UNAUTHORIZED, 'INVALID_EMAIL_PASS')
    }

    const token = jwtSign({
      id: user.id,
      name: user.name,
      email: user.email
    })

    return httpResponse(HttpStatus.OK, { token })
  } catch (error) {
    console.error(error)
    return httpResponse(HttpStatus.BAD_REQUEST, String(error))
  }
}
