const CodeToken = require("../../utils/user/token");
const errorMessages = require("../../constants/codeMessages/errorMessages");
const sucessMessages = require("../../constants/codeMessages/sucessMessages");
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
        message: errorMessages.invalidEmail,
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
      message: sucessMessages.checkMailUser,
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

module.exports = mailCheck;
