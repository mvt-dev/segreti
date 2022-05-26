import { GetCommand } from '@aws-sdk/lib-dynamodb'
import { dynamo } from '../../libs'

export function get(id: string) {
  return dynamo.send(
    new GetCommand({
      TableName: 'secret',
      Key: {
        id
      }
    })
  )
}

export default get
