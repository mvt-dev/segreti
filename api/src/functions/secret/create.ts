import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { v4 as uuidv4 } from 'uuid'
import { httpResponse, httpRequestData, validate, validator } from '../../libs'
import { HttpStatus } from '../../types'
import { create } from '../../db/secret'

export async function handler(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  const data = httpRequestData(event)

  const { error, username, password } = validate(data, {
    username: validator.string().required(),
    password: validator.string().required()
  })

  if (error) {
    console.warn(error)
    return httpResponse(HttpStatus.BAD_REQUEST, String(error))
  }

  const id = uuidv4()

  await create({ id, username, password })

  return httpResponse(HttpStatus.OK, { id, username, password })
}
