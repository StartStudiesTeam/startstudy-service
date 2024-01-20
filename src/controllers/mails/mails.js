const errorMessages = require("../../helpers/codeMessages/errorMessages");
const { mailUserQuery } = require("../../helpers/users/helpersUsers");

const mailCheckQuery = async (req, res) => {
  const { email } = req.body;

  try {
    const mailExistingQuery = await mailUserQuery(email);

    if (!mailExistingQuery) {
      return res.status(400).json({
        message: errorMessages.invalidEmail,
      });
    }
    return res.status(200).json({ message: errorMessages.validatedEmail });
  } catch (error) {
    return res.status(500).json({ message: errorMessages.InternalServerError });
  }
};

module.exports = mailCheckQuery;
