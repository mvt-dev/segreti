import type { AWS } from '@serverless/typescript'

import * as functions from './src/functions'
import * as Resources from './src/resources'

const REGION = 'us-east-1'

const serverlessConfiguration: AWS = {
  service: 'segreti-api',
  frameworkVersion: '3',
  plugins: ['serverless-offline', 'serverless-esbuild'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      REGION
    },
    iam: {
      role: {
        statements: [
          {
            Effect: 'Allow',
            Action: [
              'dynamodb:DescribeTable',
              'dynamodb:Query',
              'dynamodb:Scan',
              'dynamodb:GetItem',
              'dynamodb:PutItem',
              'dynamodb:UpdateItem',
              'dynamodb:DeleteItem'
            ],
            Resource: [
              { 'Fn::GetAtt': ['SecretTable', 'Arn'] },
              { 'Fn::GetAtt': ['UserTable', 'Arn'] }
            ]
          }
        ]
      }
    }
  },
  // import the function via paths
  functions,
  resources: { Resources },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10
    }
  }
}

module.exports = serverlessConfiguration
