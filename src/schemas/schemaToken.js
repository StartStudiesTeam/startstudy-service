const joi = require("joi");

const schemanCodeToken = joi.object({
  email: joi.string().email().empty().messages({
    "string.email": "O campo Email precisa está em um formato válido!",
    "string.empty": "O campo Email não pode está vazio!",
    "string.base": "O campo Email precisa ser do tipo String!",
  }),
  codeToken: joi.string().min(6).empty().required().messages({
    "any.required": "O campo Token é obrigatório!",
    "string.empty": "O campo Token não pode está vazio!",
    "string.base": "O campo Token precisa ser do tipo String!",
    "string.min": "O campo Token precisa ter 6 caracteres.",
  }),
});

module.exports = schemanCodeToken;
