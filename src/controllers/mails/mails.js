const knex = require("../../database/connection");
const errorMessages = require("../../helpers/codeMessages/errorMessages");
const sucessMessages = require("../../helpers/codeMessages/sucessMessages");
const { currentTime } = require("../../helpers/helpersData/data");
const { getByMail } = require("../../helpers/users/helpersUsers");
const crypto = require("crypto");
const mailSendUserResgistered = require("../mails/sendMails");

const mailCheckQuery = async (req, res) => {
  const { email } = req.body;

  try {
    const mailExistingQuery = await getByMail(email);

    if (!mailExistingQuery) {
      return res.status(400).json({
        message: errorMessages.invalidEmail,
      });
    }

    const updatedCode = {
      code_token: crypto.randomBytes(3).toString("hex"),
      created_at: currentTime,
      updated_at: currentTime,
      confirmation_at: null,
    };

    mailSendUserResgistered(
      mailExistingQuery.name,
      email,
      updatedCode.code_token
    );

    await knex("token_confirmation")
      .update(updatedCode)
      .where({ id: mailExistingQuery.id });

    return res.status(200).json({ message: sucessMessages.checkMailUser });
  } catch (error) {
    return res
      .status(404)
      .json({ message: errorMessages.errorProcessingThisRequest });
  }
};

module.exports = mailCheckQuery;
