const bcrypt = require("bcrypt");
const knex = require("../../database/connection");
const errorMessages = require("../../helpers/codeMessages/errorMessages");
const sucessMessages = require("../../helpers/codeMessages/sucessMessages");
const { currentTime } = require("../../helpers/helpersData/data");

const newPassword = async (req, res) => {
  const { email, password } = req.body;

  try {
    const passEncrypted = await bcrypt.hash(password, 10);

    await knex("dateusers")
      .update({ password: passEncrypted, updated_at: currentTime })
      .where({ email });

    return res
      .status(200)
      .json({ message: "OK", body: sucessMessages.passworReset });
  } catch (error) {
    return res
      .status(404)
      .json({ message: errorMessages.errorProcessingThisRequest });
  }
};

module.exports = newPassword;
