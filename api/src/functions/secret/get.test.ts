import { APIGatewayProxyEvent } from 'aws-lambda'
import { handler } from './get'
import * as secretDb from '../../db/secret/get'

describe('functions > secret > get', () => {
  beforeEach(() => {
    jest.spyOn(secretDb, 'get').mockResolvedValue({
      Item: {
        id: 'id',
        username: 'username',
        password: 'password'
      }
    } as never)
  })

  test('with valid data', async () => {
    const request = {
      pathParameters: { id: 'id' }
    } as unknown as APIGatewayProxyEvent

    const response = await handler(request)

    const body = JSON.parse(response.body)

    expect(body.id).toBe('id')
    expect(body.username).toBe('username')
    expect(body.password).toBe('password')
  })

  test('with invalid data', async () => {
    const response = await handler({} as APIGatewayProxyEvent)
    const body = JSON.parse(response.body)

    expect(response.statusCode).toBe(400)
    expect(body.message).toBe('ValidationError: "id" is required')
  })
})
