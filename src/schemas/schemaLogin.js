const joi = require("joi");

const schemaLogin = joi.object({
  email: joi.string().email().empty().messages({
    "string.email": "O campo Email precisa está em um formato válido!",
    "string.empty": "O campo Email não pode está vazio!",
    "string.base": "O campo Email precisa ser do tipo String!",
  }),

  nick_name: joi.string().empty().messages({
    "any.required": "O campo Nick Name é obrigatório!",
    "string.empty": "O campo Nick Name não pode está vazio!",
    "string.base": "O campo Nick Name precisa ser do tipo String!",
  }),

  password: joi.string().min(8).empty().required().messages({
    "any.required": "O campo Senha é obrigatório!",
    "string.empty": "O campo Senha não pode está vazio!",
    "string.base": "O campo Senha precisa ser do tipo String!",
    "string.min": "O campo Senha precisa ter 8 caracteres.",
  }),
});

module.exports = schemaLogin;
