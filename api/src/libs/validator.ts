import Joi from 'joi'

const validator = Joi

function validate(obj: unknown, schema: any) {
  const { error, value } = validator.object().keys(schema).validate(obj)
  return {
    error,
    ...value
  }
}

export { validator, validate }
