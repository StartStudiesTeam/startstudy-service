const joi = require("joi");

const regexMail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

const schemaMailCheck = joi.object({
  email: joi.string().regex(regexMail).email().required().messages({
    "any.required": "O campo email é obrigatório!",
    "string.empty": "O campo email não pode está vazio!",
    "string.email": "O campo email precisa está em um formato válido!",
    "string.base": "O campo email precisa ser do tipo String!",
    "string.pattern.base": "O campo email precisa ser minúsculas",
  }),
});

module.exports = schemaMailCheck;
