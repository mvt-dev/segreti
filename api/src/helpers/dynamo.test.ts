import { mockClient } from 'aws-sdk-client-mock'
import { QueryCommand } from '@aws-sdk/lib-dynamodb'
import { dynamo } from './dynamo'

describe('libs > dynamo', () => {
  beforeEach(() => {
    process.env.REGION = 'us-east-1'
  })

  test('DynamoDBDocumentClient', async () => {
    const dynamoMock = mockClient(dynamo)

    dynamoMock.on(QueryCommand).resolves({})

    dynamo.send(
      new QueryCommand({
        TableName: 'secret'
      })
    )

    expect(dynamoMock.call(0).args[0].input).toEqual({
      TableName: 'secret'
    })
  })
})
