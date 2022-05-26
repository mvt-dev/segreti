import { APIGatewayProxyEvent } from 'aws-lambda'
import { HttpStatus } from '../types'

export function httpResponse(statusCode: HttpStatus, body: string | unknown) {
  return {
    statusCode,
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(typeof body === 'string' ? { message: body } : body)
  }
}

export function httpRequestData(event: APIGatewayProxyEvent): unknown {
  return {
    ...(event.body ? JSON.parse(event.body as string) : {}),
    ...event.pathParameters,
    ...event.queryStringParameters
  }
}
