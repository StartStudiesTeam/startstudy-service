const bcrypt = require("bcrypt");
const errorMessages = require("../../constants/codeMessages/errorMessages");
const sucessMessages = require("../../constants/codeMessages/sucessMessages");
const { currentTime } = require("../../utils/date/date");
const {
  UpdateNewPassword,
  GetUserByMail,
  GetUserByIdWithDeletedField,
} = require("../../models/User");

const newPassword = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await GetUserByMail(email);
    const isVerifiedAndActive = await GetUserByIdWithDeletedField(user.id);

    if (!isVerifiedAndActive) {
      return res
        .status(400)
        .json({ message: "Não foi possível atualizar sua senha." });
    }

    const passEncrypted = await bcrypt.hash(password, 10);

    const replacementPass = await UpdateNewPassword(
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
