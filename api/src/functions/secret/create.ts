import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import {
  httpResponse,
  httpRequestData,
  validate,
  validator,
  isAuthorized
} from '../../helpers'
import { Errors, HttpStatus } from '../../types'
import { create } from '../../db/secret'

export async function handler(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  try {
    const user = isAuthorized(event)

    const data = httpRequestData(event)

    const { error, name, fields, values } = validate(data, {
      name: validator.string().required(),
      fields: validator.array().items(validator.string()).min(1).required(),
      values: validator.array().items(validator.string()).min(1).required()
    })

    if (error) {
      console.warn(error)
      return httpResponse(HttpStatus.UNPROCESSABLE, String(error))
    }

    const secret = await create({
      user: user.id,
      name,
      ...fields.reduce((acc: unknown, cur: string, index: number) => {
        acc[cur] = values[index]
        return acc
      }, {})
    })

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
