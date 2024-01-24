const knex = require("../../database/connection");
const jwt = require("jsonwebtoken");
const errorMessages = require("../../helpers/codeMessages/errorMessages");
const sucessMessages = require("../../helpers/codeMessages/sucessMessages");
const {
  formattedDate,
  currentTime,
} = require("../../helpers/helpersData/data");
const {
  getByMailAndCode,
  updateVerifyMail,
} = require("../../helpers/users/helpersUsers");

const validationCodeToken = async (req, res) => {
  const { email, codeToken } = req.body;

  try {
    const tokenQuery = await getByMailAndCode(email, codeToken);

    if (!tokenQuery) {
      return res.status(400).json({ message: errorMessages.invalidToken });
    }

    if (tokenQuery.created_at < formattedDate) {
      return res.status(403).json({ message: errorMessages.tokenExpired });
    }

    const emailUpdateQuery = await updateVerifyMail(email, currentTime);

    const accessToken = jwt.sign(
      { sub: tokenQuery.id },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    const { password: _, ...userValid } = tokenQuery;

    return res
      .status(200)
      .json({ message: sucessMessages.userAcessLogin, body: { accessToken } });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

module.exports = validationCodeToken;
