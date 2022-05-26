import { mockClient } from 'aws-sdk-client-mock'
import { DynamoDBDocumentClient, DeleteCommand } from '@aws-sdk/lib-dynamodb'
import remove from './remove'

describe('db > secret > remove', () => {
  test('with valid data', async () => {
    const dynamoMock = mockClient(DynamoDBDocumentClient)

    dynamoMock.on(DeleteCommand).resolves({})

    await remove('1')

    expect(dynamoMock.call(0).args[0].input).toEqual({
      TableName: 'secret',
      Key: { id: '1' }
    })
  })
})
