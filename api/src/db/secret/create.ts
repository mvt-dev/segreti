import { PutCommand } from '@aws-sdk/lib-dynamodb'
import { dynamo } from '../../libs'

interface SecretCreate {
  id: string
  username: string
  password: string
}

export function create({ id, username, password }: SecretCreate) {
  return dynamo.send(
    new PutCommand({
      TableName: 'secret',
      Item: {
        id,
        username,
        password
      }
    })
  )
}

export default create
