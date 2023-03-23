import { QueryCommand, PutCommand, GetCommand } from '@aws-sdk/lib-dynamodb'
import { v4 as uuidv4 } from 'uuid'
import { dynamo } from '../helpers'

interface User {
  id: string
  name: string
  email: string
  password: string
}

export async function get(id: string): Promise<User | null> {
  const result = await dynamo.send(
    new GetCommand({
      TableName: process.env.USER_TABLE,
      Key: { id }
    })
  )
  return (result?.Item as User) || null
}

export async function getByEmail(email: string): Promise<User | null> {
  const result = await dynamo.send(
    new QueryCommand({
      TableName: process.env.USER_TABLE,
      IndexName: 'email_index',
      KeyConditionExpression: '#email = :v_email',
      ExpressionAttributeNames: { '#email': 'email' },
      ExpressionAttributeValues: { ':v_email': email }
    })
  )
  return result.Count > 0 ? (result.Items[0] as User) : null
}

interface Create {
  name: string
  email: string
  password: string
}

export async function create({ name, email, password }: Create): Promise<User> {
  const id = uuidv4()
  await dynamo.send(
    new PutCommand({
      TableName: process.env.USER_TABLE,
      Item: {
        id,
        name,
        email,
        password
      }
    })
  )
  return {
    id,
    name,
    email,
    password
  }
}
