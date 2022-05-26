import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { httpResponse, httpRequestData, validate, validator } from '../../libs'
import { HttpStatus } from '../../types'
import { remove } from '../../db/secret'

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

  await remove(id)

  return httpResponse(HttpStatus.OK, { id })
}
