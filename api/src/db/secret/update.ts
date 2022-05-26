import { UpdateCommand } from '@aws-sdk/lib-dynamodb'
import { dynamo } from '../../libs'

interface SecretUpdate {
  id: string
  username: string
  password: string
}

export function update({ id, username, password }: SecretUpdate) {
  return dynamo.send(
    new UpdateCommand({
      TableName: 'secret',
      Key: { id },
      UpdateExpression: 'set username = :username, password = :password',
      ExpressionAttributeValues: {
        ':username': username,
        ':password': password
      }
    })
  )
}

export default update
