const knex = require("../../database/connection");
const {
  nickUserQuery,
  mailUserQuery,
} = require("../../helpers/users/helpersUsers");
const errorMessages = require("../../helpers/codeMessages/errorMessages");
const sucessMessages = require("../../helpers/codeMessages/sucessMessages");
const { currentTime } = require("../../helpers/helpersData/data");

const updateUser = async (req, res) => {
  const { name, nick_name, email, phone_number } = req.body;
  const { id } = req.user;

  try {
    if (await mailUserQuery(email)) {
      return res.status(400).json({
        message: errorMessages.existingUser,
      });
    }

    if (await nickUserQuery(nick_name)) {
      return res.status(400).json({ message: errorMessages.uniqueNickName });
    }

    await knex("dateusers")
      .update({ name, nick_name, email, phone_number, updated_at: currentTime })
      .where({ id });

    return res.status(204).json({ message: sucessMessages.successUpdateUser });
  } catch (error) {
    return res.status(500).json({ message: errorMessages.InternalServerError });
  }
};

module.exports = updateUser;
