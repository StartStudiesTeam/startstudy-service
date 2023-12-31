const joi = require("joi");

const phone_number_brazilian = joi
  .string()
  .regex(/^(?:(\+55|55)?[1-9]{2}9?[6-9][0-9]{3}[0-9]{4})$/);
const phone_number_international = joi
  .string()
  .regex(/^(?:\+[0-9] ?){6,14}[0-9]$/);

const schemaAuth = joi.object({
  name: joi.string().empty().required().messages({
    "any.required": "O campo nome é obrigatório",
    "string.empty": "O campo nome não pode ser nulo",
    "string.base": "O campo nome precisa ser do tipo string",
  }),

  email: joi.string().email().required().messages({
    "any.required": "O campo email é obrigatório",
    "string.empty": "O campo email não pode ser nulo",
    "string.email": "O campo email precisa está em um formato válido",
    "string.base": "O campo email precisa ser do tipo string",
  }),

  password: joi.string().empty().required().messages({
    "any.required": "O campo senha é obrigatório",
    "string.empty": "O campo senha não pode ser nulo",
    "string.base": "O campo senha precisa ser do tipo string",
  }),

  nick_name: joi.string().empty().required().messages({
    "any.required": "O campo nick_name é obrigatório",
    "string.empty": "O campo senha não pode ser nulo",
    "string.base": "O campo senha precisa ser do tipo string",
  }),

  phone_number: joi
    .alternatives()
    .try(phone_number_brazilian, phone_number_international)
    .messages({
      "alternatives.types":
        "O campo telefone precisa está em um formato válido",
      "alternatives.match":
        "O campo telefone precisa está em um formato válido",
    }),
});

module.exports = schemaAuth;
