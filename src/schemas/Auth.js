const joi = require("joi");

const regexMail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
const regexSpace = /^\S+$/;

const schemaAuth = joi.object({
  id: joi.string().empty().min(10).messages({
    "string.empty": "O campo id não pode está vazio!",
    "string.base": "O campo id precisa ser do tipo String!",
    "string.min": "O campo id precisa ter no mínimo 10 caracteres.",
  }),
  name: joi.string().empty().min(2).required().messages({
    "any.required": "O campo nome é obrigatório!",
    "string.empty": "O campo nome não pode está vazio!",
    "string.base": "O campo nome precisa ser do tipo String!",
    "string.min": "O campo nome precisa ter no mínimo 2 caracteres.",
  }),

  email: joi.string().email().regex(regexMail).required().messages({
    "any.required": "O campo email é obrigatório!",
    "string.empty": "O campo email não pode está vazio!",
    "string.email": "O campo email precisa está em um formato válido!",
    "string.base": "O campo email precisa ser do tipo String!",
    "string.pattern.base": "O campo email precisa ser minúsculas",
  }),

  password: joi.string().regex(regexSpace).min(8).empty().required().messages({
    "any.required": "O campo senha é obrigatório!",
    "string.empty": "O campo senha não pode está vazio!",
    "string.base": "O campo senha precisa ser do tipo String!",
    "string.min": "O campo senha precisa ter 8 caracteres.",
    "string.pattern.base": "O campo senha não é permitido espaços",
  }),

  nick_name: joi.string().regex(regexSpace).empty().required().messages({
    "any.required": "O campo nick name é obrigatório!",
    "string.empty": "O campo nick name não pode está vazio!",
    "string.base": "O campo nick name precisa ser do tipo String!",
    "string.pattern.base": "O campo nick name não é permitido espaços",
  }),

  phone_number: joi.string().empty().messages({
    "any.required": "O campo Telefone é obrigatório!",
    "string.empty": "O campo Telefone não pode está vazio!",
    "string.base": "O campo Telefone precisa ser do tipo String!",
  }),
});

module.exports = schemaAuth;
