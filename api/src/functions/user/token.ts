import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { httpResponse, jwtSign, isAuthorized } from '../../helpers'
import { HttpStatus, Errors } from '../../types'

export async function handler(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  try {
    const user = isAuthorized(event)

    const token = jwtSign({
      id: user.id,
      name: user.name,
      email: user.email
    })

    return httpResponse(HttpStatus.OK, { token })
  } catch (error) {
    console.error(error)
    return httpResponse(HttpStatus.UNAUTHORIZED, Errors.UNAUTHORIZED)
  }
}
