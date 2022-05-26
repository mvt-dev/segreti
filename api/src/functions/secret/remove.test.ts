import { APIGatewayProxyEvent } from 'aws-lambda'
import { handler } from './remove'
import * as secretDb from '../../db/secret/remove'

describe('functions > secret > remove', () => {
  let removeDbSpy: jest.SpyInstance

  beforeEach(() => {
    removeDbSpy = jest
      .spyOn(secretDb, 'remove')
      .mockResolvedValue({ id: '1' } as never)
  })

  test('with valid data', async () => {
    const request = {
      pathParameters: { id: '1' }
    } as unknown as APIGatewayProxyEvent

    await handler(request)

    expect(removeDbSpy).toHaveBeenCalledWith('1')
  })

  test('with invalid data', async () => {
    const response = await handler({} as APIGatewayProxyEvent)
    const body = JSON.parse(response.body)

    expect(response.statusCode).toBe(400)
    expect(body.message).toBe('ValidationError: "id" is required')
  })
})
