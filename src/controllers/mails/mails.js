const codeToken = require("../../helpers/users/token");
const errorMessages = require("../../helpers/codeMessages/errorMessages");
const sucessMessages = require("../../helpers/codeMessages/sucessMessages");
const mailSendUserResgistered = require("../../service/mail/Mails");
const { currentTime } = require("../../helpers/helpersData/date");
const { findUserMail } = require("../../models/User");
const { getUserIDByID, updateCodeTokenById } = require("../../models/Code");

const mailCheck = async (req, res) => {
  const { email } = req.body;

  try {
    const findMail = await findUserMail(email);

    if (!findMail) {
      return res.status(400).json({
        message: errorMessages.invalidEmail,
      });
    }

    const getDateById = await getUserIDByID(findMail.id);

    const updatedTokenField = await updateCodeTokenById(
      getDateById.id,
      codeToken.code_token,
      currentTime,
      null
    );

    const responseMail = await mailSendUserResgistered(
      findMail.name,
      email,
      updatedTokenField.codeToken
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
