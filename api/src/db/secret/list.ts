import { ScanCommand } from '@aws-sdk/lib-dynamodb'
import { dynamo } from '../../libs'

export function list() {
  return dynamo.send(
    new ScanCommand({
      TableName: 'secret',
      Limit: 10
    })
  )
}

export default list
