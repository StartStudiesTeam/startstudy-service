const bcrypt = require("bcrypt");
const errorMessages = require("../../helpers/codeMessages/errorMessages");
const sucessMessages = require("../../helpers/codeMessages/sucessMessages");
const { currentTime } = require("../../helpers/helpersData/date");
const { updateNewPassword } = require("../../models/User");

const newPassword = async (req, res) => {
  const { email, password } = req.body;

  try {
    const passEncrypted = await bcrypt.hash(password, 10);

    const replacementPass = await updateNewPassword(
      email,
      passEncrypted,
      currentTime
    );

    return res.status(200).json({
      statusCode: 200,
      message: sucessMessages.passworReset,
      body: {},
    });
  } catch (error) {
    return res.status(400).json({
      statusCode: 400,
      message: errorMessages.errorProcessingThisRequest,
      body: {},
    });
  }
};

module.exports = newPassword;
