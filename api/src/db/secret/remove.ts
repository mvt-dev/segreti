import { DeleteCommand } from '@aws-sdk/lib-dynamodb'
import { dynamo } from '../../libs'

export function remove(id: string) {
  return dynamo.send(
    new DeleteCommand({
      TableName: 'secret',
      Key: { id }
    })
  )
}

export default remove
