const errorMessages = require("../../helpers/codeMessages/errorMessages");
const { mailUserQuery } = require("../../helpers/users/helpersUsers");

const mailCheckQuery = async (req, res, next) => {
  const { email } = req.body;

  try {
    const mailExistingQuery = await mailUserQuery(email);

    if (!mailExistingQuery) {
      return res.status(404).json({
        message: errorMessages.invalidEmail,
      });
    }

    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: errorMessages.InternalServerError, error: message });
  }
};

module.exports = mailCheckQuery;
