const knex = require("../../database/connection");

const mailUserQuery = async (email) => {
  const emailValidate = await knex("dateusers").where({ email });
  return emailValidate[0];
};

const nickUserQuery = async (nick_name) => {
  const nickValidate = await knex("dateusers").where({ nick_name });
  return nickValidate[0];
};

module.exports = {
  mailUserQuery,
  nickUserQuery,
};
