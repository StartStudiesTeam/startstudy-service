const bcrypt = require("bcrypt");
const UserMessageErrors = require("../../constants/Users/errors");
const UserMessageSuccess = require("../../constants/Users/successes");
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
        .json({ message: UserMessageErrors.errorEmailNotValidated, body: {} });
    }

    const passEncrypted = await bcrypt.hash(password, 10);

    const replacementPass = await UpdateNewPassword(
      email,
      passEncrypted,
      currentTime
    );

    return res.status(200).json({
      statusCode: 200,
      message: UserMessageSuccess.successfulPasswordReset,
      body: {},
    });
  } catch (error) {
    return res.status(400).json({
      statusCode: 400,
      message: UserMessageErrors.errorUpdatingPassword,
      body: {},
    });
  }
};

module.exports = newPassword;
