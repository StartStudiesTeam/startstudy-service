const joi = require("joi");

const schemaLogin = joi.object({
  email: joi.string().email().empty().messages({
    "string.empty": "O campo nome não pode ser nulo",
    "string.base": "O campo nome precisa ser do tipo string",
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
