import { APIGatewayProxyResult } from 'aws-lambda'
import { httpResponse } from '../../libs'
import { HttpStatus } from '../../types'
import { list } from '../../db/secret'

export async function handler(): Promise<APIGatewayProxyResult> {
  const secrets = await list()

  return httpResponse(HttpStatus.OK, secrets?.Items || [])
}
