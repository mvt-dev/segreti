import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import {
  httpResponse,
  httpRequestData,
  validate,
  validator,
  isAuthorized
} from '../../helpers'
import { HttpStatus, Errors } from '../../types'
import { remove } from '../../db/secret'

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

    await remove(id, user.id)

    return httpResponse(HttpStatus.OK, { id })
  } catch (error) {
    if (error === Errors.UNAUTHORIZED) {
      return httpResponse(HttpStatus.UNAUTHORIZED, Errors.UNAUTHORIZED)
    } else {
      console.error(error)
      return httpResponse(HttpStatus.BAD_REQUEST, Errors.INTERNAL)
    }
  }
}
