const joi = require("joi");

const schemaRoadmap = joi.object({
  id: joi.string().empty().min(10).messages({
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

  description: joi.string().empty().messages({
    "string.empty": "O campo description não pode está vazio!",
    "string.base": "O campo description precisa ser do tipo String!",
  }),
});

module.exports = schemaRoadmap;
