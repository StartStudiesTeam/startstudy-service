const joi = require("joi");

const schemaSave = joi.object({
  id: joi.string().empty().min(10).messages({
    "string.empty": "O campo id não pode está vazio!",
    "string.base": "O campo id precisa ser do tipo String!",
    "string.min": "O campo id precisa ter no mínimo 10 caracteres.",
  }),

  userId: joi.string().empty().min(10).messages({
    "string.empty": "O campo User Id não pode está vazio!",
    "string.base": "O campo User Id precisa ser do tipo String!",
    "string.min": "O campo User Id precisa ter no mínimo 10 caracteres.",
  }),

  videoId: joi.string().empty().min(10).messages({
    "string.base": "O campo Video Id precisa ser do tipo String!",
    "string.min": "O campo Video Id precisa ter no mínimo 10 caracteres.",
    "string.empty": "O campo Video Id não pode está vazio!",
  }),

  roadmapId: joi.string().empty().min(10).messages({
    "string.empty": "O campo Roadmap Id não pode está vazio!",
    "string.base": "O campo Roadmap Id precisa ser do tipo String!",
    "string.min": "O campo Roadmap Id precisa ter no mínimo 10 caracteres.",
  }),
});

module.exports = schemaSave;
