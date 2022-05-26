import { validator, validate } from './validator'

describe('libs > validator', () => {
  test('validate', async () => {
    const data = {
      id: 'id',
      username: 'username',
      password: 'password'
    }

    const { error, id, username, password } = validate(data, {
      id: validator.string().required(),
      username: validator.string().required(),
      password: validator.string().required()
    })

    expect(error).toBe(undefined)
    expect(id).toBe('id')
    expect(username).toBe('username')
    expect(password).toBe('password')
  })
})
