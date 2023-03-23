import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import {
  httpResponse,
  httpRequestData,
  isAuthorized,
  validate,
  validator
} from '../../helpers'
import { HttpStatus, Errors } from '../../types'
import { get } from '../../db/user'

export async function handler(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  try {
    const user = isAuthorized(event)

    const data = httpRequestData(event)

    const { error, password } = validate(data, {
      password: validator.string().required()
    })

    if (error) throw new Error(error)

    const userDb = await get(user.id)

    if (userDb?.password !== password) {
      throw new Error(Errors.INVALID_PASSWORD)
    }

    return httpResponse(HttpStatus.OK, user)
  } catch (error) {
    console.warn(error)
    return httpResponse(HttpStatus.BAD_REQUEST, Errors.INVALID_PASSWORD)
  }
}
