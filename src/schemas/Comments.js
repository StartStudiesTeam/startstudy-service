const joi = require("joi");

const schemaComments = joi.object({
  user_id: joi.string().empty().min(10).required().messages({
    "any.required": "O campo user_id é obrigatório!",
    "string.empty": "O campo user_id não pode está vazio!",
    "string.base": "O campo user_id precisa ser do tipo String!",
    "string.min": "O campo user_id precisa ter no mínimo 10 caracteres.",
  }),

  video_id: joi.string().min(10).messages({
    "string.base": "O campo id precisa ser do tipo String!",
    "string.min": "O campo id precisa ter no mínimo 10 caracteres.",
  }),

  roadmap_id: joi.string().min(10).messages({
    "string.base": "O campo id precisa ser do tipo String!",
    "string.min": "O campo id precisa ter no mínimo 10 caracteres.",
  }),

  comments: joi.string().empty().max(256).required().messages({
    "any.required": "O campo comments é obrigatório!",
    "string.empty": "O campo comments não pode está vazio!",
    "string.base": "O campo comments precisa ser do tipo String!",
    "string.max": "O campo comments precisa ter no máximo 256 caracteres.",
  }),
});

module.exports = schemaComments;
