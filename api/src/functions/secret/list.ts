import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { httpResponse, isAuthorized } from '../../helpers'
import { HttpStatus, Errors } from '../../types'
import { list } from '../../db/secret'

export async function handler(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  try {
    const user = isAuthorized(event)

    const secrets = await list(user.id)

    return httpResponse(HttpStatus.OK, secrets)
  } catch (error) {
    if (error === Errors.UNAUTHORIZED) {
      return httpResponse(HttpStatus.UNAUTHORIZED, Errors.UNAUTHORIZED)
    } else {
      console.error(error)
      return httpResponse(HttpStatus.BAD_REQUEST, Errors.INTERNAL)
    }
  }
}
