const bcrypt = require("bcrypt");
const knex = require("../../database/connection");
const crypto = require("crypto");
const errorMessages = require("../../helpers/yup/errorMessages");
const sucessMessages = require("../../helpers/yup/sucessMessages");

const newPassword = async (req, res) => {
  const { password, newPassword } = req.body;
  const { id } = req.user;

  try {
    const correntPassword = await knex("dateusers").where({ id });

    if (correntPassword[0].password != password) {
      return res.status(400).json({ message: errorMessages.passwordInvalid });
    }
    await knex("dateusers").update({ password: newPassword }).where({ id });

    res.status(200).json({ message: sucessMessages.passworReset });
  } catch (error) {
    return res
      .status(500)
      .json({ message: errorMessages.InternalServerError, error: message });
  }
};

module.exports = newPassword;
