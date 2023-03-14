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
  ]
}
