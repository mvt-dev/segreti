import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import {
  httpResponse,
  httpRequestData,
  validate,
  validator,
  isAuthorized
} from '../../helpers'
import { HttpStatus, Errors } from '../../types'
import { update } from '../../db/secret'

export async function handler(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  try {
    const user = isAuthorized(event)

    const data = httpRequestData(event)

    const { error, id, fields, values } = validate(data, {
      id: validator.string().required(),
      fields: validator.array().items(validator.string()).min(1).required(),
      values: validator.array().items(validator.string()).min(1).required()
    })

    if (error) {
      console.warn(error)
      return httpResponse(HttpStatus.UNPROCESSABLE, String(error))
    }

    const secret = await update({
      id,
      user: user.id,
      ...fields.map((field: string, index: number) => ({
        [field]: values[index]
      }))
    })

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
