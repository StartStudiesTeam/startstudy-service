const bcrypt = require("bcrypt");
const errorMessages = require("../../helpers/codeMessages/errorMessages");
const sucessMessages = require("../../helpers/codeMessages/sucessMessages");
const { currentTime } = require("../../helpers/helpersData/data");
const { updateNewPassword } = require("../../model/User");

const newPassword = async (req, res) => {
  const { email, password } = req.body;

  try {
    const passEncrypted = await bcrypt.hash(password, 10);

    const replacementPass = await updateNewPassword(
      email,
      passEncrypted,
      currentTime
    );

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
