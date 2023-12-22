const joi = require('joi');

const schemaAuth = joi.object({
  nome: joi.string().required().messages({
    'any.required': 'O campo nome é obrigatório',
    'string.empty': 'O campo nome não pode ser nulo',
    'string.base': 'O campo nome precisa ser do tipo string',
  }),

  email: joi.string().email().required().messages({
    'any.required': 'O campo email é obrigatório',
    'string.empty': 'O campo email não pode ser nulo',
    'string.email': 'O campo email precisa está em um formato válido',
    'string.base': 'O campo email precisa ser do tipo string',
  }),

  senha: joi.string().required().messages({
    'any.required': 'O campo senha é obrigatório',
    'string.empty': 'O campo senha não pode ser nulo',
    'string.base': 'O campo senha precisa ser do tipo string',
  }),
});
