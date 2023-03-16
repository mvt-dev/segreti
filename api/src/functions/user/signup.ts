import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import {
  httpResponse,
  httpRequestData,
  validate,
  validator,
  jwtSign
} from '../../helpers'
import { HttpStatus } from '../../types'
import { getByEmail, create } from '../../db/user'

export async function handler(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  try {
    const data = httpRequestData(event)

    const { error, name, email, password } = validate(data, {
      name: validator.string().required(),
      email: validator.string().email().required(),
      password: validator.string().required()
    })

    if (error) {
      console.warn(error)
      return httpResponse(HttpStatus.BAD_REQUEST, String(error))
    }

    const exists = await getByEmail(email)

    if (exists) {
      console.warn('User already exists')
      return httpResponse(HttpStatus.CONFLICT, 'USER_EXISTS')
    }

    const user = await create({
      name,
      email,
      password
    })

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
