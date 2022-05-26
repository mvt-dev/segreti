import { mockClient } from 'aws-sdk-client-mock'
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb'
import list from './list'

describe('db > secret > list', () => {
  test('with valid data', async () => {
    const dynamoMock = mockClient(DynamoDBDocumentClient)

    dynamoMock.on(ScanCommand).resolves({})

    await list()

    expect(dynamoMock.call(0).args[0].input).toEqual({
      TableName: 'secret',
      Limit: 10
    })
  })
})
