const codeToken = require("../../helpers/users/token");
const errorMessages = require("../../helpers/codeMessages/errorMessages");
const sucessMessages = require("../../helpers/codeMessages/sucessMessages");
const mailSendUserResgistered = require("../mails/sendMails");
const { findUserMail } = require("../../model/User");
const { currentTime } = require("../../helpers/helpersData/date");
const { codeUpdateSentByMail } = require("../../model/Code");

const mailCheckQuery = async (req, res) => {
  const { email } = req.body;

  try {
    const findMail = await findUserMail(email);

    if (!findMail) {
      return res.status(400).json({
        message: errorMessages.invalidEmail,
      });
    }

    const updatedCode = await codeUpdateSentByMail(findMail);

    mailSendUserResgistered(findMail.name, email, updatedCode.code_token);

    return res.status(200).json({ message: sucessMessages.checkMailUser });
  } catch (error) {
    return res
      .status(404)
      .json({ message: errorMessages.errorProcessingThisRequest });
  }
};

module.exports = mailCheckQuery;
