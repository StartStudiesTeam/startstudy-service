const knex = require("../../database/connection");
const errorMessages = require("../../helpers/codeMessages/errorMessages");
const sucessMessages = require("../../helpers/codeMessages/sucessMessages");

const passwordForget = async (req, res) => {
  const { newPassword } = req.body;
  const { id } = req.user;

  try {
    await knex("dateusers").update({ password: newPassword }).where({ id });

    return res.status(200).json({ message: sucessMessages.passworReset });
  } catch (error) {
    return res.status(500).json({ message: errorMessages.InternalServerError });
  }
};

module.exports = passwordForget;
