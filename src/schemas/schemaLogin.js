const joi = require("joi");

const schemaLogin = joi.object({
  email: joi.string().email().empty().messages({
    "string.email": "O campo email precisa está em um formato válido",
    "string.empty": "O campo email não pode ser nulo",
    "string.base": "O campo email precisa ser do tipo string",
  }),

  nick_name: joi.string().empty().messages({
    "any.required": "O campo nick_name é obrigatório",
    "string.empty": "O campo senha não pode ser nulo",
    "string.base": "O campo senha precisa ser do tipo string",
  }),

  password: joi.string().empty().required().messages({
    "any.required": "O campo senha é obrigatório",
    "string.empty": "O campo senha não pode ser nulo",
    "string.base": "O campo senha precisa ser do tipo string",
  }),
});

module.exports = schemaLogin;
