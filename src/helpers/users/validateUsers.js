const knex = require("../../database/connection");

const queryEmail = async (email) => {
  const emailValidate = await knex("dateusers").where({ email });
  return emailValidate[0];
};

const queryNick = async (nick_name) => {
  const nickValidate = await knex("dateusers").where({ nick_name });
  return nickValidate[0];
};

module.exports = {
  queryEmail,
  queryNick,
};
