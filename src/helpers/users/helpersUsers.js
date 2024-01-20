const knex = require("../../database/connection");

const mailUserQuery = async (email) => {
  const emailValidate = await knex("dateusers").where({ email });
  return emailValidate[0];
};

const nickUserQuery = async (nick_name) => {
  const nickValidate = await knex("dateusers").where({ nick_name });
  return nickValidate[0];
};

const validationCodeTokenDatabaseQuery = async (email, code) => {
  const tokenQuery = await knex("dateusers")
    .innerJoin(
      "token_confirmation",
      "dateusers.id",
      "=",
      "token_confirmation.user_id"
    )
    .where({ email, code_token: code });

  return tokenQuery;
};

module.exports = {
  mailUserQuery,
  nickUserQuery,
  validationCodeTokenDatabaseQuery,
};
