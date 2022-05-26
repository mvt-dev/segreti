export const SecretTable = {
  Type: 'AWS::DynamoDB::Table',
  Properties: {
    TableName: 'secret',
    AttributeDefinitions: [
      {
        AttributeName: 'id',
        AttributeType: 'S'
      }
    ],
    KeySchema: [
      {
        AttributeName: 'id',
        KeyType: 'HASH'
      }
    ],
    BillingMode: 'PAY_PER_REQUEST'
  }
}

export default SecretTable
