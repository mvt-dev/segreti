import { APIGatewayProxyEvent } from 'aws-lambda'
import { handler } from './create'
import * as secretDb from '../../db/secret'
import * as auth from '../../helpers/auth'

describe('functions > secret > create', () => {
  beforeEach(() => {
    jest.spyOn(auth, 'isAuthorized').mockResolvedValue({
      id: 'user'
    } as never)
    jest.spyOn(secretDb, 'create').mockResolvedValue({
      id: 'id',
      user: 'user',
      username: 'username',
      password: 'password'
    } as never)
  })

  test('with valid data', async () => {
    const request = {
      body: JSON.stringify({
        fields: ['username', 'password'],
        values: ['username', 'password']
      })
    } as unknown as APIGatewayProxyEvent

    const response = await handler(request)

    const body = JSON.parse(response.body)

    expect(response.statusCode).toBe(200)
    expect(body.id).toBe('id')
    expect(body.user).toBe('user')
    expect(body.username).toBe('username')
    expect(body.password).toBe('password')
  })

  test('with invalid data', async () => {
    const response = await handler({} as APIGatewayProxyEvent)
    const body = JSON.parse(response.body)

    expect(response.statusCode).toBe(422)
    expect(body.message).toBe('ValidationError: "fields" is required')
  })
})
