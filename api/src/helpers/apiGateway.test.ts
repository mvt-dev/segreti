import { APIGatewayProxyEvent } from 'aws-lambda'
import { httpResponse, httpRequestData } from './apiGateway'

describe('libs > apiGateway', () => {
  test('httpResponse', async () => {
    const success = httpResponse(200, { id: '1' })
    expect(success.statusCode).toBe(200)
    expect(success.body).toBe(JSON.stringify({ id: '1' }))

    const error = httpResponse(400, 'Internal error')
    expect(error.statusCode).toBe(400)
    expect(error.body).toBe(JSON.stringify({ message: 'Internal error' }))
  })

  test('httpRequestData', async () => {
    const event = {
      body: JSON.stringify({ username: 'username', password: 'password' }),
      pathParameters: { id: '1' },
      queryStringParameters: { search: 'search' }
    } as unknown as APIGatewayProxyEvent

    const request = httpRequestData(event) as {
      username: string
      password: string
      id: string
      search: string
    }

    expect(request.username).toBe('username')
    expect(request.password).toBe('password')
    expect(request.id).toBe('1')
    expect(request.search).toBe('search')
  })
})
