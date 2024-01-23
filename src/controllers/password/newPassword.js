const knex = require("../../database/connection");
const errorMessages = require("../../helpers/codeMessages/errorMessages");
const sucessMessages = require("../../helpers/codeMessages/sucessMessages");

const newPassword = async (req, res) => {
  const { email, password } = req.body;

  try {
    await knex("dateusers").update({ password: password }).where({ email });

    return res.status(200).json({ message: sucessMessages.passworReset });
  } catch (error) {
    return res
      .status(404)
      .json({ message: errorMessages.errorProcessingThisRequest });
  }
};

module.exports = newPassword;
