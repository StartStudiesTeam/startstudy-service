const joi = require("joi");

const schemaVideos = joi.object({
  id: joi.string().empty().min(10).required().messages({
    "string.empty": "O campo id não pode está vazio!",
    "string.base": "O campo id precisa ser do tipo String!",
    "string.min": "O campo id precisa ter no mínimo 10 caracteres.",
  }),

  title: joi.string().empty().min(3).required().messages({
    "any.required": "O campo title é obrigatório!",
    "string.empty": "O campo title não pode está vazio!",
    "string.base": "O campo title precisa ser do tipo String!",
    "string.min": "O campo title precisa ter no mínimo 3 caracteres.",
  }),

  video: joi.string().empty().required().messages({
    "any.required": "O campo video é obrigatório!",
    "string.empty": "O campo video não pode está vazio!",
    "string.base": "O campo video precisa ser do tipo String!",
  }),

  description: joi.string().empty().messages({
    "string.empty": "O campo description não pode está vazio!",
    "string.base": "O campo description precisa ser do tipo String!",
  }),
});

module.exports = schemaVideos;
