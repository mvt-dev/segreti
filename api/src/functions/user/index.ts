import { handlerPath } from '../../helpers'

export const userSignup = {
  handler: `${handlerPath(__dirname)}/signup.handler`,
  events: [
    {
      http: {
        method: 'post',
        path: '/user/signup',
        cors: true
      }
    }
  ],
  environment: {
    USER_TABLE: '${self:custom.userTableName}'
  }
}

export const userSignin = {
  handler: `${handlerPath(__dirname)}/signin.handler`,
  events: [
    {
      http: {
        method: 'post',
        path: '/user/signin',
        cors: true
      }
    }
  ],
  environment: {
    USER_TABLE: '${self:custom.userTableName}'
  }
}

export const userToken = {
  handler: `${handlerPath(__dirname)}/token.handler`,
  events: [
    {
      http: {
        method: 'get',
        path: '/user/token',
        cors: true
      }
    }
  ]
}
