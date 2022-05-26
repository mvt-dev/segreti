import { handlerPath } from './handler'

describe('libs > handler', () => {
  test('handlerPath', async () => {
    const path = handlerPath(__dirname)
    expect(path).toBe('src/libs')
  })
})
