const joi = require("joi");

const schemaRefresh = joi.object({
  refresh_token: joi.string().empty().min(10).messages({
    "string.empty": "O Refresh Token não pode está vazio!",
    "string.base": "O Refresh Token precisa ser do tipo String!",
    "string.min": "O Refresh Token precisa ter no mínimo 10 caracteres.",
  }),
});

module.exports = schemaRefresh;
