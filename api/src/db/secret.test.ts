import { mockClient } from 'aws-sdk-client-mock'
import {
  DynamoDBDocumentClient,
  QueryCommand,
  GetCommand,
  PutCommand,
  UpdateCommand,
  DeleteCommand
} from '@aws-sdk/lib-dynamodb'
import { list, get, create, update, remove } from './secret'

describe('db > secret', () => {
  const dynamoMock = mockClient(DynamoDBDocumentClient)

  beforeEach(() => {
    process.env.SECRET_TABLE = 'secret'
    dynamoMock.reset()
  })

  test('list', async () => {
    dynamoMock.on(QueryCommand).resolves({})

    await list('user')

    expect(dynamoMock.call(0).args[0].input).toEqual({
      TableName: 'secret',
      IndexName: 'user_index',
      KeyConditionExpression: '#user = :v_user',
      ExpressionAttributeNames: { '#user': 'user' },
      ExpressionAttributeValues: { ':v_user': 'user' }
    })
  })

  test('get', async () => {
    dynamoMock.on(GetCommand).resolves({})

    await get('id', 'user')

    expect(dynamoMock.call(0).args[0].input).toEqual({
      TableName: 'secret',
      Key: { id: 'id', user: 'user' }
    })
  })

  test('create', async () => {
    dynamoMock.on(PutCommand).resolves({})

    const secret = await create({
      user: 'user',
      username: 'username',
      password: 'password'
    })

    expect(dynamoMock.call(0).args[0].input).toEqual({
      TableName: 'secret',
      Item: {
        id: secret.id,
        user: 'user',
        username: 'username',
        password: 'password'
      }
    })
  })

  test('update', async () => {
    dynamoMock.on(UpdateCommand).resolves({})

    await update({
      id: 'id',
      user: 'user',
      username: 'username',
      password: 'password'
    })

    expect(dynamoMock.call(0).args[0].input).toEqual({
      TableName: 'secret',
      Key: { id: 'id', user: 'user' },
      UpdateExpression: 'set username = :username, password = :password',
      ExpressionAttributeValues: {
        ':username': 'username',
        ':password': 'password'
      }
    })
  })

  test('remove', async () => {
    dynamoMock.on(DeleteCommand).resolves({})

    await remove('id', 'user')

    expect(dynamoMock.call(0).args[0].input).toEqual({
      TableName: 'secret',
      Key: { id: 'id', user: 'user' }
    })
  })
})
