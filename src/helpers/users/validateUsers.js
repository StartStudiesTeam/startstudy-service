const knex = require('../../database/connection');

const queryEmail = async (email) => {
  const emailValidate = await knex('dateusers').where({ email });
};

const queryNick = async (nick_name) => {
  const nickValidate = await knex('dateusers').where({ nick_name });
};

module.exports = {
  queryEmail,
  queryNick,
};
