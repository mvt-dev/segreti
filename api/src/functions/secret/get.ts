import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import {
  httpResponse,
  httpRequestData,
  validate,
  validator,
  isAuthorized
} from '../../helpers'
import { HttpStatus, Errors } from '../../types'
import { get } from '../../db/secret'

export async function handler(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  try {
    const user = isAuthorized(event)

    const data = httpRequestData(event)

    const { error, id } = validate(data, {
      id: validator.string().required()
    })

    if (error) {
      console.warn(error)
      return httpResponse(HttpStatus.UNPROCESSABLE, String(error))
    }

    const secret = await get(id, user.id)

    if (!secret) {
      return httpResponse(HttpStatus.NOT_FOUND, 'Secret not found')
    }

    delete secret.user

    return httpResponse(HttpStatus.OK, secret)
  } catch (error) {
    if (error === Errors.UNAUTHORIZED) {
      return httpResponse(HttpStatus.UNAUTHORIZED, Errors.UNAUTHORIZED)
    } else {
      console.error(error)
      return httpResponse(HttpStatus.BAD_REQUEST, Errors.INTERNAL)
    }
  }
}
