const knex = require("../../database/connection");

const mailUserQuery = async (email) => {
  const emailValidate = await knex("dateusers").where({ email });
  return emailValidate[0];
};

const nickUserQuery = async (nick_name) => {
  const nickValidate = await knex("dateusers").where({ nick_name });
  return nickValidate[0];
};

const validationTokenQuery = async (code) => {
  const tokenQuery = await "token_confirmation"
    .select("code_token")
    .where({ code_token: code })
    .first();

  return tokenQuery;
};

module.exports = {
  mailUserQuery,
  nickUserQuery,
  validationTokenQuery,
};
