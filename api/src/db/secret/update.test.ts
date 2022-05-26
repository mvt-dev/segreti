import { mockClient } from 'aws-sdk-client-mock'
import { DynamoDBDocumentClient, UpdateCommand } from '@aws-sdk/lib-dynamodb'
import update from './update'

describe('db > secret > update', () => {
  test('with valid data', async () => {
    const dynamoMock = mockClient(DynamoDBDocumentClient)

    dynamoMock.on(UpdateCommand).resolves({})

    await update({ id: 'id', username: 'username', password: 'password' })

    expect(dynamoMock.call(0).args[0].input).toEqual({
      TableName: 'secret',
      Key: { id: 'id' },
      UpdateExpression: 'set username = :username, password = :password',
      ExpressionAttributeValues: {
        ':username': 'username',
        ':password': 'password'
      }
    })
  })
})
