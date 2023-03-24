import {
  QueryCommand,
  GetCommand,
  PutCommand,
  UpdateCommand,
  DeleteCommand
} from '@aws-sdk/lib-dynamodb'
import { v4 as uuidv4 } from 'uuid'
import { dynamo } from '../helpers'

interface Secret {
  id?: string
  user: string
  name: string
  [x: string]: string
}

export async function list(user: string): Promise<Secret[]> {
  const result = await dynamo.send(
    new QueryCommand({
      TableName: process.env.SECRET_TABLE,
      IndexName: 'user_index',
      KeyConditionExpression: '#user = :v_user',
      ExpressionAttributeNames: { '#user': 'user' },
      ExpressionAttributeValues: { ':v_user': user }
    })
  )
  return result.Count > 0 ? (result.Items as Secret[]) : []
}

export async function get(id: string, user: string): Promise<Secret | null> {
  const result = await dynamo.send(
    new GetCommand({
      TableName: process.env.SECRET_TABLE,
      Key: {
        id,
        user
      }
    })
  )
  return (result?.Item as Secret) || null
}

export async function create(secret: Secret): Promise<Secret> {
  const id = uuidv4()
  await dynamo.send(
    new PutCommand({
      TableName: process.env.SECRET_TABLE,
      Item: {
        ...secret,
        id
      }
    })
  )
  return {
    ...secret,
    id
  }
}

export async function update(secret: Secret): Promise<Secret> {
  await dynamo.send(
    new UpdateCommand({
      TableName: process.env.SECRET_TABLE,
      Key: { id: secret.id, user: secret.user },
      UpdateExpression:
        'set ' +
        Object.keys(secret)
          .filter((key) => key !== 'id' && key !== 'user')
          .map((key) => `${key} = :${key}`)
          .join(', '),
      ExpressionAttributeValues: Object.keys(secret)
        .filter((key) => key !== 'id' && key !== 'user')
        .reduce((acc, key) => {
          acc[`:${key}`] = secret[key]
          return acc
        }, {})
    })
  )
  return secret
}

export async function remove(id: string, user: string): Promise<string> {
  await dynamo.send(
    new DeleteCommand({
      TableName: process.env.SECRET_TABLE,
      Key: { id, user }
    })
  )
  return id
}
