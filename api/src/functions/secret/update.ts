import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { httpResponse, httpRequestData, validate, validator } from '../../libs'
import { HttpStatus } from '../../types'
import { update } from '../../db/secret'

export async function handler(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  const data = httpRequestData(event)

  const { error, id, username, password } = validate(data, {
    id: validator.string().required(),
    username: validator.string().required(),
    password: validator.string().required()
  })

  if (error) {
    console.warn(error)
    return httpResponse(HttpStatus.BAD_REQUEST, String(error))
  }

  await update({ id, username, password })

  return httpResponse(HttpStatus.OK, { id, username, password })
}
