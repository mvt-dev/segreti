import { APIGatewayProxyEvent } from 'aws-lambda'
import { handler } from './update'
import * as secretDb from '../../db/secret/update'

describe('functions > secret > update', () => {
  let updateDbSpy: jest.SpyInstance

  beforeEach(() => {
    updateDbSpy = jest
      .spyOn(secretDb, 'update')
      .mockResolvedValue({
        id: 'id',
        username: 'username',
        password: 'password'
      } as never)
  })

  test('with valid data', async () => {
    const request = {
      pathParameters: { id: 'id' },
      body: JSON.stringify({
        username: 'username',
        password: 'password'
      })
    } as unknown as APIGatewayProxyEvent

    const response = await handler(request)

    expect(updateDbSpy).toHaveBeenCalledWith({
      id: 'id',
      username: 'username',
      password: 'password'
    })

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
