const bcrypt = require("bcrypt");
const knex = require("../../database/connection");
const errorMessages = require("../../helpers/codeMessages/errorMessages");
const sucessMessages = require("../../helpers/codeMessages/sucessMessages");

const updatePassword = async (req, res) => {
  const { password, newPassword } = req.body;
  const { id } = req.user;

  try {
    const correntPassword = await knex("dateusers").where({ id });

    const correctPass = await bcrypt.compare(
      password,
      correntPassword.password
    );

    if (!correctPass) {
      return res.status(401).json({ message: errorMessages.passwordInvalid });
    }
    await knex("dateusers").update({ password: newPassword }).where({ id });

    res.status(200).json({ message: sucessMessages.passworReset });
  } catch (error) {
    return res
      .status(404)
      .json({ message: errorMessages.errorProcessingThisRequest });
  }
};

module.exports = updatePassword;
