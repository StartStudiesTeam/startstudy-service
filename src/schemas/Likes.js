const joi = require("joi");

const schemaLikes = joi.object({
  id: joi.string().empty().min(10).messages({
    "string.empty": "O id não pode está vazio!",
    "string.base": "O id precisa ser do tipo String!",
    "string.min": "O id precisa ter no mínimo 10 caracteres.",
  }),
  userId: joi.string().empty().min(10).messages({
    "string.empty": "O User Id não pode está vazio!",
    "string.base": "O User Id precisa ser do tipo String!",
    "string.min": "O User Id precisa ter no mínimo 10 caracteres.",
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
});

module.exports = schemaLikes;
