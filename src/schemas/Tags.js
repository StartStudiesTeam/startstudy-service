const joi = require("joi");

const schemaTags = joi.object({
  id: joi.string().empty().min(10).messages({
    "string.empty": "O campo id não pode está vazio!",
    "string.base": "O campo id precisa ser do tipo String!",
    "string.min": "O campo id precisa ter no mínimo 10 caracteres.",
  }),
  roadmapId: joi.string().empty().min(10).messages({
    "string.empty": "O campo Roadmap Id não pode está vazio!",
    "string.base": "O campo Roadmap Id precisa ser do tipo String!",
    "string.min": "O campo Roadmap Id precisa ter no mínimo 10 caracteres.",
  }),

  tag: joi.string().empty().max(50).messages({
    "string.empty": "A Tag não pode está vazia!",
    "string.base": "A Tag precisa ser do tipo String!",
    "string.min": "A Tag precisa ter no máximo 50 caracteres.",
  }),
});

module.exports = schemaTags;
