import { handlerPath } from '../../libs'

export const userSignup = {
  handler: `${handlerPath(__dirname)}/signup.handler`,
  events: [
    {
      http: {
        method: 'post',
        path: '/user',
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
