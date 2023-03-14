import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { v4 as uuidv4 } from 'uuid'
import { QueryCommand, PutCommand } from '@aws-sdk/lib-dynamodb'
import {
  httpResponse,
  httpRequestData,
  validate,
  validator,
  dynamo
} from '../../libs'
import { HttpStatus } from '../../types'

const TABLE = 'user'

export async function handler(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  try {
    const data = httpRequestData(event)

    const { error, name, email, password } = validate(data, {
      name: validator.string().required(),
      email: validator.string().email().required(),
      password: validator.string().required()
    })

    if (error) {
      console.warn(error)
      return httpResponse(HttpStatus.BAD_REQUEST, String(error))
    }

    const users = await dynamo.send(
      new QueryCommand({
        TableName: TABLE,
        IndexName: 'email_index',
        KeyConditionExpression: '#email = :v_email',
        ExpressionAttributeNames: { '#email': 'email' },
        ExpressionAttributeValues: { ':v_email': email }
      })
    )

    if (users?.Count > 0) {
      console.warn('User already exists')
      return httpResponse(HttpStatus.CONFLICT, 'USER_EXISTS')
    }

    const id = uuidv4()

    await dynamo.send(
      new PutCommand({
        TableName: TABLE,
        Item: {
          id,
          name,
          email,
          password
        }
      })
    )

    return httpResponse(HttpStatus.OK, { id, name, email })
  } catch (error) {
    console.error(error)
    return httpResponse(HttpStatus.BAD_REQUEST, String(error))
  }
}
