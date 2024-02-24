const joi = require("joi");

const regexMail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
const regexSpace = /^\S+$/;

const schemaLogin = joi.object({
  email: joi.string().regex(regexMail).email().empty().messages({
    "any.required": "O campo email é obrigatório!",
    "string.empty": "O campo email não pode está vazio!",
    "string.email": "O campo email precisa está em um formato válido!",
    "string.base": "O campo email precisa ser do tipo String!",
    "string.pattern.base": "O campo email precisa ser minúsculas",
  }),
  nick_name: joi.string().regex(regexSpace).empty().messages({
    "any.required": "O campo nick name é obrigatório!",
    "string.empty": "O campo nick name não pode está vazio!",
    "string.base": "O campo nick name precisa ser do tipo String!",
    "string.pattern.base": "O campo nick name não é permitido espaços",
  }),
  password: joi.string().regex(regexSpace).min(8).empty().required().messages({
    "any.required": "O campo senha é obrigatório!",
    "string.empty": "O campo senha não pode está vazio!",
    "string.base": "O campo senha precisa ser do tipo String!",
    "string.min": "O campo senha precisa ter 8 caracteres.",
    "string.pattern.base": "O campo senha não é permitido espaços",
  }),
});

module.exports = schemaLogin;
