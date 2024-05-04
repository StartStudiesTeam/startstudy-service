const joi = require("joi");

const regexMail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

const schemaComments = joi.object({
  id: joi.string().empty().min(10).messages({
    "string.empty": "O id não pode está vazio!",
    "string.base": "O id precisa ser do tipo String!",
    "string.min": "O id precisa ter no mínimo 10 caracteres.",
  }),

  email: joi.string().email().regex(regexMail).messages({
    "string.empty": "O email não pode está vazio!",
    "string.email": "O email precisa está em um formato válido!",
    "string.base": "O email precisa ser do tipo String!",
    "string.pattern.base": "O email precisa ser letras minúsculas",
  }),

  videoId: joi.string().empty().min(10).messages({
    "string.base": "O Video Id precisa ser do tipo String!",
    "string.min": "O Video Id precisa ter no mínimo 10 caracteres.",
    "string.empty": "O Video Id não pode está vazio!",
  }),

  roadmapId: joi.string().empty().min(10).messages({
    "string.empty": "O Roadmap Id não pode está vazio!",
    "string.base": "O Roadmap Id precisa ser do tipo String!",
    "string.min": "O Roadmap Id precisa ter no mínimo 10 caracteres.",
  }),

  comments: joi.string().empty().max(256).messages({
    "string.empty": "O comentário não pode está vazio!",
    "string.base": "O comentário precisa ser do tipo String!",
    "string.max": "O comentário precisa ter no máximo 256 caracteres.",
  }),
});

module.exports = schemaComments;
