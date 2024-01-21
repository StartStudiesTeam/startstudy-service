const errorMessages = require("../../helpers/codeMessages/errorMessages");
const sucessMessages = require("../../helpers/codeMessages/sucessMessages");
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

    return res.status(204).send();
  } catch (error) {
    return res
      .status(404)
      .json({ message: errorMessages.errorProcessingThisRequest });
  }
};

module.exports = mailCheckQuery;
