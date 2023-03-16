import { handlerPath } from '../../helpers'

export const secretList = {
  handler: `${handlerPath(__dirname)}/list.handler`,
  events: [
    {
      http: {
        method: 'get',
        path: '/secret',
        cors: true
      }
    }
  ],
  environment: {
    SECRET_TABLE: '${self:custom.secretTableName}'
  }
}

export const secretGet = {
  handler: `${handlerPath(__dirname)}/get.handler`,
  events: [
    {
      http: {
        method: 'get',
        path: '/secret/{id}',
        cors: true
      }
    }
  ],
  environment: {
    SECRET_TABLE: '${self:custom.secretTableName}'
  }
}

export const secretCreate = {
  handler: `${handlerPath(__dirname)}/create.handler`,
  events: [
    {
      http: {
        method: 'post',
        path: '/secret',
        cors: true
      }
    }
  ],
  environment: {
    SECRET_TABLE: '${self:custom.secretTableName}'
  }
}

export const secretUpdate = {
  handler: `${handlerPath(__dirname)}/update.handler`,
  events: [
    {
      http: {
        method: 'patch',
        path: '/secret/{id}',
        cors: true
      }
    }
  ],
  environment: {
    SECRET_TABLE: '${self:custom.secretTableName}'
  }
}

export const secretRemove = {
  handler: `${handlerPath(__dirname)}/remove.handler`,
  events: [
    {
      http: {
        method: 'delete',
        path: '/secret/{id}',
        cors: true
      }
    }
  ],
  environment: {
    SECRET_TABLE: '${self:custom.secretTableName}'
  }
}
