import { mockClient } from 'aws-sdk-client-mock'
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb'
import create from './create'

describe('db > secret > create', () => {
  test('with valid data', async () => {
    const dynamoMock = mockClient(DynamoDBDocumentClient)

    dynamoMock.on(PutCommand).resolves({})

    await create({ id: 'id', username: 'username', password: 'password' })

    expect(dynamoMock.call(0).args[0].input).toEqual({
      TableName: 'secret',
      Item: { id: 'id', username: 'username', password: 'password' }
    })
  })
})
