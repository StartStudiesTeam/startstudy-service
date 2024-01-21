const joi = require("joi");

const schemaMailCheck = joi.object({
  email: joi.string().email().empty().messages({
    "string.email": "O campo email precisa está em um formato válido",
    "string.empty": "O campo email não pode ser nulo",
    "string.base": "O campo email precisa ser do tipo string",
  }),
});

module.exports = schemaMailCheck;
