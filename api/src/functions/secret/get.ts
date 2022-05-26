import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { httpResponse, httpRequestData, validate, validator } from '../../libs'
import { HttpStatus } from '../../types'
import { get } from '../../db/secret'

export async function handler(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  const data = httpRequestData(event)

  const { error, id } = validate(data, {
    id: validator.string().required()
  })

  if (error) {
    console.warn(error)
    return httpResponse(HttpStatus.BAD_REQUEST, String(error))
  }

  const secret = await get(id)

  if (!secret.Item) {
    return httpResponse(HttpStatus.NOT_FOUND, 'Secret not found')
  }

  return httpResponse(HttpStatus.OK, secret.Item)
}
