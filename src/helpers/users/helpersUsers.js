const knex = require("../../database/connection");
const { currentTime } = require("../helpersData/data");

const getByMail = async (email) => {
  const emailValidate = await knex("dateusers").where({ email });
  return emailValidate[0];
};

const getByNickname = async (nick_name) => {
  const nickValidate = await knex("dateusers").where({ nick_name });
  return nickValidate[0];
};

const getByMailAndCode = async (email, code) => {
  const codeToken = await knex("dateusers")
    .innerJoin(
      "token_confirmation",
      "dateusers.id",
      "=",
      "token_confirmation.user_id"
    )
    .where({ email, code_token: code })
    .first();

  console.log(codeToken);

  return codeToken;
};

const getVerifyMail = async (userAcess) => {
  const loginQuery = await knex("dateusers")
    .select("verify_mail")
    .where({
      email: userAcess,
      verify_mail: false,
    })
    .orWhere({ nick_name: userAcess, verify_mail: false })
    .first();

  return loginQuery;
};

const updateVerifyMail = async (email) => {
  await knex.transaction(async (trx) => {
    const [updatedRow] = await trx("dateusers")
      .update({ verify_mail: true })
      .where({ email })
      .returning("*");

    userId = updatedRow.id;

    await trx("token_confirmation")
      .update({ confirmation_at: currentTime })
      .where({ user_id: userId });

    await trx.commit();
  });

  return updateVerifyMail;
};

module.exports = {
  getByMail,
  getByNickname,
  getByMailAndCode,
  getVerifyMail,
  updateVerifyMail,
};
