const joi = require("joi");

const schemanNewPassword = joi.object({
  email: joi.string().email().empty().messages({
    "string.email": "O campo email precisa está em um formato válido!",
    "string.empty": "O campo email não pode está vazio!",
    "string.base": "O campo email precisa ser do tipo String!",
  }),
  password: joi.string().empty().required().messages({
    "any.required": "O campo Senha é obrigatório!",
    "string.empty": "O campo Senha não pode está vazio!",
    "string.base": "O campo Senha precisa ser do tipo String!",
  }),
});

module.exports = schemanNewPassword;
