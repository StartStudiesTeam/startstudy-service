const joi = require("joi");

const schemaMailUser = joi.object({
  email: joi.string().email().empty().messages({
    "string.email": "O campo email precisa está em um formato válido",
    "string.empty": "O campo email não pode ser nulo",
    "string.base": "O campo email precisa ser do tipo string",
  }),
  codeToken: joi.string().empty().min(6).max(6).messages({
    "string.empty": "O campo token não pode ser nulo",
    "string.base": "O campo token precisa ser do formato string",
    "string.min": "O campo token precisa ser 6 digitos",
    "string.max": "O campo token precisa ser 6 digitos",
  }),
});

module.exports = schemaMailUser;
