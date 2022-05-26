import { mockClient } from 'aws-sdk-client-mock'
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb'
import get from './get'

describe('db > secret > get', () => {
  test('with valid data', async () => {
    const dynamoMock = mockClient(DynamoDBDocumentClient)

    dynamoMock.on(GetCommand).resolves({})

    await get('id')

    expect(dynamoMock.call(0).args[0].input).toEqual({
      TableName: 'secret',
      Key: { id: 'id' }
    })
  })
})
