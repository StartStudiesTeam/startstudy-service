const CodeToken = require("../../utils/user/token");
const UserMessageErrors = require("../../constants/Users/errors");
const UserMessageSuccesses = require("../../constants/Users/successes");
const { currentTime } = require("../../utils/date/date");
const { GetUserByMail } = require("../../models/User");
const { GetTheUserId, UpdateCodeTokenById } = require("../../models/Code");
const SendRegisteredUserEmail = require("../../service/mail/Mails");

const mailCheck = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await GetUserByMail(email);

    if (!user) {
      return res.status(404).json({
        message: UserMessageErrors.invalidEmailError,
      });
    }

    const gettingDateById = await GetTheUserId(user.id);

    const updatedCodeToken = await UpdateCodeTokenById(
      gettingDateById.id,
      CodeToken.code_token,
      currentTime,
      null
    );

    const responseMail = await SendRegisteredUserEmail(
      user.name,
      email,
      updatedCodeToken.codeToken
    );

    return res.status(201).json({
      statusCode: responseMail,
      message: UserMessageSuccesses.successfulSendingEmail,
      body: {},
    });
  } catch (error) {
    return res.status(400).json({
      statusCode: 400,
      message: UserMessageErrors.errorSendingEmail,
      body: {},
    });
  }
};

module.exports = mailCheck;
