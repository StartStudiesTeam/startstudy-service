const joi = require("joi");

const schemaVideos = joi.object({
  id: joi.string().empty().min(10).messages({
    "string.empty": "O id não pode está vazio!",
    "string.base": "O id precisa ser do tipo String!",
    "string.min": "O id precisa ter no mínimo 10 caracteres.",
  }),

  roadmapId: joi.string().empty().min(10).messages({
    "string.empty": "O campo Roadmap Id não pode está vazio!",
    "string.base": "O campo Roadmap Id precisa ser do tipo String!",
    "string.min": "O campo Roadmap Id precisa ter no mínimo 10 caracteres.",
  }),

  title: joi.string().empty().min(4).messages({
    "any.required": "O título é obrigatório!",
    "string.empty": "O título não pode está vazio!",
    "string.base": "O título precisa ser do tipo String!",
    "string.min": "O título precisa ter no mínimo 4 caracteres.",
  }),

  video: joi.string().empty().messages({
    "any.required": "O video é obrigatório!",
    "string.empty": "O video não pode está vazio!",
    "string.base": "O video precisa ser do tipo String!",
  }),

  videoId: joi.string().empty().min(10).messages({
    "string.empty": "O campo Video Id não pode está vazio!",
    "string.base": "O campo Video Id precisa ser do tipo String!",
    "string.min": "O campo Video Id precisa ter no mínimo 10 caracteres.",
  }),

  description: joi.string().empty().messages({
    "string.empty": "A descrição não pode está vazia!",
    "string.base": "A descrição precisa ser do tipo String!",
  }),
});

module.exports = schemaVideos;
