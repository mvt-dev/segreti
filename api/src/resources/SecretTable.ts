export const SecretTable = {
  Type: 'AWS::DynamoDB::Table',
  Properties: {
    TableName: '${self:custom.secretTableName}',
    AttributeDefinitions: [
      {
        AttributeName: 'id',
        AttributeType: 'S'
      },
      {
        AttributeName: 'user',
        AttributeType: 'S'
      }
    ],
    KeySchema: [
      {
        AttributeName: 'id',
        KeyType: 'HASH'
      },
      {
        AttributeName: 'user',
        KeyType: 'RANGE'
      }
    ],
    BillingMode: 'PAY_PER_REQUEST'
  }
}

export default SecretTable
