import { handler } from './list'
import * as secretDb from '../../db/secret/list'

const itemsMock = [
  { id: '1', username: 'username1', password: 'password1' },
  { id: '2', username: 'username2', password: 'password2' }
]

describe('functions > secret > list', () => {
  let listDbSpy: jest.SpyInstance

  beforeEach(() => {
    listDbSpy = jest
      .spyOn(secretDb, 'list')
      .mockResolvedValue({ Items: itemsMock } as never)
  })

  test('with valid data', async () => {
    const response = await handler()
    const body = JSON.parse(response.body)

    expect(listDbSpy).toHaveBeenCalled()
    expect(body).toStrictEqual(itemsMock)
  })
})
