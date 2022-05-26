import { APIGatewayProxyEvent } from 'aws-lambda'
import { handler } from './create'
import * as secretDb from '../../db/secret/create'

describe('functions > secret > create', () => {
  let createDbSpy: jest.SpyInstance

  beforeEach(() => {
    createDbSpy = jest.spyOn(secretDb, 'create').mockResolvedValue({
      username: 'username',
      password: 'password'
    } as never)
  })

  test('with valid data', async () => {
    const request = {
      body: JSON.stringify({
        username: 'username',
        password: 'password'
      })
    } as unknown as APIGatewayProxyEvent

    const response = await handler(request)

    expect(createDbSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        username: 'username',
        password: 'password'
      })
    )

    const body = JSON.parse(response.body)

    expect(body.username).toBe('username')
    expect(body.password).toBe('password')
  })

  test('with invalid data', async () => {
    const response = await handler({} as APIGatewayProxyEvent)
    const body = JSON.parse(response.body)

    expect(response.statusCode).toBe(400)
    expect(body.message).toBe('ValidationError: "username" is required')
  })
})
