const joi = require("joi");

const schemaAuth = joi.object({
  name: joi.string().empty().required().messages({
    "any.required": "O campo Nome é obrigatório!",
    "string.empty": "O campo Nome não pode está vazio!",
    "string.base": "O campo Nome precisa ser do tipo String!",
  }),

  email: joi.string().email().required().messages({
    "any.required": "O campo Email é obrigatório!",
    "string.empty": "O campo Email não pode está vazio!",
    "string.email": "O campo Email precisa está em um formato válido!",
    "string.base": "O campo Email precisa ser do tipo String!",
  }),

  password: joi.string().min(8).empty().required().messages({
    "any.required": "O campo Senha é obrigatório!",
    "string.empty": "O campo Senha não pode está vazio!",
    "string.base": "O campo Senha precisa ser do tipo String!",
    "string.min": "O campo Senha precisa ter 8 caracteres.",
  }),

  nick_name: joi.string().empty().required().messages({
    "any.required": "O campo Nick Name é obrigatório!",
    "string.empty": "O campo Nick Name não pode está vazio!",
    "string.base": "O campo Nick Name precisa ser do tipo String!",
  }),

  phone_number: joi.string().empty().messages({
    "any.required": "O campo Phone Number é obrigatório!",
    "string.empty": "O campo Phone Number não pode está vazio!",
    "string.base": "O campo Phone Number precisa ser do tipo String!",
  }),
});

module.exports = schemaAuth;
